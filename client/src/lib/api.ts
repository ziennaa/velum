import axios from 'axios';
import type { Document, Revision, ApiResponse } from '@/types';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.message ||
      'Something went wrong';
    return Promise.reject(new Error(message));
  }
);


export const documentsApi = {
  list: async (): Promise<Document[]> => {
    const { data } = await apiClient.get<ApiResponse<Document[]>>(
      '/api/documents'
    );
    return data.data ?? [];
  },

  get: async (id: string): Promise<Document> => {
    const { data } = await apiClient.get<ApiResponse<Document>>(
      `/api/documents/${id}`
    );
    return data.data!;
  },

  create: async (title?: string): Promise<Document> => {
    const { data } = await apiClient.post<ApiResponse<Document>>(
      '/api/documents',
      { title }
    );
    return data.data!;
  },

  updateTitle: async (id: string, title: string): Promise<Document> => {
    const { data } = await apiClient.patch<ApiResponse<Document>>(
      `/api/documents/${id}/title`,
      { title }
    );
    return data.data!;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/api/documents/${id}`);
  },
};


export const revisionsApi = {
  list: async (documentId: string): Promise<Revision[]> => {
    const { data } = await apiClient.get<ApiResponse<Revision[]>>(
      `/api/documents/${documentId}/revisions`
    );
    return data.data ?? [];
  },

  restore: async (documentId: string, revisionId: string): Promise<void> => {
    await apiClient.post(
      `/api/documents/${documentId}/revisions/${revisionId}/restore`
    );
  },
};