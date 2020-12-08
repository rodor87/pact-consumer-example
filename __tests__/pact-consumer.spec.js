
const { Pact } = require('@pact-foundation/pact');
const path = require('path');
const { fetchProducts } = require('../index');

const provider = new Pact({
  consumer: 'consumer-ox',
  provider: 'provider-ox',
  port: 4000,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: 'INFO',
  cors: true
});

describe('Product Service', () => {
    describe('When a request to list all products is made', () => {
      beforeAll(() =>
        provider.setup().then(() => {
          provider.addInteraction({
            uponReceiving: 'a request to list all products',
            withRequest: {
              method: 'GET',
              path: '/product',
              headers: { Accept: "application/json", "Content-Type":  "application/json; charset=utf-8" }
            },
            willRespondWith: {
              status: 200,
              body: {
                "sku": 1,
                "name": "Bosche Washing Machine"
              },
            },
          });
        })
      );
  
      test('should return the correct data', async () => {
        const response = await fetchProducts(provider.mockService.baseUrl);
        expect(response.sku).toBe(1);
        expect(response.name).toBe('Bosche Washing Machine');
      });
  
      afterEach(() => provider.verify());
      afterAll(() => provider.finalize());
    });
  });