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
* Browser-detected time zone, explicit timestamps, and server-validated half-hour booking slots
* Transaction-safe table allocation for simultaneous requests
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
  AI-use.md
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

Prerequisites: Node.js 24 (this review used 24.19.0), Python 3.11 or newer (tested with 3.14.0), and a running PostgreSQL server. Install PostgreSQL and create a local user/password before following the database steps. The Python requirements include `tzdata` so IANA browser zones work on Windows.

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
psql -U postgres -c "CREATE DATABASE cafe_fausse;"
psql -U postgres -d cafe_fausse -f schema.sql
```

Skip database creation if it already exists. `schema.sql` preserves existing tables. These application fixes require no schema migration and do not reinterpret old reservation records.

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
npm ci
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
  "time_slot": "2099-01-05T18:00:00Z",
  "time_zone": "Europe/Paris",
  "number_of_guests": 2,
  "customer_name": "Test Customer",
  "email_address": "test@example.com",
  "phone_number": "2025551234"
}
```

The system assigns one available table from 30 total tables.

The example represents 7:00 PM in Paris. The actual website detects `time_zone` using the browser and converts the selected local date/time into an explicit timestamp. Replace the example with a future slot for your own demo. Opening hours are evaluated in the browser's zone, as chosen for this project: Monday–Saturday 5:00–11:00 PM and Sunday 5:00–9:00 PM. Slots start on the hour or half hour; the last starts at 10:30 PM or 8:30 PM on Sunday. A slot is a discrete half-hour booking interval; a longer dining-duration policy is not modelled by the assignment implementation.

PostgreSQL stores the instant in `TIMESTAMPTZ`; the server's display zone does not change its meaning. Availability and transaction locks use that instant, so visitors in different zones booking the same instant share the same 30-table capacity. The confirmation displays the booking in the submitting browser's zone. Older records keep their existing stored instants.

Newsletter signup updates an existing customer's opt-in flag without replacing their name or phone. A rejected full-slot reservation creates no customer or reservation record. Invalid times, fractional or out-of-range guest counts, and malformed requests return validation errors. Database failures return a friendly retry message.

For another backend address, set `VITE_API_BASE_URL` in `frontend/.env.local` before starting Vite. Local development defaults to `http://127.0.0.1:5000`.

### GET `/api/customers`

Returns stored customer records for testing and verification.

### GET `/api/reservations`

Returns stored reservation records for testing and verification.

## Testing and Verification

From `frontend`, run `npm run build`, `npm run lint`, and `npm test`.

From `backend` with the virtual environment active, run the validation tests:

```powershell
python -m unittest test_app -v
```

To include real PostgreSQL regression tests, use the configured local development database:

```powershell
$env:CAFE_FAUSSE_TEST_DATABASE = "1"
python -m unittest test_app -v
Remove-Item Env:CAFE_FAUSSE_TEST_DATABASE
```

The database user must be allowed to create a schema. Tests create a unique `cafe_fausse_test_...` schema, use only its tables, and remove it afterward; existing application records are preserved. Coverage includes 32 competing bookings for one slot (30 successes, two full-slot rejections), no customer writes on rejected bookings, newsletter preservation, duplicate subscriptions, and zone conversion. The default run skips PostgreSQL tests unless explicitly enabled.

The October 2026 review passed the production build, lint, three frontend tests, eight backend tests with PostgreSQL enabled, and Python dependency checks. The broadband performance targets remain to be verified.

On October 14, 2026, the production build passed 228 automated browser checks with Playwright 1.62.1 on Windows: 57 each in installed Google Chrome 155.0.8059.79, installed Microsoft Edge 155.0.4283.45, Playwright Firefox 153.0, and Playwright WebKit 26.5. Each browser was checked at desktop (1440 x 1000), tablet (768 x 1024), phone (390 x 844), narrow phone (320 x 568), and landscape phone (844 x 390) sizes. Chrome and Edge used Android device emulation, WebKit used iPhone emulation, and Firefox used responsive viewports with touch enabled; these are simulated profiles, not physical-device tests.

Checks covered all five routes and image decoding, every header navigation link, touch activation of navigation/gallery/form controls, gallery dialog/keyboard behavior, booking and newsletter submissions to the real Flask/PostgreSQL backend, duplicate newsletter signup, invalid inputs, Sunday closing, winter/summer time-zone conversion, a New York browser zone, full-slot rejection, and readable connection-failure feedback. All checked layouts had no horizontal overflow, and no uncaught JavaScript exceptions occurred. Direct database checks for each browser confirmed preserved customer details, 30 distinct tables in a full slot, and no customer created by a rejected booking. Tests used a temporary schema that was removed afterward; application record counts were unchanged. Screenshots were inspected. No application code changes were needed.

Native Safari on macOS/iOS and physical Android/iPhone browsers remain unverified. WebKit results provide engine compatibility evidence but do not establish native Safari or operating-system-specific behavior such as the on-screen keyboard and native date picker.

For a physical phone check, connect the phone and development computer to the same local network. Run the backend with `venv\Scripts\python.exe -m flask --app app run --host 0.0.0.0 --port 5000`. In the frontend terminal set `$env:VITE_API_BASE_URL = "http://YOUR-PC-LAN-IP:5000"`, then run `npm.cmd run dev -- --host 0.0.0.0`. Open the displayed network URL on the phone. The API address must use the computer's LAN IP because `127.0.0.1` on the phone refers to the phone itself. Stop the servers and remove the temporary variable with `Remove-Item Env:VITE_API_BASE_URL` when finished. Normal desktop development can use the original start commands.

Browser checks also passed for a complete reservation/newsletter flow against an isolated database, confirmation in the browser's zone, unique newsletter labels, Escape-to-close and focus restoration in the gallery, and a phone-width layout without horizontal overflow.

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
9. Show validation of invalid input and a fully booked slot; explain browser time zones and protection against simultaneous bookings.

`quick_test.py` uses a future evening slot and **creates demonstration records in the configured database**. The isolated regression tests above are preferable for repeated verification.

## Supplied Images and Submission

All four course-supplied pictures are used: the home picture on Home, and interior, ribeye, and special-event pictures in Gallery. No behind-the-scenes picture was included in the supplied pack; none is mislabelled as one. The gallery supports enlarged viewing, Escape to close, focus restoration, and native dialog focus containment.

The current brief asks for a Google Drive link to the recorded presentation plus a PDF with GitHub repository link(s). The recording should run around 5–10 minutes, show the presenter and required identity steps, and demonstrate all pages, forms, direct PostgreSQL effects, and implementation decisions. Confirm the private repository contains the final code, this README, and `ai-tooling.md`, and grants access to `quantic-grader`. Group submissions additionally require the specified member repository links and signed agreement page.

`AI-use.md` provides a short AI-use summary; `ai-tooling.md` retains the detailed account under the rubric's required filename. The earlier brief under `docs/ProjectBrief.pdf.pdf` has the older submission wording; use the current course brief and submission form for packaging.

## Local-Only Deployment

This project is designed to run locally. No public staging server is required for this submission.
