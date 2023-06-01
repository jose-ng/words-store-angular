export const environment = {
  firebase: {
    projectId: process.env['NG_APP_projectId'],
    appId: process.env['NG_APP_appId'],
    storageBucket: process.env['NG_APP_storageBucket'],
    apiKey: process.env['NG_APP_apiKey'],
    authDomain: process.env['NG_APP_authDomain'],
    messagingSenderId: process.env['NG_APP_messagingSenderId'],
  },
  API_URL: process.env['NG_APP_API_URL'],
};
