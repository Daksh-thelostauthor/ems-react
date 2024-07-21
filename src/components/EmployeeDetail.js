import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';

const GET_EMPLOYEE_BY_ID = gql`
  query GetEmployeeById($id: ID!) {
    getEmployeeById(id: $id) {
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

const EmployeeDetail = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_EMPLOYEE_BY_ID, {
    variables: { id },
  });

  if (loading) return <Spinner />;
  if (error) return (
    <Alert status="error">
      <AlertIcon />
      {error.message}
    </Alert>
  );

  return (
    <Box>
      <Heading as="h2" mb={4}>Employee Details</Heading>
      <Text><strong>First Name:</strong> {data.getEmployeeById.firstName}</Text>
      <Text><strong>Last Name:</strong> {data.getEmployeeById.lastName}</Text>
      <Text><strong>Age:</strong> {data.getEmployeeById.age}</Text>
      <Text><strong>Date of Joining:</strong> {data.getEmployeeById.dateOfJoining}</Text>
      <Text><strong>Title:</strong> {data.getEmployeeById.title}</Text>
      <Text><strong>Department:</strong> {data.getEmployeeById.department}</Text>
      <Text><strong>Employee Type:</strong> {data.getEmployeeById.employeeType}</Text>
      <Text><strong>Current Status:</strong> {data.getEmployeeById.currentStatus ? 'Working' : 'Retired'}</Text>
    </Box>
  );
};

export default EmployeeDetail;
