export const environment = {
  production: true,
  environmentWarning: 'This is the staging environment. Changes in this environment might get overwritten.',
  worldskillsApiEndpoint: 'https://api.worldskills.show',
  worldskillsClientId: 'e7a23a88163b',
  worldskillsAuthorizeUrl: 'https://auth.worldskills.show/oauth/authorize',
  worldskillsAuthorizeRedirect: 'https://quiz.worldskills.show/',
  worldskillsAuthorizeUserinfoEndpoint: 'https://auth.worldskills.show/auth/users/loggedIn',
  worldskillsAuthUriPatterns: ['api.worldskills.show'],
  worldskillsPeopleLink: 'https://people.worldskills.show',
  sentryEnvironment: 'staging',
  loadChildEntityRoles: true,
  filterAuthRoles: [1300]
};
