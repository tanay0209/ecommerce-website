import { API } from '../../backend';

//get a user

export const getUserById = (userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: 'GET',
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
