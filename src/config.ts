import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME || 'default',
      port: process.env.DATABASE_PORT || 5432,
    },
    apiKey: process.env.API_KEY || '123456',
  };
});