# AVA-ENV

[![CircleCI](https://img.shields.io/circleci/project/github/ChocPanda/ava-env/master.svg?style=popout)](https://circleci.com/gh/ChocPanda/ava-env) [![codecov](https://codecov.io/gh/ChocPanda/ava-env/branch/master/graph/badge.svg)](https://codecov.io/gh/ChocPanda/ava-env) [![npm version](https://img.shields.io/npm/v/ava-env.svg?style=popout)](https://www.npmjs.com/package/ava-env) [![dependencies](https://david-dm.org/ChocPanda/ava-env.svg)](https://david-dm.org/ChocPanda/ava-env) [![license](https://img.shields.io/github/license/ChocPanda/ava-env.svg?style=popout)](https://github.com/ChocPanda/ava-env/blob/master/LICENSE) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/xojs/xo) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release) [![Greenkeeper badge](https://badges.greenkeeper.io/ChocPanda/ava-env.svg)](https://greenkeeper.io/)

Quick and dirty boilerplate to set and reset process.env variables when running tests in [ava](https://github.com/avajs/ava/)

## Contents

<!-- toc -->
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