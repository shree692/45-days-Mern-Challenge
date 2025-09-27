const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// GET all projects
router.get('/', async (req, res, next) => {
  try {
    const projects = await Project.find().populate('technologies owner');
    res.json({ success: true, data: projects });
  } catch (err) { next(err); }
});

// POST a new project
router.post('/', async (req, res, next) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json({ success: true, data: project });
  } catch (err) { next(err); }
});

module.exports = router;