const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getAllMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require('../controllers/menuController');

const validateMenu = [
  body('name').trim().notEmpty().withMessage('Dish name is required'),
  body('category').trim().notEmpty().withMessage('Category is required'),
  body('price').isFloat({ min: 0 }).withMessage('Valid price is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

router.get('/', getAllMenuItems);
router.get('/:id', getMenuItem);
router.post('/', validateMenu, createMenuItem);
router.put('/:id', validateMenu, updateMenuItem);
router.delete('/:id', deleteMenuItem);

module.exports = router;
