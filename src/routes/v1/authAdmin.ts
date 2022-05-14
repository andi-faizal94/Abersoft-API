import * as express from 'express';
import * as FileController from '../../controllers/file.controller';

const router = express.Router();

router.post('/file/upload', FileController.store);
router.post('/file/upload/:id', FileController.destroy);

export default router;
