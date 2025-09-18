const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 3000;

const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'resumeData';
let db;

app.use(express.json());


app.post('/api/projects', async (req, res) => {
  try {
    const projectData = req.body;
    projectData.createdAt = new Date();

    const result = await db.collection('projects').insertOne(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      projectId: result.insertedId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to create project'
    });
  }
});


app.get('/api/projects', async (req, res) => {
  try {
    const projects = await db.collection('projects').find().toArray();
    res.json({
      success: true,
      projects
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects'
    });
  }
});


app.put('/api/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const objectId = new ObjectId(projectId);

    const updateData = req.body;
    updateData.updatedAt = new Date();

    const result = await db.collection('projects').updateOne(
      { _id: objectId },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      modifiedCount: result.modifiedCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to update project'
    });
  }
});


app.delete('/api/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const objectId = new ObjectId(projectId);

    const result = await db.collection('projects').deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete project'
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
