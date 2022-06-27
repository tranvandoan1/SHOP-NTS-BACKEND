import express from 'express';
import { create, list, update, Id, readPhoto, read, remove } from '../controllers/classification';
const router = express.Router();

router.post('/classifies', create);

router.get('/classifies', list);
router.get('/classifies/:id', read);
// router.get('/product/photo/:productId', readPhoto);

router.put('/classifies/:id', update);

router.delete('/classifies/:id', remove);

router.param('id', Id);


module.exports = router;