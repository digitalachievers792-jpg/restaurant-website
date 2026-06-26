const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
    trim: true,
  },
  customerGender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: [true, 'Gender is required'],
  },
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  itemPrice: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: 1,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Order', orderSchema);
