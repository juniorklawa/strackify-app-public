import { URL } from 'react-native-url-polyfill';

export function parseInput(uri: string) {
  if (uri.length > 39) {
    const url = new URL(uri);
    const route = url.pathname;
    return route.substring(route.lastIndexOf('/') + 1);
  }

  const url = new URL(uri);
  const route = url.pathname;
  return route.substring(route.lastIndexOf(':') + 1);
}
