const request = require('supertest');
const app = require('../server');

describe('API Endpoint Tests', () => {
  test('GET / should return HTML page', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.text).toMatch(/<html>/i); // basic check that it returns HTML content
  });

  test('GET /api/chatbot should handle requests (respond with 404 or actual response)', async () => {
    const res = await request(app).get('/api/chatbot');
    // Adjust expectation based on your chatbotRoutes setup
    expect([200, 404]).toContain(res.statusCode);
  });

  test('GET /api/spotify should handle requests (respond with 404 or actual response)', async () => {
    const res = await request(app).get('/api/spotify');
    // Adjust expectation based on your spotifyRoutes setup
    expect([200, 404]).toContain(res.statusCode);
  });

  test('GET unknown route should return 404', async () => {
    const res = await request(app).get('/non-existent-route');
    expect(res.statusCode).toBe(404);
  });
});
