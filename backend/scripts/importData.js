// backend/scripts/importData.js
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// Import the Dish model
const Dish = require('../models/dish');
dotenv.config();
console.log(process.env.MONGO_URI,  "MONGO_URI")
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Function to clean the data
const cleanData = (data) => {
  const cleanedData = { ...data };
  
  // Convert empty strings to null
  Object.keys(cleanedData).forEach(key => {
    if (cleanedData[key] === '' || cleanedData[key] === '-1') {
      cleanedData[key] = null;
    }
  });
  
  // Convert prep_time and cook_time to numbers
  if (cleanedData.prep_time) cleanedData.prep_time = parseInt(cleanedData.prep_time);
  if (cleanedData.cook_time) cleanedData.cook_time = parseInt(cleanedData.cook_time);
  
  // Split ingredients into an array
  if (cleanedData.ingredients) {
    cleanedData.ingredients = cleanedData.ingredients
      .split(',')
      .map(ingredient => ingredient.trim())
      .filter(ingredient => ingredient);
  }
  
  return cleanedData;
};

// Clear existing data and import new data
const importData = async () => {
  try {
    // Clear existing data
    await Dish.deleteMany({});
    console.log('Previous data cleared');
    
    const results = [];
    
    // Read the CSV file
    fs.createReadStream(path.join(__dirname, '../indian_food.csv'))
      .pipe(csv())
      .on('data', (data) => results.push(cleanData(data)))
      .on('end', async () => {
        try {
          // Insert the data into MongoDB
          await Dish.insertMany(results);
          console.log(`${results.length} dishes imported successfully`);
          mongoose.connection.close();
        } catch (err) {
          console.error('Error inserting data:', err);
          mongoose.connection.close();
        }
      });
  } catch (err) {
    console.error('Import failed:', err);
    mongoose.connection.close();
  }
};

importData();