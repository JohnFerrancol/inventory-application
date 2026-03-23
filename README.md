# Inventory Application

[Live Demo](#)<br/><br/>
[![The Odin Project](https://img.shields.io/badge/The%20Odin%20Project-A9792B?logo=theodinproject&logoColor=fff)](#)

## Overview

This is a project from [The Odin Project](https://theodinproject.com): [Project: Inventory Application](https://www.theodinproject.com/lessons/node-path-nodejs-inventory-application). This Express project allows for practice with CRUD methods in Express through database management using PostgreSQL on an inventory management app. For this project, it will be the management of PC games from [Steam](https://store.steampowered.com/)

## Learning Points

- Understanding concepts of form handling and validation through the express-validation library
- Implementing an external database through a local instance of PostgreSQL
- Understanding the different CRUD methods in a web application

## Tech Stack

- [![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
- [![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)](#)
- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
- [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
- [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
- [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?logo=tailwind-css&logoColor=white)](#)

## Getting Started

### Prerequisites

You will need to install the latest version of npm to get started on using this project

- npm

```sh
npm install npm@latest -g
```

- You will also need to set up [PostgreSQL](https://www.theodinproject.com/lessons/nodejs-installing-postgresql) locally on your machine and create an <b>inventory_application</b> database

### Installation

Getting started on running the express server on your localhost, localhost:3000

1. Cloning the repository

```sh
git clone git@github.com:JohnFerrancol/inventory-application.git
```

2. Navigate to the inventory-application folder and install npm packages

```sh
cd inventory-application && npm install
```

3. Running the Express server

```sh
npm run start
```

4. Open in web browser via: http://localhost:3000

## Roadmap

- [x] Set up an Express project and a PostgreSQL database with tables
- [x] Set up routes and controllers for the app
- [ ] Create the 'READ' views, HTTP GET Requests
- [ ] Create the forms for 'CREATE' and 'UPDATE'
- [ ] Add 'DELETE' functionality
