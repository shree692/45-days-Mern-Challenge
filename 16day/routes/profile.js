const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Project = require('../models/Project');
const Experience = require('../models/Experience');


router.post('/create-user', async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.json({ success: true, data: user });
  } catch (err) { next(err); }
});

// Create Project
router.post('/create-project', async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    await User.findByIdAndUpdate(req.body.owner, { $push: { projects: project._id } });
    res.json({ success: true, data: project });
  } catch (err) { next(err); }
});

// Create Experience
router.post('/create-experience', async (req, res, next) => {
  try {
    const exp = await Experience.create(req.body);
    await User.findByIdAndUpdate(req.body.owner, { $push: { experience: exp._id } });
    res.json({ success: true, data: exp });
  } catch (err) { next(err); }
});

router.get('/dashboard', async (req, res, next) => {
  try {
    const userCount = await User.countDocuments();
    const projectCount = await Project.countDocuments({ public: true });
    const expCount = await Experience.countDocuments();
    res.json({ success:true, data: { userCount, projectCount, expCount } });
  } catch (err) { next(err); }
});

router.get('/portfolio', async (req, res, next) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ success:false, message:'userId required' });
    const user = await User.findById(userId)
      .populate('projects')
      .populate('experience')
      .populate('skills');
    if (!user) return res.status(404).json({ success:false, message:'User not found' });
    res.json({ success:true, data:user });
  } catch (err) { next(err); }
});

module.exports = router;