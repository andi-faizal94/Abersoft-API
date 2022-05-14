import * as express from 'express';
import * as AdminController from '../../controllers/admin.controller';

const router = express.Router();

router.post('/admin/auth/login', AdminController.store);
router.get('/admin/auth/login', AdminController.store);
// router.delete('/file/upload/:id', FileController.destroy);

export default router;
