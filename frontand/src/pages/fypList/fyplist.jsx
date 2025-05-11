import React, { useEffect, useState } from "react";
import styles from "./fyplist.module.css";
import Taskbar from "../taskbar/taskbar";
import Futtor from "../futtor/futtor";
import { useNavigate } from "react-router-dom";

const StudentTable = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUserData = localStorage.getItem("loggedInUser");

    if (!token || !storedUserData) {
      navigate("/login");
      return;
    }

    const parsedUserData = JSON.parse(storedUserData);
    setUserData(parsedUserData);
  }, [navigate]);

  const students = [
    { name: "Ali Khan", rollNumber: "2112001", adviser: "Dr. Ahmed" },
    { name: "Fatima Shah", rollNumber: "2112002", adviser: "Dr. Ahmed" },
    { name: "Hassan Raza", rollNumber: "2112003", adviser: "Prof. Aslam" },
    { name: "Sara Ali", rollNumber: "2112004", adviser: "Prof. Aslam" },
    { name: "Zain Malik", rollNumber: "2112005", adviser: "Dr. Iqbal" },
    { name: "Ayesha Noor", rollNumber: "2112006", adviser: "Dr. Iqbal" },
  ];

  const [searchQuery, setSearchQuery] = useState("");

  const filteredStudents = students.filter((student) =>
    Object.values(student).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleDetailsClick = (student) => {
    alert(
      `Details of ${student.name}: Roll No ${student.rollNumber}, Adviser ${student.adviser}`
    );
  };

  return (
    <div>
      <Taskbar userData={userData} />
      <div className={styles.container}>
        <h1 className={styles.header}>Student Table</h1>
        <div className={styles.searchBarContainer}>
          <input
            type="text"
            className={styles.searchBar}
            placeholder="Search by name, roll number, or adviser"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredStudents.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Roll Number</th>
                <th>Adviser</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>{student.adviser}</td>
                  <td>
                    <button
                      className={styles.detailsButton}
                      onClick={() => handleDetailsClick(student)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.noResults}>
            <img
              src="/images/no-search-found.png"
              alt="No Results Found"
              className={styles.noResultsImage}
            />
            <p className={styles.noResultsText}>No results found</p>
          </div>
        )}
      </div>
      <Futtor />
    </div>
  );
};

export default StudentTable;
