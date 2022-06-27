import express from 'express';
import { create, list, update, Id, read, remove } from '../controllers/ShopOwner';
const router = express.Router();

router.post('/shopowner', create);
router.get('/shopowner', list);
router.get('/shopowner/:Id', read);

router.put('/shopowner/:Id', update);

router.delete('/shopowner/:Id', remove);

router.param('Id', Id);

module.exports = router;