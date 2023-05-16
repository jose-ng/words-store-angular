const isClient = typeof window !== 'undefined';

const URL_API = isClient
  ? window.location.host.includes('localhost')
    ? 'http://localhost:3000/api'
    : 'https://words-t.vercel.app/api'
  : '';

export default URL_API;

const isEnvDev = process.env['NODE_ENV'] === 'development';
export { isEnvDev };
