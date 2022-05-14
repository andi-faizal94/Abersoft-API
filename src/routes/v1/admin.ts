import * as express from 'express';
import * as FileController from '../../controllers/file.controller';

const router = express.Router();

router.post('/admin/auth/login', FileController.store);
// router.delete('/file/upload/:id', FileController.destroy);

export default router;
