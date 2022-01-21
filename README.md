# Reaktor Assignment 2022
> Project that displays Rock Paper Scissors game results.

## Demo
Here's link to a working demo of the project: https://floating-savannah-14330.herokuapp.com/

## Description
My take on Reaktor's assignment for 2022. The project displays current and historical Rock Paper Scissors games fetched from Reaktor's Bad-Api.

## Technologies used

1. Typescript for the backends
2. postgreSQL for the database
3. React with typescript for the frontend
4. Docker and docker-compose for the containers

## Installing / Getting started

The project has been seperated to 3 different parts.

1. Websocket backend
2. History backend
3. Frontend


### Step one:

Create .env file <b>into historybackend folder</b> and with the following:

```shell
DATABASE_URL= YOUR DB URL
DATABASE_ROW_LIMIT=10000 INCREASE THIS IF YOU DONT HAVE A ROW LIMIT.
```

### Step two:
> Using Docker-compose
```shell
docker-compose up
```
#### NOTE: This is your last step if you went with docker


> Without Docker (Manual installation)
```shell
cd historybackend
npm i
cd ../kpsfrontti
npm i
cd ../websocketbackend
npm i
```

Using docker-compose is easily the most seamless way to go.
However installing node modules for each folder is possible aswell.

### Step 3: Building

To build the projects follow these steps:

## Frontend

```shell
npm run build && cp -r ./build ../historybackend/frontBuild
```

## Websocket backend

```shell
npm run tsc
```

## History backend

```shell
npm run tsc
```
Command for frontend will build itself and copy the build folder to historybackend as folder named "frontendBuild".

Commands for backends above will create folders called 'build' to their folders.

### Step 4: Running the application
Make sure you are in the root of the project while continuing.

<b>NOTE: Do following steps in this order:</b>
```shell
cd historybackend && npm start
```

Open a new terminal and make sure you are in the root of the project.

Websocket backend:
```shell
cd websocketbackend && npm start
```



## Features

* See ongoing Rock Paper Scissors games
* Able to look individual player game history.
* Ability to see statistic on individual players game history.

