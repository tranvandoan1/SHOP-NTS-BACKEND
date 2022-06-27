import express from 'express';
const router = express.Router();

import { userById, list, remove, read, update, listUser } from '../controllers/Users';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});
router.get('/users/:userId', requireSignin, isAuth, isAdmin, listUser)
router.get('/user/:userId', read);
router.put('/user/:userId', update);
router.get('/user', list);
router.delete('/user/:userId', remove);

router.param('userId', userById);

module.exports = router;