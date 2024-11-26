import React, { useEffect } from "react";
import "./coursestudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import { Clock, BookOpen, UserCircle } from 'lucide-react';

const CourseStudy = ({ user }) => {
  const params = useParams();

  const { fetchCourse, course } = CourseData();
  const navigate = useNavigate();

  if (user && user.role !== "admin" && !user.subscription.includes(params.id))
    return navigate("/");

  useEffect(() => {
    fetchCourse(params.id);
  }, [params.id]);

  return (
    <>
      {course && (
        <div className="course-study-container">
          <div className="course-study-content">
            <div className="course-image-wrapper">
              <img 
                src={`${server}/${course.image}`} 
                alt={course.title} 
                className="course-image"
              />
            </div>
            
            <div className="course-details">
              <h1 className="course-title">{course.title}</h1>
              
              <p className="course-description">{course.description}</p> 
              
              <div className="course-meta">
                <div className="meta-item">
                  <UserCircle className="meta-icon" />
                  <span>Created by {course.createdBy}</span>
                </div>
                
                <div className="meta-item">
                  <Clock className="meta-icon" />
                  <span>{course.duration} weeks duration</span>
                </div>
                
                <div className="meta-item">
                  <BookOpen className="meta-icon" />
                  <span>{course.category}</span>
                </div>
              </div>
              
              <Link to={`/lectures/${course._id}`} className="lectures-btn">
                Start Learning
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseStudy;