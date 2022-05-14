import * as express from 'express';
import * as CustomerController from '../../controllers/customer.controller';

const router = express.Router();

router.get('/customer', CustomerController.index);
router.post('/customer', CustomerController.store);

export default router;
