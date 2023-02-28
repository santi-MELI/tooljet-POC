import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const appVersionService = {
  getAll,
  getOne,
  create,
  del,
  save,
};

async function getAll(appId) {
  return {
    versions: [
      {
        id: '00bd87ff-fbed-4072-ac6f-596318431ea8',
        name: 'v1',
        definition: null,
        appId: '6a1ced49-000b-4fd9-9d45-a6b9c6bb6fca',
        createdAt: '2023-02-27T21:09:52.287Z',
        updatedAt: '2023-02-27T21:09:52.287Z',
      },
    ],
  };
  // const requestOptions = { method: 'GET', headers: authHeader() };
  // return fetch(`${config.apiUrl}/apps/${appId}/versions`, requestOptions).then(handleResponse);
}

function getOne(appId, versionId) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/apps/${appId}/versions/${versionId}`, requestOptions).then(handleResponse);
}

function create(appId, versionName, versionFromId) {
  const body = {
    versionName,
    versionFromId,
  };

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(body),
  };
  return fetch(`${config.apiUrl}/apps/${appId}/versions`, requestOptions).then(handleResponse);
}

function del(appId, versionId) {
  const requestOptions = {
    method: 'DELETE',
    headers: authHeader(),
  };
  return fetch(`${config.apiUrl}/apps/${appId}/versions/${versionId}`, requestOptions).then(handleResponse);
}

async function save(appId, versionId, values) {
  // const body = {};
  // if (values.definition) body['definition'] = values.definition;
  // if (values.name) body['name'] = values.name;

  // const requestOptions = {
  //   method: 'PUT',
  //   headers: authHeader(),
  //   body: JSON.stringify(body),
  // };
  // return fetch(`${config.apiUrl}/apps/${appId}/versions/${versionId}`, requestOptions).then(handleResponse);
  return true;
}
