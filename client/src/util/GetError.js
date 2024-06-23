export function getErrorMessage(error) {
  const msg = error.response && error.response.data && error.response.data.message
    ? error.response.data.message
    : error.message
    ? error.message
    : "An unexpected error occurred";
  return msg;
}