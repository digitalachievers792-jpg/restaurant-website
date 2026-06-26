const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  date: {
    type: Date,
    required: [true, 'Date is required'],
  },
  time: {
    type: String,
    required: [true, 'Time is required'],
  },
  tableNumber: {
    type: Number,
    min: 1,
    max: 50,
  },
  guests: {
    type: Number,
    required: [true, 'Number of guests is required'],
    min: 1,
    max: 50,
  },
  specialRequests: {
    type: String,
    trim: true,
    default: '',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', reservationSchema);
