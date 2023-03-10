import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const organizationUserService = {
  archive,
  unarchive,
  create,
  changeRole,
  inviteBulkUsers,
};

function create(first_name, last_name, email) {
  const body = {
    first_name,
    last_name,
    email,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization_users`, requestOptions).then(handleResponse);
}

function inviteBulkUsers(formData, token) {
  const requestOptions = { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: formData };
  return fetch(`${config.apiUrl}/organization_users/upload_csv`, requestOptions).then(handleResponse);
}

// Deprecated
function changeRole(id, role) {
  const body = {
    role,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization_users/${id}/change_role`, requestOptions).then(handleResponse);
}

function archive(id) {
  const requestOptions = { method: 'POST', headers: authHeader() };
  return fetch(`${config.apiUrl}/organization_users/${id}/archive`, requestOptions).then(handleResponse);
}

function unarchive(id) {
  const requestOptions = { method: 'POST', headers: authHeader() };
  return fetch(`${config.apiUrl}/organization_users/${id}/unarchive`, requestOptions).then(handleResponse);
}
