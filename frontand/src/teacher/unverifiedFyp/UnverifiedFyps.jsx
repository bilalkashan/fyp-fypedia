import React, { useEffect, useState } from "react";
import styles from "../../pages/fypList/fyplist.module.css";
import { FaFilePdf, FaVideo, FaLink } from "react-icons/fa";
import api from "../../api";
import Sidebar from "../../admin/sidebar/sidebar";

const UnverifiedFyps = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFyps = async () => {
      try {
        const res = await api.get("/fyp/unverified-for-adviser");
        if (res.data.success) {
          setSubmissions(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching unverified FYPs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFyps();
  }, []);

  const handleVerify = async (id) => {
    if (!window.confirm("Are you sure you want to verify this FYP?")) return;

    try {
      await api.put(`/fyp/verify/${id}`);
      setSubmissions(prev => prev.filter(sub => sub._id !== id));
      setSelectedSubmission(null);
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Sidebar />
      <div className={styles.container}>
        {!selectedSubmission ? (
          <>
            <h2>Unverified FYP Submissions</h2>
            {submissions.length === 0 ? (
              <p>No unverified FYPs assigned to you.</p>
            ) : (
              <table className={styles.fypTable}>
                <thead>
                  <tr>
                    <th>Project Title</th>
                    <th>Group Members</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.map((sub) => (
                    <tr key={sub._id}>
                      <td>{sub.title}</td>
                      <td>{sub.groupMembers?.join(", ")}</td>
                      <td>
                        <button className={styles.detailButton} onClick={() => setSelectedSubmission(sub)}>
                          View Project
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <div className={styles.detailsCard}>
            <h2 className={styles.detailTitle}>{selectedSubmission.title}</h2>

            <div className={styles.detailSection}>
              <p><strong>Description:</strong> {selectedSubmission.description}</p>
              <p><strong>Group Members:</strong> {selectedSubmission.groupMembers?.join(", ")}</p>
              <p>
                <strong>Project Link:</strong>{" "}
                <a href={selectedSubmission.projectLink} target="_blank" rel="noreferrer" className={styles.iconLink}>
                  <FaLink className={styles.icon} /> View Project
                </a>
              </p>
            </div>

            <div className={styles.filesGrid}>
              <a href={selectedSubmission.srs} download target="_blank" rel="noreferrer" className={styles.fileCard}>
                <FaFilePdf className={styles.fileIcon} />
                <span>SRS</span>
              </a>
              <a href={selectedSubmission.sds} download target="_blank" rel="noreferrer" className={styles.fileCard}>
                <FaFilePdf className={styles.fileIcon} />
                <span>SDS</span>
              </a>
              <a href={selectedSubmission.video} target="_blank" rel="noreferrer" className={styles.fileCard}>
                <FaVideo className={styles.fileIcon} />
                <span>Video</span>
              </a>
            </div>

          <div className={styles.actionButtonsRow}>
          <button className={styles.backButton} onClick={() => setSelectedSubmission(null)}>
            ← Back to List
          </button>
          <button className={styles.verifyButton} onClick={() => handleVerify(selectedSubmission._id)}>
             Verify
          </button>
        </div>

          </div>
        )}
      </div>
    </div>
  );
};

export default UnverifiedFyps;
