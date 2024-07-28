const URL = "/api/employees";

export const getEmployees = () => {
  return fetch(URL).then((r) => r.json());
};

export const getEmployeeID = (id) => {
  return fetch(`${URL}/${id}`).then((r) => r.json());
};
