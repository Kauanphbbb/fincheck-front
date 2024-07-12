import { sleep } from '../../utils/sleep';
import { httpClient } from '../httpClient';

export interface AuthenticateParams {
  email: string;
  password: string;
}

interface AuthenticateResponse {
  accessToken: string;
}

export async function authenticate(params: AuthenticateParams) {
  await sleep(1000);
  const { data } = await httpClient.post<AuthenticateResponse>(
    '/auth/authenticate',
    params
  );

  return data;
}
