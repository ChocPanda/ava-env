const ava = require('ava'); // eslint-disable-line ava/use-test
const test = require('../env')(ava);

test('Ava-env - Should add variables to process.env', t => {
	t.context.env({ testEnvVar: 'testValue' });
	t.is(process.env.testEnvVar, 'testValue');
});

test('Ava-env - Should overwrite process.env variables', t => {
	process.env.testEnvVar = 'testValue1';
	t.context.env({ testEnvVar: 'differentValue' });
	t.is(process.env.testEnvVar, 'differentValue');
});
