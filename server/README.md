<h1 align="center">Get started</h1>

## Creating environment variables

```.env
MONGO_URI=mongouri
PORT=3000
HOST=localhost
JWT_SECRET=secret
JWT_EXPIRATION_ACCESS_TOKEN=1h
JWT_EXPIRATION_REFRESH_TOKEN=7d
```

## Installing packages and Running the app

```bash
#  installing packages
$ npm install

# run app
$ npm run start:dev
#or
$ npm run start
```

## Getting the routes
You can see the routes and models on
```bash
http://HOSTNAME:PORT/graphql
# or
 http://localhost:3001/graphql
```