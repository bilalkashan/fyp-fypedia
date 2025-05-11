import React from 'react';
import styles from './teacherDashboard.module.css';
import Sidebar from "../admin/sidebar/sidebar";

const TeacherDashboard = () => {

  return (
    <div className={styles.adminDashboardContainer}>
      <Sidebar />
      <main className={styles.mainContent}>
        <header className={styles.dashboardHeader}>
          <h1>Teacher Dashboard</h1>
          <nav>
            <a href="#home">Home</a> / <a href="#dashboard">Dashboard</a>
          </nav>
        </header>
      </main>
    </div>
  );
};

export default TeacherDashboard;
