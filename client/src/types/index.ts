export interface Document {
    _id: string;
    title: string;
    collaboratorCount: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Revision {
    _id: string;
    documentId: string;
    documentTitle: string;
    contentPreview: string;
    createdAt: string;
  }
  
  export interface User {
    id: string;
    name: string;
    color: string;
    initials: string;
    hasChosenName: boolean;
  }
  
  export interface PresenceUser {
    clientId: number;
    name: string;
    color: string;
    initials: string;
  }
  
  export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    error?: string;
    message?: string;
  }
  
  export type ConnectionStatus =
    | 'connecting'
    | 'connected'
    | 'disconnected'
    | 'reconnecting';