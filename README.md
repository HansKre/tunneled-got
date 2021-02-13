# Description

Wraps got and tunnel with convenience methods easy of use.

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
    const responseBody = client().getSync('https://google.com');
} catch (error) {
    console.log(error);
}
```

## Usage with configuration

```js
const options = {
    timeout: 60000,
    useSystemProxy: true
}
const url = 'https://google.com';
try {
    const responseBody = client(options).getSync(url);                
} catch (error) {
    console.log(error);
}
```
