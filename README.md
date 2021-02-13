# Description

Simple and opinionated module to make http/https-requests with ```node```.
Wraps [```got```](https://www.npmjs.com/package/got) and [```tunnel```](https://www.npmjs.com/package/tunnel) with convenience methods for easy of use and ```fluent API``` for best development experience.
It uses your system-```proxy``` if it is configured by default.
Also, it assumes that all your data that you send and receive will have ```json``` format.

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

## Backlog

1. add POST
2. adapter for node.js fetch

    ```js
    fetch("https://www.udemy.com/api-2.0/visits/me/funnel-logs/", {
    "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
        "content-type": "application/json;charset=UTF-8",
        "sec-ch-ua": "\"Chromium\";v=\"88\", \"Google Chrome\";v=\"88\", \";Not A Brand\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "x-requested-with": "XMLHttpRequest",
        "cookie": "ud_firstvisit=2021-01-10T22:20:21.542405+00:00:1kyj4Q:mvLmWNxdjkYbJcNvlSouynO8m2A; __udmy_2_v57r=349964d37e9e49e793d3dc11052cf695; EUCookieMessageShown=true; _ga=GA1.2.730803978.1610317224; _gcl_au=1.1.1506713931.1610317228; __ssid=8fdcc55a867297a12f63ed6e349d416; _rdt_uuid=1610317228934.80010b04-91bd-4e3b-ab2c-9f42d8a1cc68; ki_t=1610317230279%3B1610317230279%3B1610317230279%3B1%3B1; ki_r=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8%3D; IR_PI=0c7d4984-5392-11eb-98cd-42010a246629%7C1610403628718; _fbp=fb.1.1610317231408.933362796; stc111655=tsa:0:20210110225034|env:1%7C20210210222034%7C20210110225034%7C1%7C1014623:20220110222034|uid:1610317234656.688227462.2575684.111655.244268205.9:20220110222034|srchist:1014623%3A1%3A20210210222034:20220110222034; __cfduid=db5e0ced89177eba90d253197dcc2231c1613071628; evi=SlFILR4SV3ZKURhxXFpXdkpRXSBMWEJ5CUcHYxhAT31MDgdjCwEAKlMQCXsVQEd1BEAJexVAAy0TSRx1X1FZbkdREXATH1luQgQJexVAR34ERwl7FUADLRNJHndWVFluR1ERcBNOV38AQxljVBlXOlBREXZZV0VgEwUJe18fWW4DRhJ5TFgObkcSCXtYV0N0HVFdY1RTCDFM; OptanonAlertBoxClosed=2021-02-11T19:32:21.434Z; OptanonConsent=isIABGlobal=false&datestamp=Thu+Feb+11+2021+20%3A32%3A21+GMT%2B0100+(Mitteleurop%C3%A4ische+Normalzeit)&version=6.10.0&hosts=&consentId=11946a69-d12d-474d-93f9-9cf7b415a61b&interactionCount=2&landingPath=NotLandingPage&groups=C0003%3A0%2CC0004%3A0%2CC0001%3A1%2CC0002%3A0&AwaitingReconsent=false; ud_rule_vars=\"eJx9zU2KwzAMhuGrBG9nEiQ5f_JZAsa1lY6ZDmZsp5vSuzfQFtpNV9q8j76Lqi4fpUqw51hiTdnonnnsg56EpWeZWAcdPCIM5NeRB-NT-o2iTKMuizq5Um1Nm_-xNbt1jd6WtGUv9uxydIeTLHu5KBfKor6bB_B7UuQ-aWv8e0QEhC1Qi9ggG42mnzqYadbwBWAAXj5k-d9kv8HVN4wtQkNkCAxRxwhM-IrXmHd1H_5ksRv0jDQ-7VVdb3hDV9A=:1lAHhV:Uws-6QYbF8hwsn-JMuawJLKM8XI\"; exaff=%7B%22start_date%22%3A%222021-02-11T19%3A30%3A26.546558Z%22%2C%22code%22%3A%22QbEBYSLNfPU-lkAmGSaUnTMaF5veN3Iixw%22%2C%22merchant_id%22%3A39197%2C%22aff_type%22%3A%22LS%22%2C%22aff_id%22%3A55780%7D:1lAHhV:K78wQN80otDIORQi_DMVyyAjWgY; __cfruid=dea4775095cbfdc5af18d2813fc2ed427f179b6c-1613210247; seen=1; __cf_bm=866d6f393d41f582d8b6ffee93a1611450d19aeb-1613243567-1800-AVo06kIGjUG7bHXCZEmRXmS/2GGpVtM7LtxYukNsBqED5o4n4kQ7lvBNHuOatASpjx+RjHPiisCVh393Tt16yJc=; eventing_session_id=0ciCCFYcQWmqv3BQOuJfWA-1613245801282"
    },
    "referrer": "https://www.udemy.com/course/microsoft-az-300-azure-architect-technologies/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"type\":\"discount-price-logged\",\"context\":\"landing-page\",\"subcontext\":\"landing-page\",\"context2\":\"\",\"subcontext2\":\"\",\"currency\":\"€\",\"course_ids\":\"2193468\",\"list_price\":\"79.99\",\"discount_price\":\"11,99\"}",
    "method": "POST",
    "mode": "cors"
    });
    ```

3. add automatic token refresh
4. Add jsdoc to exported functions
5. describe default options
6. add .reset(), .options(), .headers(), etc. descriptions
7. add info to new-node-module 'how to pubslish new version' and what's the difference of pushing to git -> push to git != npm publish
