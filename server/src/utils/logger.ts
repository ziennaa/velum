
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

function log(level: LogLevel, message: string, data?: unknown): void {
  const timestamp = new Date().toISOString();
  const prefix = {
    info:  ' INFO ',
    warn:  '  WARN ',
    error: 'ERROR',
    debug: ' DEBUG',
  }[level];

  console.log(`${timestamp} ${prefix} ${message}`);
  if (data !== undefined) {
    console.log(JSON.stringify(data, null, 2));
  }
}

export const logger = {
  info:  (msg: string, data?: unknown) => log('info',  msg, data),
  warn:  (msg: string, data?: unknown) => log('warn',  msg, data),
  error: (msg: string, data?: unknown) => log('error', msg, data),
  debug: (msg: string, data?: unknown) => log('debug', msg, data),
};