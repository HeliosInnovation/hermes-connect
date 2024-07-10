export interface HermesRequest {
  input: string | URL | Request;
  init?: RequestInit;
  timeMills: number;
}
