const Url = "/api/servicetickets";

export const getServiceTickets = () => {
  return fetch(Url).then((r) => r.json());
};

export const getServiceTicketID = (id) => {
    return fetch(`${Url}/${id}`).then((r) => r.json());
};

export const createTicket = async (payload) => {
  const response = await fetch(Url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return data;
};

export const putTicket = async (payload) => {
  const response = await fetch(Url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json();
  return data;
};
