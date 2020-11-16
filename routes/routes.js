const express = require('express');
const multer = require('multer');
const storage = require('../middlewares/storage-disk');

const requireAuth  = require("../middlewares/requireAuth");

const router = express.Router();

const authController = require('./controllers/authController');
const userController = require('./controllers/userController');
const docController = require('./controllers/docController');

/**
 * Middleware
 * 
 * Applies on `/doc` and `/user` routes 
 */
router.use(['/doc', '/user'], requireAuth);

/**
 * USER AUTH ROUTER
 */
router.post("/auth/sign-in", authController.userSignIn);
router.post("/auth/sign-up", authController.userSignUp);

router.post("/auth/sign-in-socialMedia", authController.userSignInSocialMedia);

/**
 * DOCUMENT ROUTER
 * 
 */
router.get('/doc/doc-list', docController.getDocList)
router.post('/doc/upload', storage.getFileInStorage('avatar'), docController.saveNewDocument)

/**
 * Test Routes
 * USER MANAGER ROUTES
 */
router.get("/user/user-list", userController.getUserList)
router.get("/user/:phoneNum", userController.getUserByPhone)


module.exports = router;