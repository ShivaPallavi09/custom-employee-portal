# BrainWave Employee Portal

A custom, web-based employee portal featuring built-in authentication, Role-Based Access Control (RBAC), and secure backend integration with Zoho One APIs. This platform provides employees with a single entry point to access authorized Zoho applications based on their assigned roles, without requiring individual Zoho credentials.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Strict access separation for Admin, HR, Sales, Support, and Finance roles.
- **Zoho API Proxy:** Secure backend service that caches and manages Zoho OAuth tokens using a single service account.
- **Employee Dashboard:** Dynamically renders authorized Zoho applications based on the logged-in user's role.
- **Admin Control Panel:** Complete CRUD interface to manage users, assign roles, and view system-wide audit logs.
- **Audit Logging:** Database-level tracking of logins and API requests.
- **JWT Authentication:** Secure API endpoints with Bearer token validation.

## 🛠 Tech Stack

- **Frontend:** React.js (Vite), Tailwind CSS, React Router, Lucide React
- **Backend:** Node.js, Express.js, JSONWebToken, Axios, Bcryptjs
- **Database:** PostgreSQL (with Sequelize ORM)
- **Third-Party:** Zoho One API

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [PostgreSQL](https://www.postgresql.org/) (Running locally or via Docker)
- A [Zoho Developer Console](https://api-console.zoho.com/) account (Free Trial)

---

## 🔧 Installation & Setup

### 1. Database Setup
Create a new PostgreSQL database for the application. You can use pgAdmin, DBeaver, or the `psql` command line:
```sql
CREATE DATABASE brainwave_portal;
