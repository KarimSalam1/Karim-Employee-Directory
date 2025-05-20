# Employee Directory

A full-stack employee directory application built with **Next.js** (frontend) and **NestJS** (backend), using **MongoDB Atlas** for data storage. The app allows users to view, add, edit, and delete employees, with filtering, search, and pagination features.

---

## 🔧 Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **State Management**: React state / Context API
- **Deployment**: [Vercel](https://karim-employee-directory.vercel.app)

### Backend

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **File Uploads**: Multer
- **Deployment**: [Render](https://karim-employee-directory.onrender.com)

---

## 🚀 Live Demo

- **Frontend**: [https://karim-employee-directory.vercel.app]
- **Backend**: [https://karim-employee-directory.onrender.com][Hosted on Render at `/employees` endpoints (e.g., 'https://karim-employee-directory.onrender.com/employees/')]

---

## 📦 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/KarimSalam1/Karim-Employee-Directory.git
cd employee-directory
```

### 2. Backend Setup (NestJS)

```bash
cd backend
npm install
```

### 3. Create a .env File to backend directory containing the following

MONGODB_URI=mongodb+srv://technical-test:1234@cluster0.9walo.mongodb.net/users-db?retryWrites=true&w=majority&appName=Cluster0
PORT=3000
IMGUR_CLIENT_ID=842481ae63e434f

### 4. Start the Backend

```bash
npm run start:dev [Local]

OR

npm run build
npm run start:prod [Production]
```

### 5. Frontend Setup (Next.js)

```bash
cd frontend
npm install
```

### 6. Add .env File to frontend directory containing the following

NEXT_PUBLIC_API_BASE_URL=https://karim-employee-directory.onrender.com [Production]

OR

NEXT_PUBLIC_API_BASE_URL=https://localhost:3000 [Local]

### 7. Start the Frontend

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

## 🧑‍💻 Author

Karim Salam
3D Frontend Developer | MERN Stack Engineer
