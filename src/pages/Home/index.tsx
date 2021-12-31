/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState, useTransition } from 'react';
import { RecoilValueReadOnly, Snapshot, useRecoilCallback } from 'recoil';
import {
  Center,
  Heading,
  VStack,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Button,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel
} from '@chakra-ui/react';
import { HomeContainer, HomeWrapper } from './styles';
import { getRepositories, IRepositoryParams } from '../../usecases/getRepositories';
import RepositoryCard from '../../components/RepositoryCard';
import { IRepository } from '../../domain/models/repository';
import { getLocalStorage, setLocalStorage } from '../../services/localStorage';
import { useQueryRefetching } from '../../hooks/useQueryRefetching';

const Home: React.FC = () => {
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [starredRepositories, setStarredRepositories] = useState<IRepository[]>([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [isPending, startTransition] = useTransition();
  const [isFirstFetchPending, startFirstFetchTransition] = useTransition();
  const firstFetchRef = useRef(false);
  const { currentPage, paramsQuery, initialPage, nextPage, prevPage, setPage } =
    useQueryRefetching<IRepositoryParams>(
      {
        created: `:>2021-12-20`,
        sort: '=stars',
        order: '=desc',
        per_page: '=5',
        page: `=1`
      },
      'page'
    );

  const concatenatedRepositoriesPage = (previousState: IRepository[], res: IRepository[]) => {
    if (res[0]?.id === previousState[0]?.id) {
      return previousState;
    }
    return previousState.concat(res);
  };

  const snapshotGetPromises = async <T,>(
    snapshot: Snapshot,
    recoilPromiseFunction: RecoilValueReadOnly<T>,
    cb: (res: T) => void
  ) => {
    await snapshot.getPromise<T>(recoilPromiseFunction).then(cb);
  };

  const repositoriesCallback = useRecoilCallback(
    ({ snapshot }) =>
      async (params: IRepositoryParams, transitionFunction: React.TransitionStartFunction) => {
        setLoadingItems(true);
        await snapshotGetPromises<IRepository[]>(snapshot, getRepositories(params), (res) => {
          transitionFunction(() => {
            setRepositories((previousState) => concatenatedRepositoriesPage(previousState, res));
          });
        }).then(() => {
          setLoadingItems(false);
        });
      },
    []
  );

  const updateRepositories = () => {
    startTransition(() => {
      setRepositories((previousState) =>
        previousState.map((itemRepo) => ({
          ...itemRepo,
          starred: starredRepositories.some((repo) => repo.id === itemRepo.id)
        }))
      );
    });
  };

  const updateStarredRepositories = (
    newRepositories: IRepository[] | undefined,
    item: IRepository,
    method: 'concat' | 'filter'
  ) => {
    setLocalStorage('repositories', newRepositories);
    switch (method) {
      case 'concat':
        setStarredRepositories((previousState) => previousState.concat(item));
        break;
      case 'filter':
        setStarredRepositories((previousState) =>
          previousState.filter((repo) => repo.id !== item.id)
        );
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!firstFetchRef.current) {
      nextPage();
      repositoriesCallback(paramsQuery, startFirstFetchTransition);
      firstFetchRef.current = true;
    }

    const localStorageRepositories = getLocalStorage<IRepository[]>('repositories');
    if (!localStorageRepositories) {
      setLocalStorage('repositories', []);
    } else {
      setStarredRepositories(localStorageRepositories.sort((a, b) => b.stars - a.stars));
    }
  }, [tabIndex]);

  const handleStarRepo = (item: IRepository) => {
    const localStorageRepositories = getLocalStorage<IRepository[]>('repositories');
    const newRepositories = localStorageRepositories
      ?.concat(item)
      .sort((a, b) => b.stars - a.stars);
    updateStarredRepositories(newRepositories, item, 'concat');
    updateRepositories();
  };

  const handleUnstarRepo = (item: IRepository) => {
    const localStorageRepositories = getLocalStorage<IRepository[]>('repositories');
    const newRepositories = localStorageRepositories
      ?.filter((repo) => repo.id !== item.id)
      .sort((a, b) => b.stars - a.stars);
    updateStarredRepositories(newRepositories, item, 'filter');
    updateRepositories();
  };

  return (
    <HomeContainer>
      <HomeWrapper>
        <Center>
          <VStack direction="column">
            <Stack>
              <Heading>The most starred repositories</Heading>
            </Stack>
            <Tabs
              onChange={(index) => {
                setTabIndex(index);
              }}
              variant="enclosed">
              <TabList>
                <Tab>All({repositories.length})</Tab>
                <Tab>Starred({starredRepositories.length})</Tab>
              </TabList>
              <Stack
                onScroll={(e) => {
                  if (tabIndex === 0) {
                    if (
                      e.currentTarget.scrollTop + e.currentTarget.offsetHeight + 1 >=
                        e.currentTarget.scrollHeight &&
                      !loadingItems &&
                      !isPending
                    ) {
                      repositoriesCallback(nextPage(), startTransition);
                      return;
                    }
                    if (e.currentTarget.scrollTop === 0) {
                      setPage(2);
                      setRepositories(repositories.slice(0, 5));
                    }
                  }
                }}
                style={{
                  overflowY: 'scroll',
                  height: '70vh'
                }}
                css={{
                  '&::-webkit-scrollbar': {
                    width: '8px'
                  },
                  '&::-webkit-scrollbar-track': {
                    width: '10px'
                  },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'green',
                    borderRadius: '24px'
                  }
                }}
                spacing={2}>
                <TabPanels width="22vw">
                  <TabPanel width="24vw">
                    {!isFirstFetchPending ? (
                      <>
                        {(repositories as unknown as IRepository[]).map((item: IRepository) => (
                          <RepositoryCard
                            callbackHandleUnstarRepo={handleUnstarRepo}
                            callbackHandleStarRepo={handleStarRepo}
                            key={item.id}
                            item={item}
                            tabIndex={tabIndex}
                          />
                        ))}
                        {loadingItems && (
                          <Box padding="6" width="22vw" height="22vw" boxShadow="lg" bg="white">
                            <SkeletonCircle size="10" />
                            <SkeletonText mt="4" noOfLines={4} spacing="4" />
                          </Box>
                        )}
                      </>
                    ) : (
                      <Box padding="6" width="22vw" boxShadow="lg" bg="white">
                        <SkeletonCircle size="10" />
                        <SkeletonText mt="4" noOfLines={4} spacing="4" />
                      </Box>
                    )}
                  </TabPanel>
                  <TabPanel width="24vw">
                    {!isFirstFetchPending ? (
                      <>
                        {(starredRepositories as unknown as IRepository[]).map(
                          (item: IRepository) => (
                            <RepositoryCard
                              callbackHandleUnstarRepo={handleUnstarRepo}
                              callbackHandleStarRepo={handleStarRepo}
                              key={item.id}
                              item={item}
                              tabIndex={tabIndex}
                            />
                          )
                        )}
                        {starredRepositories.length === 0 && <Button width="22vw">empty</Button>}
                      </>
                    ) : (
                      <Box padding="6" width="22vw" boxShadow="lg" bg="white">
                        <SkeletonCircle size="10" />
                        <SkeletonText mt="4" noOfLines={4} spacing="4" />
                      </Box>
                    )}
                  </TabPanel>
                </TabPanels>
              </Stack>
            </Tabs>
          </VStack>
        </Center>
      </HomeWrapper>
    </HomeContainer>
  );
};

export default Home;
