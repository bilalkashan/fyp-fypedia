import React, { useState } from 'react';
import axios from 'axios';
import styles from './AnnouncementModel.module.css';
import { handleError, handleSuccess } from '../../toast';

const AddAnnouncementModal = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      handleError("All fields are required!");
      return; 
    }
    try {
      const response = await axios.post('http://localhost:8080/auth/addAnouncements', {
        title,
        description,
      });
      onSave(response.data.announcement); 
      handleSuccess("Announcement added successfully!");
    } catch (error) {
      console.error('Error adding announcement:', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Update Announcement</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className={styles.input}
          />
          <textarea
            name="description"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className={styles.textarea}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
            <button type="button" className={styles.cancelButton} onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAnnouncementModal;
