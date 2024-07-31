import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceTicketID, putTicket } from "../../data/serviceTicketsData";
import { getEmployees } from "../../data/employeeAPI";
import { Table } from "reactstrap";

export default function TicketDetails() {
  const { id } = useParams();
  const [employees, setEmployees] = useState ([]);
  const [ticket, setTicket] = useState(null);
  const [showAssignEmployee, setShowAssignEmployee] = useState(false);
  const [formInput, setFormInput] = useState({});

  //add useEffect here to get the ticket details from the API
  useEffect(() => {
    getServiceTicketID(id).then(setTicket);
  },[ticket])

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setShowAssignEmployee(false)
    const updatedTicket = { ...ticket, employeeId: formInput.employeeId };
      const response = await putTicket(id, updatedTicket);
      const updateData = await response.json();
      setTicket(updateData);
      await getServiceTicketID(updateData.id);
  };

  if (!ticket) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Customer</th>
          <td>{ticket.customer.name}</td>
        </tr>
        <tr>
          <th scope="row">Description</th>
          <td>{ticket.description}</td>
        </tr>
        <tr>
          <th scope="row">Emergency</th>
          <td>{ticket.emergency ? "yes" : "no"}</td>
        </tr>
        <tr>
          <th scope="row">Employee</th>
          <td>
            {ticket.employee?.name ? (
              ticket.employee.name
            ) : (
              <button onClick={() => setShowAssignEmployee(true)}>Assign Employee</button>
            )}
      {showAssignEmployee && (
        <tfoot>
          <tr>
            <td colSpan="2">
              <form onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="employeeId"></label>
                  <select
                    id="employeeId"
                    name="employeeId"
                    value={formInput.employeeId || ""}
                    onChange={handleChange}
                    required
                    >
                    <option value="" disabled>
                      Select an employee
                    </option>
                    {employees.map((employee) => (
                      <option key={employee.id} value={employee.id}>
                        {employee.name}
                      </option>
                    ))}
                  </select>
                </div>
                <button type="submit">Assign</button>
              </form>
            </td>
          </tr>
        </tfoot>
      )}
          </td>
        </tr>
        <tr>
          <th scope="row">Completed?</th>
          <td>{ticket.dateComplete?.split("T")[0] || "Incomplete"}</td>
        </tr>
      </tbody>
  </Table>
  );
}
