import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { countries } from '../seed-data/countries';
import { Country } from '../../country/entities/country.entity';

export default class CountrySeeder implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    await dataSource.query(
      'TRUNCATE TABLE "country" RESTART IDENTITY CASCADE;',
    );

    const repository = dataSource.getRepository(Country);

    for (const country of countries) {
      await repository.save(country as Country);
    }
  }
}
