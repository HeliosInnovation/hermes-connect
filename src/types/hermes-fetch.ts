export type HermesFetch = <ResType>(
  input: Request | URL | string,
  init?: RequestInit | undefined,
  source?: 'middleware' | 'origin',
) => Promise<ResType>;
