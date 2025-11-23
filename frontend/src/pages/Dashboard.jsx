import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import DishCard from "../components/DishCard";
import { togglePublish } from "../services/api";
import Navbar from "../components/Navbar"; 
import "../styles/Dashboard.css";

const socket = io("https://euphotic-labs.onrender.com"); 

const Dashboard = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to Socket.IO:", socket.id);
    });

    socket.on("dishes", (data) => {
      setDishes(data);
      setLoading(false);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO");
    });

    return () => {
      socket.off("connect");
      socket.off("dishes");
      socket.off("disconnect");
    };
  }, []);

  const handleToggle = async (dishId) => {
    // Optimistic UI update
    setDishes((prevDishes) =>
      prevDishes.map((dish) =>
        dish.dishId === dishId
          ? { ...dish, isPublished: !dish.isPublished }
          : dish
      )
    );

    try {
      await togglePublish(dishId); 
    } catch (error) {
      console.error("Failed to toggle publish:", error);
    }
  };

  return (
    <div>
      <Navbar />

      <div className="dashboard-container">

        {loading ? (
          <p className="loading-text">Loading dishes...</p>
        ) : dishes.length === 0 ? (
          <p className="loading-text">No dishes found</p>
        ) : (
          <div className="dish-grid">
            {dishes
                .slice() 
                .sort((a, b) => b.isPublished - a.isPublished)
                .map((dish) => (
                <DishCard key={dish.dishId} dish={dish} onToggle={handleToggle} />
                ))}
            </div>

        )}
      </div>
    </div>
  );
};

export default Dashboard;
