import { v4 as uuidv4 } from 'uuid';
import { DocumentModel, IDocument } from '../models/Document';
import { createError } from '../middleware/errorHandler';



export const documentService = {
  async create(title?: string): Promise<IDocument> {
    const doc = await DocumentModel.create({
      _id: uuidv4(),        
      title: title || 'Untitled Document',
      yjsState: null,
      collaboratorCount: 0,
    });
    return doc;
  },

  async findAll(): Promise<IDocument[]> {
    return DocumentModel.find({})
      .select('-yjsState') 
      .sort({ updatedAt: -1 })
      .limit(50)
      .lean();          
  },


  async findById(id: string): Promise<IDocument> {
    const doc = await DocumentModel.findById(id).lean();
    if (!doc) {
      throw createError(`Document not found: ${id}`, 404);
    }
    return doc;
  },


  async updateTitle(id: string, title: string): Promise<IDocument> {
    const doc = await DocumentModel.findByIdAndUpdate(
      id,
      { title: title.trim() || 'Untitled Document' },
      { new: true, lean: true } 
    );
    if (!doc) throw createError(`Document not found: ${id}`, 404);
    return doc;
  },

  async delete(id: string): Promise<void> {
    const result = await DocumentModel.findByIdAndDelete(id);
    if (!result) throw createError(`Document not found: ${id}`, 404);
  },

  async saveYjsState(id: string, state: Uint8Array): Promise<void> {
    await DocumentModel.findByIdAndUpdate(id, {
      yjsState: Buffer.from(state),
      updatedAt: new Date(),
    });
  },

  async loadYjsState(id: string): Promise<Uint8Array | null> {
    const doc = await DocumentModel.findById(id).select('yjsState');
    if (!doc || !doc.yjsState) return null;
    return new Uint8Array(doc.yjsState);
  },
};