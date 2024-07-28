import { Link, Outlet } from "react-router-dom";

export default function Customer() {
  return(
    <>
    <h2>Customers</h2>
    <Link to="/customer/create">Add</Link>
    <Outlet/>
    </>
  )
}
