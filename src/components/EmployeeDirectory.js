import React, { useState } from 'react';
import EmployeeSearch from './EmployeeSearch';
import EmployeeTable from './EmployeeTable';

const EmployeeDirectory = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div>
      <EmployeeSearch onSearch={handleSearch} />
      <EmployeeTable searchTerm={searchTerm} />
    </div>
  );
};

export default EmployeeDirectory;
