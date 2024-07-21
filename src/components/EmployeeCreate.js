import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_ALL_EMPLOYEES } from './EmployeeTable';
import { Box, Input, Button, FormControl, FormLabel, FormErrorMessage } from '@chakra-ui/react';

const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($firstName: String!, $lastName: String!, $age: Int!, $dateOfJoining: String!, $title: String!, $department: String!, $employeeType: String!, $currentStatus: Boolean!) {
    createEmployee(firstName: $firstName, lastName: $lastName, age: $age, dateOfJoining: $dateOfJoining, title: $title, department: $department, employeeType: $employeeType, currentStatus: $currentStatus) {
      id
      firstName
      lastName
    }
  }
`;

const EmployeeCreate = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    dateOfJoining: '',
    title: '',
    department: '',
    employeeType: '',
    currentStatus: true,
  });
  const [errors, setErrors] = useState({});

  const [createEmployee, { loading, error }] = useMutation(CREATE_EMPLOYEE, {
    refetchQueries: [{ query: GET_ALL_EMPLOYEES }],
  });

  const validate = () => {
    let tempErrors = {};
    if (!formData.firstName) tempErrors.firstName = "First Name is required";
    if (!formData.lastName) tempErrors.lastName = "Last Name is required";
    if (!formData.age) tempErrors.age = "Age is required";
    else if (formData.age < 20 || formData.age > 70) tempErrors.age = "Age must be between 20 and 70";
    if (!formData.dateOfJoining) tempErrors.dateOfJoining = "Date of Joining is required";
    if (!formData.title) tempErrors.title = "Title is required";
    if (!formData.department) tempErrors.department = "Department is required";
    if (!formData.employeeType) tempErrors.employeeType = "Employee Type is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        await createEmployee({
          variables: {
            ...formData,
            age: parseInt(formData.age, 10),  // Ensure age is an integer
          }
        });
        alert('Employee created successfully!');
        setFormData({
          firstName: '',
          lastName: '',
          age: '',
          dateOfJoining: '',
          title: '',
          department: '',
          employeeType: '',
          currentStatus: true,
        });
      } catch (err) {
        console.error('Error creating employee:', err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box mb={4}>
      <form onSubmit={handleSubmit}>
        <FormControl isInvalid={errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <Input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" />
          {errors.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.lastName} mt={4}>
          <FormLabel>Last Name</FormLabel>
          <Input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" />
          {errors.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.age} mt={4}>
          <FormLabel>Age</FormLabel>
          <Input name="age" type="number" value={formData.age} onChange={handleChange} placeholder="Age" />
          {errors.age && <FormErrorMessage>{errors.age}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.dateOfJoining} mt={4}>
          <FormLabel>Date of Joining</FormLabel>
          <Input name="dateOfJoining" type="date" value={formData.dateOfJoining} onChange={handleChange} placeholder="Date of Joining" />
          {errors.dateOfJoining && <FormErrorMessage>{errors.dateOfJoining}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.title} mt={4}>
          <FormLabel>Title</FormLabel>
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          {errors.title && <FormErrorMessage>{errors.title}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.department} mt={4}>
          <FormLabel>Department</FormLabel>
          <Input name="department" value={formData.department} onChange={handleChange} placeholder="Department" />
          {errors.department && <FormErrorMessage>{errors.department}</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={errors.employeeType} mt={4}>
          <FormLabel>Employee Type</FormLabel>
          <Input name="employeeType" value={formData.employeeType} onChange={handleChange} placeholder="Employee Type" />
          {errors.employeeType && <FormErrorMessage>{errors.employeeType}</FormErrorMessage>}
        </FormControl>
        <Button mt={4} colorScheme="teal" type="submit">Create Employee</Button>
      </form>
    </Box>
  );
};

export default EmployeeCreate;
