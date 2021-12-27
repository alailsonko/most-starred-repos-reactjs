/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useRecoilCallback, useRecoilState } from 'recoil';
import {
  Center,
  Heading,
  VStack,
  Stack,
  Box,
  SkeletonCircle,
  SkeletonText,
  Button
} from '@chakra-ui/react';
import { HomeContainer, HomeWrapper } from './styles';
import { getRepositories, pageAtom } from '../../usecases/getRepositories';
import RepositoryCard from '../../components/RepositoryCard';
import { IRepository } from '../../domain/models/repository';
import { getLocalStorage, setLocalStorage } from '../../services/localStorage';

const Home: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingItems, setLoadingItems] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<IRepository[]>([]);
  const [pageValueAtom, setPageAtom] = useRecoilState(pageAtom);

  const repositoriesCallback = useRecoilCallback(
    ({ snapshot }) =>
      async () => {
        setLoadingItems(true);
        await snapshot.getPromise(getRepositories).then((res) => {
          setRepositories((previousState) => {
            if ((res as IRepository[])[0]?.id === previousState[0]?.id) {
              setPageAtom(pageValueAtom + 1);
              return previousState;
            }

            return previousState.concat(res as IRepository[]);
          });
          setLoading(false);
          setLoadingItems(false);
        });
      },
    []
  );

  useEffect(() => {
    setLoading(true);
    repositoriesCallback();
    const localStorageRepositories = getLocalStorage('repositories');
    if (!localStorageRepositories) {
      setLocalStorage('repositories', []);
    }
  }, []);

  const handleStarRepo = (item: IRepository) => {
    const localStorageRepositories = getLocalStorage('repositories');
    const newRepositories = localStorageRepositories.concat(item);
    setLocalStorage('repositories', newRepositories);
  };

  return (
    <HomeContainer>
      <HomeWrapper>
        <Center>
          <VStack direction="column">
            <Stack>
              <Heading>The most starred repositories({repositories.length})</Heading>
            </Stack>
            <Stack
              onScroll={(e) => {
                if (
                  e.currentTarget.scrollTop + e.currentTarget.offsetHeight + 2 >=
                  e.currentTarget.scrollHeight
                ) {
                  setPageAtom(pageValueAtom + 1);
                  repositoriesCallback();
                  return;
                }
                if (e.currentTarget.scrollTop === 0) {
                  setPageAtom(2);
                  setRepositories(repositories.slice(0, 5));
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
              {!loading ? (
                <>
                  {(repositories as unknown as IRepository[]).map((item: IRepository) => (
                    <RepositoryCard callback={handleStarRepo} key={item.id} item={item} />
                  ))}
                  {loadingItems && <Button>loading more items</Button>}
                </>
              ) : (
                <Box padding="6" boxShadow="lg" bg="white">
                  <SkeletonCircle size="10" />
                  <SkeletonText mt="4" noOfLines={4} spacing="4" />
                </Box>
              )}
            </Stack>
          </VStack>
        </Center>
      </HomeWrapper>
    </HomeContainer>
  );
};

export default Home;
