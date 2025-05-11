import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css';

const departments = [
  { name: 'Computer Science (CS)', description: 'Innovative technology and programming.', icon: '💻' },
  { name: 'Software Engineering (SE)', description: 'Building scalable software systems.', icon: '🛠️' },
  { name: 'Artificial Intelligence (AI)', description: 'Leading the future with AI.', icon: '🤖' },
];

const years = {
  'Computer Science (CS)': ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  'Software Engineering (SE)': ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
  'Artificial Intelligence (AI)': ['2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'],
};

function Dashboard() {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleDepartmentClick = (dept) => {
    setSelectedDepartment(dept);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleYearClick = (year) => {
    navigate('/fypList', { state: { year, department: selectedDepartment.name } });
  };

  const filteredYears = selectedDepartment
    ? years[selectedDepartment.name].filter((year) =>
        year.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <div className={styles.dashboardContainer}>
      {!selectedDepartment ? (
        <>
          <h1>Select Your Department</h1>
          <div className={styles.departmentCards}>
            {departments.map((dept, index) => (
              <div
                key={index}
                className={styles.dashboardCard}
                onClick={() => handleDepartmentClick(dept)}
              >
                <div className={styles.icon}>{dept.icon}</div>
                <h2>{dept.name}</h2>
                <p>{dept.description}</p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1>{selectedDepartment.name} - Select Year</h1>
          <input
            type="text"
            placeholder="Search Year"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchBar}
          />
          <div className={styles.yearList}>
            {filteredYears.length > 0 ? (
              filteredYears.map((year, index) => (
                <div
                  key={index}
                  className={styles.dashboardCard}
                  onClick={() => handleYearClick(year)}
                >
                  <h2>{year}</h2>
                </div>
              ))
            ) : (
              <div className={styles.noResults}>
                          <img
                            src="/images/no-search-found.png"
                            className={styles.noResultsImage}
                            alt='No Result Found'
                          />
                        </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;
