// backend/models/dish.js
const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  ingredients: {
    type: [String],
    required: true,
    index: true
  },
  diet: {
    type: String,
    enum: ['vegetarian', 'non vegetarian', null],
    index: true
  },
  prep_time: {
    type: Number,
    default: null
  },
  cook_time: {
    type: Number,
    default: null
  },
  flavor_profile: {
    type: String,
    default: null,
    index: true
  },
  course: {
    type: String,
    default: null,
    index: true
  },
  state: {
    type: String,
    default: null,
    index: true
  },
  region: {
    type: String,
    default: null,
    index: true
  }
}, { timestamps: true });

// Create text indexes for searching
dishSchema.index({
  name: 'text',
  ingredients: 'text',
  state: 'text',
  region: 'text'
});

module.exports = mongoose.model('Dish', dishSchema);