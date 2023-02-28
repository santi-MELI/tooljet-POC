import { authenticationService } from '@/_services';

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.auth_token) {
    return {
      Authorization: `Bearer ${currentUser.auth_token}`,
      'Content-Type': 'application/json',
    };
  }
  return {
    'Content-Type': 'application/json',
  };
}
