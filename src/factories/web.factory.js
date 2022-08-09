export async function makeRequest(request) {
  let value = null;

  try {
    value = await request;

    return value;
  } catch(e) {
    alert(e);
  }
}
