import React from 'react';
import './footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-links">
          <a href="https://facebook.com" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
        <p className="copyright">© {currentYear} Your E-Learning Platform. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;