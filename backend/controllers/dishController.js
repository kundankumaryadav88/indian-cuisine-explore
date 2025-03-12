// backend/controllers/dishController.js
const Dish = require('../models/dish');

// Get all dishes with pagination, sorting, and filtering
exports.getDishes = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'name', 
      order = 'asc',
      diet,
      flavor_profile,
      course,
      state,
      region
    } = req.query;

    const filter = {};
    
    // Add filters if provided
    if (diet) filter.diet = diet;
    if (flavor_profile) filter.flavor_profile = flavor_profile;
    if (course) filter.course = course;
    if (state) filter.state = state;
    if (region) filter.region = region;

    // Create sort object
    const sort = {};
    sort[sortBy] = order === 'asc' ? 1 : -1;
    
    // Get total count for pagination
    const totalDishes = await Dish.countDocuments(filter);
    
    // Get dishes with pagination and sorting
    const dishes = await Dish.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    res.status(200).json({
      success: true,
      count: dishes.length,
      total: totalDishes,
      totalPages: Math.ceil(totalDishes / limit),
      currentPage: parseInt(page),
      dishes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dishes',
      error: err.message
    });
  }
};

// Get a single dish by ID
exports.getDishById = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id);
    
    if (!dish) {
      return res.status(404).json({
        success: false,
        message: 'Dish not found'
      });
    }
    
    res.status(200).json({
      success: true,
      dish
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dish',
      error: err.message
    });
  }
};

// Search dishes
exports.searchDishes = async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }
    
    // Search using text index
    const dishes = await Dish.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { ingredients: { $regex: query, $options: 'i' } },
        { state: { $regex: query, $options: 'i' } },
        { region: { $regex: query, $options: 'i' } }
      ]
    }).limit(10);
    
    res.status(200).json({
      success: true,
      count: dishes.length,
      dishes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error searching dishes',
      error: err.message
    });
  }
};

// Get dishes by ingredients
exports.getDishesByIngredients = async (req, res) => {
  try {
    const { ingredients } = req.body;
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Ingredients array is required'
      });
    }
    
    // Get dishes where all ingredients are in the user's list
    const dishes = await Dish.find({
      ingredients: { $not: { $elemMatch: { $nin: ingredients } } }
    });
    
    res.status(200).json({
      success: true,
      count: dishes.length,
      dishes
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dishes by ingredients',
      error: err.message
    });
  }
};

// Get all unique values for filters
exports.getFilterOptions = async (req, res) => {
  try {
    const dietTypes = await Dish.distinct('diet');
    const flavorProfiles = await Dish.distinct('flavor_profile');
    const courseTypes = await Dish.distinct('course');
    const states = await Dish.distinct('state');
    const regions = await Dish.distinct('region');
    const allIngredients = await Dish.distinct('ingredients');
    
    // Filter out null values and flatten arrays
    const ingredients = Array.from(new Set(
      allIngredients.filter(ingredient => ingredient !== null)
    )).sort();
    
    res.status(200).json({
      success: true,
      filters: {
        dietTypes: dietTypes.filter(diet => diet !== null).sort(),
        flavorProfiles: flavorProfiles.filter(flavor => flavor !== null).sort(),
        courseTypes: courseTypes.filter(course => course !== null).sort(),
        states: states.filter(state => state !== null).sort(),
        regions: regions.filter(region => region !== null).sort(),
        ingredients
      }
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: err.message
    });
  }
};