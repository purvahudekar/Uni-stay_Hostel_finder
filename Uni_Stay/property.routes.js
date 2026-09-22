const express = require('express');
const router = express.Router();
const propertyController = require('./property.controller');

// 1. GET /api/properties/filter - Main advanced search filtering and pagination route
router.get('/filter', propertyController.filterProperties);

// 2. GET /api/properties/:id - View specific PG/Hostel full details
router.get('/:id', propertyController.getPropertyById);

module.exports = router;
