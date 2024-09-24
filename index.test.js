// install dependencies
const { execSync } = require('child_process');
execSync('npm install');
execSync('npm run seed');

const request = require("supertest")
const { db } = require('./db/connection');
const { Musician } = require('./models/index')
const app = require('./src/app');
const {seedMusician} = require("./seedData");

beforeAll(() => {
    execSync('npm install');
    execSync('npm run seed');
});

afterAll(async () => {
    await db.close();
});

describe('./musicians endpoint', () => {
    // Write your tests here
    it('should return a 200 status code and a list of musicians', async () => {
        const response = await request(app).get('/musicians');
        expect(response.statusCode).toBe(200);
})
})