const express = require('express');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup, login,verify, forgetPassword, resetPassword, getAdminPendingUsers, acceptUser, deleteUserRequest } = require('../Controllers/AuthController');
const { addAdviser, updateSlots, getAllAdvisers, deleteAdviser, sendAdviserRequest, getAdviserRequestsForTeacher, getStudentRequests, updateRequestStatus, updateRequestFeedback } = require('../Controllers/AdviserController')
const {addAnnouncements,fetchAnnouncements, updateAnnouncement, deleteAnnouncement} = require('../Controllers/NoticeBoard');
const { addResults, fetchresults, deleteresult, getGroupInfo, addGroup } = require('../Controllers/ResultController');
const { addProjectIdea, fetchProjectIdea, deleteProjectIdea } = require('../Controllers/OpenIdeaController');
const { fetchResourceFiles, deleteResourceFile, updateResourceFile, addResourceFile, downloadResourceFile } = require('../Controllers/ResourceFileController');
const upload = require('../Middleware/multer');
const { getAllFypSubmissions, getStudentFyp, getFilteredFyps } = require('../Controllers/UploadFypController');
const fypRoutes  = require('./fyproutes/fypRoutes.js');

const router = express.Router();

router.post("/login",loginValidation,login);
router.post("/signup",signupValidation,signup);

router.post("/verify",verify);
router.post("/forget",forgetPassword);
router.post("/resetPassword",resetPassword);
router.post("/getAdminPendingUsers",getAdminPendingUsers);
router.post("/acceptUser",acceptUser);
router.post("/deleteUserRequest",deleteUserRequest);

router.post("/addAdviser", addAdviser); 
router.put("/update-slot/:adviserId/:slotIndex", updateSlots); 
router.get("/getAllAdvisers", getAllAdvisers); 
router.delete("/deleteAdviser", deleteAdviser); 
router.post("/sendAdviserRequest", sendAdviserRequest);
router.get('/getAdviserRequestsForTeacher/:adviseremail', getAdviserRequestsForTeacher);
router.get("/getStudentRequests/:email", getStudentRequests);
router.put("/updateRequestStatus/:id", updateRequestStatus);
router.put("/updateRequestFeedback/:id", updateRequestFeedback);

router.post('/addAnouncements', addAnnouncements);
router.get('/fetchAnnouncements', fetchAnnouncements);
router.put('/updateAnnouncement/:id', updateAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

router.post('/addResults', addResults);
router.get('/fetchresults', fetchresults);
router.delete('/deleteresult', deleteresult); 
router.get('/get-group-info/:groupName', getGroupInfo);
router.post('/add-group',addGroup)


router.post('/addProjectIdea', addProjectIdea);
router.get('/fetchProjectIdea', fetchProjectIdea);
router.delete('/deleteProjectIdea', deleteProjectIdea); 


router.get("/fetchResourceFiles", fetchResourceFiles);
router.post("/addResourceFile", upload.single("file"), addResourceFile);
router.get("/downloadResourceFile/:id", downloadResourceFile);
router.put("/updateResourceFile/:id", upload.single("file"), updateResourceFile);
router.delete("/deleteResourceFile/:id", deleteResourceFile);

router.use('/fyp', fypRoutes);


router.get('/fyp/get-student-fyp/:studentIdOrReg', getStudentFyp);
router.get('/fyp/get-all' , getAllFypSubmissions)
router.get('/fyp/filter', getFilteredFyps);

module.exports=router;