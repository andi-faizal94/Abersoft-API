import * as express from 'express';
import * as adminCustomerController from '../../controllers/admin-customer.controller';

const router = express.Router();

router.post('/admin/customer', adminCustomerController.index);
router.get('/admin/customer', adminCustomerController.store);

export default router;
