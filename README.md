# 🎓 Smart Student System

Smart Student System is a comprehensive full-stack web application designed to enhance learning by providing seamless access to course materials, assignment submissions, and attendance tracking..
---

### 🎯 Core Functionality

- **📚 Course Management**
  - View all enrolled courses
  - Track course progress
  - Access course materials
  - Real-time enrollment updates

- **📝 Assignment System**
  - Submit assignments with file uploads
  - Track submission status
  - View grades and feedback
  - Late submission detection

- **📊 Attendance Tracking**
  - Automated attendance records
  - Visual attendance statistics
  - Course-wise breakdown
  - Absence alerts

### 🔐 Authentication & Security

- JWT-based authentication
- Secure password hashing with bcrypt
- Role-based access control (Student, Teacher, Admin)
- Protected API endpoints

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.x-38B2AC?style=flat-square&logo=tailwind-css)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)
![Zustand](https://img.shields.io/badge/Zustand-State%20Management-orange?style=flat-square)

### Backend
![FastAPI](https://img.shields.io/badge/FastAPI-0.109-009688?style=flat-square&logo=fastapi)
![Python](https://img.shields.io/badge/Python-3.10-3776AB?style=flat-square&logo=python)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red?style=flat-square)

### Tools & Libraries
- **Authentication:** JWT (python-jose), bcrypt
- **API Client:** Axios
- **Routing:** React Router DOM
- **Forms:** React Hook Form
- **Icons:** Lucide React
---

## 📸 Screenshots

### 🔐 Login/Register
<img width="1920" height="1080" alt="Screenshot 2025-12-13 111814" src="https://github.com/user-attachments/assets/4cdc5265-f173-4c62-8c1e-6ab6bbc95075" />

*Seamless authentication with toggle between login and register*

### 📊 API Documentation
<img width="1598" height="733" alt="Screenshot 2025-12-10 212918" src="https://github.com/user-attachments/assets/cca82e29-5716-46c2-b8c7-8791b0039dd4" />

*Interactive Swagger UI for testing all endpoints*

### 💾 Database
<img width="1920" height="1080" alt="Screenshot 2025-12-10 220405" src="https://github.com/user-attachments/assets/5c77e8a9-d1e0-4004-9c9b-d5ebf1c605fc" />

*Well-structured PostgreSQL database with proper relationships*

---

## 🚀 Installation

### Prerequisites

- Python 3.10 or higher
- Node.js 18 or higher
- PostgreSQL 16
- Git

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/dpallabi/sih-24.git
cd smart-student-system
```

### 2️⃣ Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
.\venv\Scripts\Activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
# Copy and fill in your database credentials
```

**Backend `.env` file:**
```env
DATABASE_URL=postgresql://postgres:5432@localhost:5432/smart_student
SECRET_KEY=your-super-secret-key-change-in-production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Create Database:**
```sql
-- Open PostgreSQL (pgAdmin or psql)
CREATE DATABASE smart_student;
```

**Run Backend:**
```bash
python -m uvicorn app.main:app --reload --port 8000
```

Backend will be running at: `http://127.0.0.1:8000`

### 3️⃣ Frontend Setup

```bash
# Open new terminal
cd frontend

# Install dependencies
npm install

# Create .env file
```

**Frontend `.env` file:**
```env
VITE_API_URL=http://127.0.0.1:8000/api/v1
```

**Run Frontend:**
```bash
npm run dev
```

Frontend will be running at: `http://localhost:5173`

---

## 📚 API Documentation

Once the backend is running, visit:
```
http://127.0.0.1:8000/docs
```

### API Endpoints

#### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/auth/me` - Get current user

#### Courses
- `GET /api/v1/courses/` - Get all courses
- `POST /api/v1/courses/` - Create course (Teacher/Admin)
- `GET /api/v1/courses/{id}` - Get course details
- `POST /api/v1/courses/enroll` - Enroll in course

#### Assignments
- `GET /api/v1/assignments/course/{id}` - Get course assignments
- `POST /api/v1/assignments/` - Create assignment (Teacher)
- `POST /api/v1/assignments/submit` - Submit assignment
- `PUT /api/v1/assignments/grade/{id}` - Grade submission

#### Attendance
- `POST /api/v1/attendance/` - Mark attendance
- `GET /api/v1/attendance/student/{id}/course/{id}` - Get student attendance
- `GET /api/v1/attendance/student/{id}/course/{id}/stats` - Get attendance stats

---

## 🗂️ Project Structure

```
smart-student-system/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── endpoints/
│   │   │       │   ├── auth.py
│   │   │       │   ├── courses.py
│   │   │       │   ├── assignments.py
│   │   │       │   └── attendance.py
│   │   │       └── api.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   ├── user.py
│   │   │   ├── course.py
│   │   │   ├── assignment.py
│   │   │   └── attendance.py
│   │   ├── schemas/
│   │   │   └── ...
│   │   └── main.py
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Courses.tsx
│   │   │   ├── Assignments.tsx
│   │   │   └── Attendance.tsx
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   └── courseService.ts
│   │   ├── store/
│   │   │   └── authStore.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env
│
├── screenshots/
│   ├── landing.png
│   ├── login.png
│   ├── api-docs.png
│   └── database.png
│
└── README.md
```

---

## 🎯 Usage

1. **Register an Account**
   - Visit `http://localhost:5173`
   - Click "Sign up" or navigate to login page
   - Fill in your details and create account

2. **Login**
   - Enter your email and password
   - Click "Sign In"

3. **Explore Features**
   - View enrolled courses
   - Submit assignments
   - Check attendance records

---

## 🔒 Security Features

- Password hashing using bcrypt
- JWT token-based authentication
- Protected routes and API endpoints
- CORS configuration for secure API access
- SQL injection prevention with SQLAlchemy ORM
- XSS protection through React

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Pallabi Debnath**

- GitHub: https://github.com/dpallabi/
- LinkedIn: https://www.linkedin.com/in/pallabi22/

---

## 🙏 Acknowledgments

- FastAPI documentation and community
- React and Tailwind CSS communities

---


</div>
