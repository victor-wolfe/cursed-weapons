# Cursed Swords Emporium

> A NodeJS API for a fictional storefront

## Getting Started

- Clone repo
- `npm i`
- To start in development mode, use `npm start`. For production, `npm run start:prod`

## Configuration

Before using this API, you'll want to create a `config.env` file for yourself. `example.env` has been provided as a template.

## Getting started with the database

Run `/data/import-dev-data.js` to quickly populate the database from JSON. It requires one of two arguments: `--import` or `--delete`

## Features

### API Features

This API provides user and admin operations for a storefront.

- View the store inventory using sort and filters
- View store statistics
- Users can change a password, edit a profile, or deactivate their account

### Security

- Encrypted passwords (salted and hashed using bcrypt)
- Password reset with encrypted tokens
- Secure cookies
- Rate limiting to prevent DOS attacks
- Sanitizes user input data and parameters
- Data modeled with MongoDB
- Hides error details in production

## Links

- Repository: https://github.com/victor-wolfe/cursed-weapons

## Licensing

The code in this project is licensed under MIT license.
