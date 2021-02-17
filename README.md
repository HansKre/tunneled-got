# Description

Simple and opinionated module to make http/https-requests with ```node```.
Wraps [```got```](https://www.npmjs.com/package/got) and [```tunnel```](https://www.npmjs.com/package/tunnel) with convenience methods for easy of use and ```fluent API``` for best development experience.
It uses your system-```proxy``` if it is configured by default.
Also, it assumes that all your data that you send and receive will have ```json``` format.

It also provides an adapter for ```fetch()```-requests to be used as ```client.fetch()```.

![badge_issues](https://img.shields.io/github/issues/HansKre/tunneled-got)
![badge_version](https://img.shields.io/npm/v/tunneled-got)
![badge_minified](https://img.shields.io/bundlephobia/min/tunneled-got)

## Install

```bash
npm install tunneled-got
```

## Basic Usage

```js
// import
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
const url = 'https://my-server.com/api/users';
try {
    const responseBody = await client.options(options).get(url);
} catch (error) {
    console.log(error);
}
```

## ```POST``` Example

```js
const data = {
    foo: 'bar',
    nested: {
        'foo': 'baz'
    }
}
try {
    const responseBody = await client.post(url, data);
} catch (error) {
    console.log(error);
}
```

## ```POST``` Example with specific types

defaults are: ```contentType='application/json'```, ```responseType='json'```

```js
try {
    const responseBody = await client.post(url, data, contentType='application/xml', responseType='application/xml');
} catch (error) {
    console.log(error);
}
```

## ```fetch()``` example

Following two requests yield same result:

Using ```node-fetch```:

```js
const fetch = require('node-fetch');
fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: "{\"title\":\"Kenneth Simon\",\"body\":\"Duis aute esse eiusmod aute do fugiat id.\",\"userId\":\"d3621c6b-2bfc-5dea-b317-a39060e48531\"}",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
})
    .then((response) => response.json())
    .then((json) => console.log(json));
```

Using ```tunneled-got```:

```js
const client = require('tunneled-got');
const json = await client.fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: "{\"title\":\"Kenneth Simon\",\"body\":\"Duis aute esse eiusmod aute do fugiat id.\",\"userId\":\"d3621c6b-2bfc-5dea-b317-a39060e48531\"}",
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
    },
});
console.log(json);
```

## Backlog

1. Add tests for SOAP-POST [service1](https://www.predic8.de/soap/blz-webservice.htm), [service2](http://www.thomas-bayer.com/soap/csv-xml-converter-webservice.htm)
2. Add jsdoc to exported functions
3. add automatic token refresh
4. describe default options
5. add .reset(), .options(), .headers(), etc. descriptions
6. add info to new-node-module 'how to pubslish new version' and what's the difference of pushing to git -> push to git != npm publish
