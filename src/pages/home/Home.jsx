import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import Testimonials from "../../components/testimonials/Testimonials";
import homeimage from "../../assets/pngegg.png";

const Home = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const shapes = document.querySelectorAll('.animated-shape');
    
    shapes.forEach(shape => {
      // Random initial position
      const startX = Math.random() * window.innerWidth;
      const startY = Math.random() * window.innerHeight;
      shape.style.left = `${startX}px`;
      shape.style.top = `${startY}px`;
      
      // Random animation properties
      const duration = 10 + Math.random() * 20;
      const delay = Math.random() * -20;
      
      // Apply animation
      shape.animate([
        { transform: `translate(0, 0) rotate(0deg)` },
        { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)` },
        { transform: `translate(${Math.random() * 200 - 100}px, ${Math.random() * 200 - 100}px) rotate(${Math.random() * 360}deg)` },
        { transform: `translate(0, 0) rotate(360deg)` }
      ], {
        duration: duration * 1000,
        delay: delay * 1000,
        iterations: Infinity,
        direction: 'alternate',
        easing: 'ease-in-out'
      });
    });
  }, []);

  const cards = [
    { icon: "🎓", title: "Interactive Courses", text: "Engage with tailored courses to boost your skills and career." },
    { icon: "👩‍🏫", title: "Expert Instructors", text: "Learn from industry professionals and academic leaders." },
    { icon: "📚", title: "Comprehensive Resources", text: "Access a library of guides, notes, and reference materials." },
    { icon: "🌐", title: "Global Community", text: "Collaborate with learners worldwide and exchange ideas." },
    { icon: "💼", title: "Career Guidance", text: "Get job assistance and guidance for building a brighter future." },
    { icon: "🛠️", title: "Practical Projects", text: "Apply your knowledge with real-world, hands-on projects." },
  ];

  const duplicatedCards = [...cards, ...cards, ...cards];

  return (
    <div className="home">
      {/* Animated Shapes Background */}
      <div className="shapes-container">
        <div className="animated-shape circle-shape"></div>
        <div className="animated-shape square-shape"></div>
        <div className="animated-shape triangle-shape"></div>
        <div className="animated-shape pentagon-shape"></div>
        <div className="animated-shape cross-shape"></div>
        <div className="animated-shape star-shape"></div>
        <div className="animated-shape dot-shape"></div>
        <div className="animated-shape ring-shape"></div>
        <div className="animated-shape squiggle-shape"></div>
        <div className="animated-shape heart-shape"></div>
        {/* Duplicate shapes for more density */}
        <div className="animated-shape circle-shape"></div>
        <div className="animated-shape square-shape"></div>
        <div className="animated-shape triangle-shape"></div>
        <div className="animated-shape pentagon-shape"></div>
        <div className="animated-shape cross-shape"></div>
      </div>

      {/* Rest of your components... */}
      <section className="home-banner">
        <div className="home-text">
          <h1>
            Empower Your Learning Journey
            <span className="highlight">Anytime, Anywhere!</span>
          </h1>
          <p>
            Unlock your potential with expertly designed courses, interactive learning,
            and a supportive community that inspires growth.
          </p>
          <button onClick={() => navigate("/courses")} className="cta-btn">
            Start Learning Now
          </button>
        </div>
        <div className="home-image">
          <img src= {homeimage} alt="Home Banner" />
        </div>
      </section>

      <section className="home-cards-carousel">
        <div className="cards-wrapper">
          <div className="card-container">
            {duplicatedCards.map((card, index) => (
              <div className="card" key={`${card.title}-${index}`}>
                <div className="card-icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default Home;