#!/bin/sh

# Run the latest migrations
knex migrate:latest

# Run seed files
knex seed:run

# Pass in the args from CMD
exec "$@"
