import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, Thead, Tbody, Tr, Th, Td, Spinner, Alert, AlertIcon, Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';
import EmployeeDetailCard from './EmployeeDetailCard';

export const GET_ALL_EMPLOYEES = gql`
  query GetAllEmployees {
    getAllEmployees {
      id
      firstName
      lastName
      age
      dateOfJoining
      title
      department
      employeeType
      currentStatus
    }
  }
`;

const EmployeeTable = ({ searchTerm }) => {
  const { loading, error, data } = useQuery(GET_ALL_EMPLOYEES);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  if (loading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );

  const filteredEmployees = data.getAllEmployees.filter(employee =>
    employee.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (employee) => {
    setSelectedEmployee(employee);
    onOpen();
  };

  return (
    <>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Age</Th>
            <Th>Date of Joining</Th>
            <Th>Title</Th>
            <Th>Department</Th>
            <Th>Employee Type</Th>
            <Th>Current Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredEmployees.map(employee => (
            <Tr key={employee.id}>
              <Td>{employee.firstName}</Td>
              <Td>{employee.lastName}</Td>
              <Td>{employee.age}</Td>
              <Td>{employee.dateOfJoining}</Td>
              <Td>{employee.title}</Td>
              <Td>{employee.department}</Td>
              <Td>{employee.employeeType}</Td>
              <Td>{employee.currentStatus ? 'Working' : 'Retired'}</Td>
              <Td>
                <Button size="sm" colorScheme="teal" onClick={() => handleViewClick(employee)}>View</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {selectedEmployee && (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Employee Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <EmployeeDetailCard employee={selectedEmployee} onClose={onClose} />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="red" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default EmployeeTable;
