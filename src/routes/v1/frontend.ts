import * as express from 'express';
import * as FrontendController from '../../controllers/frontend.controller';

const router = express.Router();

router.post('/auth/login', FrontendController.store);
router.post('/auth/change-password', FrontendController.stores);

export default router;
