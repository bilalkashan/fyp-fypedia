const Result = require("../Models/result");

const addResults = async (req, res) => {
    try {
        const { groupName, registrationNumbers, projectTitle, advisorName, remarks, status } = req.body;

        if (!groupName || !registrationNumbers || registrationNumbers.length !== 2 || !projectTitle || !advisorName || !remarks || !status) {
            return res.status(400).json({ message: 'All fields are required including exactly 2 registration numbers!', success: false });
        }

        const existing = await Result.findOne({
            registrationNumbers: { $in: registrationNumbers }
        });

        if (existing) {
            return res.status(400).json({ message: 'One or both registration numbers already have results added!', success: false });
        }

        const result = new Result({ groupName, registrationNumbers, projectTitle, advisorName, remarks, status });
        await result.save();

        res.status(200).json({ message: 'Result added successfully!', result, success: true });
    } catch (error) {
        console.error("Error in addResults:", error);
        res.status(500).json({ error: 'Failed to add result', success: false });
    }
};

const fetchresults = async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.status(200).json({ results, success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch results', success: false });
    }
};

const updateresult = async (req, res) => {
    try {
        const { id } = req.params;
        const { groupName, registrationNumbers, projectTitle, advisorName, remarks, status } = req.body;

        if (!groupName || !registrationNumbers || registrationNumbers.length !== 2 || !projectTitle || !advisorName || !remarks || !status) {
            return res.status(400).json({ message: 'All fields are required including exactly 2 registration numbers!', success: false });
        }

        const result = await Result.findById(id);
        if (!result) {
            return res.status(404).json({ error: 'Result not found', success: false });
        }

        result.groupName = groupName;
        result.registrationNumbers = registrationNumbers;
        result.projectTitle = projectTitle;
        result.advisorName = advisorName;
        result.remarks = remarks;
        result.status = status;

        await result.save();

        res.status(200).json({ message: 'Result updated successfully!', result, success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update result', success: false });
    }
};

const deleteresult = async (req, res) => {
    try {
        const { id } = req.query;
        console.log("Deleting result with ID:", id);  // Log the ID received

        const result = await Result.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ error: 'Result not found', success: false });
        }

        res.status(200).json({ message: 'Result deleted successfully!', success: true });
    } catch (error) {
        console.error('Error deleting result:', error);
        res.status(500).json({ error: 'Failed to delete result', success: false });
    }
};

module.exports = {
    addResults,
    fetchresults,
    updateresult,
    deleteresult,
};