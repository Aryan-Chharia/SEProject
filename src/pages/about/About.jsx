import React from "react";
import "./about.css";
import { FaGraduationCap, FaUsers, FaLaptopCode, FaCertificate } from "react-icons/fa";

const About = () => {
  const features = [
    {
      icon: <FaGraduationCap />,
      title: "Expert Instruction",
      description: "Learn from industry professionals with years of experience"
    },
    {
      icon: <FaUsers />,
      title: "Community Learning",
      description: "Join a vibrant community of passionate learners"
    },
    {
      icon: <FaLaptopCode />,
      title: "Practical Skills",
      description: "Gain hands-on experience with real-world projects"
    },
    {
      icon: <FaCertificate />,
      title: "Certification",
      description: "Earn recognized certificates upon course completion"
    }
  ];

  return (
    <section className="about">
      <div className="about-container">
        <div className="about-header">
          <h2>About Us</h2>
          <div className="header-underline"></div>
        </div>
        
        <div className="about-content">
          <p className="main-description">
            We are dedicated to providing high-quality online courses to help
            individuals learn and grow in their desired fields. Our experienced
            instructors ensure that each course is tailored for effective learning
            and practical application.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;