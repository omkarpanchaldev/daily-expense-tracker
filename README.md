# DailyExpenseTracker

DailyExpenseTracker is a full-stack application for tracking personal expenses, managing expense records, and analyzing spending patterns through an interactive dashboard.

The system is built using:
- **Backend:** **Django** (Python) with a set of API endpoints under `/api/`.
- **Frontend:** **React** (SPA) that consumes the Django APIs to provide chart-based analytics, reporting, and expense management.

---

## Overview

In this project, users can:
1. **Sign up** and **log in**.
2. **Add expenses** (date, item/category, amount).
3. **Manage expenses** (view, update, delete).
4. **Search expenses** within a date range and compute totals.
5. View a **Dashboard** with:
   - Daily / Weekly / Monthly expense trends
   - Total cumulative spending growth
   - Category distribution (donut chart)
   - Forecast-style insight for upcoming spending based on recent trends

---

## Tech Stack

### Backend (Django)
- **Python / Django 6.0.1**: Core backend framework (routing, request/response handling, ORM).
- **Django ORM**: Models and database interactions.
- **SQLite**: Local development database (`db.sqlite3`).
- **django-cors-headers**: Enables cross-origin access so the React frontend can call Django.
- **JSON APIs**: Responses are returned using `JsonResponse`.

### Frontend (React)
- **React (v19.x)** and **Create React App** (`react-scripts`).
- **React Router**: Page navigation.
- **Chart.js + react-chartjs-2**: Visualization components (line and donut charts).
- **react-toastify**: Toast notifications for API results.
- **Bootstrap**: Layout and styling.

---

## Repository Structure

- `backend/`
  - `backend/`: Django project configuration (settings, URLs, WSGI/ASGI)
  - `expense/`: Django app containing **models**, **views**, and **URL routing**
- `frontend/`
  - `src/components/`: React pages/components for UI and user interactions

---

## Backend (Django) — Detailed Breakdown

### Application Design
The backend exposes a collection of endpoints that support both transactional operations (CRUD for expenses) and analytical needs (aggregated totals for charts).

CORS is enabled so the frontend can call the API while running on a different port.

### Models

#### 1) `UserDetail`
Stores basic user information.
- `FullName` — user full name
- `Email` — unique email address
- `Password` — password string (stored in the model)
- `RegDate` — timestamp when the record is created

#### 2) `Expense`
Stores expense records linked to a user.
- `UserId` — `ForeignKey` to `UserDetail` (cascade delete)
- `ExpenseDate` — date of the expense
- `ExpenseItem` — expense category/name
- `ExpenseCost` — expense amount (stored as a string field in the current model)
- `NoteDate` — timestamp when the record is created

### API Routing
All API endpoints are mounted using:
- `backend/backend/urls.py` → `path('api/', include('expense.urls'))`

Base URL:
- `http://https://daily-expense-tracker-1mso.onrender.com/api/`

### Key Endpoints
Implemented in `backend/expense/urls.py` and handled in `backend/expense/views.py`:

#### Authentication
- **POST** `/api/signup/`
  - Creates a new `UserDetail` record.
- **POST** `/api/login/`
  - Validates credentials and returns `userId` and `userName`.

#### Expense CRUD
- **POST** `/api/add_expense/`
  - Creates a new expense for a user.
- **GET** `/api/manage_expense/<int:user_id>/`
  - Returns all expenses belonging to the user.
- **PUT** `/api/update_expense/<int:expense_id>/`
  - Updates expense fields.
- **DELETE** `/api/delete_expense/<int:expense_id>/`
  - Deletes an expense.

#### Reporting
- **GET** `/api/search_expense/<int:user_id>/?from=YYYY-MM-DD&to=YYYY-MM-DD`
  - Filters expenses by date range.
  - Returns both the expense list and a computed `total` sum.

#### Password Management
- **POST** `/api/change_password/<int:user_id>/`
  - Allows a user to update their password after validating the old password.

#### Dashboard Analytics Endpoints
- **GET** `/api/expense_by_date/<int:user_id>/`
  - Returns expenses aggregated by date (used to build dashboard line charts).
  - Includes summation logic optimized for compatibility with SQLite.

- **GET** `/api/expense_summary/<int:user_id>/`
  - Returns totals grouped by `ExpenseItem` (used to populate the donut chart).
  - Uses Django `annotate()` with `Sum()`.

---

## Frontend (React) — Detailed Breakdown

### Routing
Configured via `frontend/src/App.js` (React Router):
- `/` — Home
- `/signup` — Signup
- `/login` — Login
- `/dashboard` — Dashboard analytics
- `/add-expense` — Add new expense
- `/manage-expense` — Manage existing expenses
- `/expense-report` — Search expenses by date range
- `/change-password` — Update password

### State Management
- After login, `userId` and `userName` are stored in `localStorage`.
- Pages read `userId` from `localStorage` and call Django endpoints accordingly.

### Charts & Analytics UI
The Dashboard uses:
- **Chart.js** for rendering:
  - Line charts: daily/weekly/monthly trends and cumulative growth
  - Donut chart: category share
- A dashboard-side analytics layer:
  - Transforms raw expense data into chart-ready series
  - Builds continuous daily and cumulative datasets
  - Computes trend and forecast insights (lightweight regression-based projection)

### Forecasting / Insights
The dashboard includes a regression-style forecasting computation for upcoming spending (next 7 and 30 days). The forecast is presented along with:
- confidence indicator (based on data availability/non-zero distribution)
- risk-style summary text (derived from comparing projected totals with recent spend)

### Notifications
- Uses **react-toastify** to communicate results to the user during API calls (success/error messaging).

---

## Development Setup (Quick Start)

### Backend
1. Go to the backend folder:
   - `cd backend`
2. Start Django:
   - `python manage.py runserver`

Backend runs on:
- `http://https://daily-expense-tracker-1mso.onrender.com`

### Frontend
1. Go to the frontend folder:
   - `cd frontend`
2. Install dependencies:
   - `npm install`
3. Start React:
   - `npm start`

Frontend runs on:
- `http://localhost:3000`

---

## CORS & API Integration
During development, React runs on a different port than Django. To allow cross-origin requests:
- Django enables CORS via `corsheaders`.
- The frontend sends requests to `http://https://daily-expense-tracker-1mso.onrender.com/api/...`.

---

## Future Improvements (Recommended)
For production readiness and data quality, the following upgrades are recommended:
- **Secure authentication**: hash passwords and use Django authentication mechanisms.
- **Token-based auth**: JWT or session-based protections for API endpoints.
- **Data types**: migrate `ExpenseCost` from `CharField` to a numeric type (e.g., `DecimalField`).
- **Validation & error handling**: consistent validation for dates, amounts, and API payloads.
- **API structure**: standardize REST conventions (status codes, response schemas, pagination where needed).

---

*Built using Django and React to deliver an end-to-end expense tracking and analytics experience.*

