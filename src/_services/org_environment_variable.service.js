import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const orgEnvironmentVariableService = {
  getVariables,
  getVariablesFromPublicApp,
  create,
  update,
  deleteVariable,
};

async function getVariables() {
  return { variables: [] };
}

function getVariablesFromPublicApp(slug) {
  const requestOptions = { method: 'GET' };
  return fetch(`${config.apiUrl}/organization-variables/${slug}`, requestOptions).then(handleResponse);
}

function create(variable_name, value, variable_type, encrypted) {
  const body = {
    variable_name,
    value,
    variable_type,
    encrypted,
  };

  const requestOptions = { method: 'POST', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization-variables`, requestOptions).then(handleResponse);
}

function update(id, variable_name, value) {
  const body = {
    variable_name,
    value,
  };

  const requestOptions = { method: 'PATCH', headers: authHeader(), body: JSON.stringify(body) };
  return fetch(`${config.apiUrl}/organization-variables/${id}`, requestOptions).then(handleResponse);
}

function deleteVariable(id) {
  const requestOptions = { method: 'DELETE', headers: authHeader() };
  return fetch(`${config.apiUrl}/organization-variables/${id}`, requestOptions).then(handleResponse);
}
