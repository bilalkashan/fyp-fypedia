import React, { useState, useRef } from 'react';
import axios from 'axios';
import styles from '../Announcements/AnnouncementModel.module.css';
import { handleError, handleSuccess } from '../../toast';

const ResourceFileModel = ({ resourcefile, onClose, onSave }) => {
  const [fileName, setFileName] = useState(resourcefile.fileName);
  const [file, setFile] = useState(resourcefile.file);
  const fileInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!fileName || !file) {
      handleError("All fields are Required");
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append("fileName", fileName);
      formData.append("file", file);
  
      const response = await axios.put(
        `http://localhost:8080/auth/updateResourceFile/${resourcefile._id}`,
        { fileName, file }
      );
      onSave(response.data.resourceFile); 
      onClose(); 
      handleSuccess("File updated successfully!");
    } catch (error) {
      console.error('Error updating file:', error);
    }
  };
  
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2 className={styles.modalTitle}>Update Files</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fileName"
            placeholder="File Name"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className={styles.input}
          />
          <input className={styles.input} type="file" ref={fileInputRef} onChange={(e) => setFile(e.target.files[0])} />
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

export default ResourceFileModel;
