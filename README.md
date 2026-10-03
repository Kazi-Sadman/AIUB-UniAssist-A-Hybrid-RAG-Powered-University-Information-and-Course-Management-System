# 🎓  AIUB UniAssist A Hybrid RAG-Powered University Information and Course Management System (FastAPI)

## 📌 Overview

This is a **FastAPI backend project** for managing students, courses, departments, and enrollments.

It supports:

* Student management
* Course management
* Department management
* Student-course enrollment system
* Relationship-based data fetching

The project follows a **clean layered architecture**:

```text id="arch1"
Routes → Services → Models → Database
```

---

# 📁 Project Structure

```text id="struct1"
backend/
│
├── app/
│   ├── main.py
│   ├── database.py
│   │
│   ├── models/
│   │   ├── department.py
│   │   ├── student.py
│   │   ├── course.py
│   │   └── enrollment.py
│   │
│   ├── schemas/
│   │   ├── department.py
│   │   ├── student.py
│   │   ├── course.py
│   │   └── enrollment.py
│   │
│   ├── routes/
│   │   ├── department.py
│   │   ├── student.py
│   │   ├── course.py
│   │   └── enrollment.py
│   │
│   └── services/
│       ├── student_service.py
│       ├── course_service.py
│       └── enrollment_service.py
        --- department_service.py
│
├── requirements.txt
└── README.md
```

---

# ⚙️ Tech Stack

* Python 3.x
* FastAPI
* SQLAlchemy ORM
* Pydantic
* Uvicorn
* SQLite / PostgreSQL

---

# 🚀 Features

## 👨‍🎓 Student Module

* Create student
* Get all students
* Get student by ID
* Delete student
* Update student information

## 📚 Course Module

* Create course
* Get all courses
* Get course by ID
* Update course
* Delete course

## 🏢 Department Module

* Create department
* Get departments
* Get department by ID
* Delete Department
  
## 🔗 Enrollment Module

* Enroll student in course
* Prevent duplicate enrollment
* Get all enrollments
* Get courses by student
* Get students by course
* Show all courses taken by student ID.
* Show all students enrolled in course ID.
* Delete enrollment

---

# 🧠 Architecture Explanation

This project uses **Service Layer Architecture**:

### 🔹 Routes Layer

Handles HTTP requests (GET, POST, DELETE)

### 🔹 Services Layer

Contains all business logic (validation, queries, rules)

### 🔹 Models Layer

Defines database tables using SQLAlchemy

### 🔹 Schemas Layer

Handles request/response validation using Pydantic

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Project

```bash id="clone1"
git clone <your-repo-url>
cd backend
```

---

## 2️⃣ Create Virtual Environment

### Windows:

```bash id="venv1"
python -m venv venv
venv\Scripts\activate
```

### Linux/Mac:

```bash id="venv2"
python3 -m venv venv
source venv/bin/activate
```

---

## 3️⃣ Install Dependencies

```bash id="install1"
pip install -r requirements.txt
```

If missing:

```bash id="install2"
pip install fastapi uvicorn sqlalchemy pydantic
```

---

## 4️⃣ Run Server inside backend folder

```bash id="run1"
uvicorn app.main:app --reload
```

---

# 🌐 API Base URL

```
http://127.0.0.1:8000
```

---

# 📖 API Documentation

## Swagger UI

```
http://127.0.0.1:8000/docs
```

## ReDoc

```
http://127.0.0.1:8000/redoc
```

---

# 🔗 Key API Endpoints

## 📌 Enrollment APIs

### Create Enrollment

```http id="api1"
POST /enrollments
```

### Get All Enrollments

```http id="api2"
GET /enrollments
```

### Get Courses by Student

```http id="api3"
GET /students/{id}/courses
```

### Get Students by Course

```http id="api4"
GET /courses/{id}/students
```

### Delete Enrollment

```http id="api5"
DELETE /enrollments/{id}
```

---

# 🔄 Application Flow

## Example: Create Enrollment

```text id="flow1"
Client (Postman)
    ↓
Route Layer (enrollment.py)
    ↓
Service Layer (business logic)
    ↓
Validation (student + course check)
    ↓
Duplicate check
    ↓
Model (SQLAlchemy)
    ↓
Database
    ↓
Response to client
```

---

# 🧪 Testing (Postman Example)

## Create Enrollment

```json id="post1"
POST http://127.0.0.1:8000/enrollments
```

```json id="post2"
{
  "student_id": 1,
  "course_id": 1
}
```

---

# 🚨 Important Rules

* A student cannot enroll in the same course twice
* Student must exist before enrollment
* Course must exist before enrollment
* All business logic is handled in service layer

---

# 🔮 Future Improvements

* JWT Authentication
* Role-based access (Admin/Student)
* Pagination
* Search & filtering
* Docker support
* Frontend integration (React/Vue/Angular)

---

# 👨‍💻 Author

**Kazi Sadman Zahin**
AIUB - Computer Science & Engineering
