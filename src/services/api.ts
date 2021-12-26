/* eslint-disable no-param-reassign */
type FetchOptions = {
  params?: {
    [key: string]: string | number | boolean;
  };
  url: string;
  method?: string;
  body?: any;
};

export default async function fetchAPI({
  body,
  params = {},
  url = '',
  method = 'GET'
}: FetchOptions) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (Object.keys(params).length > 0) {
    url = `${url}?${Object.keys(params)
      .map((key) => `${key}${params[key]}`)
      .join('&')}`;
  }

  body = JSON.stringify(body);

  return fetch(url, {
    method,
    headers,
    body
  })
    .then((response) => response.json())
    .catch((error) => error);
}
