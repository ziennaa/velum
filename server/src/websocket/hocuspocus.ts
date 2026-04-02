import { Server as HocuspocusServer } from '@hocuspocus/server';
import { Database } from '@hocuspocus/extension-database';
import { documentService } from '../services/documentService';
import { revisionService } from '../services/revisionService';
import { logger } from '../utils/logger';

const revisionThrottle: Map<string, NodeJS.Timeout> = new Map();
const REVISION_INTERVAL_MS = 30_000;

export function createHocuspocusServer() {
  const hocuspocus = HocuspocusServer.configure({
    debounce: 2000,

    extensions: [
      new Database({
        async fetch({ documentName }) {
          logger.info(`Loading Yjs state for document: ${documentName}`);
          try {
            const state = await documentService.loadYjsState(documentName);
            return state ?? null;
          } catch (err) {
            logger.error(`Failed to load Yjs state: ${documentName}`, err);
            return null;
          }
        },

        async store({ documentName, state }) {
          logger.info(`Saving Yjs state for document: ${documentName}`);
          try {
            await documentService.saveYjsState(documentName, state);

            if (!revisionThrottle.has(documentName)) {
              const timeout = setTimeout(async () => {
                try {
                  await revisionService.create(documentName, state);
                  logger.info(`Revision snapshot created for: ${documentName}`);
                } catch (err) {
                  logger.error(`Failed to create revision: ${documentName}`, err);
                } finally {
                  revisionThrottle.delete(documentName);
                }
              }, REVISION_INTERVAL_MS);

              revisionThrottle.set(documentName, timeout);
            }
          } catch (err) {
            logger.error(`Failed to save Yjs state: ${documentName}`, err);
          }
        },
      }),
    ],

    async onConnect({ documentName }) {
      logger.info(`User connected to document: ${documentName}`);
    },

    async onDisconnect({ documentName }) {
      logger.info(`User disconnected from document: ${documentName}`);
    },

    async onError({ error }) {
      logger.error('Hocuspocus error:', error);
    },
  });

  return hocuspocus;
}

export const hocuspocus = createHocuspocusServer();