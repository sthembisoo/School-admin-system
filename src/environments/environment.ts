// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    baseUrl: 'https://localhost:44327/api/',
  firebase: {
    projectId: 'deepmind-370',
    appId: '1:846141883386:web:e0f931fbd62fea69b55a43',
    storageBucket: 'deepmind-370.appspot.com',
    apiKey: 'AIzaSyC4ABmojoNjuLQdr1iWhNJ40dj1oiUlbBI',
    authDomain: 'deepmind-370.firebaseapp.com',
    messagingSenderId: '846141883386',
    measurementId: 'G-NY2T88L9W3',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
