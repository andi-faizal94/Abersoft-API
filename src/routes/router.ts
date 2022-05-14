import * as express from 'express';
import Project from './v1/project';
import Customer from './v1/customer';
import Profile from './v1/profile';
import File from './v1/file';
const router = express.Router();

router.use('/v1', Project);
router.use('/v1', Customer);
router.use('/v1', Profile);
router.use('/v1', File);

export default router;
