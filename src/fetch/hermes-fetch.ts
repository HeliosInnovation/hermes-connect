import type { FetchMiddleware, HermesFetch, HermesRequest } from '../types';
import { normalizeBaseUrl, normalizePath, Stack } from '../utils';
import { errorChecker } from './error-check';
import { responseParser } from './response-parser';

export const makeHermesFetch = (
  baseUrl?: string,
  defaultHeaders?: HeadersInit,
  middleware?: FetchMiddleware,
) => {
  const normalizedBaseUrl = baseUrl ? normalizeBaseUrl(baseUrl) : '';
  const requestsStack = new Stack<HermesRequest>();

  const hermesFetch: HermesFetch = async <ResType>(
    input: Request | URL | string,
    init?: RequestInit | undefined,
    source?: 'middleware' | 'origin',
  ): Promise<ResType> => {
    // Prepare data for fetch
    const normalizedPath =
      typeof input === 'string' ? normalizePath(input) : null;
    const requestUrl = normalizedPath
      ? `${normalizedBaseUrl}${normalizedPath}`
      : input;

    const headers = { ...defaultHeaders, ...(init?.headers ?? {}) };
    const requestInit = { headers, ...(init ?? {}) };

    // Save request data in the stack for future uses
    requestsStack.push({
      url: requestUrl,
      input,
      init: requestInit,
      timeMills: Date.now(),
      source: source ?? 'origin',
    });

    // Send fetch request
    const response = await fetch(requestUrl, requestInit);

    // Run middlewares
    const middleResponses = middleware
      ? await middleware(response, requestsStack, hermesFetch)
      : undefined;

    if (middleResponses !== undefined) {
      return middleResponses satisfies ResType;
    }

    // Check fetch errors
    errorChecker(response);

    return responseParser<ResType>(response);
  };

  return { hermesFetch, requestsStack };
};
