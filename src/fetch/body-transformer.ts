export const bodyTransformer = (body?: BodyInit | null) => {
  if (body && typeof body === 'object') {
    return JSON.stringify(body);
  }

  return body;
};
