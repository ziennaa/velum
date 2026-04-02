import { useState, useCallback } from 'react';
import { revisionsApi } from '@/lib/api';
import type { Revision } from '@/types';

interface UseRevisionsReturn {
  revisions: Revision[];
  isLoading: boolean;
  isRestoring: boolean;
  error: string | null;
  fetchRevisions: (documentId: string) => Promise<void>;
  restoreRevision: (revisionId: string) => Promise<boolean>;
}

export function useRevisions(): UseRevisionsReturn {
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRevisions = useCallback(async (documentId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const revs = await revisionsApi.list(documentId);
      setRevisions(revs);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load revisions');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const restoreRevision = useCallback(async (revisionId: string): Promise<boolean> => {
    setIsRestoring(true);
    try {
      await revisionsApi.restore(revisionId);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to restore revision');
      return false;
    } finally {
      setIsRestoring(false);
    }
  }, []);

  return {
    revisions,
    isLoading,
    isRestoring,
    error,
    fetchRevisions,
    restoreRevision,
  };
}