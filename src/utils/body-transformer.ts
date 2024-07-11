export const bodyTransformer = (body?: any) => {
  if (body && typeof body === 'object') {
    return JSON.stringify(body);
  }

  return body as BodyInit | null;
};
