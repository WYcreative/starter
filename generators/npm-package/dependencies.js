import {addDevDependencies} from '../_common/utilities.js';


/**
 * Gets the list of development dependencies and their latest possible versions.
 *
 * @param {String[]} tasks - The list of tasks to be used in the project.
 * @param {Generator} generator - The Yeoman Generator instance.
 *
 * @returns {{String: String}} The list of development dependencies and their respective versions, following NPM's rules.
 */
async function getDevDependencies(tasks, generator) {
	const devDependencies = {
		'browser-sync': '',
		del: '',
		'glob-parent': '',
		globby: '',
		gulp: '',
		'gulp-plumber': '',
		'gulp-pug': '',
		'gulp-rename': '',
		xo: '',
		np: '',
	};

	if (tasks.some(task => ['symbols', 'images'].includes(task))) {
		Object.assign(devDependencies, {
			'gulp-imagemin': '',
		});
	}

	if (tasks.includes('symbols')) {
		Object.assign(devDependencies, {
			'gulp-svgstore': '',
			'gulp-tap': '',
			jsdom: '',
		});
	}

	if (tasks.includes('images')) {
		Object.assign(devDependencies, {
			'imagemin-webp': '',
		});
	}

	if (tasks.some(task => ['styles', 'views'].includes(task))) {
		Object.assign(devDependencies, {
			'read-pkg-up': '',
			'resolve.exports': '',
		});
	}

	if (tasks.includes('styles')) {
		Object.assign(devDependencies, {
			cssnano: '',
			'gulp-postcss': '',
			'gulp-sass': '',
			postcss: '',
			'postcss-preset-env': '',
			sass: '',
		});
	}

	if (tasks.includes('scripts')) {
		Object.assign(devDependencies, {
			'@babel/core': '',
			'@babel/preset-env': '',
			'gulp-babel': '',
			'gulp-uglify-es': '',
		});
	}

	if (tasks.includes('views')) {
		Object.assign(devDependencies, {
			'pug-walk': '',
		});
	}

	return addDevDependencies(devDependencies, generator);
}

export default getDevDependencies;
