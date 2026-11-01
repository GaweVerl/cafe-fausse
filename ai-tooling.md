# AI Tooling Usage

This document summarizes the AI-assisted development tools used while building the Café Fausse web application.

## Tools Used

### Codex (October 2026 review and fixes)

After resuming the course, Codex was used to compare the new assignment brief and SRS with the existing application, then implement approved fixes.

It helped with:

- Comparing the new submission instructions with the older project brief
- Reproducing reservation validation and newsletter data-integrity defects
- Detecting the visitor's browser time zone, displaying it, and sending an explicit booking timestamp to Flask
- Validating future bookings, opening hours, half-hour slots, email addresses, and guest counts on the server
- Protecting table allocation with PostgreSQL transaction locks and preserving customer details during newsletter signup
- Improving mobile navigation, newsletter labels, gallery keyboard access, and service-failure messages
- Writing regression tests for real concurrent bookings, customer preservation, and time-zone conversion
- Refreshing setup, verification, and submission guidance

The browser time-zone policy was a user-directed design decision. Opening hours and the selected booking date/time are interpreted in that browser zone, and the database stores an unambiguous instant. It is not a fixed Washington, DC time-zone policy.

### ChatGPT

ChatGPT was used as a planning, product ownership, technical guidance, and debugging assistant throughout the project.

It helped with:

- Interpreting the project brief and Software Requirements Specification
- Breaking the project into a prioritized backlog
- Defining the required pages, features, and acceptance criteria
- Planning the full-stack architecture
- Designing the database structure
- Planning Flask API endpoints
- Creating testing and verification steps
- Preparing README and project documentation
- Troubleshooting setup issues on Windows
- Planning the final demo presentation

### Cursor

Cursor was used as the primary AI-assisted coding environment.

It helped with:

- Creating the Flask backend structure
- Creating PostgreSQL schema files
- Implementing API routes
- Building the React/Vite frontend
- Creating reusable React components
- Connecting frontend forms to Flask API endpoints
- Styling the application with CSS
- Using provided image assets in the interface
- Running local smoke tests
- Fixing implementation issues during development

## How AI Was Used

AI tools were used to accelerate development, but the project was still reviewed, tested, and adjusted locally.

The process followed this pattern:

1. Review the project requirements.
2. Ask AI to help plan a small, testable next step.
3. Implement the step in Cursor.
4. Run the application locally.
5. Test the feature manually.
6. Check the database output.
7. Commit working progress to GitHub.

## What Worked Well

AI was especially helpful for:

- Converting the SRS into implementation tasks
- Creating a clear project structure
- Generating initial backend and frontend code
- Explaining setup commands
- Debugging common Windows development issues
- Creating a simple database verification script
- Producing documentation and demo guidance

## What Required Manual Review

Some parts required careful manual checking:

- Verifying that the database actually stored newsletter and reservation records
- Confirming that the React frontend could communicate with the Flask backend
- Checking that local environment variables matched the PostgreSQL setup
- Making sure the app met the specific SRS requirements
- Testing the website pages and forms in the browser
- Ensuring private configuration files such as `.env` were not committed to GitHub

## What Did Not Work Without Further Review

- The earlier implementation parsed booking timestamps but did not reject past dates or closed hours.
- Newsletter signup originally replaced existing customer names and phone numbers. Database checks exposed this unintended update.
- A uniqueness constraint alone prevented duplicate stored bookings, but did not make concurrent allocation return a friendly response. A transaction lock was needed around availability and allocation.
- Reusable newsletter forms originally duplicated an HTML field ID, and the gallery initially lacked keyboard focus handling. Browser review was needed to find these UI details.
- The first database and preview checks were blocked by the execution sandbox; repeating them with local access established that the existing database worked.
- The supplied image pack contains interior, food, and special-event pictures, but no behind-the-scenes photo. Existing pictures were not relabelled as content they do not show.

## Verification of the October 2026 Changes

The frontend production build, lint check, and three booking-helper tests passed. Eight backend regression tests passed, including real PostgreSQL tests with 32 competing booking requests: 30 succeeded and two received a full-slot response. Tests also covered newsletter preservation, duplicate subscriptions, browser zones referring to the same instant, daylight-saving offsets, invalid input, and friendly outage responses.

The PostgreSQL regression tests run in a uniquely named test schema and remove it afterward. They do not clear the application's customer, reservation, or newsletter records. The quick smoke-test script is separate and intentionally creates demonstration records.

Browser verification also confirmed a complete reservation and subsequent newsletter signup through an isolated API/database, a browser-zone confirmation, unique newsletter labels, Escape-to-close with focus restoration, and a phone-width layout without horizontal overflow.

These checks do not establish the SRS broadband performance targets or compatibility with every named browser. The recording, submission PDF, and GitHub grader access still require completion or confirmation by the student.

On October 14, 2026, Codex also prepared and ran 46 automated production-build checks using Playwright 1.62.1 and WebKit 26.5 on Windows, across desktop, tablet, and two phone viewport sizes. All passed, covering the five pages, images, navigation, real backend booking/newsletter flows, validation, time zones and daylight saving, full-slot feedback, network-failure feedback, and gallery keyboard behavior. Direct PostgreSQL checks confirmed customer preservation and correct full-slot records. The temporary schema was removed and existing application record counts were unchanged. Screenshots were inspected. Native dialog keyboard tests allow focus to move to browser chrome while ensuring background controls remain inert. These results support WebKit compatibility but do not establish native Safari behavior on Apple hardware; that check remains outstanding.

At the student's request, Codex then expanded the browser suite to installed Chrome 155.0.8059.79, installed Edge 155.0.4283.45, Playwright Firefox 153.0, and WebKit 26.5. All 228 checks passed (57 per browser), including all header navigation links, touch activation, and a landscape phone profile in addition to desktop, tablet, 390-pixel phone, and 320-pixel phone layouts. Chrome/Edge used simulated Android profiles, WebKit used simulated iPhone profiles, and Firefox used responsive viewports with touch enabled. No uncaught JavaScript exceptions or horizontal overflow occurred. Real backend/database writes and full-slot integrity were checked separately for each browser in the temporary schema. Test records were removed, application record counts were unchanged, and the production build was restored to its normal API address. Screenshots were inspected. No application code changes were needed. Native Safari and physical mobile-device behavior remain unverified; the README records this distinction and includes a local-network setup for physical phone checks.

## Image Assets

The four course-supplied images are used: `home-cafe-fausse.webp` on the home page, and the interior, ribeye, and special-event pictures in the gallery. The supplied files were verified to match the project assets. No additional image was generated during this review and fix work.

## Development Notes

The application was built as a local-only full-stack web application. The backend runs with Flask on localhost, the frontend runs with Vite on localhost, and PostgreSQL is used locally for persistent data storage.

AI assistance was used to speed up coding and planning, but the final application was tested locally to confirm the required functionality.
