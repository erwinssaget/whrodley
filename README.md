# Whrodley

### Table of Contents

**[Installation Instructions](#installation-instructions)**<br>
**[Useful Commands To Know](#useful-commands)**<br>
**[Database Structure](#database)**<br>

## Installation Instructions

It's pretty simple to get started. There are two ways to run this repository (locally on your machine or using Docker).
Regardless of how you choose to run this repo, you'll need to copy the `.env.example` file in the
root folder in this repository and rename to `.env`. You will also need to create a few accounts.

1. [Mailtrap](https://mailtrap.io)
2. In addition, you may want to also install [TablePlus](https://www.tableplus.io/download), [PSequel](http://www.psequel.com), or [pgAdmin](https://www.pgadmin.org/download/) to view database tables

### Locally

1. Install Node (or NVM). Make sure you use the version of Node that is specified in package.json
2. Install Postgres.
3. Run `npm run build` OR `npm run build:watch`
4. Run `npm start`

### Docker

1. Install [Docker](https://www.docker.com/products/docker-desktop).
2. Run `docker-compose up`.

## Useful Commands

```bash
# Generating a unique key
$ cat /dev/urandom | env LC_CTYPE=C tr -dc _A-Za-z0-9 | head -c${1:-64}

# Running with docker
$ docker-compose up # add --build to rebuild images
$ docker-compose down # to stop processes, add -v to remove named volumes

# Running commands inside of Docker container
$ docker-compose exec app bash

# Working with asset files
$ npm run build # or npm run build:watch

# Creating a migration
$ knex migrate:make migration_name

# Running migrations
$ knex migrate:latest

# Creating seed files
$ knex seed:make seed_name

# Seeds database
$ knex seed:run
```

## Database

To view database structure, visit [dbdiagram.io](https://dbdiagram.io/d/5e8fb55139d18f5553fd6263)

### Models

| Model | Table Name  | Purpose                                                     |
| ----- | ----------- | ----------------------------------------------------------- |
| User  | users       | holds all the users of the application.                     |
| Team  | teams       | this is the teams (businesses) that our application serves  |
|       | teams_users | join table that keeps track of which users belong to a team |
