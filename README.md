# Description

Wraps got and tunnel with convenience methods for easy of use.
It uses your system-proxy if it is configured by default.

![badge_issues](https://img.shields.io/github/issues/HansKre/tunneled-got)
![badge_version](https://img.shields.io/npm/v/tunneled-got)
![badge_minified](https://img.shields.io/bundlephobia/min/tunneled-got)

## Install

```bash
npm install tunneled-got
```

## Basic Usage

```js
// require
const client = require('tunneled-got');
//use
try {
    const responseBody = await client.get('https://my-server.com/api/users');
} catch (error) {
    console.log(error);
}
```

## Usage with configuration

```js
const options = {
    timeout: 60000,
    headers: {
        'x-foo': 'bar'
    }
}
try {
    const responseBody = await client.options(options).get('https://my-server.com/api/users');
} catch (error) {
    console.log(error);
}
```

## Backlog

1. Add jsdoc to exported functions
