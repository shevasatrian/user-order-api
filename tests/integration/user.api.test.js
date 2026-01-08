const request = require("supertest");
const app = require("../../src/app");

describe('User API Integration Test', () => {
    test('POST /users should create a user', async () => {
        const res = await request(app)
            .post('/users')
            .send({
                name: 'Test User',
                email: `test${Date.now()}@email.com`
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body).toHaveProperty('email');
        expect(res.body).toHaveProperty('created_at');
    });
});