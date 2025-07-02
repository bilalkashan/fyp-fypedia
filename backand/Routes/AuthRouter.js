const express = require('express');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup, login, verify, forgetPassword, resetPassword, getAdminPendingUsers, acceptUser, deleteUserRequest } = require('../Controllers/AuthController');
const { addAdviser, updateSlots, getAllAdvisers, deleteAdviser, sendAdviserRequest, getAdviserRequestsForTeacher, getStudentRequests, updateRequestStatus, updateRequestFeedback } = require('../Controllers/AdviserController');
const { addAnnouncements, fetchAnnouncements, updateAnnouncement, deleteAnnouncement } = require('../Controllers/NoticeBoard');
const { addResults, fetchresults, deleteresult, getGroupInfo, addGroup, addGroupsBulk } = require('../Controllers/ResultController');
const { addProjectIdea, fetchProjectIdea, deleteProjectIdea } = require('../Controllers/OpenIdeaController');
const { fetchResourceFiles, deleteResourceFile, updateResourceFile, addResourceFile, downloadResourceFile } = require('../Controllers/ResourceFileController');
const upload = require('../Middleware/multer');
const { getAllFypSubmissions, getStudentFyp, getFilteredFyps, deleteFyp, getUnverifiedFyps, verifyFyp } = require('../Controllers/UploadFypController');
const fypRoutes = require('./fyproutes/fypRoutes.js');
const verifyToken = require('../Middleware/verifyToken.js');

const router = express.Router();

// 🔓 Public Routes
router.post("/login", loginValidation, login);
router.post("/signup", signupValidation, signup);
router.post("/verify", verify);
router.post("/forget", forgetPassword);
router.post("/resetPassword", resetPassword);

// 🔐 Auth-protected Routes
router.post("/getAdminPendingUsers",  getAdminPendingUsers);
router.post("/acceptUser", verifyToken, acceptUser);
router.post("/deleteUserRequest", verifyToken, deleteUserRequest);

// Adviser Routes
router.post("/addAdviser", verifyToken, addAdviser); 
router.put("/update-slot/:adviserId/:slotIndex", verifyToken, updateSlots); 
router.get("/getAllAdvisers", verifyToken, getAllAdvisers); 
router.delete("/deleteAdviser", verifyToken, deleteAdviser); 
router.post("/sendAdviserRequest", verifyToken, sendAdviserRequest);
router.get('/getAdviserRequestsForTeacher/:adviseremail', verifyToken, getAdviserRequestsForTeacher);
router.get("/getStudentRequests/:email", verifyToken, getStudentRequests);
router.put("/updateRequestStatus/:id", verifyToken, updateRequestStatus);
router.put("/updateRequestFeedback/:id", verifyToken, updateRequestFeedback);

// Notice Board Routes
router.post('/addAnouncements', verifyToken, addAnnouncements);
router.get('/fetchAnnouncements', fetchAnnouncements);
router.put('/updateAnnouncement/:id', verifyToken, updateAnnouncement);
router.delete('/deleteAnnouncement/:id', verifyToken, deleteAnnouncement);

// Result Routes
router.post('/addResults', verifyToken, addResults);
router.get('/fetchresults', verifyToken, fetchresults);
router.delete('/deleteresult', verifyToken, deleteresult); 
router.get('/get-group-info/:groupName', verifyToken, getGroupInfo);
router.post('/add-group', verifyToken, addGroup);
router.post('/addGroupsBulk',  addGroupsBulk)

// Open Project Idea Routes
router.post('/addProjectIdea', verifyToken, addProjectIdea);
router.get('/fetchProjectIdea', verifyToken, fetchProjectIdea);
router.delete('/deleteProjectIdea', verifyToken, deleteProjectIdea); 

// Resource Files
router.get("/fetchResourceFiles", verifyToken, fetchResourceFiles);
router.post("/addResourceFile", verifyToken, upload.single("file"), addResourceFile);
router.get("/downloadResourceFile/:id", verifyToken, downloadResourceFile);
router.put("/updateResourceFile/:id", verifyToken, upload.single("file"), updateResourceFile);
router.delete("/deleteResourceFile/:id", verifyToken, deleteResourceFile);

// FYP Routes
router.use('/fyp', verifyToken, fypRoutes); // protect all nested /fyp routes

router.get('/fyp/get-student-fyp/:studentIdOrReg', verifyToken, getStudentFyp);
router.get('/fyp/get-all', verifyToken, getAllFypSubmissions);
router.get('/fyp/filter', verifyToken, getFilteredFyps);
router.delete('/fyp/delete/:id', verifyToken, deleteFyp);
router.get("/fyp/unverified-for-adviser",verifyToken,getUnverifiedFyps);    
router.put("/fyp/verify/:id", verifyToken, verifyFyp);

module.exports = router;
