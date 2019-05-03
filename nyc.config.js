module.exports = {
	'check-coverage': true,
	'per-file': true,
	watermarks: {
		lines: [80, 95],
		functions: [80, 95],
		branches: [80, 95],
		statements: [80, 95]
	},
	include: ['src/**/*.js'],
	exclude: ['src/**/*.test.js', 'src/**/index.js'],
	reporter: ['lcov', 'text-summary'],
	cache: true,
	all: true,
	'report-dir': './reports/coverage'
};
