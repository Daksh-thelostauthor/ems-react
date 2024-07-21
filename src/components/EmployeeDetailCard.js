import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Box, Avatar, Text, Input, Button, FormControl, FormLabel, useToast } from '@chakra-ui/react';
import { GET_ALL_EMPLOYEES } from './EmployeeTable';

const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee($id: ID!, $firstName: String, $lastName: String, $age: Int, $dateOfJoining: String, $title: String, $department: String, $employeeType: String, $currentStatus: Boolean) {
    updateEmployee(id: $id, firstName: $firstName, lastName: $lastName, age: $age, dateOfJoining: $dateOfJoining, title: $title, department: $department, employeeType: $employeeType, currentStatus: $currentStatus) {
      id
      firstName
      lastName
    }
  }
`;

const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($id: ID!) {
    deleteEmployee(id: $id)
  }
`;

const EmployeeDetailCard = ({ employee, onClose }) => {
  const [formData, setFormData] = useState(employee);
  const toast = useToast();
  const [updateEmployee] = useMutation(UPDATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    onCompleted: () => {
      toast({
        title: "Employee updated.",
        description: "The employee details have been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error updating employee.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const [deleteEmployee] = useMutation(DELETE_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
    onCompleted: () => {
      toast({
        title: "Employee deleted.",
        description: "The employee has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Error deleting employee.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = () => {
    updateEmployee({ variables: { ...formData, age: parseInt(formData.age) } });
  };

  const handleDelete = () => {
    deleteEmployee({ variables: { id: formData.id } });
  };

  return (
    <Box p={4} borderWidth={1} borderRadius="lg" overflow="hidden">
      <FormControl mb={4}>
        <FormLabel>First Name</FormLabel>
        <Input name="firstName" value={formData.firstName} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Last Name</FormLabel>
        <Input name="lastName" value={formData.lastName} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Age</FormLabel>
        <Input name="age" type="number" value={formData.age} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Date of Joining</FormLabel>
        <Input name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Title</FormLabel>
        <Input name="title" value={formData.title} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Department</FormLabel>
        <Input name="department" value={formData.department} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Employee Type</FormLabel>
        <Input name="employeeType" value={formData.employeeType} onChange={handleChange} />
      </FormControl>
      <FormControl mb={4}>
        <FormLabel>Current Status</FormLabel>
        <Input name="currentStatus" type="checkbox" checked={formData.currentStatus} onChange={(e) => setFormData({ ...formData, currentStatus: e.target.checked })} />
      </FormControl>
      <Button colorScheme="teal" onClick={handleUpdate} mr={3}>Update</Button>
      <Button colorScheme="red" onClick={handleDelete}>Delete</Button>
    </Box>
  );
};

export default EmployeeDetailCard;
