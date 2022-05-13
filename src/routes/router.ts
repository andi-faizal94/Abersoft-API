import * as express from 'express';
import Project from './v1/project';
const router = express.Router();

router.use('/v1', Project);
// router.use('/v1', Customer);

export default router;
