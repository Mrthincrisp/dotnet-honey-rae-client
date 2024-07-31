import React from "react";
import { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { deleteTicket, getServiceTickets, putTicket } from "../../data/serviceTicketsData";
import { Link } from "react-router-dom";

export default function TicketsList() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    getServiceTickets().then(setTickets);
  }, []);

  const handleDelete = async (id) =>{
    if (window.confirm(`delete that ticket?  You know the one...`)) {
      deleteTicket(id)
      .then(() => getServiceTickets())
      .then((tickets) => setTickets(tickets));
    };  
  };
  
  const handleComplete = async (id) => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const updated = tickets.map((t) => {
      if (t.id === id ){
        return { ...t, dateComplete: date};
      }
      return t;
    });
    const payload = updated.find((t) => t.id === id);
      putTicket(id, payload)
      .then(() => getServiceTickets())
      .then((tickets) => setTickets(tickets));
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Description</th>
          <th>Emergency?</th>
          <th>Date Completed</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((t) => (
          <tr key={`ticket-${t.id}`}>
            <th scope="row">{t.id}</th>
            <td>{t.description}</td>
            <td>{t.emergency ? "yes" : "no"}</td>
            <td>{t.dateComplete?.split("T")[0] || "Incomplete"}</td>
            <td>
              <Link to={`${t.id}`}>Details</Link>
            </td>
            <td>
              <Button variant="danger" onClick={() => handleDelete(t.id)}>Delete</Button>
            </td>
            <td>
              { t.dateComplete == null && t.employeeId != null ? 
                <Button onClick={() => handleComplete(t.id)}>Complete</Button> : null
              }
            </td>
          </tr>

        ))}
      </tbody>
    </Table>
  );
}
