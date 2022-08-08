import {api} from "./api.mock";

export async function createFolder(newFolder) {
  return await fetch(`${api.baseUrl}/cloud/folder/create`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(newFolder)
  });
}