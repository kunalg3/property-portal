const express = require('express');
const { getProperties, addProperty, updateProperty, deleteProperty, myProperties } = require('../controllers/propertyController');
const authenticateJWT = require('../middleware/authMiddleware');

const router = express.Router();

// Public route
router.get('/', getProperties);

// Private routes
router.post('/', authenticateJWT, addProperty);
router.put('/:id', authenticateJWT, updateProperty);
router.delete('/:id', authenticateJWT, deleteProperty);
router.get('/my', authenticateJWT, myProperties);

module.exports = router;
