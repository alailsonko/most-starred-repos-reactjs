import React from 'react';

import { Badge, Box, Button, Center, Flex, Heading, VStack, Stack, Text } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { HomeContainer, HomeWrapper } from './styles';

const Home: React.FC = () => {
  return (
    <HomeContainer>
      <HomeWrapper>
        <Center>
          <VStack direction="column">
            <Stack>
              <Heading>The most starred repositories</Heading>
            </Stack>
            <Stack
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
              <Box
                shadow="md"
                _hover={{
                  boxShadow: 'dark-lg',
                  borderColor: 'green.500'
                }}
                borderWidth="1px"
                bg="white"
                w={['90vw', '430px']}
                p={2}
                color="gray.300">
                <Flex align="center" justify="space-between" direction="row">
                  <Text fontSize="small" color="black">
                    owner: fluhunt
                  </Text>
                  <Heading fontSize="xl" color="black">
                    Plan Money
                  </Heading>
                  <Button position="relative" colorScheme="teal" variant="outline" size="lg">
                    <span>star</span>
                    <div>
                      <StarIcon
                        position="absolute"
                        w={3}
                        h={3}
                        style={{
                          bottom: '0.1em',
                          left: '0.7em'
                        }}
                      />
                      <Text
                        position="absolute"
                        w={3}
                        h={3}
                        fontSize="small"
                        style={{
                          bottom: '0.2em',
                          left: '2.2em'
                        }}>
                        37821
                      </Text>
                    </div>
                  </Button>
                </Flex>
                <Flex direction="row">
                  <Text fontSize="small" mt={2} color="black">
                    You deserve good things. With a whooping 10-15% interest rate per annum, grow
                    your savings on your own terms with our completely automated process
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify="space-between" mt={2}>
                  <Badge colorScheme="green">python</Badge>
                  <Button colorScheme="blue">Go to</Button>
                </Flex>
              </Box>
              <Box
                shadow="md"
                _hover={{
                  boxShadow: 'dark-lg'
                }}
                borderWidth="1px"
                bg="tomato"
                w={['90vw', '430px']}
                p={2}
                color="white">
                <Flex align="center" justify="space-between" direction="row">
                  <Text fontSize="small">owner: fluhunt</Text>
                  <Heading fontSize="xl">Plan Money</Heading>
                  <Button position="relative" colorScheme="teal" variant="outline" size="lg">
                    <span>star</span>
                    <div>
                      <StarIcon
                        position="absolute"
                        w={3}
                        h={3}
                        style={{
                          bottom: '0.1em',
                          left: '0.7em'
                        }}
                      />
                      <Text
                        position="absolute"
                        w={3}
                        h={3}
                        fontSize="small"
                        style={{
                          bottom: '0.2em',
                          left: '2.2em'
                        }}>
                        37821
                      </Text>
                    </div>
                  </Button>
                </Flex>
                <Flex direction="row">
                  <Text fontSize="small" mt={2}>
                    You deserve good things. With a whooping 10-15% interest rate per annum, grow
                    your savings on your own terms with our completely automated process
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify="space-between" mt={2}>
                  <Badge colorScheme="green">python</Badge>
                  <Button colorScheme="teal">Go to</Button>
                </Flex>
              </Box>
              <Box
                shadow="md"
                _hover={{
                  boxShadow: 'dark-lg'
                }}
                borderWidth="1px"
                bg="tomato"
                w={['90vw', '430px']}
                p={2}
                color="white">
                <Flex align="center" justify="space-between" direction="row">
                  <Text fontSize="small">owner: fluhunt</Text>
                  <Heading fontSize="xl">Plan Money</Heading>
                  <Button position="relative" colorScheme="teal" variant="outline" size="lg">
                    <span>star</span>
                    <div>
                      <StarIcon
                        position="absolute"
                        w={3}
                        h={3}
                        style={{
                          bottom: '0.1em',
                          left: '0.7em'
                        }}
                      />
                      <Text
                        position="absolute"
                        w={3}
                        h={3}
                        fontSize="small"
                        style={{
                          bottom: '0.2em',
                          left: '2.2em'
                        }}>
                        37821
                      </Text>
                    </div>
                  </Button>
                </Flex>
                <Flex direction="row">
                  <Text fontSize="small" mt={2}>
                    You deserve good things. With a whooping 10-15% interest rate per annum, grow
                    your savings on your own terms with our completely automated process
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify="space-between" mt={2}>
                  <Badge colorScheme="green">python</Badge>
                  <Button colorScheme="teal">Go to</Button>
                </Flex>
              </Box>
              <Box
                shadow="md"
                _hover={{
                  boxShadow: 'dark-lg'
                }}
                borderWidth="1px"
                bg="tomato"
                w={['90vw', '430px']}
                p={2}
                color="white">
                <Flex align="center" justify="space-between" direction="row">
                  <Text fontSize="small">owner: fluhunt</Text>
                  <Heading fontSize="xl">Plan Money</Heading>
                  <Button position="relative" colorScheme="teal" variant="outline" size="lg">
                    <span>star</span>
                    <div>
                      <StarIcon
                        position="absolute"
                        w={3}
                        h={3}
                        style={{
                          bottom: '0.1em',
                          left: '0.7em'
                        }}
                      />
                      <Text
                        position="absolute"
                        w={3}
                        h={3}
                        fontSize="small"
                        style={{
                          bottom: '0.2em',
                          left: '2.2em'
                        }}>
                        37821
                      </Text>
                    </div>
                  </Button>
                </Flex>
                <Flex direction="row">
                  <Text fontSize="small" mt={2}>
                    You deserve good things. With a whooping 10-15% interest rate per annum, grow
                    your savings on your own terms with our completely automated process
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify="space-between" mt={2}>
                  <Badge colorScheme="green">python</Badge>
                  <Button colorScheme="teal">Go to</Button>
                </Flex>
              </Box>
              <Box
                shadow="md"
                _hover={{
                  boxShadow: 'dark-lg'
                }}
                borderWidth="1px"
                bg="tomato"
                w={['90vw', '430px']}
                p={2}
                color="white">
                <Flex align="center" justify="space-between" direction="row">
                  <Text fontSize="small">owner: fluhunt</Text>
                  <Heading fontSize="xl">Plan Money</Heading>
                  <Button position="relative" colorScheme="teal" variant="outline" size="lg">
                    <span>star</span>
                    <div>
                      <StarIcon
                        position="absolute"
                        w={3}
                        h={3}
                        style={{
                          bottom: '0.1em',
                          left: '0.7em'
                        }}
                      />
                      <Text
                        position="absolute"
                        w={3}
                        h={3}
                        fontSize="small"
                        style={{
                          bottom: '0.2em',
                          left: '2.2em'
                        }}>
                        37821
                      </Text>
                    </div>
                  </Button>
                </Flex>
                <Flex direction="row">
                  <Text fontSize="small" mt={2}>
                    You deserve good things. With a whooping 10-15% interest rate per annum, grow
                    your savings on your own terms with our completely automated process
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify="space-between" mt={2}>
                  <Badge colorScheme="green">python</Badge>
                  <Button colorScheme="teal">Go to</Button>
                </Flex>
              </Box>
              <Box
                shadow="md"
                _hover={{
                  boxShadow: 'dark-lg'
                }}
                borderWidth="1px"
                bg="tomato"
                w={['90vw', '430px']}
                p={2}
                color="white">
                <Flex align="center" justify="space-between" direction="row">
                  <Text fontSize="small">owner: fluhunt</Text>
                  <Heading fontSize="xl">Plan Money</Heading>
                  <Button position="relative" colorScheme="teal" variant="outline" size="lg">
                    <span>star</span>
                    <div>
                      <StarIcon
                        position="absolute"
                        w={3}
                        h={3}
                        style={{
                          bottom: '0.1em',
                          left: '0.7em'
                        }}
                      />
                      <Text
                        position="absolute"
                        w={3}
                        h={3}
                        fontSize="small"
                        style={{
                          bottom: '0.2em',
                          left: '2.2em'
                        }}>
                        37821
                      </Text>
                    </div>
                  </Button>
                </Flex>
                <Flex direction="row">
                  <Text fontSize="small" mt={2}>
                    You deserve good things. With a whooping 10-15% interest rate per annum, grow
                    your savings on your own terms with our completely automated process
                  </Text>
                </Flex>
                <Flex direction="row" align="center" justify="space-between" mt={2}>
                  <Badge colorScheme="green">python</Badge>
                  <Button colorScheme="teal">Go to</Button>
                </Flex>
              </Box>
            </Stack>
          </VStack>
        </Center>
      </HomeWrapper>
    </HomeContainer>
  );
};

export default Home;
