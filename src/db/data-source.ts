import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { DataSourceOptions } from 'typeorm/data-source';
import InitSeeder from './init.seeder';

ConfigModule.forRoot({
  envFilePath: '.env',
});

const options = {
  type: 'postgres',
  host: String(process.env.DATABASE_HOST)|| 'localhost',
  port: parseInt(String(process.env.DATABASE_PORT), 10) || 5432,
  username: String(process.env.DATABASE_USERNAME),
  password: String(process.env.DATABASE_PASSWORD),
  database: String(process.env.DATABASE_DATABASE),
  entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
  seeds: [InitSeeder],
};

export const source = new DataSource(
  options as DataSourceOptions & SeederOptions,
);
