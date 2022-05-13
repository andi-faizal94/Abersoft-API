import * as express from 'express';
import * as ProjectController from '../../controllers/project.controller';

const router = express.Router();

router.get('/project', ProjectController.index);
router.get('/project/:id', ProjectController.index);
router.post('/project', ProjectController.store);

export default router;
