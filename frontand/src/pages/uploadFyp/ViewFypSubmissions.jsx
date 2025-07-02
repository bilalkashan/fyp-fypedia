import React, { useEffect, useState } from "react";
import UploadFypModal from "./UploadFypModal";
import styles from "../fypList/fyplist.module.css";
import Taskbar from "../taskbar/taskbar";
import Futtor from "../futtor/futtor";
import { FaFilePdf, FaVideo, FaLink, FaTrash } from "react-icons/fa";
import api from "../../api";
import ConfirmationModal from "../../admin/adviser/ConfirmationModal";

const ViewFypSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // For confirmation modal

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!user || !user._id) {
          console.error("User not found in localStorage");
          return;
        }

        const res = await api.get(`/fyp/get-student-fyp/${user._id}`);
        if (res.data.success) {
          setSubmissions(res.data.data || []);
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

  const confirmDelete = async () => {
    try {
      await api.delete(`/fyp/delete/${deleteTarget._id}`);
      setSubmissions((prev) => prev.filter((s) => s._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete submission:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteTarget(null);
  };

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
          submissions.map((submission) => (
            <div key={submission._id} className={styles.detailsCard}>
              <h2 className={styles.detailTitle}>{submission.title}</h2>

              <div className={styles.detailSection}>
                <p><strong>Description:</strong> {submission.description}</p>
                <p><strong>Group Members:</strong> {submission.groupMembers?.join(", ")}</p>
                <p><strong>Adviser:</strong> {submission.adviser?.name || "N/A"}</p>
                <p>
                  <strong>Project Link:</strong>{" "}
                  <a
                    href={submission.projectLink}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.iconLink}
                  >
                    <FaLink className={styles.icon} /> View Project
                  </a>
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      submission.isVerified
                        ? styles.verifiedBadge
                        : styles.notVerifiedBadge
                    }
                  >
                    {submission.isVerified ? "Verified" : "Not Verified"}
                  </span>
                </p>
              </div>

              <div className={styles.filesGrid}>
                <a
                  href={submission.srs}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className={styles.fileCard}
                >
                  <FaFilePdf className={styles.fileIcon} />
                  <span>SRS</span>
                </a>
                <a
                  href={submission.sds}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className={styles.fileCard}
                >
                  <FaFilePdf className={styles.fileIcon} />
                  <span>SDS</span>
                </a>
                <a
                  href={submission.video}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.fileCard}
                >
                  <FaVideo className={styles.fileIcon} />
                  <span>Video</span>
                </a>
              </div>

              <div className={styles.actionRow}>
                <button
                  className={styles.deleteButton}
                  onClick={() => setDeleteTarget(submission)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}

        {deleteTarget && (
          <ConfirmationModal
            type="confirm"
            message={`Are you sure you want to delete "${deleteTarget.title}"?`}
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
      <Futtor />
    </div>
  );
};

export default ViewFypSubmissions;
