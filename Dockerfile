# Production base
# Port being exposed on app
# Set NODE_ENV for production
FROM node:12.16.2-alpine as base

LABEL org.opencontainers.image.authors=$GITLAB_USER_EMAIL
LABEL org.opencontainers.image.revision=$CI_COMMIT_SHA
LABEL org.opencontainers.image.title=$CI_PROJECT_TITLE
LABEL org.opencontainers.image.url=$CI_REPOSITORY_URL
LABEL org.opencontainers.image.source=$CI_PROJECT_URL
LABEL com.whrodley.nodeversion=$NODE_VERSION

EXPOSE 3030

ENV NODE_ENV=production

RUN apk add --no-cache make gcc g++ python

WORKDIR /opt

COPY package*.json ./

HEALTHCHECK --interval=5m --timeout=3s \
  CMD curl -f http://localhost/_healthcheck || exit 1

RUN npm config list \
  && npm ci \
  && npm cache clean --force

# Development
# Files are bind mounted so we don't copy them here
# Set NODE_ENV for development purposes
# Add node_modules to path to use dev dependencies
# Only install dev dependencies here
# docker build -t app:dev . --target=dev
# docker run --rm -v $(pwd):/opt/app -p 3030:3030 app:dev
FROM base as development

ENV NODE_ENV=development
ENV PATH=/opt/node_modules/.bin:/usr/local/bin:$PATH

WORKDIR /opt

RUN npm install --only=development

WORKDIR /opt/app

COPY docker-entrypoint.sh /usr/local/bin/

ENTRYPOINT ["docker-entrypoint.sh"]

# Use this command for tons of debugging info
# CMD [ "nodemon", "--inspect=0.0.0.0:9229", "--stack_trace_limit=100", "-r", "superstack", "-r", "trace", "-r", "clarify", "--trace-sync-io", "src" ]
CMD [ "nodemon", "--inspect=0.0.0.0:9229", "-r", "trace", "-r", "clarify", "src" ]

# Builder stage that copies in files
FROM base as source

WORKDIR /opt/app

COPY assets assets
COPY config config
COPY test test
COPY views views
COPY .eslintrc.js ./
COPY knexfile.js ./
COPY src src
#COPY . .

# Testing
# Only install dev dependencies here
# docker build -t app:test --target test .
# docker run --init app:test
FROM source as test

ENV NODE_ENV=test
ENV PATH=/opt/node_modules/.bin:$PATH

COPY --from=development /opt/node_modules /opt/node_modules

RUN npm rebuild

WORKDIR /opt/app

RUN eslint .

ENTRYPOINT [ "mocha", "test/index.js", "--timeout=3000", "--exit" ]
# CMD ["mocha", "test/index.js", "--timeout=3000", "--exit"]

# Auditing
# TODO: implement later
FROM test as audit

# npm install -g snyk
# snyk test

CMD ["npm", "audit"]

# Production ready image
# COPY source code over
# build production assets
# docker build -t app:prod .
FROM source as production

RUN chown -R node:node .

USER node

CMD ["node", "src"]
