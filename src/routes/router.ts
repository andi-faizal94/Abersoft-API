import * as express from 'express';
import Project from './v1/project';
const router = express.Router();

router.use('/v1', Project);

export default router;
