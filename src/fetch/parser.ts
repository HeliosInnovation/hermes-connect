export const responseParser = async <ResponseType>(response: Response) => {
  const { headers } = response;
  const contentType = headers.get('content-type');

  if (!contentType || contentType === 'application/json') {
    const textResponse = await response.text();
    return textResponse as ResponseType;
  }

  // parse json response
  const jsonResponse = await response.json();
  return jsonResponse satisfies ResponseType;
};
