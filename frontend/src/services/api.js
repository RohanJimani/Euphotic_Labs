import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", 
});

export const getDishes = () => API.get("/dishes");

export const togglePublish = (dishId) =>
  API.patch(`/dishes/${dishId}/toggle`);
