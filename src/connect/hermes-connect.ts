import type { Connector, HermesFetch } from '../types';
import { bodyTransformer } from '../utils';

export class HermesConnect implements Connector {
  public constructor(private hermesFetch: HermesFetch) {}

  public get<ResType>(endpoint: string, signal?: AbortSignal) {
    return this.hermesFetch<ResType>(endpoint, { signal, method: 'GET' });
  }

  public post<ReqType, ResType>(
    endpoint: string,
    data: ReqType,
    signal?: AbortSignal,
  ) {
    return this.hermesFetch<ResType>(endpoint, {
      signal,
      method: 'POST',
      body: bodyTransformer(data),
    });
  }

  public put<ReqType, ResType>(
    endpoint: string,
    data: Partial<ReqType>,
    signal?: AbortSignal,
  ) {
    return this.hermesFetch<ResType>(endpoint, {
      signal,
      method: 'PUT',
      body: bodyTransformer(data),
    });
  }

  public patch<ReqType, ResType>(
    endpoint: string,
    data: Partial<ReqType>,
    signal?: AbortSignal,
  ) {
    return this.hermesFetch<ResType>(endpoint, {
      signal,
      method: 'PATCH',
      body: bodyTransformer(data),
    });
  }

  public delete<ResType>(endpoint: string, signal?: AbortSignal) {
    return this.hermesFetch<ResType>(endpoint, {
      signal,
      method: 'DELETE',
    });
  }
}
