import config from 'config';
import { authHeader, handleResponse, handleResponseWithoutValidation } from '@/_helpers';
import queryString from 'query-string';

export const organizationService = {
  getUsers,
  getUsersByValue,
  createOrganization,
  editOrganization,
  getOrganizations,
  switchOrganization,
  getSSODetails,
  editOrganizationConfigs,
};

function getUsers(page, options) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  const { firstName, lastName, email, status } = options;
  const query = queryString.stringify({ page, firstName, lastName, email, status });

  return fetch(`${config.apiUrl}/organizations/users?${query}`, requestOptions).then(handleResponse);
}

function getUsersByValue(searchInput) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/organizations/users/suggest?input=${searchInput}`, requestOptions).then(
    handleResponse
  );
}

function createOrganization(name) {
  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify({ name }) };
  return fetch(`${config.apiUrl}/organizations`, requestOptions).then(handleResponse);
}

function editOrganization(params) {
  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(params) };
  return fetch(`${config.apiUrl}/organizations/`, requestOptions).then(handleResponse);
}

function getOrganizations() {
  return {
    organizations: [
      {
        id: '02e302dd-e3a4-4661-9cf7-4d569b8236e6',
        name: 'builder',
        domain: null,
        enable_sign_up: false,
        inherit_s_s_o: true,
        created_at: '2023-02-27T16:34:50.425Z',
        updated_at: '2023-02-27T16:34:50.425Z',
      },
    ],
  };
}

function switchOrganization(organizationId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/switch/${organizationId}`, requestOptions).then(handleResponseWithoutValidation);
}

function getSSODetails() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/organizations/configs`, requestOptions).then(handleResponse);
}

function editOrganizationConfigs(params) {
  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(params) };
  return fetch(`${config.apiUrl}/organizations/configs`, requestOptions).then(handleResponse);
}
