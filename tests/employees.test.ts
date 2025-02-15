// Jest & Supertest test cases
import request from 'supertest';
import app from '../src/app';

describe('Employee API', () => {
  it('should fetch all employees', async () => {
    const res = await request(app).get('/employees');
    expect(res.status).toBe(200);
  });
});
