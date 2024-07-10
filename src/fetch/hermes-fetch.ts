import { FetchMiddleware, HermesRequest } from '../types';
import { Stack, normalizeBaseUrl, normalizePath } from '../utils';
import { errorChecker } from './error-check';

export const makeHermesFetch = (
  baseUrl?: string,
  defaultHeaders?: HeadersInit,
  middlewares?: FetchMiddleware[],
) => {
  const normalizedBaseUrl = baseUrl ? normalizeBaseUrl(baseUrl) : '';
  const requestsStack = new Stack<HermesRequest>(10);

  const hermesFetch = async (
    input: string | URL | Request,
    init?: RequestInit | undefined,
  ) => {
    const normalizedPath =
      typeof input === 'string' ? normalizePath(input) : null;
    const requestInput =
      typeof input === 'string'
        ? `${normalizedBaseUrl}${normalizedPath}`
        : input;

    const headers = { ...defaultHeaders, ...(init?.headers ?? {}) };
    const requestInit = { headers, ...(init ?? {}) };

    requestsStack.push({ input: requestInput, init: requestInit });

    const response = await fetch(requestInput, requestInit);

    errorChecker(response);

    middlewares?.forEach((middleware) => {
      middleware(response);
    });

    return response;
  };

  return { hermesFetch, requestsStack };
};
