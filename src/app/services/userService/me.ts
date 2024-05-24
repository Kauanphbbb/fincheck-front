import { httpClient } from "../httpClient";

interface MeResponse {
  id: string;
  name: string;
  email: string;
}

export async function me() {
  const { data } = await httpClient.get<MeResponse>("/users/me");

  return data;
}
