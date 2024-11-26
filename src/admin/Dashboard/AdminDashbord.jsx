import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import { Loader2, GraduationCap, Users, Video } from "lucide-react";
import "./dashboard.css";

const AdminDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchStats();
  }, [user, navigate]);

  async function fetchStats() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setStats(data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  }

  const statsData = [
    {
      title: "Total Courses",
      value: stats.totalCoures || 0,
      icon: <GraduationCap size={24} />,
      color: "purple",
    },
    {
      title: "Total Lectures",
      value: stats.totalLectures || 0,
      icon: <Video size={24} />,
      color: "blue",
    },
    {
      title: "Total Users",
      value: stats.totalUsers || 0,
      icon: <Users size={24} />,
      color: "teal",
    },
  ];

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard__header">
          <h1 className="dashboard__title">Admin Dashboard</h1>
          <p className="dashboard__welcome">
            Welcome back, <span className="dashboard__name">{user?.name || 'Admin'}</span>
          </p>
        </div>

        {loading ? (
          <div className="dashboard__loading">
            <Loader2 className="dashboard__loader" />
            <p>Loading statistics...</p>
          </div>
        ) : (
          <div className="dashboard__grid">
            {statsData.map((stat, index) => (
              <div 
                key={index}
                className={`dashboard__card dashboard__card--${stat.color}`}
              >
                <div className="dashboard__card-content">
                  <div className={`dashboard__icon dashboard__icon--${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div className="dashboard__info">
                    <h3 className="dashboard__card-title">{stat.title}</h3>
                    <p className="dashboard__value">
                      {stat.value.toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className={`dashboard__card-glow dashboard__card-glow--${stat.color}`}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AdminDashboard;