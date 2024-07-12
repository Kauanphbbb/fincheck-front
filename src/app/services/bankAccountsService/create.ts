import { httpClient } from '../httpClient';

export interface BankAccountParams {
  name: string;
  initialBalance: number;
  color: string;
  type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export async function create(params: BankAccountParams) {
  const { data } = await httpClient.post('/auth/bank-accounts', params);

  return data;
}
