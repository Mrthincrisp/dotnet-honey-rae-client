import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getEmployeeID } from "../../data/employeeAPI";

export default function employeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] = useState(null);

  //add useEffect here to get the employee details from the API
  useEffect(() => {
    getEmployeeID(id).then(setEmployee);
  },[id])

  if (!employee) {
    return null;
  }

  return (
    <Table>
      <tbody>
        <tr>
          <th scope="row">Name</th>
          <td>{employee.name}</td>
        </tr>
        <tr>
          <th scope="row">Specialty</th>
          <td>{employee.specialty}</td>
        </tr>
        {employee.serviceTickets ? (
          employee.serviceTickets.map(ticket => (
            <>
              <tr>
                <th scope="row">Ticket ID</th>
                <td>{ticket.id}</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>{ticket.description}</td>
              </tr>
              <tr>
                <th scope="row">Completed?</th>
                <td>{ticket.dateComplete?.split("T")[0] || "Incomplete"}</td>
              </tr>
            </>
          ))
        ) : (
          <tr>
            <th scope="row">Service Tickets</th>
            <td>No service tickets available</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}
