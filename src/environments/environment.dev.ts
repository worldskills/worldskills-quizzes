// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  worldskillsApiQuizzes: 'http://localhost:8080/quizzes',
  worldskillsApiImages: 'http://localhost:8080/images',
  worldskillsApiEvents: 'http://localhost:8080/events',
  worldskillsApiAuth: 'http://localhost:8080/auth',
  worldskillsClientId: '91c518ccad27',
  worldskillsAuthorizeUrl: 'http://worldskills-auth.localhost/oauth/authorize',
  worldskillsAuthorizeRedirect: 'http://localhost:11301/',
  worldskillsAuthorizeUserinfoEndpoint: 'http://worldskills-auth.localhost/oauth/users/loggedIn',
  worldskillsAuthUriPatterns: ['localhost:8080'],
  loadChildEntityRoles: true,
  filterAuthRoles: [1300]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
