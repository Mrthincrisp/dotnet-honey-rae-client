const URL = "/api/customers";

export const getCustomers = () => {
  return fetch(URL).then((r) => r.json());
};

export const getCustomerID = (id) => {
  console.warn("API id", id);
  return fetch(`${URL}/${id}`).then((r) => r.json());
};
