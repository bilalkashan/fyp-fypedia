import React, { useEffect, useState } from "react";
import UploadFypModal from "./UploadFypModal";
import styles from "./ViewFypSubmissions.module.css";
import Taskbar from "../taskbar/taskbar";
import Futtor from "../futtor/futtor";
import { FaFilePdf, FaVideo, FaLink } from "react-icons/fa";
import api from "../../api";

const ViewFypSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        console.log("Fetching submissions...");
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user || !user._id) {
          console.error("User not found in localStorage");
          return;
        }

        const res = await api.get(`/fyp/get-student-fyp/${user._id}`);
        console.log("Response from server:", res.data);
        if (res.data.success) {
          setSubmissions(res.data.data || []);
          console.log("Submissions fetched successfully:", res.data.data);
        } else {
          console.error("Unexpected data format:", res.data);
        }
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) return <div className={styles.loading}>Loading...</div>;

  return (
    <div>
      <Taskbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>FYP Submissions</h2>
          <button
            className={styles.uploadButton}
            onClick={() => setShowUploadModal(true)}
          >
            Upload FYP
          </button>
        </div>

        {showUploadModal && (
          <UploadFypModal onClose={() => setShowUploadModal(false)} />
        )}

        {submissions.length === 0 ? (
          <p className={styles.noData}>No submissions found.</p>
        ) : (
          <div className={styles.submissionList}>
            {submissions.map((submission) => (
              <div key={submission._id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <h3 className={styles.cardTitle}>{submission.title}</h3>
                  <span
                    className={
                      submission.isVerified
                        ? styles.verifiedBadge
                        : styles.notVerifiedBadge
                    }
                  >
                    {submission.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </div>
                <p className={styles.cardText}>
                  <strong>Description:</strong> {submission.description}
                </p>
                <p className={styles.cardText}>
                  <strong>Group:</strong> {submission.groupMembers?.join(", ")}
                  
                </p>
                <p className={styles.cardText}>
                  <strong>Project Link:</strong>{" "}
                  <a href={submission.projectLink} target="_blank" rel="noreferrer">
                    <FaLink /> View Project
                  </a>
                </p>
                <div className={styles.filesSection}>
                  <a href={submission.srs} download target="_blank" rel="noreferrer">
                    <FaFilePdf /> Download SRS
                  </a>
                  <a href={submission.sds} download target="_blank" rel="noreferrer">
                    <FaFilePdf /> Download SDS
                  </a>
                  <a href={submission.video} target="_blank" rel="noreferrer">
                    <FaVideo /> Watch Video
                  </a>
                </div>
                <p className={styles.cardText}>
                  <strong>Adviser:</strong> {submission.adviser?.name || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Futtor />
    </div>
  );
};

export default ViewFypSubmissions;
