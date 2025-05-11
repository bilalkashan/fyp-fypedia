import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./fypresult.module.css";
import Taskbar from "../taskbar/taskbar";
import Futtor from "../futtor/futtor";

const FYPResult = () => {
  const [results, setResults] = useState([]);
  const [selectedPanel, setSelectedPanel] = useState("p1");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/auth/fetchresults`);
      if (Array.isArray(response.data.results)) {
        setResults(response.data.results);
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const filteredResults = results.filter((result) =>
    result.groupName.toLowerCase().startsWith(selectedPanel.toLowerCase() + "-")
  );

  return (
    <div>
      <Taskbar />
      <div className={styles.container}>
        <h1 className={styles.header}>FYP Results - Panel {selectedPanel.toUpperCase()}</h1>

        {/* Panel Selector Buttons */}
        <div className={styles.panelSelector}>
          {["p1", "p2", "p3", "p4", "p5"].map((panel) => (
            <button
              key={panel}
              className={`${styles.panelButton} ${selectedPanel === panel ? styles.active : ""}`}
              onClick={() => setSelectedPanel(panel)}
            >
              Panel {panel.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Results Table */}
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>S.No</th>
                <th className={styles.tableHeader}>Group Number</th>
                <th className={styles.tableHeader}>Reg No</th>
                <th className={styles.tableHeader}>Project Title</th>
                <th className={styles.tableHeader}>Advisor Name</th>
                <th className={styles.tableHeader}>Panel Remarks</th>
                <th className={styles.tableHeader}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredResults.map((result, index) => (
                <tr key={result._id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{index + 1}</td>
                  <td className={styles.tableCell}>{result.groupName}</td>
                  <td className={styles.tableCell}>
                    {result.registrationNumbers.join(" / ")}
                  </td>
                  <td className={styles.tableCell}>{result.projectTitle}</td>
                  <td className={styles.tableCell}>{result.advisorName}</td>
                  <td className={styles.tableCell}>{result.remarks}</td>
                  <td className={styles.tableCell}>{result.status}</td>
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

export default FYPResult;
