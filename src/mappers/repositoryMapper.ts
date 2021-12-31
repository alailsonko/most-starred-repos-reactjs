import { getLocalStorage } from '../services/localStorage';
import { IRepository } from '../domain/models/repository';

export default function repositoryMapper(item: any): IRepository {
  const repositoriesLocalStorage = getLocalStorage<IRepository[]>('repositories');
  return {
    id: item.id as number,
    description: item.description as string,
    link: item.html_url as string,
    name: item.name as string,
    stars: item.stargazers_count as number,
    owner: item.owner.login as string,
    language: item.language as string,
    starred:
      repositoriesLocalStorage && repositoriesLocalStorage.length > 0
        ? repositoriesLocalStorage.some((repository) => repository.id === item.id)
        : false
  };
}
