import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./result.module.css";
import Sidebar from "../admin/sidebar/sidebar";
import AddResult from "./addResult";

const Result = () => {
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [confirmation, setConfirmation] = useState(null); 

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const response = await axios.get("http://localhost:8080/auth/fetchresults");
      if (Array.isArray(response.data.results)) {
        setResults(response.data.results);
      } else {
        console.error("Unexpected response format", response.data);
      }
    } catch (error) {
      console.error("Error fetching results:", error);
    }
  };

  const deleteresult = (resultId) => {
    setConfirmation({
      type: "delete",
      message: "Are you sure you want to delete this result?",
      onConfirm: async () => {
        try {
          await axios.delete(`http://localhost:8080/auth/deleteresult?id=${resultId}`);
          fetchResults();
          setConfirmation(null);
        } catch (error) {
          console.error("Error deleting result:", error);
        }
      },
      onCancel: () => setConfirmation(null),
    });
  };

  const handleAddClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [selectedPanel, setSelectedPanel] = useState("p1");
  const handleresultAdded = (newResult) => {
    setResults((prevResult) => [...prevResult, newResult]);
  };

  const filteredResults = results.filter((result) =>
    result.groupName.toLowerCase().startsWith(selectedPanel.toLowerCase() + "-")
  );

  return (
    <div className={styles.container}>
      <Sidebar title="Admin" roleName="Habib Ur Rehman"/>
      <h1 className={styles.header}>FYP Results - Panel {selectedPanel.toUpperCase()}</h1>

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

      <div className={styles["table-wrapper"]}>
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
              <th className={styles.tableHeader}>Delete</th>
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
                
                <td>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteresult(result._id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className={styles.fab} onClick={handleAddClick}>+</button>

      {showModal && (
        <AddResult
          onClose={handleCloseModal}
          onResultAdded={handleresultAdded}
        />
      )}

      {confirmation && (
        <div className={styles.confirmationModal}>
          <div className={styles.modalContent}>
            <p>{confirmation.message}</p>
            <div className={styles.modalButtons}>
              <button className={styles.confirmButton} onClick={confirmation.onConfirm}>Yes</button>
              <button className={styles.cancelButton} onClick={confirmation.onCancel}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Result;