import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { Link } from "react-router-dom";
import { getCustomers } from "../../data/customerAPI";

export default function CustomerList() {
  const [customer, setCustomer] = useState([])

  useEffect(() => {
    getCustomers().then(setCustomer);
  }, []);

  return (
    <Table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {customer.map((c) => (
          <tr key={`customer-${c.id}`}>
            <th scope="row">{c.id}</th>
            <td>{c.name}</td>
            <td>
              <Link to={`${c.id}`}>Details</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
