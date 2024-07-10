import { normalizeBaseUrl, normalizePath } from './utils';

export const makeHermesFetch = (
  baseUrl?: string,
  defaultHeaders?: HeadersInit,
) => {
  const normalizedBaseUrl = baseUrl ? normalizeBaseUrl(baseUrl) : '';
  return (input: string | URL | Request, init?: RequestInit | undefined) => {
    const normalizedPath =
      typeof input === 'string' ? normalizePath(input) : null;
    const requestInput =
      typeof input === 'string'
        ? `${normalizedBaseUrl}${normalizedPath}`
        : input;

    const headers = { ...defaultHeaders, ...(init?.headers ?? {}) };

    return fetch(requestInput, { headers, ...(init ?? {}) });
  };
};
