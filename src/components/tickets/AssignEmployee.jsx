import React, { useEffect, useState } from 'react'
import { getEmployees } from '../../data/employeeAPI';
import PropTypes from 'prop-types';
import { Form } from 'reactstrap';

export default function AssignEmployee({ ticket }) {
  const [formInput, setFormInput] = useState ({ticket})
  const [employees, setEmployees] = useState ([]);

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, [ticket])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Assign an Employee</Form.Label>
        <Form.Select
          required
          name="employeeId"
          value={formInput.employeeId}
          onChange={handleChange}
        >
          {employees.map((employee) => (
            <option
              key={employee.id}
              value={employee.id}
            >
              {employee.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
    </Form>
  );
}

AssignEmployee.propTypes = {
  ticket: PropTypes.shape({
    employeeId: PropTypes.number,
  })
}.isRequired
