import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";
import "./users.css";
import { UserCog, Loader2 } from "lucide-react";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
      return;
    }
    fetchUsers();
  }, [user, navigate]);

  async function fetchUsers() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }

  const updateRole = async (id, currentRole) => {
    if (window.confirm(`Are you sure you want to change this user's role from ${currentRole}?`)) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );
        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to update role");
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="loading-container">
          <Loader2 className="animate-spin" size={40} />
          <p>Loading users...</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="users-container">
        <div className="users-header">
          <h1>
            <UserCog className="header-icon" />
            User Management
          </h1>
          <p>{users.length} users found</p>
        </div>

        <div className="table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge ${user.role}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>
                    <button
                      onClick={() => updateRole(user._id, user.role)}
                      className="update-role-btn"
                    >
                      Change Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;