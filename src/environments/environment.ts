export const environment = {
  production: false,
  environmentWarning: 'This is the local development environment. Happy coding!',
  worldskillsApiEndpoint: 'http://localhost:8080',
  worldskillsClientId: '8992d3242774',
  worldskillsAuthorizeUrl: 'http://localhost:50300/oauth/authorize',
  worldskillsAuthorizeRedirect: 'http://localhost:11300/',
  worldskillsAuthorizeUserinfoEndpoint: 'http://localhost:50300/oauth/users/loggedIn',
  worldskillsAuthUriPatterns: ['localhost:8080', 'localhost:8081'],
  sentryEnvironment: null,
  loadChildEntityRoles: true,
  filterAuthRoles: [1300]
};
