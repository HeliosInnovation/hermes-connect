export interface Connector {
  get: <ResType>(endpoint: string, signal?: AbortSignal) => Promise<ResType>;
  post: <ReqType, ResType>(
    endpoint: string,
    data: ReqType,
    signal?: AbortSignal,
  ) => Promise<ResType>;
  put: <ReqType, ResType>(
    endpoint: string,
    data: Partial<ReqType>,
    signal?: AbortSignal,
  ) => Promise<ResType>;
  patch: <ReqType, ResType>(
    endpoint: string,
    data: Partial<ReqType>,
    signal?: AbortSignal,
  ) => Promise<ResType>;
  delete: <ResType>(endpoint: string, signal?: AbortSignal) => Promise<ResType>;
}
