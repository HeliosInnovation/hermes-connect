export const normalizePath = (path: string): string => {
  const hasProtocol = /^(http:\/\/|https:\/\/)/.test(path);

  if (!hasProtocol && !path.startsWith('/')) {
    path = `/${path}`;
  }

  // Remove trailing /
  return path.replace(/\/$/, '');
};
