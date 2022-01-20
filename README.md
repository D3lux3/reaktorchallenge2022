# Reaktor Assignment 2022
> Project that displays Rock Paper Scissors game results.

## Demo
Here's link to a working demo of the whole project: https://floating-savannah-14330.herokuapp.com/

## Description
My take on Reaktor's assignment for 2022. The project displays current and historical Rock Paper Scissors games fetched from Reaktor's Bad-Api.

## Installing / Getting started

The project has been seperated to 3 different parts.

1. Websocket backend
2. History backend
3. Frontend

> Using Docker-compose
```shell
docker-compose up
```


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

### Initial Configuration

Some projects require initial configuration (e.g. access tokens or keys, `npm i`).
This is the section where you would document those requirements.

### Building

To build the projects follow these steps:

## Frontend

```shell
npm build
```

## Websocket backend

```shell
npm run start
```

## History backend

```shell
npm run start
```

All of the commands above create folder called 'build' to their folders.

## Features

What's all the bells and whistles this project can perform?
* What's the main functionality
* You can also do another thing
* If you get really randy, you can even do this

