import * as Y from 'yjs';
import { RevisionModel, IRevision } from '../models/Revision';
import { DocumentModel } from '../models/Document';



const MAX_REVISIONS_PER_DOCUMENT = 50; 

export const revisionService = {
  async create(
    documentId: string,
    yjsState: Uint8Array
  ): Promise<IRevision> {
    const contentPreview = extractTextPreview(yjsState);

    const doc = await DocumentModel.findById(documentId).select('title');
    const documentTitle = doc?.title || 'Untitled Document';

    const revision = await RevisionModel.create({
      documentId,
      documentTitle,
      yjsState: Buffer.from(yjsState),
      contentPreview,
    });

    await pruneOldRevisions(documentId);

    return revision;
  },

  async findByDocumentId(documentId: string): Promise<Omit<IRevision, 'yjsState'>[]> {
    return RevisionModel.find({ documentId })
      .select('-yjsState') 
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();
  },

  async findById(revisionId: string): Promise<IRevision | null> {
    return RevisionModel.findById(revisionId).lean();
  },

  async restore(revisionId: string): Promise<{ documentId: string }> {
    const revision = await RevisionModel.findById(revisionId);
    if (!revision) throw new Error(`Revision not found: ${revisionId}`);

    await DocumentModel.findByIdAndUpdate(revision.documentId, {
      yjsState: revision.yjsState,
      updatedAt: new Date(),
    });

    return { documentId: revision.documentId };
  },

  async deleteByDocumentId(documentId: string): Promise<void> {
    await RevisionModel.deleteMany({ documentId });
  },
};


function extractTextPreview(yjsState: Uint8Array): string {
  try {
    const ydoc = new Y.Doc();
    Y.applyUpdate(ydoc, yjsState);


    const xmlFragment = ydoc.getXmlFragment('default');
    const text = xmlFragment.toString()
      .replace(/<[^>]+>/g, ' ') 
      .replace(/\s+/g, ' ')    
      .trim()
      .slice(0, 200);

    return text;
  } catch {
    return '';
  }
}

async function pruneOldRevisions(documentId: string): Promise<void> {
  const revisions = await RevisionModel.find({ documentId })
    .sort({ createdAt: -1 })
    .select('_id')
    .lean();

  if (revisions.length > MAX_REVISIONS_PER_DOCUMENT) {
    const toDelete = revisions
      .slice(MAX_REVISIONS_PER_DOCUMENT)
      .map((r) => r._id);
    await RevisionModel.deleteMany({ _id: { $in: toDelete } });
  }
}