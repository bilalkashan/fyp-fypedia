import React, { useEffect, useState } from 'react';
import styles from './requestUsers.module.css';
import { handleSuccess } from '../../toast';
import Sidebar from '../sidebar/sidebar';

const RequestUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/auth/getAdminPendingUsers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({})
    })
      .then(response => response.json())
      .then(data => setUsers(data.users))
      .catch(error => console.error("Error fetching users:", error));
  }, []);

  const handleAccept = (userId) => {
    fetch(`http://localhost:8080/auth/acceptUser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(users.filter(user => user._id !== userId));
          handleSuccess("User accepted successfully!");
        }
      })
      .catch(error => console.error("Error accepting user:", error));
  };

  // Function to handle user removal
  const handleRemove = (userId) => {
    fetch(`http://localhost:8080/auth/deleteUserRequest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setUsers(users.filter(user => user._id !== userId));
          handleSuccess("User has been deleted successfully");
        }
      })
      .catch(error => console.error("Error removing user:", error));
  };

  return (
    <div className={styles.userRequestContainer}>
      <Sidebar />
      <div className={styles.container}>
        <h2 className={styles.title}>Users Pending Admin Approval</h2>
        <p className={styles.totalUsers}>Total Users: {users.length}</p>

        {users.length === 0 ? (
          <p className={styles.noRequestsMessage}>No requests</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.is_verified ? "Verified" : "Not Verified"}</td>
                    <td>{user.role}</td>
                    <td>
                      <button 
                        className={styles.acceptButton} 
                        onClick={() => handleAccept(user._id)}
                      >
                        Accept
                      </button>
                      <button 
                        className={styles.removeButton} 
                        onClick={() => handleRemove(user._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestUsers;
