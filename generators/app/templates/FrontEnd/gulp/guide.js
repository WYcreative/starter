import {join, basename, extname} from 'node:path/posix';
import {readFileSync} from 'node:fs';

import generateGuide from '@wycreative/design-guide';
import {globbySync} from 'globby';
import gulp from 'gulp';

import config from '../config/index.js';
import {getDirectory} from './utilities.js';

const {src, dest} = gulp;


async function build(done) {
	const files = globbySync(config.guide);
	const index = files.splice(files.findIndex(file => file.includes('index')), 1)[0];
	const pkg = JSON.parse(readFileSync('./package.json'));
	const {default: guide} = await import(`${join('..', index)}?t=${Date.now()}`);

	for (const file of files) {
		const key = basename(file, extname(file));
		const {default: value} = await import(`${join('..', file)}?t=${Date.now()}`); // eslint-disable-line no-await-in-loop

		guide[key] = value;
	}

	try {
		generateGuide({
			package: pkg,
			guide,
			config,
			destination: config.build.base,
		});
	} catch (error) {
		console.error(' Skipping the generation of the Design Guide:\n', error);
	}

	done();
}


function dist(done) {
	src(config.build.guide.views)
		.pipe(dest(getDirectory(config.dist.guide.views[0])));

	src(config.build.guide.assets)
		.pipe(dest(getDirectory(config.dist.guide.assets)));

	done();
}


build.displayName = 'guide:build';
dist.displayName = 'guide:dist';

export {
	build,
	dist,
};
