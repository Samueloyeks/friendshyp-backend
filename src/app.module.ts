import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ParcelModule } from './parcel/parcel.module';
import { CountryModule } from './country/country.module';
import { Parcel } from './parcel/entities/parcel.entity';
import { Country } from './country/entities/country.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: String(configService.get('DATABASE_HOST')) || 'localhost',
        port: parseInt(String(configService.get('POSTGRES_PORT')), 10) || 5432,
        username: String(configService.get('DATABASE_USERNAME')),
        password: String(configService.get('DATABASE_PASSWORD')),
        database: String(configService.get('DATABASE_DATABASE')),
        entities: [Parcel, Country],
        synchronize: true,
        logging: true,
      }),
    } as TypeOrmModuleAsyncOptions),
    ParcelModule,
    CountryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ParcelModule } from './parcel/parcel.module';
// import { CountryModule } from './country/country.module';
// import { Parcel } from './parcel/entities/parcel.entity';
// import { Country } from './country/entities/country.entity';
//
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: process.env.DATABASE_HOST || 'localhost',
//       port: parseInt(String(process.env.DATABASE_PORT), 10) || 5432,
//       username: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       database: process.env.DATABASE_DATABASE,
//       entities: [Parcel, Country],
//       synchronize: true,
//       logging: true,
//     }),
//     ParcelModule,
//     CountryModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule {}
