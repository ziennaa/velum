import { Router } from 'express';
import { documentController } from '../controllers/documentController';

const router = Router();

router.get('/', documentController.findAll);

router.post('/', documentController.create);

router.get('/:id', documentController.findOne);

router.patch('/:id/title', documentController.updateTitle);

router.delete('/:id', documentController.delete);

export default router;