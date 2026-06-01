# MPloyChek — Background Verification SPA

A full-stack Single Page Application built for **NSQTech Private Limited** as part of their internship selection process. The platform simulates a digital background verification system with role-based access control, async API processing, and a complete user management panel.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Angular 15, TypeScript, RxJS, SCSS |
| Backend | Node.js, Express.js, TypeScript |
| Auth | JWT (JSON Web Tokens) |
| Storage | In-memory data store (easily swappable with MongoDB / DynamoDB) |

---

## Features

### Login Page
- User ID, Password, and Role (General User / Admin) fields
- JWT-based authentication with session persistence
- Reactive form validation with error states

### Dashboard (Logged-In Page)
- Displays logged-in user's profile details
- Fetches verification records from the API — **role-filtered**:
  - **General User** sees only their own submitted records
  - **Admin** sees all records in the system
- Async parallel loading using RxJS `forkJoin` (profile + records fetched concurrently)
- Configurable API delay (0.2s / 1.2s / 3s) to demonstrate async processing
- Sortable and filterable records table (by status, risk level, search)
- Skeleton loaders during API calls

### Admin Panel *(Admin role only)*
- Full **CRUD** user management — Create, Read, Update, Delete
- Toggle user active / inactive status inline
- Modal form with reactive validation
- Route guard + API middleware enforce Admin-only access

---

## Project Structure

```
project1/
├── express backend/        # Node.js + TypeScript REST API
│   └── src/
│       ├── server.ts
│       ├── models/         # In-memory DB (users + records)
│       ├── controllers/    # Auth, Records, Admin
│       ├── middleware/     # JWT auth + Admin guard
│       └── routes/
│
└── frontend angular/
    └── mean-frontend/      # Angular 15 SPA
        └── src/app/
            ├── core/       # Services, Interceptor, Guard
            ├── features/   # Auth, Dashboard, Admin modules
            └── shared/     # Models, Pipes
```

---

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/v1/auth/login` | Public | Login, returns JWT |
| GET | `/api/v1/auth/profile` | Any | Current user profile |
| GET | `/api/v1/records` | Any | Records (role-filtered) |
| GET | `/api/v1/admin/users` | Admin | List all users |
| POST | `/api/v1/admin/users` | Admin | Create user |
| PUT | `/api/v1/admin/users/:id` | Admin | Update user |
| DELETE | `/api/v1/admin/users/:id` | Admin | Delete user |

> All endpoints support `?delay=<ms>` to simulate configurable API latency.

---

## Getting Started

### Prerequisites
- Node.js 18+
- Angular CLI: `npm install -g @angular/cli`

### 1. Start the Backend
```bash
cd "express backend"
npm install
npm run dev
# API runs at http://localhost:3000
```

### 2. Start the Frontend
```bash
cd "frontend angular/mean-frontend"
npm install
ng serve
# App runs at http://localhost:4200
```

---

## Demo Credentials

| Role | User ID | Password |
|------|---------|----------|
| Admin | admin01 | Admin@123 |
| General User | user01 | User@123 |
| General User | user02 | User@123 |

---

## Key Implementation Highlights

**Async Processing with RxJS forkJoin**
```typescript
// Profile and records are fetched in parallel — not sequentially
forkJoin({
  profile: this.authService.getProfile(),
  records: this.recordsService.getRecords(this.apiDelay),
}).subscribe(({ profile, records }) => { ... });
```

**JWT Interceptor — auto-attaches token to every request**
```typescript
req = req.clone({
  setHeaders: { Authorization: `Bearer ${token}` }
});
```

**Role-aware Route Guard**
```typescript
canActivate(route: ActivatedRouteSnapshot): boolean {
  if (route.data['role'] && user.role !== route.data['role']) {
    this.router.navigate(['/dashboard']);
    return false;
  }
  return true;
}
```

---

## Evaluation Criteria Met

- ✅ Angular 15 SPA with lazy-loaded modules
- ✅ Node.js + TypeScript backend with REST API
- ✅ JWT authentication with role-based access (Admin / General User)
- ✅ Async processing demonstrated via configurable API delay + RxJS forkJoin
- ✅ Admin user management (CRUD)
- ✅ Modular code architecture (UserService, AuthService, RecordsService, AdminService)
- ✅ Clean component/service separation

---

*Built by Paarthibah V 
