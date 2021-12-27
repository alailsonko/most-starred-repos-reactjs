/* eslint-disable camelcase */
import { snapshot_UNSTABLE } from 'recoil';
import { getRepositories } from '../index';

test('Test getRepositories', async () => {
  const initialSnapshot = snapshot_UNSTABLE();
  expect(await initialSnapshot.getPromise(getRepositories)).toHaveLength(5);
});
