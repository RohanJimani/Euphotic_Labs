// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const dishRoutes = require("./routes/dishRoutes");
const Dish = require("./models/Dish");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/dishes", dishRoutes);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  console.log("Client connected:", socket.id);

  const dishes = await Dish.find();
  socket.emit("dishes", dishes);
});

// Real-time update using Change Streams
mongoose.connection.once("open", () => {
  console.log("MongoDB Change Stream Started");

  try {
    const changeStream = mongoose.connection.collection("dishes").watch();

    changeStream.on("change", async () => {
      const updatedDishes = await Dish.find();
      io.emit("dishes", updatedDishes);
    });
  } catch (err) {
    console.log("Change Stream unavailable. Polling fallback.");
  }
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
