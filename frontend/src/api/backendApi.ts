import config from '@/config';

const kyPromise = import('ky');

export type Method = 'get' | 'post' | 'put' | 'delete';
export type Params = { [key: string]: string };

type Body = any;

async function makeRequest<T = any>(
  method: Method,
  url: string,
  endpoint: string,
  params?: Params,
  body?: Body,
): Promise<T> {
  console.log(`API ${method} call: ${url}${endpoint}`, params);
  const { default: ky } = await kyPromise;
  const api = ky.create({
    prefixUrl: url,
    searchParams: params,
    timeout: 60000, // Some backend calls take a long time.
  });

  const options: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  let result;
  switch (method) {
    case 'post':
      result = await api.post(endpoint, { ...options, json: body }).json<T>();
      break;
    case 'put':
      result = await api.put(endpoint, { ...options, json: body }).json<T>();
      break;
    case 'get':
      result = await api.get(endpoint, options).json<T>();
      break;
    case 'delete':
      result = await api.delete(endpoint, options).json<T>();
      break;
    default:
      throw new Error(`Unsupported method: ${method}`);
  }

  console.log(`API ${method} call done: ${url}${endpoint}`, result);
  return result;
}

function stripLeadingSlashes(str: string) {
  return str.replace(/^\/+/, '');
}

// Server call (direct):
export function serverBackend<T = any>(
  method: Method,
  endpoint: string,
  params?: Params,
  body?: Body,
): Promise<T> {
  return makeRequest<T>(
    method,
    config.backendUrl + config.backendApiPrefix,
    endpoint,
    params,
    body,
  );
}

// Proxy call (identical URL):
export function proxyBackend<T = any>(
  method: Method,
  path: string,
  params?: Params,
  body?: Body,
): Promise<T> {
  console.log('proxyBackend', method, path, params, body);
  return makeRequest<T>(method, config.backendUrl, stripLeadingSlashes(path), params, body);
}

// Client call (with proxy):
export async function clientBackend<T = any>(
  method: Method,
  endpoint: string,
  params?: Params,
  body?: Body,
): Promise<T> {
  return makeRequest<T>(method, config.backendApiPrefix, endpoint, params, body);
}
