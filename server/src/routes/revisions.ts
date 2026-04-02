import { Router } from 'express';
import { revisionController } from '../controllers/revisionController';

const router = Router();

router.get('/', revisionController.findAll);

router.post('/:revisionId/restore', revisionController.restore);

export default router;