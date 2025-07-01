import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../sidebar/sidebar";
import Cards from '../card/cards';
import styles from './adminDashboard.module.css';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user && user.role) {
      setRole(user.role);
    }
  }, []);

  const handleCardClick = (componentName) => {
    setActiveComponent(componentName);
    switch (componentName) {
      case "requestUsers":
        navigate('/request-users');
        break;
      case "announcements":
        navigate('/noticeboard');
        break;
      case "adviserList":
        navigate('/adviserslist');
        break;
      case "result":
        navigate('/result');
        break;
      case "addTeacher":
        navigate('/addTeacher');
        break;
      case "/teacherDashboard":
        navigate('/teacherDashboard');
        break;
      case "/teacherslot":
        navigate('/teacherslot');
        break;
      case "/slotRequests":
        navigate('/slotRequests');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.adminDashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1>{role === "teacher" ? "Teacher Dashboard" : "Admin Dashboard"}</h1>
          <nav>
            <a href="#home">Home</a> / <a href="#dashboard">Dashboard</a>
          </nav>
        </header>

        {activeComponent === "dashboard" && (
          <Cards
            role={role}
            // Admin handlers
            onCardClick={() => handleCardClick("requestUsers")}
            onCardClick1={() => handleCardClick("announcements")}
            onCardClick2={() => handleCardClick("adviserList")}
            onCardClick3={() => handleCardClick("result")}
            onCardClick4={() => handleCardClick("addTeacher")}
            // Teacher handlers
            onCardClick01={() => handleCardClick("/teacherDashboard")}
            onCardClick02={() => handleCardClick("/teacherslot")}
            onCardClick03={() => handleCardClick("/slotRequests")}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;