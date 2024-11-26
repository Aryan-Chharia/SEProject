import React, { useEffect, useState } from "react";
import "./coursedescription.css";  
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/CourseContext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();
  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id); 
  }, []);

  const handleDirectPurchase = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      // Simulate a successful purchase
      const { data } = await axios.post(
        `${server}/api/verification/${params.id}`,
        {
          // Generate a mock payment ID using timestamp and random string
          razorpay_payment_id: `mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          razorpay_order_id: `order_${Date.now()}`,
          razorpay_signature: 'bypass_signature'
        },
        {
          headers: {
            token,
          },
        }
      );

      await fetchUser();
      await fetchCourses();
      await fetchMyCourse();
      toast.success("Course purchased successfully!");
      setLoading(false);
      navigate(`/payment-success/${data.razorpay_payment_id || 'SUCCESS'}`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Purchase failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="CourseDescription-container">
          {course && (
            <div className="CourseDescription-content">
              <div className="CourseDescription-header">
                <img
                  src={`${server}/${course.image}`}
                  alt=""
                  className="CourseDescription-image"
                />
                <div className="CourseDescription-info">
                  <h2 className="CourseDescription-title">{course.title}</h2>
                  <p className="CourseDescription-instructor">
                    Instructor: {course.createdBy}
                  </p>
                  <p className="CourseDescription-duration">
                    Duration: {course.duration} weeks
                  </p>
                </div>
              </div>

              <p className="CourseDescription-description">{course.description}</p>

              <p className="CourseDescription-price">
                Let's get started with course At ₹{course.price}
              </p>

              {user && user.subscription.includes(course._id) ? (
                <button
                  onClick={() => navigate(`/course/study/${course._id}`)}
                  className="CourseDescription-btn"
                >
                  Study
                </button>
              ) : (
                <button
                  onClick={handleDirectPurchase}
                  className="CourseDescription-btn"
                >
                  Buy Now
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CourseDescription;