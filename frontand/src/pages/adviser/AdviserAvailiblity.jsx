import React, { useState, useEffect } from "react";
import axios from "axios";
import Taskbar from "../taskbar/taskbar";
import Futtor from "../futtor/futtor";
import styles from "./AdviserAvalibility.module.css";

const AdviserAvailability = () => {
  const [advisers, setAdvisers] = useState([]);

  useEffect(() => {
    fetchAdvisers();
  }, []);

  const fetchAdvisers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/getAllAdvisers");
      setAdvisers(response.data);
    } catch (error) {
      console.error("Error fetching advisers:", error);
    }
  };

  const getSlotColor = (status) => {
    switch (status) {
      case "reserved":
        return "red";
      case "open":
        return "green";
      case "unavailable":
        return "gray";
      default:
        return "lightgray";
    }
  };

  return (
      <div>
        <Taskbar />
      <div className={styles.container}>
        <h1 className={styles.header}>Adviser Availability</h1>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>S. No.</th>
                <th className={styles.tableHeader}>Name</th>
                <th className={styles.tableHeader}>Email</th>
                <th className={styles.tableHeader}>Specialization</th>
                <th className={styles.tableHeader}>Slots</th>
              </tr>
            </thead>
            <tbody>
              {advisers.map((adviser, index) => (
                <tr key={adviser._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{index + 1}</td>
                  <td className={styles.tableCell}>{adviser.name}</td>
                  <td className={styles.tableCell}>{adviser.email}</td>
                  <td className={styles.tableCell}>{adviser.specialization}</td>
                  <td className={styles.tableCell}>
                    <div className={styles.slotContainer}>
                      {adviser.slots.map((slot) => (
                        <div
                          key={slot.slotName}
                          className={styles.slotBox}
                          style={{ backgroundColor: getSlotColor(slot.status) }}
                        >
                          <div>{slot.slotName}</div>
                          <div>{slot.status}</div>
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Futtor />
      </div>
  );
};

export default AdviserAvailability;
