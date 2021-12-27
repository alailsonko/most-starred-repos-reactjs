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
  }, []);
  return (
    <HomeContainer>
      <HomeWrapper>
        <Center>
          <VStack direction="column">
            <Stack>
              <Heading>The most starred repositories</Heading>
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
                  setPageAtom(1);
                  repositoriesCallback();
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
                    <RepositoryCard key={item.id} item={item} />
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
