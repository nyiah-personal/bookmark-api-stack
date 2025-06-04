const request = require('supertest');
const app = require('../src/app');

describe('Bookmark API', () => {
  
  describe('GET /health', () => {
    it('should return healthy status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);
      
      expect(response.body.status).toBe('healthy');
      expect(response.body.version).toBe('1.0.0');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });
  });

  describe('GET /bookmarks', () => {
    it('should return empty array initially', async () => {
      const response = await request(app)
        .get('/bookmarks')
        .expect(200);
      
      expect(response.body.success).toBe(true);
      expect(response.body.data).toEqual([]);
      expect(response.body.total).toBe(0);
    });
  });

  describe('POST /bookmarks', () => {
    it('should create a new bookmark', async () => {
      const newBookmark = {
        url: 'https://example.com',
        title: 'Example Site',
        description: 'Test bookmark',
        tags: ['test', 'example']
      };

      const response = await request(app)
        .post('/bookmarks')
        .send(newBookmark)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.url).toBe(newBookmark.url);
      expect(response.body.data.title).toBe(newBookmark.title);
      expect(response.body.data).toHaveProperty('id');
      expect(response.body.data).toHaveProperty('createdAt');
    });

    it('should require URL field', async () => {
      const invalidBookmark = {
        title: 'No URL',
        description: 'This should fail'
      };

      const response = await request(app)
        .post('/bookmarks')
        .send(invalidBookmark)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('URL is required');
    });
  });

  describe('GET /bookmarks/:id', () => {
    it('should return 404 for non-existent bookmark', async () => {
      const response = await request(app)
        .get('/bookmarks/non-existent-id')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.error).toBe('Bookmark not found');
    });
  });

  describe('GET /search', () => {
    it('should return search results', async () => {
      const response = await request(app)
        .get('/search?q=test')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('total');
    });
  });

});

// Clean shutdown after tests
afterAll(done => {
  // Give the server a moment to finish, then force exit
  setTimeout(() => {
    process.exit(0);
  }, 100);
  done();
});