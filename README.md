# User & Order REST API

A simple REST API built with Node.js and PostgreSQL to manage Users and Orders.

This project was created as part of a technical assessment to demonstrate backend fundamentals such as RESTful API design, business logic handling, validation, and basic testing.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL
- pg (PostgreSQL client)
- Joi (input validation)
- Jest & Supertest (testing)

---

## 📦 Features

### User Management
- Create user
- Get list of users
- Get user detail by ID
- Email must be unique

### Order Management
- Create order for a user
- Get list of orders by user
- Get order detail by ID

---

## 📋 Business Rules

- A user cannot have more than one **PENDING** order at the same time
- Order amount must be greater than 0
- User must exist before creating an order
- Order status options: `PENDING`, `PAID`, `CANCELLED`

---

## 🗂️ Database Schema

### Users
- id
- name
- email (unique)
- created_at

### Orders
- id
- user_id
- amount
- status
- created_at

---

## ⚙️ How to Run the Project

### 1️⃣ Clone Repository
```bash
git clone https://github.com/shevasatrian/user-order-api/
cd user-order-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
### Create .env file
```bash
PORT=3000
DATABASE_URL=postgresql://postgres:password@localhost:5432/user_order_db
```

### 4️⃣ Setup Database
### Create database and tables in PostgreSQL
```bash
CREATE DATABASE user_order_db;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  amount NUMERIC(12,2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  created_at TIMESTAMP
);

```

### 5️⃣ Run Application
```bash
npm run dev
```
API will be available at: http://localhost:3000

### 🧪 Testing
### Run tests using: npm test

