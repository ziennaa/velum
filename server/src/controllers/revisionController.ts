import { Request, Response, NextFunction } from 'express';
import { revisionService } from '../services/revisionService';

export const revisionController = {
  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const revisions = await revisionService.findByDocumentId(req.params.id);
      res.json({ success: true, data: revisions });
    } catch (err) {
      next(err);
    }
  },

  async restore(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await revisionService.restore(req.params.revisionId);
      res.json({
        success: true,
        message: 'Revision restored. Reload the document to see changes.',
        data: result,
      });
    } catch (err) {
      next(err);
    }
  },
};