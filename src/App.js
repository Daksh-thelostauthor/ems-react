import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import client from './apolloClient';
import EmployeeDirectory from './components/EmployeeDirectory';
import EmployeeDetail from './components/EmployeeDetail';
import EmployeeCreate from './components/EmployeeCreate';
import Navbar from './components/Navbar';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Box>
            <Navbar />
            <Container maxW="container.xl">
              <Routes>
                <Route path="/" element={<EmployeeDirectory />} />
                <Route path="/employee/:id" element={<EmployeeDetail />} />
                <Route path="/create" element={<EmployeeCreate />} />
              </Routes>
            </Container>
          </Box>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
