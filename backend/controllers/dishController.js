// controllers/dishController.js

const Dish = require("../models/Dish");

// GET all dishes
exports.getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find().sort({ createdAt: -1 });
    res.json(dishes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// TOGGLE publish status
exports.toggleDishStatus = async (req, res) => {
  try {
    const { dishId } = req.params;

    const dish = await Dish.findOne({ dishId });
    if (!dish) {
      return res.status(404).json({ error: "Dish not found" });
    }

    dish.isPublished = !dish.isPublished;
    await dish.save();

    res.json(dish);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
