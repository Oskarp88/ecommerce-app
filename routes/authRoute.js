import express from 'express';
import {
    loginController,
    registerController,
    testController
} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middlewares/authMidlewares.js';

const router = express.Router();

//Register || method POST
router.post('/register', registerController );

//login // post
router.post('/login', loginController);

//test routes
router.get('/test', requireSignIn, isAdmin, testController);

//proteted route auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true});
})

export default router;