// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  environmentWarning: 'This is the local development environment. Happy coding!',
  worldskillsApiEndpoint: 'https://api.worldskills.show',
  worldskillsApiQuizzes: 'https://api.worldskills.show/quizzes',
  worldskillsApiImages: 'https://api.worldskills.show/images',
  worldskillsApiEvents: 'https://api.worldskills.show/events',
  worldskillsApiAuth: 'https://api.worldskills.show/auth',
  worldskillsClientId: '91c518ccad27',
  worldskillsAuthorizeUrl: 'https://auth.worldskills.show/oauth/authorize',
  worldskillsAuthorizeRedirect: 'http://localhost:11301/',
  worldskillsAuthorizeUserinfoEndpoint: 'https://auth.worldskills.show/auth/users/loggedIn',
  worldskillsAuthUriPatterns: ['api.worldskills.show'],
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
