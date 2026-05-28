# AI Tooling Usage

This document summarizes the AI-assisted development tools used while building the Café Fausse web application.

## Tools Used

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

## Development Notes

The application was built as a local-only full-stack web application. The backend runs with Flask on localhost, the frontend runs with Vite on localhost, and PostgreSQL is used locally for persistent data storage.

AI assistance was used to speed up coding and planning, but the final application was tested locally to confirm the required functionality.