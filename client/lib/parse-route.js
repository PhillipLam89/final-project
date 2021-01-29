export default function parseRoute(hash) {
  if (hash.startsWith('#')) {
    hash = hash.replace('#', '');
  }
  const [path, queryString] = hash.split('?');
  const params = new URLSearchParams(queryString);
  return { path : path, params : params };
}
