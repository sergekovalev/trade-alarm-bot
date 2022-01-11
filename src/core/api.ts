import axios, { Method } from 'axios';
import qs from 'qs';

const makeRequest = (
  method: Method | undefined,
  url: string,
  query: any,
  body: any,
  headers: any
) =>
  axios({
    method,
    url: `${url}?${qs.stringify(query)}`,
    data: body,
    headers
  });

const api = {
  get: (url: string, { query = {}, headers = {} } = {}) => 
    makeRequest('GET', url, query, null, headers),
  post: (url: string, { query = {}, body = {}, headers = {} } = {}) =>
    makeRequest('POST', url, query, body, headers),
  put: (url: string, { query = {}, body = {}, headers = {} } = {}) =>
    makeRequest('PUT', url, query, body, headers),
  delete: (url: string, { query = {}, body = {}, headers = {} } = {}) =>
    makeRequest('DELETE', url, query, body, headers),
};

export default api;
