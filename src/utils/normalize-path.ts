export const normalizePath = (path: string): string => {
  const hasProtocol = /^(http:\/\/|https:\/\/)/.test(path);

  if (!hasProtocol && path[0] !== '/') {
    path = '/' + path;
  }

  // Remove trailing /
  return path.replace(/\/$/, '');
};
