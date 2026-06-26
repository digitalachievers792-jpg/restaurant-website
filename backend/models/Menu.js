const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Dish name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Italian', 'Chinese', 'Continental', 'Mexican', 'Arabic', 'Indian', 'Desserts', 'Cocktails', 'Mocktails', 'Wines', 'Beers'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  currency: {
    type: String,
    default: 'USD',
    enum: ['USD', 'EUR', 'GBP', 'AED', 'PKR', 'INR'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  image: {
    type: String,
    default: '/images/menu/default-dish.jpg',
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Menu', menuSchema);
