import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const userService = {
  getAll,
  createUser,
  deleteUser,
  updateCurrentUser,
  changePassword,
  getAvatar,
  updateAvatar,
};

function getAll() {
  return {
    users: [
      {
        email: 'sanruiz1003@gmail.com',
        first_name: 'prueba',
        last_name: null,
        name: 'prueba null',
        id: 'b4080f24-4479-44b1-b127-43c3a1f41961',
        role: 'admin',
      },
    ],
  };
}

function getAvatar(id) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/files/${id}`, requestOptions)
    .then((response) => response.blob())
    .then((blob) => blob);
}

function updateAvatar(formData, token) {
  const requestOptions = {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  };
  return fetch(`${config.apiUrl}/users/avatar`, requestOptions).then(handleResponse);
}

function createUser(first_name, last_name, email, role) {
  const body = {
    first_name,
    last_name,
    email,
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function deleteUser(id) {
  const requestOptions = { method: 'DELETE', headers: authHeader(), body: JSON.stringify({}) };
  return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function updateCurrentUser(firstName, lastName) {
  const body = { first_name: firstName, last_name: lastName };
  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/users/update`, requestOptions).then(handleResponse);
}

function changePassword(currentPassword, newPassword) {
  const body = { currentPassword, newPassword };
  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/users/change_password`, requestOptions).then(handleResponse);
}
