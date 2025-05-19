# POST-CRUD-SYNC-API

## Overview

A **Node.js** + **TypeScript** project that implements a complete CRUD API for managing posts, with user roles and **sync/seeding** scripts.

## 📦 Project Structure

database/
├── seeders/
│ └── seed-users.ts
├── models/
│ ├── post.model.ts
│ ├── user.model.ts
│ └── roles.model.ts
└── db-connect.ts

src/
├── config/
│ ├── .env.development.local
│ ├── .env.production.local
│ └── config.ts
├── scripts/
│ └── syncPosts.ts
├── modules/
│ ├── post/
│ │ ├── post.controller.ts
│ │ ├── post.schema.ts
│ │ └── post.routes.ts
│ ├── auth/
│ │ ├── auth.controller.ts
│ │ ├── auth.schema.ts
│ │ └── auth.routes.ts
│ ├── role/
│ │ ├── role.controller.ts
│ │ ├── role.schema.ts
│ │ └── role.routes.ts
│ └── bootstrap.modules.ts
├── middlewares/
│ ├── async-handler.middleware.ts
│ ├── auth.middleware.ts
│ ├── error-handler.middleware.ts
│ ├── validation.middleware.ts
│ └── index.middleware.ts
├── utils/
│ ├── app-error.utils.ts
│ ├── bcrypt.utils.ts
│ ├── general-validation.utils.ts
│ ├── jwt.utils.ts
│ ├── roles-system.utils.ts
│ └── index.utils.ts
├── types/
│ ├── express/
│ └── index.d.ts
└── app.ts

server.ts
package.json

---

## 🚀 Features

- ✅ Full **CRUD API** for posts
- ✅ **Role-based access control** (`Admin`, `Reviewer`)
- ✅ **Post approval** endpoint
- ✅ **Validation** with Joi
- ✅ **Authentication** using JWT
- ✅ **MongoDB** integration using **Mongoose**
- ✅ **Environment-based configuration** support
- ✅ **Centralized error handling** for better debugging

### Scripts

- ✅ Seed users (`seed-users`)
- ✅ Sync external posts (`sync-posts`)

---

## Tech Stack

- **Backend:** Node.js, Express.js and TypeScript
- **Database:** MongoDB with Mongoose
- **Validation:** Joi / Mongoose
- **Authentication:** JWT
- **Security:** Bcrypt for password hashing

## Installation

### Prerequisites

- Node.js installed
- MongoDB installed and running

### Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/HassanEssam0110/Task-6-POST-CRUD-SYNC-API.git
   cd Task-6-POST-CRUD-SYNC-API
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create `.env.development.local` and `.env.production.local` inside the `config` folder.
   - Example `.env` files are provided below.

## 🧪 Environment Variables

Environment variables are stored in the `config` folder.

### `.env.development.local`

```env
#PORT
PORT=3000

# ENVIRONMENT
NODE_ENV="development"

# Database
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_Posts"

# JWT
JWT_SECRET="secretKey_goes_here"
JWT_EXPIRES_IN="30d"

# BYCRYPT
SALT_ROUNDS=10

# outsource Api
POSTS_API=https://jsonplaceholder.typicode.com/posts

```

### `.env.production.local`

```env
#PORT
PORT=443

# ENVIRONMENT
NODE_ENV="production"

# Database
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_Posts"

# JWT
JWT_SECRET="@t_secretKey_goes_here"
JWT_EXPIRES_IN="30d"
JWT_COOKIES_EXPIRES_IN=30


# BYCRYPT
SALT_ROUNDS=10

# outsource Api
POSTS_API=https://jsonplaceholder.typicode.com/posts
```

## Running the Application

### Development Mode

```sh
npm run dev
```

### Production Mode

### Build

```sh
npm run build
```

### Production Start

```sh
npm run start
```

## Sync Posts (Dev/Prod)

```sh
npm run sync-posts          # Development
npm run sync-posts-prod     # Production
```

**- Seed Users (Dev/Prod).**

### Import Dummy Data

```sh
npm run seed-users seed         # Development
npm run seed-users-prod seed    # Production
```

### Delete Dummy Data

```sh
npm run seed-users drop         # Development
npm run seed-users-prod drop    # Production
```

## Usage

### API Base URL

- Development: `http://127.0.0.1:3000`

### Authentication

- Obtain a JWT token by logging in and include it in the `Authorization` header for protected routes.

## API Endpoints

All endpoints are prefixed with `/api/v1`

### **Authentication**

| Method | Endpoint                | Access          |
| ------ | ----------------------- | --------------- |
| POST   | `/api/v1/auth/register` | Public          |
| POST   | `/api/v1/auth/login`    | Public          |
| GET    | `/api/v1/auth/me`       | Admin, Reviewer |

#### Register a New User

**POST** `/api/v1/auth/signup`

```json
{
  "username": "Hassan",
  "password": "Asd@@123",
  "repeatPassword": "Asd@@123",
  "role": "Reviewer"
}
```

#### Login

**POST** `/api/v1/auth/login`

```json
{
  "username": "Hassan",
  "password": "Asd@@123"
}
```

#### Get Current User

**GET** api/v1/auth/me

Requires authentication with a valid token.

### **Posts**

| Method | Endpoint                    | Access          |
| ------ | --------------------------- | --------------- |
| POST   | `/api/v1/posts`             | Admin           |
| POST   | `/api/v1/posts/:id/approve` | Reviewer        |
| GET    | `/api/v1/posts/all`         | Admin, Reviewer |
| GET    | `/api/v1/posts`             | Puplic          |
| GET    | `/api/v1/posts/:id`         | Puplic          |
| PUT    | `/api/v1/posts/:id`         | Admin           |
| DELETE | `/api/v1/posts/:id`         | Admin           |

#### Create a New Post

**POST** `/api/v1/post`

```json
{
  "title": "First Post",
  "body": "This is the body of the first test post."
}
```

## Role-Based Access Control

- **Admin**: Can perform Read, Create , Update and Delete.
- **Reviewer**: Can Read, Approved.

## Error Handling

The API returns appropriate HTTP status codes and messages for different scenarios:

- **400**: Bad Request
- **401**: Unauthorized (e.g., missing or invalid token)
- **403**: Forbidden (e.g., insufficient permissions)
- **404**: Not Found (e.g., resource does not exist)
- **422**: Unprocessable Entity (e.g., validation errors)
- **500**: Internal Server Error

## Dependencies

```json
{
  "axios": "^1.9.0",
  "bcrypt": "^6.0.0",
  "dotenv": "^16.5.0",
  "express": "^5.1.0",
  "joi": "^17.13.3",
  "jsonwebtoken": "^9.0.2",
  "mongoose": "^8.14.2",
  "morgan": "^1.10.0"
}
```

📌 Notes
Only Admin users can create, update, and delete posts.

Reviewer role can approve posts via POST /posts/:id/approve.

Scripts under src/scripts/ and database/seeders/ handle sync and seed operations.

All protected routes require a valid JWT token.

---

🚀 **Happy Coding!** 🚀
