# Tesing RSA256 JWT tokens

This tests uses [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme) NPM package.

# Requirements

- [Docker](https://docs.docker.com/engine/install/)

# Running

```
docker run --rm --volume "$(pwd):/code" --workdir /code --entrypoint /bin/bash node:14 /code/run.sh
```
