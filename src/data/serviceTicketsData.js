const _apiUrl = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(_apiUrl).then((r) => r.json());
};

export const getServiceTicketID = (id) => {
  console.warn("id", id)
  const URL = `/api/servicetickets/${id}`;
  return fetch(URL).then((r) => r.json());
}
//export a function here that gets a ticket by id
