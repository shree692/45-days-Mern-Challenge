const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: String,
  content: String,
  excerpt: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  category: String,
  tags: [String],
  status: { type: String, enum: ['draft','published'], default: 'draft' },
  featuredImage: String,
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  publishedAt: Date
}, { timestamps: true });

module.exports = mongoose.model('Post', PostSchema);
