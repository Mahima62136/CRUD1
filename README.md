# 🏥 Patient Management System (CRUD App)

A full-stack **MERN (MongoDB, Express, React, Node.js)** application to manage patient records with authentication.

---

## 🚀 Features

* 🔐 User Authentication (Login / Register using JWT)
* ➕ Add Patient
* 📋 View Patients List
* ✏️ Edit Patient Details
* ❌ Delete Patient
* 🔍 Search & Filter (optional if added)
* 🎨 Modern UI with React + Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB
* JWT Authentication

---

## 📁 Project Structure

```
CRUD2/
 ├── crud-main/
 │   ├── FRONTEND/
 │   └── BACKEND/
 ├── .gitignore
 └── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd CRUD2
```

---

### 2️⃣ Backend Setup

```bash
cd crud-main/BACKEND
npm install
```

Create a `.env` file:

```
PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd ../FRONTEND/frontend
npm install
npm run dev
```

---

## 🔗 API Endpoints

### Auth

* POST `/api/users/register`
* POST `/api/users/login`

### Patients

* GET `/api/patients`
* POST `/api/patients`
* PUT `/api/patients/:id`
* DELETE `/api/patients/:id`

---



## 🌟 Future Improvements

* Pagination
* Role-based authentication
* Deployment (Vercel + Render)
* Better UI/UX


## 👩‍💻 Author

**Mahima Soni**

---
