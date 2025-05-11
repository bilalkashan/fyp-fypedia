const { setDefaultAutoSelectFamilyAttemptTimeout } = require("net");
const { asyncWrapper } = require("../Middleware/AuthValidation");
const ResourceFile = require("../Models/resourceFile");
const path = require("path");


const getResourceFile = async (req, res) => {
    try {
        const resourceFiles = await ResourceFile.find();
        res.status(200).json({ resourceFiles });
    }
    catch (error) {
        console.log(error);
    };
};

const addResourceFile = asyncWrapper(async (req, res) => {
    const { fileName } = req.body;
    const file = req.file.path;
    const resourceFile = await ResourceFile.create({ fileName, file });
    res.status(201).json({ resourceFile });
});

const downloadFile = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const fileItem = await ResourceFile.findById(id);
    if (!fileItem) {
        return next(new Error("File not found"));
    }
    const file = fileItem.file;
    const filePath = path.json(__dirname, `../${file}`);
    res.download(filePath);
});


const deleteResourceFile = async (req, res) => {
    try {
        const { id } = req.params;
        const resourceFile = await ResourceFile.findByIdAndDelete(id);
        if (!resourceFile) {
            return res.status(404).json({ error: 'File not found', success: false });
        }

        res.status(200).json({ message: 'File deleted successfully!', success: true });
    } catch (error) {
        console.error('Error deleting File:', error);
        res.status(500).json({ error: 'Failed to delete file', success: false });
    }
};


const updateResourceFile = async (req, res) => {
    try {
        const { id } = req.params;
        const { fileName } = req.body;
        const file = req.file?.path;

        if (!fileName || !file) {
            return res.status(400).json({ message: 'All fields are required!', success: false });
        }

        const resourceFile = await ResourceFile.findById(id);
        if (!resourceFile) {
            return res.status(404).json({ error: 'File not found', success: false });
        }

        resourceFile.fileName = fileName;
        resourceFile.file = file;

        await resourceFile.save();

        res.status(200).json({ message: 'File updated successfully!', resourceFile, success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update file', success: false });
    }
};

module.exports = {
    getResourceFile,
    addResourceFile,
    downloadFile,
    deleteResourceFile,
    updateResourceFile,
};

