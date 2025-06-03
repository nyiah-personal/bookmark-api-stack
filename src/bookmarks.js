const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();

// In-memory storage 
let bookmarks = [];

// Get all bookmarks
router.get('/bookmarks', (req, res) => {
  res.json({
    success: true,
    data: bookmarks,
    total: bookmarks.length
  });
});

// Get single bookmark
router.get('/bookmarks/:id', (req, res) => {
  const bookmark = bookmarks.find(b => b.id === req.params.id);
  
  if (!bookmark) {
    return res.status(404).json({
      success: false,
      error: 'Bookmark not found'
    });
  }
  
  res.json({
    success: true,
    data: bookmark
  });
});

// Create new bookmark
router.post('/bookmarks', (req, res) => {
  const { url, title, description, tags } = req.body;
  
  if (!url) {
    return res.status(400).json({
      success: false,
      error: 'URL is required'
    });
  }
  
  const bookmark = {
    id: uuidv4(),
    url,
    title: title || '',
    description: description || '',
    tags: tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  bookmarks.push(bookmark);
  
  res.status(201).json({
    success: true,
    data: bookmark
  });
});

// Update bookmark
router.put('/bookmarks/:id', (req, res) => {
  const index = bookmarks.findIndex(b => b.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Bookmark not found'
    });
  }
  
  const { url, title, description, tags } = req.body;
  
  bookmarks[index] = {
    ...bookmarks[index],
    url: url || bookmarks[index].url,
    title: title || bookmarks[index].title,
    description: description || bookmarks[index].description,
    tags: tags || bookmarks[index].tags,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    success: true,
    data: bookmarks[index]
  });
});

// Delete bookmark
router.delete('/bookmarks/:id', (req, res) => {
  const index = bookmarks.findIndex(b => b.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: 'Bookmark not found'
    });
  }
  
  bookmarks.splice(index, 1);
  
  res.json({
    success: true,
    message: 'Bookmark deleted successfully'
  });
});

// Search bookmarks
router.get('/search', (req, res) => {
  const { q, tag } = req.query;
  
  let filtered = bookmarks;
  
  if (q) {
    filtered = filtered.filter(bookmark =>
      bookmark.title.toLowerCase().includes(q.toLowerCase()) ||
      bookmark.description.toLowerCase().includes(q.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(q.toLowerCase())
    );
  }
  
  if (tag) {
    filtered = filtered.filter(bookmark =>
      bookmark.tags.includes(tag)
    );
  }
  
  res.json({
    success: true,
    data: filtered,
    total: filtered.length
  });
});

module.exports = router;