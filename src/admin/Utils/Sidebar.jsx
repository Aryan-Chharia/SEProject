import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AiFillHome, AiOutlineLogout } from "react-icons/ai";
import { FaBook, FaUserAlt } from "react-icons/fa";
import { HiMenuAlt3 } from "react-icons/hi";
import "./common.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: "/admin/dashboard", icon: <AiFillHome />, label: "Home" },
    { path: "/admin/course", icon: <FaBook />, label: "Courses" },
    { path: "/admin/users", icon: <FaUserAlt />, label: "Users" },
    { path: "/account", icon: <AiOutlineLogout />, label: "Logout" },
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <button 
          className="toggle-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <HiMenuAlt3 />
        </button>
        
        <nav className="sidebar-nav">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <div className="icon">{item.icon}</div>
                  <span className="label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {!isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(true)}
        />
      )}
    </>
  );
};

export default Sidebar;