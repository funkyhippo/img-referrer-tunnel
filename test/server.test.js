const endpoints = require("./endpoints.json");
const supertest = require("supertest");
const server = require("../src/server");
const request = supertest(server);

endpoints.map((endpoint) => {
  it(`Testing ${endpoint}`, async (done) => {
    const res = await request.get(`/${endpoint}`);
    expect(res.status).toBe(200);
    expect(res.header["access-control-allow-origin"]).toBe("*");
    done();
  });
});
