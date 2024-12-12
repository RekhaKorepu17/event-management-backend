# Eventbrite
### User Authentication API

The project implements database connection and user authentication system with features such as user registration and credential verification. It uses Express.js for routing, Sequelize as the ORM, and a relational database for storing user information.

## Features

### User Registration

Allows new users to register with the following details:

username: Unique and non-null.

password: Must include a letter, number, and special character.

email: Must be in a valid email format.

mobile: Integer type.


### Credential Verification

Allows users to verify their credentials (username and password).

Returns appropriate messages for:

Valid credentials: if User exists and the password matches.

User not found: if no user exists with the given username.

Invalid password: if password does not match the username.