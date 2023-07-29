import express from 'express';
import { create, list, update, productById, readPhoto, read, remove, removes } from '../controllers/Products';
const router = express.Router();

router.post('/products', create);

router.get('/get-products', list);
router.get('/products/:productId', read);
// router.get('/product/photo/:productId', readPhoto);

router.put('/products/:productId', update);

router.delete('/product/:productId', remove);
router.post('/remove-products', removes);

router.param('productId', productById);


module.exports = router;