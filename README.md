# WorldSkills Quizzes

[![Greenkeeper badge](https://badges.greenkeeper.io/worldskills/worldskills-quizzes.svg)](https://greenkeeper.io/)

## Installation

```
git clone git@github.com:worldskills/worldskills-quizzes.git
cd worldskills-quizzes
npm install
cp src/environments/environment.dev.ts src/environments/environment.ts
```

## Development

Run local development server for [http://localhost:11301](http://localhost:11301/):

```
ng serve --port 11301
```

To test the build process, run 

```
ng build -c development
php -S localhost:11301 -t dist/worldskills-quizzes
```

Other available configurations: `staging` `production`
