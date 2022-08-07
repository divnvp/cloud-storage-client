import { api } from "./api.mock";

export async function auth(params) {
  const queryParams = new URLSearchParams(params);

  return await fetch(`${api.baseUrl}/cloud/auth?${queryParams}`, {
    method: "POST"
  });
}

export async function logout() {
  return await fetch(`${api.baseUrl}/cloud/logout`, {
    method: "POST"
  });
}
