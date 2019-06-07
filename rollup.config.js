import path from 'path';

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import license from 'rollup-plugin-license';
import copy from 'rollup-plugin-copy';

const plugins = [
	resolve(),
	commonjs(),
	license({
		banner: {
			file: path.join(__dirname, 'LICENSE')
		}
	}),
	copy({
		targets: ['package.json', 'README.md', 'CHANGELOG.md'],
		outputFolder: 'dist'
	})
];

export default [
	{
		input: 'src/env.js',
		output: {
			file: 'dist/index.js',
			format: 'cjs',
			preferConst: true,
			exports: 'default'
		},
		external: ['ava', 'lodash.clonedeep'],
		plugins
	}
];
