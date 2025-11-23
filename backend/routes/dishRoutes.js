// routes/dishRoutes.js

const express = require("express");
const router = express.Router();
const {
  getDishes,
  toggleDishStatus,
} = require("../controllers/dishController");

router.get("/", getDishes);
router.patch("/:dishId/toggle", toggleDishStatus);

module.exports = router;
