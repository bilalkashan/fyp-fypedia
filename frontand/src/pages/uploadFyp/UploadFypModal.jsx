import React, { useState } from "react";
import styles from "./UploadFypModal.module.css";
import { handleSuccess, handleError } from "../../toast";
import api from "../../api";

const UploadFypModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    groupMembers: "",
    description: "",
    projectLink: "",
    srs: null,
    sds: null,
    video: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error for this field when user types/selects new input
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  

  const handleSubmit = async () => {
  

    try {
      const user = JSON.parse(localStorage.getItem("loggedInUser"));
      console.log("Submitting FYP for user:", user);
      const data = new FormData();

      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("projectLink", formData.projectLink);
      data.append("groupMembers", JSON.stringify(formData.groupMembers.split(",").map(m => m.trim())));
      data.append("srs", formData.srs);
      data.append("sds", formData.sds);
      data.append("video", formData.video);
      data.append("studentId", user._id);

      await api.post("/fyp/submit-fyp", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      handleSuccess("FYP submitted successfully!");
      onClose();
    } catch (err) {
  if (err.response && err.response.data && err.response.data.message) {
    handleError(err.response.data.message);
  } }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Upload FYP Details</h2>

        {/* Title */}
        <input
          name="title"
          onChange={handleChange}
          placeholder="Project Title"
          value={formData.title}
          className={errors.title ? styles.errorInput : ""}
        />
        {errors.title && <p className={styles.errorMsg}>{errors.title}</p>}

        {/* Group Members */}
        <input
          name="groupMembers"
          onChange={handleChange}
          placeholder="Group Members (comma separated)"
          value={formData.groupMembers}
          className={errors.groupMembers ? styles.errorInput : ""}
        />
        {errors.groupMembers && <p className={styles.errorMsg}>{errors.groupMembers}</p>}

        {/* Description */}
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
          value={formData.description}
          className={errors.description ? styles.errorInput : ""}
        />
        {errors.description && <p className={styles.errorMsg}>{errors.description}</p>}

        {/* Project Link */}
        <input
          name="projectLink"
          onChange={handleChange}
          placeholder="Project Link"
          value={formData.projectLink}
          className={errors.projectLink ? styles.errorInput : ""}
        />
        {errors.projectLink && <p className={styles.errorMsg}>{errors.projectLink}</p>}

        {/* SRS File */}
        <label>
          SRS (PDF):
          <input
            type="file"
            name="srs"
            accept="application/pdf"
            onChange={handleChange}
            className={errors.srs ? styles.errorInput : ""}
          />
        </label>
        {errors.srs && <p className={styles.errorMsg}>{errors.srs}</p>}

        {/* SDS File */}
        <label>
          SDS (PDF):
          <input
            type="file"
            name="sds"
            accept="application/pdf"
            onChange={handleChange}
            className={errors.sds ? styles.errorInput : ""}
          />
        </label>
        {errors.sds && <p className={styles.errorMsg}>{errors.sds}</p>}

        {/* Video File */}
        <label>
          Short Video:
          <input
            type="file"
            name="video"
            accept="video/*"
            onChange={handleChange}
            className={errors.video ? styles.errorInput : ""}
          />
        </label>
        {errors.video && <p className={styles.errorMsg}>{errors.video}</p>}

        <div className={styles.actions}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default UploadFypModal;
