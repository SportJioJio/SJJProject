# Getting Started with SJJProject

This project creates a web app which you can easily hang out with your friends.

## Setup

* `clone` the project into the server and `cd` into it
* run `cp -r ~/sslcert ./sslcert` in terminal
* run `cp ~/yc/.env ./.env` in the terminal

## Scripts

`npm run install-all` <br>
install all dependencies

`npm start` <br>
start both server and client

`npm run start-client` <br>
start client

`npm run start-server` <br>
start server

## Docker Commands

Under the _SJJProject_ directory <br>

run `docker build . -t sjjproject` to generate image

run `docker run --network="host" --env-file=.env sjjproject:latest` to start container, add a `-d` flag can make the container run in background

