import React from "react";
import { MdDashboard, MdPerson } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { UserData } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./account.css";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = UserData();
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="about min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="about-container">
        <div className="about-header">
          <h2 className="profile-title">My Profile</h2>
          <div className="header-underline"></div>
        </div>

        <div className="features-grid">
          <div className="feature-card profile-card">
            <div className="profile-avatar">
              <FaUserCircle className="text-6xl text-purple-600" />
            </div>

            <div className="profile-info">
              <div className="info-section">
                <h3 className="info-title">Personal Information</h3>
                <div className="info-content">
                  <div className="info-item">
                    <span className="info-label">Name</span>
                    <span className="info-value">{user.name}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Email</span>
                    <span className="info-value">{user.email}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Role</span>
                    <span className="info-value capitalize">{user.role || 'User'}</span>
                  </div>
                </div>
              </div>

              {/* <div className="button-container">
                <button
                  onClick={() => navigate(`/${user._id}/dashboard`)}
                  className="action-button primary-button"
                >
                  <MdDashboard className="button-icon" />
                  <span>Dashboard</span>
                </button>

                {user.role === "admin" && (
                  <button
                    onClick={() => navigate('/admin/dashboard')}
                    className="action-button admin-button"
                  >
                    <MdDashboard className="button-icon" />
                    <span>Admin Dashboard</span>
                  </button>
                )}

                <button
                  onClick={logoutHandler}
                  className="action-button logout-button"
                >
                  <IoMdLogOut className="button-icon" />
                  <span>Logout</span>
                </button>
              </div> */}
              <div className="button-container">
                {user.role === "admin" ? (
                  <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="action-button admin-button"
                  >
                    <MdDashboard className="button-icon" />
                    <span>Admin Dashboard</span>
                  </button>
                ) : (
                  <button
                    onClick={() => navigate(`/${user._id}/dashboard`)}
                    className="action-button primary-button"
                  >
                    <MdDashboard className="button-icon" />
                    <span>Dashboard</span>
                  </button>
                )}

                <button
                  onClick={logoutHandler}
                  className="action-button logout-button"
                >
                  <IoMdLogOut className="button-icon" />
                  <span>Logout</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;