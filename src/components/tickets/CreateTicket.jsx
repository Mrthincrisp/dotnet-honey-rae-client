import React from "react";
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { getEmployees } from "../../data/employeeAPI";
import { getCustomers } from "../../data/customerAPI";
import { createTicket } from "../../data/serviceTicketsData";
import { useNavigate } from "react-router-dom";

const initialState = {
  customerId: 0,
  employeeId: 0,
  description: '',
  emergency: false,
  dateComplete: null
};
export default function CreateTicket({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [customers, setCustomer] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getEmployees().then(setEmployees);
  }, [obj])

  useEffect(() => {
    getCustomers().then(setCustomer);
  }, [obj])

  const handleSubmit = (e) => {
    e.preventDefault();
      createTicket(formInput);
      navigate("/tickets/");
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
    <form onSubmit={handleSubmit}>
      <h2 className="mt-5">{obj.id ? 'Update' : 'Create'} Ticket</h2>
  
      <div className="form-group mb-3">
        <label htmlFor="customerSelect" className="form-label">Customer</label>
        <select
          id="customerSelect"
          aria-label="Customer"
          name="customerId"
          onChange={handleChange}
          className="form-select"
          value={formInput.customerId}
          required
          >
          <option value="">Select Customer</option>
          {
            customers.map((customer) => (
              <option
              key={customer.id}
              value={customer.id}
              >
                {customer.name}
              </option>
            ))
          }
        </select>
      </div>
  
      <div className="form-group mb-3">
        <label htmlFor="descriptionInput" className="form-label">Ticket Description</label>
        <input
          id="descriptionInput"
          type="text"
          placeholder="Enter problem"
          name="description"
          value={formInput.description}
          onChange={handleChange}
          className="form-control"
          required
          />
      </div>
  
      <div className="form-group mb-3">
        <label htmlFor="employeeSelect" className="form-label">Employee</label>
        <select
          id="employeeSelect"
          aria-label="Employee"
          name="employeeId"
          onChange={handleChange}
          className="form-select"
          value={formInput.employeeId}
          required
          >
          <option value="">Select Employee</option>
          {
            employees.map((employee) => (
              <option
              key={employee.id}
                value={employee.id}
                >
                {employee.name}
              </option>
            ))
          }
        </select>
      </div>
  
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
          </>
  );
}

CreateTicket.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    customerId: PropTypes.number,
    employeeId: PropTypes.number,
    description: PropTypes.string,
    emergency: PropTypes.bool,
  })
}

CreateTicket.defaultProps = {
  obj: initialState,
};
