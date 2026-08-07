# AI Usage Report – Sprint PA2-2026

**Prompt 1 (28/07/2026):** Asked ChatGPT to explain how an API for submitting answers in the lesson/exercise grading feature should work, including the difference between submitting a single answer and submitting a whole practice session.
Outcome: Improved understanding of the backend grading flow and the responsibilities of the controller, service, and question data.

**Prompt 2 (29/07/2026):** Asked how frontend code should interpret API response structures, such as `data.questions` versus `data.data.questions`.
Outcome: Clarified how frontend state depends on the exact JSON structure returned by the backend.

**Prompt 3 (29/07/2026):** Asked about the avatar upload architecture — the roles of Multer, static assets, the controller/service/model relationship, database mapping, JWT-based user ownership, and frontend fallback avatars.
Outcome: Clarified how uploaded user files are connected to backend storage, database records, and authenticated users.

**Prompt 4 (30/07/2026):** Asked how the forgot-password and OTP authentication flow works — controller/service responsibilities, DTO validation, OTP hashing, expiration time, deletion after use, Nodemailer, Gmail 2-Step Verification, and App Passwords.
Outcome: Gained a complete understanding of the password-reset security flow and email authentication requirements.

**Prompt 5 (06/08/2026):** Asked how multiple-choice answers can be automatically graded while written answers should be treated differently and shown for review rather than automatically marked correct or incorrect.
Outcome: Helped define separate grading behavior for objective and written questions.
