const deepClone = require('lodash.clonedeep');
const test = require('../env')(require('ava')); // eslint-disable-line import/order

const originalProcessEnv = deepClone(process.env);

test('Ava-env - Should add variables to process.env', t => {
	t.context.env({ testEnvVar: 'testValue' });
	t.is(process.env.testEnvVar, 'testValue');
});

test.serial('Ava-env - Should overwrite process.env variables', t => {
	process.env.testEnvVar = 'testValue1';
	t.context.env({ testEnvVar: 'differentValue' });
	t.is(process.env.testEnvVar, 'differentValue');
});

test.serial('Ava-env - Should restore the original process.env', t => {
	t.is(process.env.testEnvVar, undefined);
	t.deepEqual(process.env, originalProcessEnv);
});
