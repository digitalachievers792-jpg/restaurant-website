const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { createOrder, getOrders } = require('../controllers/orderController');

const validateOrder = [
  body('customerName').trim().notEmpty().withMessage('Customer name is required'),
  body('customerGender').isIn(['Male', 'Female', 'Other']).withMessage('Valid gender is required'),
  body('itemName').trim().notEmpty().withMessage('Item name is required'),
  body('itemPrice').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
];

router.post('/', validateOrder, createOrder);
router.get('/', getOrders);

module.exports = router;
