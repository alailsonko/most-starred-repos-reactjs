import React, { FC, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Button, Badge, Text } from '@chakra-ui/react';
import { IRepository } from '../../domain/models/repository';

type Props = {
  item: IRepository;
  callback: Function;
};

const RepositoryCard: FC<Props> = ({ item, callback }) => {
  const [isTruncated, setIsTruncated] = useState(true);

  return (
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
          owner: {item.owner}
        </Text>
        <Heading fontSize="xl" color="black">
          {item.name}
        </Heading>
        <Button
          onClick={() => callback(item)}
          position="relative"
          colorScheme="teal"
          variant="outline"
          size="lg">
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
              {item.stars}
            </Text>
          </div>
        </Button>
      </Flex>
      <Flex direction="row">
        <Text
          width={isTruncated ? '85%' : '100%'}
          fontSize="small"
          mt={2}
          color="black"
          isTruncated={isTruncated}>
          {item.description}
          {!isTruncated && (
            <Text
              onClick={() => setIsTruncated(!isTruncated)}
              cursor="pointer"
              fontSize="small"
              mt={2}
              color="blue">
              Hide.
            </Text>
          )}
        </Text>
        {isTruncated && (
          <Text
            onClick={() => setIsTruncated(!isTruncated)}
            cursor="pointer"
            fontSize="small"
            mt={2}
            color="blue">
            see more.
          </Text>
        )}
      </Flex>
      <Flex direction="row" align="center" justify="space-between" mt={2}>
        <Badge colorScheme="green">{item.language}</Badge>
        <a href={item.link} target="_blank" rel="noreferrer">
          <Button colorScheme="blue">Go to</Button>
        </a>
      </Flex>
    </Box>
  );
};

export default RepositoryCard;
