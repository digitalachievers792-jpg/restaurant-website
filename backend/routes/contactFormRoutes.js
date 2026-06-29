const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitContactForm,
  getContactForms,
  getContactForm,
  deleteContactForm,
} = require('../controllers/contactFormController');

const validateContactForm = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('age').isInt({ min: 1, max: 150 }).withMessage('Valid age is required'),
  body('gender').trim().notEmpty().withMessage('Gender is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
];

router.post('/', validateContactForm, submitContactForm);
router.get('/', getContactForms);
router.get('/:id', getContactForm);
router.delete('/:id', deleteContactForm);

module.exports = router;
