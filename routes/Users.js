import express from 'express';
const router = express.Router();

import { userById, list, remove, read, update, listUser, uploadEmail, uploadPassword } from '../controllers/Users';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";
import { isAuthenticateUser } from '../middlewares/CheckAuth';

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});
// router.get('/get-user/:userId', isAuthenticateUser, listUser)
router.get('/user/:userId', read);
router.post('/upload-user', update);
router.post('/user/upload/password', uploadPassword);
router.get('/get-user/:userId', list);
router.delete('/user/:userId', remove);
router.post('/email/upload/email', uploadEmail);

router.param('userId', userById);

module.exports = router;