import { useState } from "react";
import "../styles/DishCard.css";

const DishCard = ({ dish, onToggle }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onToggle(dish.dishId);
    setLoading(false);
  };

  return (
    <div className="dish-card">
      <img src={dish.imageUrl} alt={dish.dishName} />

      <div className="dish-content">
        <h3>{dish.dishName}</h3>

        <p className={`status ${dish.isPublished ? "published" : "unpublished"}`}>
          {dish.isPublished ? "Published" : "Unpublished"}
        </p>

        <button onClick={handleClick} disabled={loading}>
          {loading ? "Updating..." : dish.isPublished ? "Unpublish" : "Publish"}
        </button>
      </div>
    </div>
  );
};

export default DishCard;
