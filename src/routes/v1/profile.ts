import * as express from 'express';
import * as ProfileController from '../../controllers/profile.controller';

const router = express.Router();

router.get('/profile', ProfileController.index);
router.post('/profile', ProfileController.store);

export default router;
