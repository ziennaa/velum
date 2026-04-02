import dotenv from 'dotenv';
dotenv.config();


function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  PORT: parseInt(process.env.PORT || '3001', 10),
  MONGODB_URI: requireEnv('MONGODB_URI'),
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:5173',
  NODE_ENV: process.env.NODE_ENV || 'development',
  isDev: process.env.NODE_ENV !== 'production',
};