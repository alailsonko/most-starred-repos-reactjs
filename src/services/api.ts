/* eslint-disable no-param-reassign */
type FetchOptions = {
  params?: {
    [key: string]: string | number | boolean;
  };
  url: string;
  method?: string;
};

export default async function fetchAPI({ params = {}, url = '', method = 'GET' }: FetchOptions) {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };
  if (Object.keys(params).length > 0) {
    url = encodeURI(
      `${url}${Object.keys(params)
        .map((key) => `${key}${params[key]}`)
        .join('&')}`
    );
  }
  return fetch(url, {
    method,
    headers
  })
    .then((response) => response.json())
    .catch((error) => error);
}
