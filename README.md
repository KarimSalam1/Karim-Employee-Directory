# 👨‍💼 Employee Directory

A full-stack employee directory application built with **Next.js** (frontend) and **NestJS** (backend), using **MongoDB Atlas** for data storage. Users can view, add, edit, and delete employees, with advanced filtering, search, pagination, and animations for a smooth experience.

---

## 🚀 Live Demo

- **Frontend**: [karim-employee-directory.vercel.app](https://karim-employee-directory.vercel.app)
- **Backend API**: [karim-employee-directory.onrender.com](https://karim-employee-directory.onrender.com)
  - Example: `https://karim-employee-directory.onrender.com/employees`

> ⚠️ **Note**: If using the Render-hosted API, initial requests might take a few seconds due to Render’s free-tier cold start.

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React Context API
- **Animations**: Framer Motion (page transitions, layout transitions, light/dark toggle)
- **Deployment**: Vercel

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **File Uploads**: Multer
- **Deployment**: Render

---

## ✨ Features

- ✅ View all employees
- 🔍 Search by name or email
- 🏢 Filter by department, title, or location
- ➕ Add employee (with image upload)
- ✏️ Edit employee
- ❌ Delete employee
- 📄 Pagination
- 📱 Responsive design
- 🌗 Light/Dark mode with animated toggle (Framer Motion)
- 🎞️ Smooth page and layout transitions (Framer Motion)
- 🌐 Live deployment on Vercel (frontend) and Render (backend)

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/KarimSalam1/Karim-Employee-Directory.git
cd Karim-Employee-Directory
```

### 2. Backend Setup (NestJS)

```bash
cd backend
npm install
```

➕ Create a .env file in /backend with:

MONGODB_URI=mongodb+srv://technical-test:1234@cluster0.9walo.mongodb.net/users-db?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
IMGUR_CLIENT_ID=842481ae63e434f

### 3. Start the Backend

```bash
npm run start:dev [Local]

OR

npm run build
npm run start:prod [Production]
```

### 4. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

➕ Create a .env file in /frontend with:

# Production

NEXT_PUBLIC_API_BASE_URL=https://karim-employee-directory.onrender.com

# OR Local (if backend is running locally)

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

### 5. Start the Frontend

```bash
npm run dev
```

## Features

✅ View all employees

🔍 Search by name or email

🏢 Filter by department, title, or location

➕ Add employee (with image upload)

✏️ Edit employee

❌ Delete employee

📄 Pagination

📱 Responsive UI design

🌐 Live deployment with frontend on Vercel and backend on Render

🌗 Light/Dark mode with animated toggle (Framer Motion)

🎞️ Smooth page and layout transitions (Framer Motion)

## 📁 Folder Structure

employee-directory/
├── backend/ # NestJS Backend (API)
│ ├── src/
│ ├── main.ts
│ └── ...
├── frontend/ # Next.js Frontend (UI)
│ ├── app/
│ ├── components/
│ └── ...
└── README.md

## 👨‍💻 Author

Karim Salam
3D Frontend Developer | MERN Stack Engineer
[GitHub](https://github.com/KarimSalam1)
