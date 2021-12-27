import { ChakraProvider } from '@chakra-ui/react';

import { RecoilRoot } from 'recoil';
import RoutesApp from './routes';

function App() {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <RoutesApp />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
