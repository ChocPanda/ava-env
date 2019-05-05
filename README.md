# AVA-ENV

<p align="center">
	<a href="https://circleci.com/gh/ChocPanda/ava-env" alt="CircleCI">
		<img src="https://img.shields.io/circleci/project/github/ChocPanda/ava-env/master.svg?style=popout" />
	</a>
	<a href="https://codecov.io/gh/ChocPanda/ava-env" alt="codecov">
		<img src="https://codecov.io/gh/ChocPanda/ava-env/branch/master/graph/badge.svg" />
	</a>
	<a href="https://www.npmjs.com/package/ava-env" alt="npm version">" />
		<img src="https://img.shields.io/npm/v/ava-env.svg?style=popout" />
	</a>
	<a href="https://david-dm.org/ChocPanda/ava-env" alt="dependencies">
		<img src="https://david-dm.org/ChocPanda/ava-env.svg" />
	</a>
	<a href="https://github.com/ChocPanda/ava-env/blob/master/LICENSE" alt="license">
		<img src="https://img.shields.io/github/license/ChocPanda/ava-env.svg?style=popout" />
	</a>
	<a href="https://github.com/xojs/xo" alt="XO code style">
		<img src="https://img.shields.io/badge/code_style-XO-5ed9c7.svg" />
	</a>
	<a href="http://commitizen.github.io/cz-cli/" alt="Commitizen friendly">
		<img src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg" />
	</a>
	<a href="https://github.com/semantic-release/semantic-release" alt="semantic-release">
		<img src="https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg" />
	</a>
</p>

Quick and dirty boilerplate to set and reset process.env variables when running tests in [ava](https://github.com/avajs/ava/)

## Contents

<!-- toc -->

- [Usage](#usage)

<!-- tocstop -->

## Installation

- Install using yarn:
```yarn add ava ava-env -D```
- Install using npm:
```npm install ava ava-env --dev```

## Usage

The tests should be run serially to ensure they aren't run on parallel processes or concurrently (as may be the case asynchronous tests) which could cause them to share a process.env.

Using `ava-env` means the process.env will be cleaned up after each test and returned to the state before the test started, meaning the process can be recycled for the next test without carrying over any global state/shared environment variables

```javascript
const test = require('ava-env')(require('ava'));

test.serial('My test', t => {
	t.is(process.env.testEnvVar, undefined) // Not required...
	t.context.env({ testEnvVar: 'testValue' });

	// ... test code that requires environment variable to be set

	t.is(process.env.testEnvVar, 'testValue');
});

test.serial('My other test', t => {
	t.is(process.env.testEnvVar, undefined) // Not required...
	t.context.env({ testEnvVar: 'different test value' });

	// ... test code that requires environment variable to be set

	t.is(process.env.testEnvVar, 'different test value');
})
```