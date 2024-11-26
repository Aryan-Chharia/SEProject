import React from "react";
import "./testimonials.css";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "John Doe",
      position: "Student",
      message:
        "This platform helped me learn so effectively. The courses are amazing and the instructors are top-notch.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 2,
      name: "Jane Smith",
      position: "Student",
      message:
        "I've learned more here than in any other place. The interactive lessons and quizzes make learning enjoyable.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Student",
      message:
        "The quality of education here is exceptional. I've gained valuable skills that helped advance my career.",
      image: "https://th.bing.com/th?q=Current+Bachelor&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: 4,
      name: "Sarah Williams",
      position: "Student",
      message:
        "Incredible learning experience! The platform is intuitive and the content is well-structured and engaging.",
      image: "https://th.bing.com/th/id/OIP.GKAiW3oc2TWXVEeZAzrWOAHaJF?w=135&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    },
  ];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2>What Our Students Say</h2>
        <div className="testimonials-grid">
          {testimonialsData.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="quote-icon">
                <FaQuoteLeft />
              </div>
              <p className="message">{testimonial.message}</p>
              <div className="testimonial-footer">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="student-image"
                />
                <div className="student-info">
                  <h3 className="name">{testimonial.name}</h3>
                  <p className="position">{testimonial.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;