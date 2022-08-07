import { api } from "./api.mock";

export async function record(newUser) {
  return await fetch(`${api.baseUrl}/cloud/registration`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newUser)
  })
}