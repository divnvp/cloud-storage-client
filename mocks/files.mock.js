import { api } from "./api.mock";

export async function createFile(newFile) {
  return await fetch(`${api.baseUrl}/cloud/file/create`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newFile)
  });
}