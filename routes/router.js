const adminController = require("../controller/api/adminController")
const userController = require("../controller/api/userController")
const express = require("express");
const router = express.Router();

//ADD ADMIN
router.get('/admin',adminController.getallAdmin);
router.post('/admin',adminController.addAdmin);
router.get('/admin/:id',adminController.findAdmin);
router.delete('/admin/:id',adminController.deleteAdmin);
router.put('/admin/:id',adminController.updateAdmin);

//USer Add BY Admin
router.get('/user',userController.getAllData);
router.post('/user',userController.CreateCandidiate);
router.put('/user/:id',userController.updateUser);
router.get('/user/:id',userController.findUser);
router.delete('/user/:id',userController.deleteUser);
module.exports = router
