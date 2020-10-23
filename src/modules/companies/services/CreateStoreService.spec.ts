import AppError from '@shared/errors/AppError';

import FakeStoresRepository from '../repositories/fakes/FakeStoresRepository';
import CreateStoreService from './CreateStoreService';

describe('CreateStore', () => {
  it('should be able to create a new store', async () => {
    const fakeStoresRepository = new FakeStoresRepository();
    const createStore = new CreateStoreService(fakeStoresRepository);

    const store = await createStore.execute({
      nm_corporate_name: 'Bsine Jest Test',
      nm_fantasy_name: 'Bsine Jest Test Franquia',
      nm_initials: 'BSNJTF',
      nr_cnpj: 91000000000101,
      nr_inscricao_estadual: 9123456,
      nr_ccm: 9123456,
      dt_born: new Date(),
      id_company_owner: 'blalballa',
      type_company: 'blalballa',
      active: true,
    });

    expect(store).toHaveProperty('id');
    expect(store.nr_cnpj).toBe(91000000000101);
  });

  it('should not be able to create two stores with the same cnpj', async () => {
    const fakeStoresRepository = new FakeStoresRepository();
    const createStore = new CreateStoreService(fakeStoresRepository);

    await createStore.execute({
      nm_corporate_name: 'Bsine Jest Test',
      nm_fantasy_name: 'Bsine Jest Test Franquia',
      nm_initials: 'BSNJTF',
      nr_cnpj: 91000000000101,
      nr_inscricao_estadual: 9123456,
      nr_ccm: 9123456,
      dt_born: new Date(),
      id_company_owner: 'blalballa',
      type_company: 'blalballa',
      active: true,
    });

    expect(
      createStore.execute({
        nm_corporate_name: 'Bsine Jest Test',
        nm_fantasy_name: 'Bsine Jest Test Franquia',
        nm_initials: 'BSNJTF',
        nr_cnpj: 91000000000101,
        nr_inscricao_estadual: 9123456,
        nr_ccm: 9123456,
        dt_born: new Date(),
        id_company_owner: 'blalballa',
        type_company: 'blalballa',
        active: true,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
