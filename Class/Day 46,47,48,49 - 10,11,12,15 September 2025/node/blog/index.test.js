// Mock mongoose so it doesn't connect to a real DB
jest.mock('mongoose', () => {
  const actualMongoose = jest.requireActual('mongoose'); // optional: real Schema
  return {
    ...actualMongoose, // include real Schema and other properties
    connect: jest.fn(() => Promise.resolve()),
    connection: { close: jest.fn() }
  };
});


const request = require('supertest');
const app = require('./index'); // your Express app

describe('Basic route tests', () => {
  // Test GET /
  it('GET / should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toBe('Hello World');
  });
});