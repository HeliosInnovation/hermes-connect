import type { FetchMiddleware } from '../types';

export const repeatRequest: FetchMiddleware = (_, requestsStack, _fetch) => {
  const lastRequest = requestsStack.top();

  if (!lastRequest) {
    throw new Error('Empty Request Stack');
  }

  if (lastRequest.source !== 'origin') return;

  return _fetch<any>(lastRequest.input, lastRequest.init, 'middleware');
};
