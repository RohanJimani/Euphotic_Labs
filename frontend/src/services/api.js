import axios from "axios";

const API = axios.create({
  baseURL: "https://euphotic-labs.onrender.com/api", 
});

export const getDishes = () => API.get("/dishes");

export const togglePublish = (dishId) =>
  API.patch(`/dishes/${dishId}/toggle`);
