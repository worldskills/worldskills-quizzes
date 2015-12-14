# WorldSkills Quizzes


## Installation

```
git clone git@github.com:worldskills/worldskills-quizzes.git
cd worldskills-quizzes
npm install -g grunt-cli
npm install
./node_modules/bower/bin/bower install
cp app/scripts/config.js.dev app/scripts/config.js
```


## Development

Run local development server for [http://localhost:11300](http://localhost:11300/):

```
grunt server
```

To test the build process, run 

```
grunt build --env=dev
php -S localhost:11300 -t dist/
```
