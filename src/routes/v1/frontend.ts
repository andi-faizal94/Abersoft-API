import * as express from 'express';
import * as FileController from '../../controllers/file.controller';

const router = express.Router();

router.post('/auth/login', FileController.store);

export default router;
