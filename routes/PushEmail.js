import express from 'express';
import { pushEmail, uploadEmail } from './../controllers/PushEmail';

const router = express.Router();


router.post('/push-email', pushEmail);

module.exports = router;