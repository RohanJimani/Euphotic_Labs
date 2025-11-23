import { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="brand">
          <h1>DishManager</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
