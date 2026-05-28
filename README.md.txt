# Café Fausse Web Application

Café Fausse is a local full-stack restaurant website built for the Web Application & Interface Design project. The application provides a polished web presence for a fine-dining Italian restaurant and includes informational pages, a menu, gallery, newsletter signup, and a working reservation system.

## Features

* React front end built with Vite and JSX
* Flask back end with REST API endpoints
* PostgreSQL database for persistent storage
* Five required pages:

  * Home
  * Menu
  * Reservations
  * About
  * Gallery
* Responsive design using CSS Flexbox/Grid
* Newsletter signup with email validation
* Reservation form with customer details, date/time selection, party size, and optional phone number
* Random table assignment from 30 available tables
* Prevention of overbooking for a selected reservation time
* Gallery with restaurant images, awards, reviews, and lightbox behavior
* Local-only development setup

## Technology Stack

### Front End

* React
* JSX
* Vite
* Plain CSS
* Flexbox/Grid

### Back End

* Python
* Flask
* Flask-CORS
* psycopg2
* python-dotenv

### Database

* PostgreSQL

## Project Structure

```text
CafeFausse/
  backend/
    app.py
    db.py
    schema.sql
    migrate.sql
    check_db.py
    quick_test.py
    requirements.txt
    .env.example

  frontend/
    src/
      assets/
      components/
      lib/
      pages/
      App.jsx
      App.css
      index.css
      main.jsx
    package.json
    vite.config.js

  docs/
    CafeFausse_SRS.pdf.pdf
    ProjectBrief.pdf.pdf

  README.md
  ai-tooling.md
```

## Database Tables

The PostgreSQL database stores restaurant customers, reservations, and newsletter signups.

### customers

Stores customer information including name, email, phone number, and newsletter signup status.

### reservations

Stores reservation details including customer reference, party size, reservation date/time, and assigned table number.

### newsletter_signups

Stores submitted newsletter email addresses.

## Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/GaweVerl/cafe-fausse.git
cd cafe-fausse
```

### 2. Set up the backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Create the PostgreSQL database

Create a local PostgreSQL database named:

```text
cafe_fausse
```

Then apply the schema:

```bash
psql -U postgres -d cafe_fausse -f schema.sql
```

If `psql` is not available in the Windows PATH, the schema can also be applied through a PostgreSQL GUI tool such as pgAdmin.

### 4. Configure environment variables

Create a file named `.env` inside the `backend` folder.

Use `.env.example` as a reference:

```env
PGUSER=postgres
PGPASSWORD=your_password
PGDATABASE=cafe_fausse
PGHOST=localhost
PGPORT=5432
```

The `.env` file is intentionally excluded from GitHub.

### 5. Run the backend

From the `backend` folder:

```bash
venv\Scripts\activate
python app.py
```

The backend runs at:

```text
http://127.0.0.1:5000
```

Health check:

```text
http://127.0.0.1:5000/api/health
```

### 6. Set up the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend runs locally at a Vite URL such as:

```text
http://localhost:5173
```

or

```text
http://localhost:5174
```

## API Endpoints

### GET `/api/health`

Returns a simple status response to confirm the Flask backend is running.

### POST `/api/newsletter`

Submits a newsletter signup email and stores it in the database.

Example request:

```json
{
  "email": "customer@example.com"
}
```

### POST `/api/reservations`

Creates a reservation if a table is available for the selected time slot.

Example request:

```json
{
  "time_slot": "2026-07-01T19:00",
  "number_of_guests": 2,
  "customer_name": "Test Customer",
  "email_address": "test@example.com",
  "phone_number": "2025551234"
}
```

The system assigns one available table from 30 total tables.

### GET `/api/customers`

Returns stored customer records for testing and verification.

### GET `/api/reservations`

Returns stored reservation records for testing and verification.

## Testing and Verification

The application was tested locally by running both the Flask backend and React frontend.

The following flows were verified:

* Home page renders correctly
* Menu page displays required menu items and prices
* About page displays restaurant history and founder information
* Gallery page displays images, awards, reviews, and lightbox behavior
* Newsletter signup validates email input and writes to PostgreSQL
* Reservation form validates user input, assigns a table, and writes to PostgreSQL
* Database records can be checked using `backend/check_db.py`

To inspect database records:

```bash
cd backend
venv\Scripts\activate
python check_db.py
```

## Demo Notes

During the recorded demo, the following should be shown:

1. Start the Flask backend.
2. Start the React frontend.
3. Navigate through the five required pages.
4. Submit a newsletter signup.
5. Submit a reservation.
6. Show the success message with the assigned table number.
7. Run `python check_db.py` to demonstrate that newsletter, customer, and reservation records were written to PostgreSQL.
8. Briefly explain the implementation choices.

## Local-Only Deployment

This project is designed to run locally. No public staging server is required for this submission.
