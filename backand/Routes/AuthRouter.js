const express = require('express');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');
const { signup, login,verify, forgetPassword, resetPassword, getAdminPendingUsers, acceptUser, deleteUserRequest } = require('../Controllers/AuthController');
const { addAdviser, updateSlots, getAllAdvisers, deleteAdviser } = require('../Controllers/AdviserController');
const {addAnnouncements,fetchAnnouncements, updateAnnouncement, deleteAnnouncement} = require('../Controllers/NoticeBoard');
const { addResults, fetchresults, deleteresult } = require('../Controllers/ResultController');
const { getResourceFile, deleteResourceFile, updateResourceFile,addResourceFile, downloadFile } = require('../Controllers/ResourceFileController');
const upload = require('../Middleware/multer');
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

router.post('/addAnouncements', addAnnouncements);
router.get('/fetchAnnouncements', fetchAnnouncements);
router.put('/updateAnnouncement/:id', updateAnnouncement);
router.delete('/deleteAnnouncement/:id', deleteAnnouncement);

router.post('/addResults', addResults);
router.get('/fetchresults', fetchresults);
router.delete('/deleteresult', deleteresult); 


router.get("/getResourceFile", getResourceFile);
router.post("/addResourceFile", upload.single("file"), addResourceFile);
router.get("/downloadFile/:id", downloadFile);
router.put('/updateResourceFile/:id', upload.single("file"), updateResourceFile);
router.delete('/deleteResourceFile/:id', deleteResourceFile);


module.exports=router;