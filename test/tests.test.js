const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const client = require('../tunneled-got.js');

chai.use(chaiAsPromised);
chai.should();

before(async () => {
    //
});

beforeEach(async () => {
    client.reset();
});

describe('Tests for tunneled-got', () => {
    describe('get() should ...', () => {
        it('throw error when no url provided', async () => {
            const msg = 'No url provided';
            await client.get('')
                .should.rejectedWith(Error, msg);
            await client.get()
                .should.rejectedWith(Error, msg);
        });

        const notExistingUrl = 'https://foo889988bar.com';
        it('throw ENOTFOUND when domain does not exist', async () => {
            await client.get(notExistingUrl)
                .should.rejectedWith(Error, 'ENOTFOUND');
        });

        const protectedUrl = 'https://kunde.comdirect.de/itx/persoenlicherbereich/anzeigen';
        it('throw 401 Error', async () => {
            await client.get(protectedUrl)
                .should.rejectedWith(Error, '401');
        });

        const jsonUrl = 'https://jsonplaceholder.typicode.com/todos/1';
        it('return body', async () => {
            const resBodyJson = JSON.parse(await client.get(jsonUrl));
            resBodyJson.should.have.property('userId');
        });

    });

    const headers1 = {
        some: 'header'
    };
    const headers2 = {
        foo: 'bar'
    };
    describe('headers() should ...', () => {
        it('be chainable and return client', () => {
            client.headers(headers1).should
                .equal(client);
        });

        it('set headers-property', async () => {
            client.headers(headers1).headers().should
                .have.property('some', 'header');
        });

        it('add headers-property', async () => {
            const headers = client
                .headers(headers1)
                .headers(headers2)
                .headers();
            headers.should.have.property('foo', 'bar');
            headers.should.have.property('some', 'header');
        });
    });

    describe('options() should ...', () => {
        it('be chainable and return client', () => {
            client.options({}).should
                .equal(client);
        });

        const options1 = {
            timeout: 5000,
            headers: headers1
        }
        it('set headers and timeout', () => {
            client.options(options1).headers().should
                .have.property('some', 'header');
            client.options().headers.should
                .have.property('some', 'header');
            client.options().timeout.should
                .have.property('request', 5000);
        });
    });

    describe('proxy should ...', () => {
        it('not be used when system has no proxy', () => {
            process.env.https_proxy = '';
            client.options().should.not.have.property('agent');
        });
        it('be set according to system proxy', () => {
            process.env.https_proxy = 'https://123.456.789:3180';
            client.options().agent.https.options.proxy.host.should.equal('123.456.789');
            client.options().agent.https.options.proxy.port.should.equal('3180');
            process.env.https_proxy = '';
        });
    });

    describe('reset() should ...', () => {
        it('re-init the http-client', () => {
            process.env.https_proxy = 'https://123.456.789:3180';
            client.options({
                timeout: 5000,
                headers: {
                    foo: 'bar'
                }
            });
            process.env.https_proxy = '';
            client.reset();
            client.options().should.not.have.property('agent');
            client.options().timeout.should.not
                .have.property('request', 5000);
        });
    });
});