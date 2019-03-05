/**
 * Initializations
 */
const express = require('express');
const router = express.Router();

const Auth = require('../middleware/authentication');
const userController = require('../controllers/users.controller');

/**
 * POST - user /signup route - (Unprotected route)
 */
router.post('/signup', userController.user_signUp);
 
/**
 * POST - Signin user route - (Unprotected route)
 */
router.post('/login', userController.user_login);

/**
 * DELETE - Delete user route - (Protected route)
 */
router.delete('/:userId', Auth, userController.user_deleteUser);

/**
 * GET - Get all users - (Protected route)
 */
router.get('/all', Auth, userController.user_getAll);

module.exports = router;