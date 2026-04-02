import { Request, Response, NextFunction } from 'express';
import { documentService } from '../services/documentService';
import { revisionService } from '../services/revisionService';


export const documentController = {

  async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body;
      const doc = await documentService.create(title);
      res.status(201).json({ success: true, data: doc });
    } catch (err) {
      next(err);
    }
  },

  async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const docs = await documentService.findAll();
      res.json({ success: true, data: docs });
    } catch (err) {
      next(err);
    }
  },

  async findOne(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const doc = await documentService.findById(req.params.id);
      res.json({ success: true, data: doc });
    } catch (err) {
      next(err);
    }
  },

  async updateTitle(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { title } = req.body;
      if (!title || typeof title !== 'string') {
        res.status(400).json({ success: false, error: 'Title is required' });
        return;
      }
      const doc = await documentService.updateTitle(req.params.id, title);
      res.json({ success: true, data: doc });
    } catch (err) {
      next(err);
    }
  },

  async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      await documentService.delete(req.params.id);
      await revisionService.deleteByDocumentId(req.params.id);
      res.json({ success: true, message: 'Document deleted' });
    } catch (err) {
      next(err);
    }
  },
};