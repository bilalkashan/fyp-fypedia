import React, { useEffect, useState } from "react";
import styles from "./resourceFile.module.css";
import Taskbar from "../taskbar/taskbar";
import ResourceFileCard from "./resourceFileCard";
import Futtor from "../futtor/futtor";
import axios from "axios";

const ResourceFile = () => {
  const [files, setResourceFiles] = useState([]);

  useEffect(() => {
    const fetchResourceFiles = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/auth/fetchResourceFiles"
        );
        setResourceFiles(response.data.resourceFiles);
      } catch (error) {
        console.error("Error fetching resource files:", error);
      }
    };

    fetchResourceFiles();
  }, []);

  return (
    <>
      <Taskbar />
      <div className={styles.container}>
        <h1 className={styles.dataHeading}>Download Resource Files</h1>
        <div className={styles.wrapper}>
          {files.map((file) => (
            <ResourceFileCard key={file._id} file={file} />
          ))}
        </div>
      </div>
      <div className={styles.datafooter}>
        <Futtor />
      </div>
    </>
  );
};

export default ResourceFile;
