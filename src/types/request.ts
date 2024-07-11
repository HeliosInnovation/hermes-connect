export interface HermesRequest {
  url: Request | URL | string;
  input: Request | URL | string;
  init?: RequestInit;
  timeMills: number;
  source: 'middleware' | 'origin';
}
