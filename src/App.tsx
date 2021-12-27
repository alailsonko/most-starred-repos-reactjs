import React, { Suspense } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

import { RecoilRoot } from 'recoil';
import RoutesApp from './routes';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <RoutesApp />
        </Suspense>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
