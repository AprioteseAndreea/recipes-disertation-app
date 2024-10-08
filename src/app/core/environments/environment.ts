// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8080',
    firebaseConfig: {
      apiKey: "AIzaSyC88F5b2MuA0T3-Z118s-vGK3MTjdc70D8",
      authDomain: "disertation-recipes-app.firebaseapp.com",
      projectId: "disertation-recipes-app",
      storageBucket: "disertation-recipes-app.appspot.com",
      messagingSenderId: "767009823356",
      appId: "1:767009823356:web:efc82aeada7a4c3fe007f9"
    },
    openaiConfig: {
      apiKey: "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",
      assistentKey: 'asst_Fz3BvfwByp5MiN2fP0fvHYwl'
    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  