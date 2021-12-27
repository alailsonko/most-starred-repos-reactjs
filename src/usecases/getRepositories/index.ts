import { atom, selector } from 'recoil';
import fetchAPI from '../../services/api';
import endpoints from '../../endpoints';
import repositoryMapper from '../../mappers/repositoryMapper';

export const pageAtom = atom({
  key: 'pageAtom',
  default: 1
});

export const getRepositories = selector({
  key: 'GetRepositories',
  get: async ({ get }) => {
    return fetchAPI({
      url: endpoints.searchRepositories,
      params: {
        created: `:>2021-12-20`,
        sort: '=stars',
        order: '=desc',
        per_page: '=5',
        page: `=${get(pageAtom)}`
      }
    }).then(({ items }: { items: Array<any> }) => items.map((item) => repositoryMapper(item)));
  }
});

export const empty = {};
