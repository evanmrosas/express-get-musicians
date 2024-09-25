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
    it('should return a musician by ID', async () => {
        const musician = await Musician.create({ name: "Test Musician", instrument: "Guitar" });
        const response = await request(app).get(`/musicians/${musician.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("Test Musician");
    });
    it('should create a new musician', async () => {
        const newMusician = { name: "John Doe", instrument: "Piano" };
        const response = await request(app).post('/musicians').send(newMusician);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("John Doe");
        expect(response.body.instrument).toBe("Piano");
    });
    it('should update a musician', async () => {
        const musician = await Musician.create({ name: "Old Name", instrument: "Drums" });
        const updatedMusician = { name: "New Name", instrument: "Drums" };
        const response = await request(app).put(`/musicians/${musician.id}`).send(updatedMusician);
        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe("New Name");
    });

    it('should delete a musician', async () => {
        const musician = await Musician.create({ name: "To Be Deleted", instrument: "Bass" });
        const response = await request(app).delete(`/musicians/${musician.id}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("musician deleted");
    });
})