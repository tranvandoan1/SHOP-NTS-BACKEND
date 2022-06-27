import express from 'express';
import { create, list, update, categoryById, read, remove } from '../controllers/Categoris';
import { isAdmin, isAuth, requireSignin } from './../controllers/Auth';
const router = express.Router();


router.post('/categoris', create);
router.get('/categoris', list);
router.get('/categoris/:categoryId', read);

router.put('/categoris/:categoryId', update);

router.delete('/categoris/:categoryId', remove);

router.param('categoryId', categoryById);

module.exports = router;