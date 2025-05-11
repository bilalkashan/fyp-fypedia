import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "../Announcements/Anouncments.module.css";
import ResourceFileModel from './ResourceFileModel';
import Sidebar from '../sidebar/sidebar';
import UploadResourceFile from './UploadResourceFile';

const ResourceFile = () => {
  const [loading, setLoading] = useState(false);
  const [resourcefiles, setResourceFiles] = useState([]);
  const [editResourceFile, setEditAnnouncement] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const getResourceFile = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/auth/getResourceFile");
        setResourceFiles(response.data.resourceFiles);
        console.log(response.data.resourcefiles);
      } catch (error) {
        console.log(error);
      }
    };

    getResourceFile();
    }, []);

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`http://localhost:8080/auth/deleteResourceFile/${_id}`);
      setResourceFiles((prevResourceFile) =>
        prevResourceFile.filter((resourcefile) => resourcefile._id !== _id)
      );
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  const handleUpdate = (resourcefile) => {
    setEditAnnouncement(resourcefile);
  };

  const handleAdd = () => {
    setIsAddModalOpen(true);
  };

  const handleModalClose = () => {
    setEditAnnouncement(null);
    setIsAddModalOpen(false);
  };

  const updateResourceFileInState = (resourcefiles, updatedResouceFIles) =>
    resourcefiles.map((resoucefile) =>
      resoucefile._id === updatedResouceFIles._id ? updatedResouceFIles : resoucefile
    );

  const handleSave = (updatedResouceFIles) => {
    setResourceFiles((prevResourceFiles) =>
      updateResourceFileInState(prevResourceFiles, updatedResouceFIles)
    );
    handleModalClose();
  };

  const handleAddSave = (newResouceFile) => {
    setResourceFiles((prevResourceFile) => [newResouceFile, ...prevResourceFile]);
    handleModalClose();
  };

  return (
    <div className={styles.announcementsContainer}>
      <Sidebar />
    <div className={styles.container}>
      <h2 className={styles.heading}>Resource Files</h2>
      <div className={styles.announcementList}>
        {resourcefiles.length === 0 ? (
          <p>No Files available</p>
        ) : (
          resourcefiles.map((resourcefile) => (
            <div key={resourcefile._id} className={styles.announcementCard}>
              <div className={styles.announcementContent}>
                <h3 className={styles.title}>{resourcefile.fileName}</h3>
                <p className={styles.description}>{resourcefile.file}</p>
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={styles.updateButton}
                  onClick={() => handleUpdate(resourcefile)}
                >
                  Update
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDelete(resourcefile._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.addButtonContainer}>
        <button className={styles.addButton} onClick={handleAdd}>
          Add File
        </button>
      </div>

      {editResourceFile && (
        <ResourceFileModel
          resourceFile={editResourceFile}
          onClose={handleModalClose}
          onSave={handleSave}
        />
      )}

      {isAddModalOpen && (
        <UploadResourceFile onClose={handleModalClose} onSave={handleAddSave} />
      )}
    </div>
    </div>
  );
};

export default ResourceFile;
