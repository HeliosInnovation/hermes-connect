import { FetchMiddleware, HermesRequest } from '../types';
import { Stack, normalizeBaseUrl, normalizePath } from '../utils';
import { bodyTransformer } from './body-transformer';
import { errorChecker } from './error-check';
import { responseParser } from './response-parser';

export const makeHermesFetch = (
  baseUrl?: string,
  defaultHeaders?: HeadersInit,
  middlewares?: FetchMiddleware[],
) => {
  const normalizedBaseUrl = baseUrl ? normalizeBaseUrl(baseUrl) : '';
  const requestsStack = new Stack<HermesRequest>(10);

  const hermesFetch = async <ResponseType>(
    input: string | URL | Request,
    init?: RequestInit | undefined,
  ): Promise<ResponseType> => {
    // Prepare data for fetch
    const normalizedPath =
      typeof input === 'string' ? normalizePath(input) : null;
    const requestInput =
      typeof input === 'string'
        ? `${normalizedBaseUrl}${normalizedPath}`
        : input;

    if (init?.body) {
      init.body = bodyTransformer(init.body);
    }

    const headers = { ...defaultHeaders, ...(init?.headers ?? {}) };
    const requestInit = { headers, ...(init ?? {}) };

    // Save request data in the stack for future uses
    requestsStack.push({
      input: requestInput,
      init: requestInit,
      timeMills: Date.now(),
    });

    // Send fetch request
    const response = await fetch(requestInput, requestInit);

    // Check fetch errors
    errorChecker(response);

    // Run middlewares
    middlewares?.forEach((middleware) => {
      middleware(response);
    });

    return responseParser<ResponseType>(response);
  };

  return { hermesFetch, requestsStack };
};
