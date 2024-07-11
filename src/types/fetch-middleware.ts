import type { Stack } from '../utils';
import type { HermesFetch } from './hermes-fetch';
import type { HermesRequest } from './request';

export type FetchMiddleware = (
  response: Response,
  requestsStack: Stack<HermesRequest>,
  _fetch: HermesFetch,
) => Promise<any> | undefined;
