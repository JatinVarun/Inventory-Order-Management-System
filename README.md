# Inventory & Order Management System

## Overview

The Inventory & Order Management System is a full-stack web application designed to help businesses efficiently manage products, customers, orders, and inventory.

The system provides a modern React frontend, a FastAPI backend, and a PostgreSQL database. The application is fully containerized using Docker and orchestrated with Docker Compose, making it easy to develop, deploy, and scale.

---

## Live Demo

### Frontend

https://inventory-order-management-system-ivory.vercel.app

### Backend API

https://inventory-order-management-system-1-t4j3.onrender.com

### API Documentation

https://inventory-order-management-system-1-t4j3.onrender.com/docs

---

## Features

### Product Management

* Create products
* View all products
* View product details
* Update products
* Delete products
* Unique SKU validation
* Inventory quantity tracking

### Customer Management

* Create customers
* View all customers
* View customer details
* Delete customers
* Unique email validation

### Order Management

* Create orders
* View all orders
* View order details
* Delete orders
* Automatic inventory deduction
* Automatic total amount calculation
* Inventory availability validation

### Dashboard

* Total Products
* Total Customers
* Total Orders
* Low Stock Products Overview

---

## Business Rules

The application enforces the following rules:

* Product SKU must be unique
* Customer email must be unique
* Product quantity cannot be negative
* Orders cannot be created if inventory is insufficient
* Product inventory is automatically reduced after order creation
* Order totals are calculated automatically by the backend
* All requests are validated before processing
* Proper HTTP status codes and error messages are returned

---

## Technology Stack

### Frontend

* React
* Vite
* Axios
* CSS

### Backend

* Python
* FastAPI
* SQLAlchemy
* Pydantic

### Database

* PostgreSQL

### DevOps

* Docker
* Docker Compose
* GitHub Actions
* Docker Hub

### Deployment

* Frontend: Vercel
* Backend: Render
* Database: Render PostgreSQL

---

## Project Structure

```text
Inventory-Order-Management-System/
│
├── backend/
│   ├── routers/
│   │   ├── products.py
│   │   ├── customers.py
│   │   └── orders.py
│   │
│   ├── database.py
│   ├── models.py
│   ├── schemas.py
│   ├── main.py
│   ├── Dockerfile
│   └── pyproject.toml
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── assets/
│   │   ├── api.js
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yaml
├── .github/workflows/
└── README.md
```

---

## API Endpoints

### Products

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| POST   | /products      | Create Product    |
| GET    | /products      | Get All Products  |
| GET    | /products/{id} | Get Product By ID |
| PUT    | /products/{id} | Update Product    |
| DELETE | /products/{id} | Delete Product    |

### Customers

| Method | Endpoint        | Description        |
| ------ | --------------- | ------------------ |
| POST   | /customers      | Create Customer    |
| GET    | /customers      | Get All Customers  |
| GET    | /customers/{id} | Get Customer By ID |
| DELETE | /customers/{id} | Delete Customer    |

### Orders

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| POST   | /orders      | Create Order    |
| GET    | /orders      | Get All Orders  |
| GET    | /orders/{id} | Get Order By ID |
| DELETE | /orders/{id} | Delete Order    |

---

## Docker Setup

### Build and Run

```bash
docker compose up --build
```

### Stop Services

```bash
docker compose down
```

### Services

* Frontend
* Backend
* PostgreSQL Database

---

## Environment Variables

### Backend

```env
DATABASE_URL=postgresql://username:password@db:5432/inventory
```

### Frontend

```env
VITE_API_URL=https://inventory-order-management-system-1-t4j3.onrender.com
```

---

## Deployment

### Frontend Deployment

Platform: Vercel

Production URL:

https://inventory-order-management-system-ivory.vercel.app

### Backend Deployment

Platform: Render

Production URL:

https://inventory-order-management-system-1-t4j3.onrender.com

### Database

Platform: Render PostgreSQL

---

## Docker Hub

Backend Docker Image:

https://hub.docker.com/r/jatinvarun/inventory-backend

---

## GitHub Repository

Repository:

https://github.com/JatinVarun/Inventory-Order-Management-System

---

## Future Enhancements

* User Authentication & Authorization
* Role-Based Access Control
* Product Categories
* Inventory Reports
* Search & Filtering
* Export Orders to CSV/PDF
* Email Notifications
* Order Status Tracking

---

## Author

**Jatin Varun**

