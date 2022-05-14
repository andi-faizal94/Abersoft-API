import * as express from 'express';
import * as adminCustomerController from '../../controllers/admin-customer.controller';

const router = express.Router();

router.post('/admin/customer', adminCustomerController.store);
router.get('/admin/customer', adminCustomerController.index);

export default router;
