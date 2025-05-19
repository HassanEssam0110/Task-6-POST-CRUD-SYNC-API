
# POST-CRUD-SYNC-API

## Overview

A **Node.js** + **TypeScript** project that implements a complete CRUD API for managing posts, with user roles and **sync/seeding** scripts.

---

## 📦 Project Structure

```
database/
├── seeders/
│   └── seed-users.ts
├── models/
│   ├── post.model.ts
│   ├── user.model.ts
│   └── roles.model.ts
└── db-connect.ts

src/
├── config/
│   ├── .env.development.local
│   ├── .env.production.local
│   └── config.ts
├── scripts/
│   └── syncPosts.ts
├── modules/
│   ├── post/
│   │   ├── post.controller.ts
│   │   ├── post.schema.ts
│   │   └── post.routes.ts
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.schema.ts
│   │   └── auth.routes.ts
│   ├── role/
│   │   ├── role.controller.ts
│   │   ├── role.schema.ts
│   │   └── role.routes.ts
│   └── bootstrap.modules.ts
├── middlewares/
│   ├── async-handler.middleware.ts
│   ├── auth.middleware.ts
│   ├── error-handler.middleware.ts
│   ├── validation.middleware.ts
│   └── index.middleware.ts
├── utils/
│   ├── app-error.utils.ts
│   ├── bcrypt.utils.ts
│   ├── general-validation.utils.ts
│   ├── jwt.utils.ts
│   ├── roles-system.utils.ts
│   └── index.utils.ts
├── types/
│   ├── express/
│   └── index.d.ts
└── app.ts

server.ts  
package.json
```

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

---

## 🛠 Tech Stack

- **Backend:** Node.js, Express.js, TypeScript  
- **Database:** MongoDB with Mongoose  
- **Validation:** Joi / Mongoose  
- **Authentication:** JWT  
- **Security:** Bcrypt for password hashing  

---

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

   - Create `.env.development.local` and `.env.production.local` inside the `src/config` folder.  
   - See examples below.

---

## 🧪 Environment Variables

### `.env.development.local`

```env
PORT=3000
NODE_ENV="development"
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_Posts"
JWT_SECRET="secretKey_goes_here"
JWT_EXPIRES_IN="30d"
SALT_ROUNDS=10
POSTS_API=https://jsonplaceholder.typicode.com/posts
```

### `.env.production.local`

```env
PORT=443
NODE_ENV="production"
MONGO_DB_URI="mongodb://127.0.0.1:27017/DB_Posts"
JWT_SECRET="@t_secretKey_goes_here"
JWT_EXPIRES_IN="30d"
JWT_COOKIES_EXPIRES_IN=30
SALT_ROUNDS=10
POSTS_API=https://jsonplaceholder.typicode.com/posts
```

---

## Running the Application

### Development Mode

```sh
npm run dev
```

### Production Mode

Build:

```sh
npm run build
```

Start:

```sh
npm run start
```

---

## Sync & Seed Scripts

### Sync Posts

```sh
npm run sync-posts          # Development
npm run sync-posts-prod     # Production
```

### Seed Users

Import dummy data:

```sh
npm run seed-users seed         # Development
npm run seed-users-prod seed    # Production
```

Delete dummy data:

```sh
npm run seed-users drop         # Development
npm run seed-users-prod drop    # Production
```

---

## Usage

### API Base URL

- Development: `http://127.0.0.1:3000`

### Authentication

- Obtain a JWT token by logging in and include it in the `Authorization` header for protected routes.

---

## API Endpoints

All endpoints are prefixed with `/api/v1`

### Authentication

| Method | Endpoint                 | Access          |
| ------ | ------------------------ | --------------- |
| POST   | `/auth/register`         | Public          |
| POST   | `/auth/login`            | Public          |
| GET    | `/auth/me`               | Admin, Reviewer |

#### Register a New User

`POST /api/v1/auth/signup`

```json
{
  "username": "Hassan",
  "password": "Asd@@123",
  "repeatPassword": "Asd@@123",
  "role": "Reviewer"
}
```

#### Login

`POST /api/v1/auth/login`

```json
{
  "username": "Hassan",
  "password": "Asd@@123"
}
```

#### Get Current User

`GET /api/v1/auth/me`

Requires authentication with a valid token.

---

### Posts

| Method | Endpoint                    | Access          |
| ------ | --------------------------- | --------------- |
| POST   | `/posts`                    | Admin           |
| POST   | `/posts/:id/approve`        | Reviewer        |
| GET    | `/posts/all`                | Admin, Reviewer |
| GET    | `/posts`                    | Public          |
| GET    | `/posts/:id`                | Public          |
| PUT    | `/posts/:id`                | Admin           |
| DELETE | `/posts/:id`                | Admin           |

#### Create a New Post

`POST /api/v1/posts`

```json
{
  "title": "First Post",
  "body": "This is the body of the first test post."
}
```

---

## Role-Based Access Control

- **Admin**: Create, Read, Update, Delete  
- **Reviewer**: Read, Approve  

---

## Error Handling

The API returns appropriate HTTP status codes and messages:

- **400**: Bad Request  
- **401**: Unauthorized (missing/invalid token)  
- **403**: Forbidden (insufficient permissions)  
- **404**: Not Found (resource does not exist)  
- **422**: Unprocessable Entity (validation errors)  
- **500**: Internal Server Error  

---

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

---

📌 **Notes:**  
- Only Admin users can create, update, and delete posts.  
- Reviewer role can approve posts via `POST /posts/:id/approve`.  
- Scripts under `src/scripts/` and `database/seeders/` handle sync and seed operations.  
- All protected routes require a valid JWT token.  

---

🚀 **Happy Coding!** 🚀
