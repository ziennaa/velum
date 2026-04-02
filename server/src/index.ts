import http from 'http';
import { WebSocketServer } from 'ws';
import app from './app';
import { connectDatabase } from './config/db';
import { hocuspocus } from './websocket/hocuspocus';
import { env } from './config/env';
import { logger } from './utils/logger';

async function bootstrap() {
  await connectDatabase();
  const httpServer = http.createServer(app);
  const wss = new WebSocketServer({ noServer: true });
  httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (websocket) => {
      hocuspocus.handleConnection(websocket, request);
    });
  });
  httpServer.listen(env.PORT, () => {
    logger.info(`Velum server running on port ${env.PORT}`);
    logger.info(`WebSocket (Hocuspocus) ready on ws://localhost:${env.PORT}`);
    logger.info(`Environment: ${env.NODE_ENV}`);
    logger.info(`Client URL: ${env.CLIENT_URL}`);
  });

  process.on('SIGTERM', () => {
    logger.info('Shutting down...');
    httpServer.close(() => process.exit(0));
  });
}

bootstrap().catch((err) => {
  logger.error('Failed to start server:', err);
  process.exit(1);
});