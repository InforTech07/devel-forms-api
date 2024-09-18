import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    database: {
      name: process.env.DATABASE_NAME || 'default',
      port: process.env.DATABASE_PORT || 5432,
      host: process.env.DATABASE_HOST || 'localhost',
      user: process.env.DATABASE_USER || 'root',
      password: process.env.DATABASE_PASSWORD || 'root',
    },
    apiKey: process.env.API_KEY || '123456',
    jwtSecret: process.env.JWT_SECRET || 'secret',
  };
});