import { makeHermesFetch } from './fetch';

const { hermesFetch, requestsStack } = makeHermesFetch(
  'https://api.restful-api.dev',
  {},
);
hermesFetch('/objects').then(console.log).catch(console.error);

console.log('requestsStack', requestsStack);
