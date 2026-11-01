# AI Use

This project used ChatGPT for planning and explanations, Cursor for the initial implementation, and Codex for the October 2026 assignment review, approved fixes, and verification.

Codex helped correct booking validation, browser time-zone handling, concurrent table allocation, customer preservation during newsletter signup, error messages, mobile navigation, and accessibility. It also helped write regression tests and update the project documentation. The student directed the decision to interpret bookings in the visitor's browser time zone.

Codex subsequently ran 228 production-build browser checks across Chrome, Edge, Firefox, and WebKit, including simulated phone/tablet touch profiles and real Flask/PostgreSQL form submissions. All passed. Native Safari and physical mobile devices remain unverified, as recorded in the README and detailed AI-tooling account.

AI accelerated implementation and debugging. Its earlier suggestions still required review: timestamp parsing did not establish booking validity, newsletter updates could overwrite customer information, and a unique database index alone did not handle competing booking requests gracefully. Database and browser checks were necessary to identify those gaps.

All four course-supplied photographs are used. No new image was generated for these fixes, and no supplied image was presented as a behind-the-scenes photograph.

The detailed account of tools, usage, limitations, and verification remains in [ai-tooling.md](ai-tooling.md), which is retained under the filename required by the assignment.
