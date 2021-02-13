const got = require('got');
const tunnel = require('tunnel');
const fs = require('fs');

class HttpClient {
    constructor(options = {}) {
        const client = httpClient(headers, options);
        this.getSync = async (url) => {
            const response = await client.get(url);
            if (response.status != 200)
                throw Error(`Status 200 expected, but was ${response.status}`);
            if (!(response && response.body))
                throw Error('Invalid http response. Response or body empty.');
            return response.body;
        }
    }
}

const init = (options) => {
    return new HttpClient(options);
}

const getSyncToFile = async (url, headers) => {

    const client = httpClient(headers);
    try {
        const response = await client.get(url);
        if (!(response && response.body)) {
            return false;
        }
        try {
            fs.writeFileSync(fileNameWithPath(currentDate, segment), response.body);
        } catch (error) {
            console.log(error);
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
}

const httpClient = (reqHeaders, options) => {
    const useSystemProxy = options.useSystemProxy || true;
    const useTimeout = options.timeout || 60000;

    if (useSystemProxy) {
        const proxy = process.env.https_proxy;
        return client = got.extend({
            headers: reqHeaders,
            agent: {
                https: tunnel.httpsOverHttp({
                    proxy: {
                        host: proxy.split('://')[1].split(':')[0],
                        port: proxy.split(':')[2]
                    }
                })
            },
            timeout: useTimeout
        });
    } else {
        return client = got.extend({
            headers: reqHeaders,
            timeout: useTimeout
        });
    }
}

function refreshCsrfToken() {
    const client = httpClient(headers);
    client.get(url)
        .then(response => {
            /*
            /(csrfToken:\s")(.+)("\,)/m
                //m: multiline, make sure it's NOT g for global
                (csrfToken:\s"): selectgroup #1, matches 'csrfToken: "'
                (.+): selectgroup #2, matches everything of at least 1 length
                ("\,): selectgroup #3, matches '",'
                example:
                    0: "csrfToken: "CLlECKxaRK/pxwxkNP9Ma6T0ZFo=:1612382937261","
                    1: "csrfToken: ""
                    2: "CLlECKxaRK/pxwxkNP9Ma6T0ZFo=:1612382937261"
                    3: "","
            */
            const csrfRegex = /(csrfToken:\s")(.+)("\,)/m;
            process.env.xApigeeClassicCsrf = response.body.match(csrfRegex)[2];
            if (response.headers.hasOwnProperty('set-cookie')) {
                refreshCookies(response.headers);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

function refreshCookies(newHeaders) {
    // split old cookies into map
    const oldCookiesMap = new Map();
    process.env.cookie.split(';').forEach(cookie => {
        const name = cookie.trim().split('=')[0]; // trim for key-comparisons
        oldCookiesMap.set(name, cookie);
    });
    // process new cookies
    const setCookies = newHeaders['set-cookie'];
    setCookies.forEach(setCookie => {
        const cookie = setCookie.split(';')[0];
        const name = cookie.split('=')[0]; //don't trim to preserve white-space

        // replace old with new
        if (oldCookiesMap.has(name)) {
            oldCookiesMap.set(name, cookie);
        }
    });
    // join cookies
    let newCookies = '';
    for (let value of oldCookiesMap.values()) {
        if (newCookies === '') {
            newCookies = value;
        } else {
            newCookies = `${newCookies};${value}`;
        }
    }
    // set it
    process.env.cookie = newCookies;
}

module.exports = init;