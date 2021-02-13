const got = require('got');
const tunnel = require('tunnel');

let _httpClient;

const client = {};

httpClient = () => {
    if (!_httpClient) {
        const defaultOptions = {
            timeout: 2000
        }
        const basicInstance = got.extend();
        const instanceWithProxy = withProxy(basicInstance);
        _httpClient = httpClientWithOptions(instanceWithProxy, defaultOptions);
    }
    return _httpClient;
}

client.reset = () => {
    _httpClient = null;
}

client.get = async (url) => {
    if ((url === undefined) || (url === null) || (url === ''))
        throw new Error('No url provided');

    const response = await httpClient().get(url);
    return response.body;
}

client.headers = (headers) => {
    if (headers) {
        // set headers
        const options = {
            headers
        }
        _httpClient = httpClientWithOptions(httpClient(), options);
        return client;
    } else {
        // return the current headers
        return httpClient().defaults.options.headers;
    }
}

client.options = (options) => {
    if (options) {
        _httpClient = httpClientWithOptions(httpClient(), options);
        return client;
    } else {
        return httpClient().defaults.options;
    }
}

const httpClientWithOptions = (instance, options = {}) => {
    const newInstance = instance.extend({
        ...options
    });
    return newInstance;
}

const withProxy = (instance) => {
    const proxy = process.env.https_proxy;
    if (proxy) {
        return instance.extend({
            agent: {
                // sets https-proxy
                https: tunnel.httpsOverHttp({
                    proxy: {
                        host: proxy.split('://')[1].split(':')[0],
                        port: proxy.split(':')[2]
                    }
                })
                // set http-proxy if needed
                // http: ...
            }
        });
    } else {
        return instance;
    }
}

module.exports = client;