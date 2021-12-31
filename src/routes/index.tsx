import { Spinner } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = React.lazy(() => import('../pages/Home'));

export default function RoutesApp() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <Spinner
            right="50%"
            top="50%"
            position="absolute"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        }>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
