// backend/routes/dishRoutes.js
const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

// Get all dishes with pagination, sorting, and filtering
router.get('/', dishController.getDishes);

// Get filter options
router.get('/filters', dishController.getFilterOptions);

// Search dishes
router.get('/search', dishController.searchDishes);

// Get dishes by ingredients
router.post('/by-ingredients', dishController.getDishesByIngredients);

// Get a single dish by ID
router.get('/:id', dishController.getDishById);

module.exports = router;