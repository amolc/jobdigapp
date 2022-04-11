const adminController = require("../controller/api/adminController");
const userController = require("../controller/api/userController");
const employeeController = require("../controller/api/employeeController");
const postJob = require("../controller/api/postJob");
const express = require("express");
const router = express.Router();

// db Links
// http://159.223.77.38/phpMyAdmin/

//ADD ADMIN
router.get("/admin", adminController.getallAdmin);
router.post("/admin/add-admin", adminController.addAdmin);
router.get("/admin/:id", adminController.findAdmin);
router.delete("/admin/:id", adminController.deleteAdmin);
router.put("/admin/:id", adminController.updateAdmin);

//candidate
router.get("/user", userController.getAllData);
router.post("/user", userController.CreateCandidiate);
router.put("/user/:id", userController.updateUser);
router.get("/user/:id", userController.findUser);
router.get("/signInCandidate/:email/:password", userController.signInCandidate);
router.delete("/user/:id", userController.deleteUser);
router.post("/applyToJob", userController.applyToJob);
//PostJob
router.get("/postjob", postJob.getallPostJob);
router.post("/addJob", postJob.postJob);
router.get("/getAllJobs",postJob.getAllJobs)
router.put("/updateJob",postJob.updateJob)
router.delete("/deleteJob",postJob.deleteJob)

// Employee
router.post("/employee/signup", employeeController.employeeSignUp);
router.post("/employee/login", employeeController.employeeLogin);
router.post("/selectedJob", employeeController.selectedJob);
router.post("/markAsCompleted", employeeController.markAsCompleted);

module.exports = router;
