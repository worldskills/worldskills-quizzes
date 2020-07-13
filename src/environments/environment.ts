export const environment = {
  production: false,
  environmentWarning: 'This is the local development environment. Happy coding!',
  worldskillsApiEndpoint: 'http://localhost:8080',
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
