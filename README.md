# Wordsmith

## Requirements
- Node.js 14 LTS or >=16.0.0

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Run your unit tests
```
yarn test:unit
```


### Run your end-to-end tests
```
yarn test:e2e
```
Make sure to create a file named `cypress.env.json` in your project root with the login credentials if you want the login tests to work properly. The json format should be accordingly:
```
{
  "test_username": "loginemail@test.com",
  "test_password": "yourSecretPassword"
}
```

### Lints and fixes files
```
yarn lint
```
