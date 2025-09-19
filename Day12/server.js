const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'blogData';
let db;

app.use(express.json());

app.post('/api/posts', async (req, res) => {
  try {
    const postData = req.body;
    postData.createdAt = new Date();

    const result = await db.collection('posts').insertOne(postData);

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      postId: result.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to create blog post'
    });
  }
});


app.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.collection('posts').find().toArray();
    res.json({
      success: true,
      posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog posts'
    });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const objectId = new ObjectId(postId);

    const updateData = req.body;
    updateData.updatedAt = new Date();

    const result = await db.collection('posts').updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to update blog post'
    });
  }
});


app.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id;
    const objectId = new ObjectId(postId);

    const result = await db.collection('posts').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Blog post not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete blog post'
    });
  }
});

MongoClient.connect(mongoUrl)
  .then(client => {
    db = client.db(dbName);
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('❌ MongoDB connection failed:', error);
  });
