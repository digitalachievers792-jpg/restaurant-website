const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  submitContact,
  getContacts,
  getContact,
  deleteContact,
} = require('../controllers/contactController');

const validateContact = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('subject').trim().notEmpty().withMessage('Subject is required'),
  body('message').trim().notEmpty().withMessage('Message is required'),
];

router.post('/', validateContact, submitContact);
router.get('/', getContacts);
router.get('/:id', getContact);
router.delete('/:id', deleteContact);

module.exports = router;
