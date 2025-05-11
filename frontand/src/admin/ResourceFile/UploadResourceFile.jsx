import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from '../Announcements/AddAnnouncementModal.module.css';
import { handleError, handleSuccess } from '../../toast';

const UploadResourceFile = ({ onClose, onSave }) => {
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!fileName || !file) {
      handleError("All fields are required!");
      return; 
    }

    const formData = new FormData();
    formData.append("fileName", fileName);
    formData.append("file", fileInputRef.current.files[0]);

    try {
      const res = await axios.post("http://localhost:8080/auth/addResourceFile", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      console.log(res.data);
      if (res.data.resourceFile) {
        onSave(res.data.resourceFile);  
        handleSuccess("File uploaded successfully!");
        onClose(); 
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      handleError("File upload failed!");
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Upload Resource File</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fileName"
            placeholder="File Name"
            onChange={(e) => setFileName(e.target.value)}
            className={styles.input}
          />
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => setFile(e.target.files[0])}
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.saveButton}>
              Upload
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

export default UploadResourceFile;
