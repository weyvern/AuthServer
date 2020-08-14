# Authentication server

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This auth server provides an easy and reusable way to authenticate and grant a token by implementing local (email & password), Google and Facebook methods. It can be implemented as a stand alone API and simply decode the resulting tokens on other clients.

## Tech stack

- Node
- Express
- MongoDB
- Mongoose
- Joi
- PassportJS (local, JWT, Google, Facebook)

## Clone

```bash
git clone https://github.com/weyvern/AuthServer
```

## Create ENV file for development environment

Create config/config.env and add the following keys and values:

NODE_ENV=development
PORT=5000
MONGO_URI=
JWT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

## Install

```bash
npm install
```

## Dev enviroment

```bash
npm run dev
```
