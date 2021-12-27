import { selector } from 'recoil';
import fetchAPI from '../../services/api';
import endpoints from '../../endpoints';
import repositoryMapper from '../../mappers/repositoryMapper';

export const getRepositories = selector({
  key: 'GetRepositories',
  get: async () => {
    return fetchAPI({
      url: endpoints.searchRepositories,
      params: {
        sort: '=stars'
      }
    }).then(({ items }: { items: Array<any> }) => items.map((item) => repositoryMapper(item)));
  }
});

export const empty = {};
