import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Flex, Button, Stack, useColorMode, useColorModeValue } from '@chakra-ui/react';

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <Box>EMS</Box>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button as={Link} to="/">Home</Button>
            <Button as={Link} to="/create">Create Employee</Button>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? 'Dark' : 'Light'} Mode
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;
