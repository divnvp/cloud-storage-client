import { api } from "./api.mock";

export async function fetchUsers() {
  const response = fetch(`${api.baseUrl}/cloud/users`);

  return (await response).json();
}