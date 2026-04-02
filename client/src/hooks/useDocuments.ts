import { useState, useEffect, useCallback } from 'react';
import { documentsApi } from '@/lib/api';
import type { Document } from '@/types';


interface UseDocumentsReturn {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  createDocument: (title?: string) => Promise<Document | null>;
  deleteDocument: (id: string) => Promise<void>;
  refreshDocuments: () => Promise<void>;
}

export function useDocuments(): UseDocumentsReturn {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    try {
      setError(null);
      const docs = await documentsApi.list();
      setDocuments(docs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load documents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const createDocument = useCallback(async (title?: string): Promise<Document | null> => {
    try {
      const doc = await documentsApi.create(title);
      setDocuments((prev) => [doc, ...prev]);
      return doc;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create document');
      return null;
    }
  }, []);

  const deleteDocument = useCallback(async (id: string): Promise<void> => {
    try {
      await documentsApi.delete(id);
      setDocuments((prev) => prev.filter((d) => d._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
    }
  }, []);

  return {
    documents,
    isLoading,
    error,
    createDocument,
    deleteDocument,
    refreshDocuments: fetchDocuments,
  };
}