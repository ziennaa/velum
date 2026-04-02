import mongoose, { Document as MongoDocument, Schema } from 'mongoose';


export interface IRevision extends MongoDocument {
  documentId: string;
  documentTitle: string;
  yjsState: Buffer;       
  contentPreview: string;  
  createdAt: Date;
}

const RevisionSchema = new Schema<IRevision>(
  {
    documentId: {
      type: String,
      required: true,
      index: true, 
    },
    documentTitle: {
      type: String,
      default: 'Untitled Document',
    },
    yjsState: {
      type: Buffer,
      required: true,
    },
    contentPreview: {
      type: String,
      default: '',
      maxlength: 200,
    },
  },
  {
    timestamps: true,
  }
);

RevisionSchema.index({ documentId: 1, createdAt: -1 });

export const RevisionModel = mongoose.model<IRevision>('Revision', RevisionSchema);