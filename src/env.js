const deepClone = require('lodash.clonedeep');

module.exports = test => {
	const envCache = Symbol('envCache');

	test.beforeEach(t => {
		t.context[envCache] = deepClone(process.env);

		t.context.env = envVar => {
			process.env = {
				...process.env,
				...envVar
			};
		};
	});

	test.afterEach(t => {
		process.env = t.context[envCache];
	});

	return test;
};
