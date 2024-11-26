import React, { useEffect, useState } from "react";
import "./header.css";
import { Link, useLocation } from "react-router-dom";

const Header = ({ isAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="logo">E-Learning</div>

      <div className="link">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
          Home
        </Link>
        <Link 
          to="/courses" 
          className={location.pathname === '/courses' ? 'active' : ''}
        >
          Courses
        </Link>
        <Link 
          to="/about" 
          className={location.pathname === '/about' ? 'active' : ''}
        >
          About
        </Link>
        {isAuth ? (
          <Link 
            to="/account" 
            className={location.pathname === '/account' ? 'active' : ''}
          >
            Account
          </Link>
        ) : (
          <Link 
            to="/login" 
            className={location.pathname === '/login' ? 'active' : ''}
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;