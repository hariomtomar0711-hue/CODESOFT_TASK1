# EduManage — Student Management System

A full-stack education management MVP built with Next.js App Router, Node.js, PostgreSQL, Prisma, TypeScript, and a simple responsive UI.

## Features

- Role-based sign-in for `ADMIN`, `TEACHER`, and `STUDENT`
- Admin dashboard and student/teacher directory management
- Attendance records with `PRESENT`, `ABSENT`, `LATE`, and `EXCUSED` states
- Exam scheduling, result entry, marks validation, and student result visibility
- Fee invoices, payment recording, balances, and status tracking
- Prisma relational schema and demo seed data
- Server-side API authorization, Zod validation, password hashing, HTTP-only signed session cookie
- Responsive dashboard layout

## Prerequisites

- Node.js 20.9+ (recommended)
- npm
- PostgreSQL 14+ (local PostgreSQL or a hosted PostgreSQL database)

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file:

   ```bash
   cp .env.example .env
   ```

   Update `DATABASE_URL` to match your PostgreSQL user, password, host, and database. Set `AUTH_SECRET` to a long random secret (at least 32 characters). Do not commit `.env`.

3. Create the database. For a local PostgreSQL installation, you can run:

   ```sql
   CREATE DATABASE edumanage;
   ```

4. Generate Prisma Client and apply the initial migration:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Add demo users and example records:

   ```bash
   npm run db:seed
   ```

6. Start the development server:

   ```bash
   npm run dev
   ```

7. Open http://localhost:3000.

## Demo accounts

All seeded accounts use the password `Demo@12345`.

| Role | Email |
|---|---|
| Administrator | `admin@edumanage.local` |
| Teacher | `teacher@edumanage.local` |
| Student | `student@edumanage.local` |

Change or remove demo credentials before deploying anywhere public.

## Main routes

- `/` — landing page
- `/login` — sign-in page
- `/dashboard` — role-specific dashboard
- `/dashboard/students` — student directory (admin/teacher)
- `/dashboard/teachers` — teacher directory (admin)
- `/dashboard/attendance` — attendance register and student view
- `/dashboard/exams` — exams and results
- `/dashboard/fees` — fee register and student view

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/login` | Authenticate user |
| POST | `/api/auth/logout` | Clear session |
| GET | `/api/auth/me` | Current session profile |
| GET/POST | `/api/students` | List/create students |
| GET/POST | `/api/teachers` | List/create teachers |
| GET/POST | `/api/attendance` | Read/mark attendance |
| GET/POST | `/api/exams` | List/create exams |
| POST | `/api/results` | Create/update a student's result |
| GET/POST | `/api/fees` | List/create invoices |
| POST | `/api/fees/payment` | Record a fee payment |
| GET/POST | `/api/subjects` | List/create subjects |

## Database entities

- `User` — login identity and role
- `Student` — admission, class, guardian and academic relationships
- `Teacher` — staff ID and department
- `Subject` — subject catalog and optional assigned teacher
- `Attendance` — per-student daily attendance (unique by student/date)
- `Exam` — subject exam schedule and maximum marks
- `ExamResult` — marks and grade (unique by exam/student)
- `FeeInvoice` — total, paid amount, due date and status
- `FeePayment` — payment transaction ledger

## Important notes / production hardening

This is a runnable project starter, not a certified production student information system. Before public deployment:

- Use a strong unique `AUTH_SECRET`, HTTPS, rate limiting, login lockouts, security monitoring, and password reset/MFA.
- Review authorization rules against your institution's policies; implement teacher-to-class/subject assignment checks on every relevant API.
- Add audit logs for student record edits, marks changes, and payment operations.
- Do not store card/bank details; integrate a reputable payment gateway if online payment is needed.
- Add pagination, filtering, export/backup strategy, automated tests, and accessibility checks.
- Consider stricter CSRF/origin protection and session revocation.
- Add administrator workflows for editing/deactivating records and a dedicated class/section model.
- The starter's dashboard menu is shared, so some navigation links may not visually highlight the current sub-page; authorization is enforced server-side by the APIs.

## Troubleshooting

- **Prisma can't connect:** verify PostgreSQL is running and `DATABASE_URL` is correct.
- **No demo users:** run `npm run db:seed`.
- **Prisma client error:** run `npx prisma generate`.
- **Port 3000 is in use:** run `npm run dev -- -p 3001`.
