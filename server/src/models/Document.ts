import mongoose, { Schema } from 'mongoose';

export interface IDocument {
  _id: string;
  title: string;
  yjsState: Buffer | null;
  collaboratorCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const DocumentSchema = new Schema<IDocument>(
  {
    _id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      default: 'Untitled Document',
      trim: true,
      maxlength: 200,
    },
    yjsState: {
      type: Buffer,
      default: null,
    },
    collaboratorCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

DocumentSchema.index({ updatedAt: -1 });

export const DocumentModel = mongoose.model<IDocument>(
  'Document',
  DocumentSchema
);