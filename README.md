# Venturus Backend Test

A Nestjs backend developed by [@Mazurco066](https://github.com/Mazurco066).

## Libraries and Structure

A Backend Project using the following frameworks/libraries/pattenrns:

* **Nodejs**
* **Nestjs**
* **Fastfy**
* **DDD**
* **CQRS**
* **Mongodb**

## Setup

Assuming you have [yarn](https://yarnpkg.com/), run the following commands to install dependencies and run the App:
```sh
# Install nodejs dependencies
yarn install

# Do not forget to setup your .env file based on .env.example
yarn dev

# For production build run
yarn build | yarn prod
```

### Testing
```sh
# unit tests
$ yarn test

# e2e tests
$ yarnn test:e2e

# test coverage
$ yarn test:cov
```

## !!! Important !!!

Do not forget to generate your github personal access token on [Github API Docs](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token).

## API Docs

Access /api from base URL and you 'll be able to read the Swagger documentation.

### License

This project is licensed under the MIT License. Check the [LICENSE](LICENSE) file for further details.