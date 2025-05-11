import React, { useState } from "react";
import axios from "axios";
import styles from "./addResult.module.css";
import { handleError, handleSuccess } from "../toast";

const AddResult = ({ onClose, onResultAdded }) => {
    const [formData, setFormData] = useState({
        groupName: "",
        registration1: "",
        registration2: "",
        projectTitle: "",
        advisorName: "",
        remarks: "",
        status: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        const groupRegex = /^p\d-\d{2}$/i;
        const regRegex = /^(18|19|20|21)\d{5}$/;
        const statusLower = formData.status.toLowerCase();

        if (
            !formData.groupName ||
            !formData.registration1 ||
            !formData.registration2 ||
            !formData.projectTitle ||
            !formData.advisorName ||
            !formData.remarks ||
            !formData.status
        ) {
            return "All fields are required.";
        }

        if (!groupRegex.test(formData.groupName)) {
            return "Group name must be in format like 'p4-02'.";
        }

        if (!regRegex.test(formData.registration1) || !regRegex.test(formData.registration2)) {
            return "Registration numbers must start with 18, 19, 20, or 21.";
        }

        if (statusLower !== "passed" && statusLower !== "fail") {
            return "Status must be either 'Passed' or 'Fail'.";
        }

        return null;
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            handleError(validationError);
            return;
        }

        const registrationNumbers = [formData.registration1, formData.registration2];

        try {
            const response = await axios.post("http://localhost:8080/auth/addResults", {
                groupName: formData.groupName,
                registrationNumbers,
                projectTitle: formData.projectTitle,
                advisorName: formData.advisorName,
                remarks: formData.remarks,
                status: formData.status,
            });

            const { success, message, result } = response.data;

            if (success) {
                handleSuccess(message);
                if (onResultAdded) {
                    onResultAdded(result); 
                }
                onClose(); 
            } else {
                handleError(message || "Something went wrong.");
            }
        } catch (error) {
            console.error("Error adding result:", error);

            if (error.response?.data?.message) {
                handleError(error.response.data.message);
            } else {
                handleError("Failed to add result. Please try again.");
            }
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>Add New Result</h2>
                <input
                    type="text"
                    name="groupName"
                    placeholder="Group Name"
                    value={formData.groupName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="registration1"
                    placeholder="Reg No 1"
                    value={formData.registration1}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="registration2"
                    placeholder="Reg No 2"
                    value={formData.registration2}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="projectTitle"
                    placeholder="Project Title"
                    value={formData.projectTitle}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="advisorName"
                    placeholder="Advisor Name"
                    value={formData.advisorName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="remarks"
                    placeholder="Panel Remarks"
                    value={formData.remarks}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="status"
                    placeholder="Status"
                    value={formData.status}
                    onChange={handleInputChange}
                />
                <div className={styles.buttonGroup}>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

export default AddResult;
