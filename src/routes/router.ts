import * as express from 'express';
import Project from './v1/project';
import Customer from './v1/customer';
import Profile from './v1/profile';
import File from './v1/file';
import Admin from './v1/admin';
import Frontend from './v1/frontend';
import AdminCustomer from './v1/adminCustomer';
const router = express.Router();

router.use('/v1', Project);
router.use('/v1', Customer);
router.use('/v1', Profile);
router.use('/v1', File);
router.use('/v1', Admin);
router.use('/v1', Frontend);
router.use('/v1', AdminCustomer);

export default router;
