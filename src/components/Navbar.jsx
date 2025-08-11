import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../assets/logo.png";
import homeIcon from "../assets/home.svg";
import listIcon from "../assets/list.svg";
import createIcon from "../assets/create.svg";
import userIcon from "../assets/user.svg";
import "../styles/navbar.css";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: homeIcon },
    { path: "/list", label: "List", icon: listIcon },
    { path: "/create", label: "Create", icon: createIcon },
    { path: "/profile", label: "Profile", icon: userIcon },
  ];

  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <Link to="/" className="logo">
          <img src={Logo} alt="PlanStack Logo" className="logo-img" />
        </Link>
        <div className="nav-links">
            {navItems.map((item, index) => (
                <Link
                    key={index}
                    to={item.path}
                    className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
                >
                    <img src={item.icon} alt={`${item.label} icon`} className="nav-icon" />
                    <span>{item.label}</span>
                </Link>
            ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
