import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const tooljetService = {
  fetchMetaData,
  skipVersion,
  skipOnboarding,
  finishOnboarding,
};

async function fetchMetaData() {
  return { installed_version: '2.1.5', version_ignored: false };
}

function skipVersion() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/metadata/skip_version`, requestOptions).then(handleResponse);
}

function skipOnboarding() {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
  };

  return fetch(`${config.apiUrl}/metadata/skip_onboarding`, requestOptions).then(handleResponse);
}

function finishOnboarding(options) {
  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify({
      ...options,
    }),
  };

  return fetch(`${config.apiUrl}/metadata/finish_installation`, requestOptions).then(handleResponse);
}
