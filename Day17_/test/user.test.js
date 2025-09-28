const request = require('supertest');
const app = require('../app');

describe('Users API', () => {
  it('should create a new user', async () => {
    const res = await request(app).post('/users').send({ name: 'Sneha', email: 'sneha@example.com' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
  });

  it('should return 400 if name is missing', async () => {
    const res = await request(app).post('/users').send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
  });

  it('should fetch all users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});