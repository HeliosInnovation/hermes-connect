export const normalizeBaseUrl = (baseUrl: string): string => {
  const hasProtocol = /^(http:\/\/|https:\/\/)/.test(baseUrl);

  if (!hasProtocol) {
    throw new Error('base url must start with `http://` or `https://`');
  }

  // Remove trailing /
  return baseUrl.replace(/\/$/, '');
};
