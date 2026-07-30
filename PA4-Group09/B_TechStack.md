## B - Software Architecture: System Context Diagram

### Tech Stack
The Studify platform utilizes a modern web development stack to deliver a responsive user experience and handle its core functionalities. Below is the detailed breakdown of the technologies used, strictly reflecting the current project implementation:

*   **Frontend**: 
    *   **React & TypeScript:** Used to build the interactive, single-page application (SPA) and user interface for learners. TypeScript ensures robust, error-free client-side logic.
*   **Backend**: 
    *   **NestJS (Node.js framework):** Acts as the core server handling business logic, API requests, and seamless integration of features like Authentication, Flashcards, and Virtual Study Rooms.
    *   **TypeScript:** Used universally across the backend for strict static typing.
    *   **Sequelize (ORM):** Manages database operations and schema mappings efficiently.
*   **Database**: 
    *   **PostgreSQL:** Relational database used to store user profiles, learning progress, flashcards, group data, and lesson materials persistently.
*   **Authentication & Security**: 
    *   **Passport.js & JWT (JSON Web Tokens):** Handles secure user registration, login sessions, and Role-Based Access Control (RBAC) validation.
    *   **Bcryptjs:** Used for hashing and securing user passwords before storage.
*   **External Components & Services**: 
    *   **AI Speech-to-Text & LLM API:** Integrates external AI models to power the English speaking evaluation, simulate roleplay scenarios, and provide grammar/vocabulary feedback.
    *   **Cloud Storage Service:** (e.g., AWS S3) To store media assets such as group documents, PDFs, and user uploads.
