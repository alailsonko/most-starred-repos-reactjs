import fetchAPI from '../api';

describe('FectchAPI', () => {
  test('should fetch api', async () => {
    expect(
      await fetchAPI({
        url: 'https://api.github.com/search/repositories?q=',
        params: {
          created: ':>2021-12-12',
          sort: '=desc',
          per_page: '=3'
        }
      }).then((result) => result.items.length)
    ).toEqual(3);
  });
});
