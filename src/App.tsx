import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import RoutesApp from './routes';

function App() {
  return (
    <ChakraProvider>
      <RoutesApp />
    </ChakraProvider>
  );
}

export default App;
