import * as express from 'express';
import * as FileController from '../../controllers/file.controller';
import upload from '../../utils/multer';

const router = express.Router();

router.get('/file/upload', FileController.index);
router.post('/file/upload', upload, FileController.store);
router.delete('/file/upload/:id', FileController.destroy);

export default router;
