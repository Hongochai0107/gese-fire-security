import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (config: ConfigService): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: config.get('DB_HOST', 'localhost'),
  port: config.get<number>('DB_PORT', 3306),
  username: config.get('DB_USERNAME', 'root'),
  password: config.get('DB_PASSWORD', ''),
  database: config.get('DB_DATABASE', 'gese_fire_security'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
  synchronize: config.get('APP_ENV') === 'development',
  logging: config.get('APP_ENV') === 'development',
});
