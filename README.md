# Secure Academic Policy Enforcement Tool (SAPET)

Production-ready MERN stack application to digitally enforce academic rules and regulations with role-based workflows.

## Features
- JWT authentication and role-based access (Admin, Faculty, Student)
- Violation workflow: Faculty Report ? Student Response ? Admin Decision
- Policy management, analytics dashboard, audit logs
- Email notifications (Nodemailer)
- Search, filters, pagination
- File upload for evidence

## Tech Stack
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express.js
- Database: MongoDB (Mongoose ODM)
- Auth: JWT + bcrypt

## Project Structure
```
backend/
  src/
    app.js
    server.js
    config/
    controllers/
    middleware/
    models/
    routes/
    scripts/
    utils/
frontend/
  src/
    api/
    components/
    context/
    pages/
    routes/
    styles/
docs/
  API.md
```

## Setup

### 1) Backend
```
cd backend
cp .env.example .env
npm install
npm run dev
```

### 2) Frontend
```
cd frontend
cp .env.example .env
npm install
npm run dev
```

### 3) Seed Sample Data
```
cd backend
npm run seed
```

Seed users:
- Admin: `admin@sapet.edu` / `AdminPass123`
- Faculty: `faculty@sapet.edu` / `FacultyPass123`
- Student: `student@sapet.edu` / `StudentPass123`

## Environment Variables
Backend: `backend/.env`
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/sapet
JWT_SECRET=change_me_super_secret
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_user
MAIL_PASS=your_pass
MAIL_FROM="SAPET <no-reply@sapet.edu>"
UPLOAD_DIR=src/uploads
```

Frontend: `frontend/.env`
```
VITE_API_URL=http://localhost:5000/api
```

## API Documentation
See `docs/API.md` for endpoints and payloads.

## Notes
- Email sending is enabled when SMTP variables are configured.
- Evidence files are stored under `backend/src/uploads` and served from `/uploads`.
- Use HTTPS and rotate `JWT_SECRET` in production.
