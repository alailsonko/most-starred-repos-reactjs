import { selectorFamily } from 'recoil';
import fetchAPI from '../../services/api';
import endpoints from '../../endpoints';
import repositoryMapper from '../../mappers/repositoryMapper';
import { IRepository } from '../../domain/models/repository';

export type IRepositoryParams = {
  created?: string;
  sort?: string;
  order?: string;
  per_page?: string;
  page?: string;
};

export const getRepositories = selectorFamily<IRepository[], IRepositoryParams>({
  key: 'GetRepositories',
  get: (params: IRepositoryParams) => async (): Promise<IRepository[]> => {
    return fetchAPI({
      url: endpoints.searchRepositories,
      params: { ...params }
    }).then(({ items }: { items: IRepository[] }) => items.map((item) => repositoryMapper(item)));
  }
});

export const empty = {};
