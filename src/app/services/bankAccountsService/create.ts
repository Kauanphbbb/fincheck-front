import { sleep } from '../../utils/sleep';
import { httpClient } from '../httpClient';

export interface BankAccountParams {
  email: string;
  password: string;
}

export async function authenticate(params: BankAccountParams) {
  await sleep(1000);
  const { data } = await httpClient.post(
    '/auth/authenticate',
    params
  );

  return data;
}
