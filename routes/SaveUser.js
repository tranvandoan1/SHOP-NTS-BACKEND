import express from 'express';
import { create, list, update, userById, read, deletee } from '../controllers/SaveUser';
const router = express.Router();

router.post('/saveuser', create);
router.get('/saveuser', list);
router.get('/saveuser/:id', read);

router.put('/saveuser/:id', update);

router.delete('/saveuser/:id', deletee);

router.param('id', userById);

module.exports = router;