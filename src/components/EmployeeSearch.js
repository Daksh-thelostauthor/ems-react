import React, { useState } from 'react';
import { Box, Input, Button } from '@chakra-ui/react';

const EmployeeSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <Box mb={4}>
      <Input
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <Button mt={2} onClick={handleSearch}>Search</Button>
    </Box>
  );
};

export default EmployeeSearch;
