import React, { useState } from 'react';
import Cards from '../card/cards';
import styles from './adminDashboard.module.css';
import Sidebar from "../sidebar/sidebar";
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");
  const navigate = useNavigate(); 

  const handleCardClick = (componentName) => {
    setActiveComponent(componentName);
    if (componentName === "requestUsers") {
      navigate('/request-users'); 
    } else if (componentName === "announcements") {
      navigate('/noticeboard'); 
    }
   else if (componentName === "adviserList") {
    navigate('/adviserslist'); 
  }
  else if (componentName === "result") {
    navigate('/result'); 
  } else if (componentName === "addTeacher") {
    navigate('/addTeacher'); 
   
  };
  }
  return (
    <div className={styles.adminDashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1>Admin Dashboard</h1>
          <nav>
            <a href="#home">Home</a> / <a href="#dashboard">Dashboard</a>
          </nav>
        </header>

        {activeComponent === "dashboard" && (
          <Cards
            onCardClick={() => handleCardClick("requestUsers")}
            onCardClick1={() => handleCardClick("announcements")}
            onCardClick2={() => handleCardClick("adviserList")}
            onCardClick3={() => handleCardClick("result")}
            onCardClick4={() => handleCardClick("addTeacher")}
          />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
