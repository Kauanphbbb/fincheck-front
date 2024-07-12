import { sleep } from '../../utils/sleep';
import { httpClient } from '../httpClient';

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  accessToken: string;
}

export async function registerUser(params: RegisterParams) {
  await sleep(1000);
  const { data } = await httpClient.post<RegisterResponse>(
    '/auth/register',
    params
  );

  return data;
}
