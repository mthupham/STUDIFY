# Software Architecture — C4 Model Level 3 (Component Diagram)

The following Level 3 Component Diagrams zoom into the internal structure of the **Web Application (Frontend)** and **Backend API Application (Backend)** containers. We focus on **two core features** that together best represent the internal structure of each container:

- **Authentication (Login / Register / Forgot Password)** — demonstrates the UI component layer, Zustand global state, Axios HTTP calls, client-side route guarding, and token persistence in the Frontend; and the Controller -> Service -> Guard -> UserService -> MailService -> Database pipeline in the Backend.
- **Onboarding & Placement Test** — demonstrates multi-step React state management, direct Axios API calls from leaf components, and the Smart Onboarding grading algorithm + `UserService` integration in the Backend.

## 1. Web Application Container (Frontend)

### Container Description

- **Responsibility:** Serves as the Single-Page Application (SPA) client interface for all users. Renders authentication screens (Login, Register, Forgot Password), the multi-step Onboarding flow (goal-setting and Placement Test), and all post-login protected pages (Dashboard, Roadmap, Lessons, Profile). Enforces a client-side Onboarding Guard that redirects un-onboarded users before they can access the main learning content.
- **Technology / Framework:** React 18 with TypeScript, Vite bundler, React Router DOM (client-side routing), Zustand (global state management), Axios (HTTP client), TailwindCSS (styling).
- **Communication:**
  - Communicates with the **Backend API Application** via **HTTP/HTTPS (REST API)** for all operations (login, register, password reset, fetching placement test questions, submitting answers, tracking progress).
  - No WebSocket connection is established in the currently implemented features.

### Component Diagram — Authentication & Onboarding Feature

``````mermaid
---
config:
  layout: dagre
---
graph TB
    User["User / Learner<br/>[Person]"]

    subgraph FrontendContainer["Web Application [Container: React & TypeScript]"]
        direction TB

        subgraph Routing["React Router DOM [Client-Side Routing]"]
            AppRouter["App.tsx / BrowserRouter<br/>[React Router]<br/>Defines all application routes.<br/>Hosts the OnboardingGuard."]
            OnboardingGuard["OnboardingGuard<br/>[Route Guard Component]<br/>Checks user.hasCompletedOnboarding flag<br/>from AuthStore. Redirects to /onboarding<br/>if flag is false."]
        end

        subgraph AuthFeature["auth/ Feature Module"]
            LoginForm["LoginForm.tsx<br/>[React Component]<br/>Renders login form. Calls loginAction<br/>from AuthStore on submit."]
            RegisterForm["RegisterForm.tsx<br/>[React Component]<br/>Renders registration form. Calls<br/>register API via Axios directly."]
            ForgotPasswordForm["ForgotPasswordForm.tsx<br/>[React Component]<br/>Renders multi-step forgot-password /<br/>OTP verification / reset password form."]
            AuthStore["useAuthStore.ts<br/>[Zustand Store]<br/>Global state: user, token, isLoading, error.<br/>Persists accessToken and authUser<br/>to localStorage. Provides loginAction,<br/>logoutAction, setAuthSession,<br/>markOnboardingCompleted."]
        end

        subgraph OnboardingFeature["onboarding/ Feature Module"]
            OnboardingApp["OnboardingApp.tsx<br/>[React Component]<br/>Multi-step UI: Step 1 sets weekly pace,<br/>Step 2 presents level options<br/>or launches PlacementTest."]
            PlacementTest["PlacementTest.tsx<br/>[React Component]<br/>Fetches questions from GET /placement-test/questions.<br/>Collects answers, submits to POST /placement-test/submit.<br/>Calls markOnboardingCompleted on AuthStore after success."]
        end
    end

    BackendAPI["Backend API Application<br/>[Container: NestJS & TypeScript]"]

    User -->|Interacts with browser| AppRouter
    AppRouter -->|Renders auth pages| LoginForm
    AppRouter -->|Renders auth pages| RegisterForm
    AppRouter -->|Renders auth pages| ForgotPasswordForm
    AppRouter -->|Renders onboarding| OnboardingApp
    AppRouter -->|Guards protected routes| OnboardingGuard

    OnboardingGuard -->|Reads user state| AuthStore

    LoginForm -->|Calls loginAction| AuthStore
    RegisterForm -->|POST /auth/register via Axios / HTTPS| BackendAPI
    ForgotPasswordForm -->|POST /auth/forgot-password and /auth/reset-password via Axios / HTTPS| BackendAPI

    AuthStore -->|Stores accessToken and authUser in localStorage| AuthStore
    AuthStore -->|POST /auth/login via Axios / HTTPS| BackendAPI

    OnboardingApp -->|Conditionally renders| PlacementTest
    PlacementTest -->|Reads token from| AuthStore
    PlacementTest -->|GET /placement-test/questions via Axios / HTTPS| BackendAPI
    PlacementTest -->|POST /placement-test/submit with Bearer Token / HTTPS| BackendAPI
    PlacementTest -->|Calls markOnboardingCompleted| AuthStore
``````

### Component Descriptions

#### Routing Layer

- **`App.tsx` / `BrowserRouter` (React Router)**
  - **Responsibility:** Defines all client-side routes (`/login`, `/register`, `/onboarding`, `/dashboard`, `/roadmap`, `/lessons`, etc.). Wraps protected routes inside `<OnboardingGuard>` and `<MainLayout>`. Acts as the top-level shell of the application.
  - **Relationships:** Renders all Feature Module components on their respective routes. Delegates route-protection logic to `OnboardingGuard`.

- **`OnboardingGuard` (Route Guard Component)**
  - **Responsibility:** A custom React component that reads the `user.hasCompletedOnboarding` flag directly from `useAuthStore`. If the flag is `false` or the user object is absent, it redirects the user to `/onboarding` using `<Navigate>`, preventing access to all protected learning pages.
  - **Relationships:** Reads state from `useAuthStore`. Wraps all post-login protected routes defined in `App.tsx`.

#### Auth Feature Module

- **`LoginForm.tsx` (React Component)**
  - **Responsibility:** Renders the login form UI with email and password fields. On submission, delegates to `loginAction` in `useAuthStore`. Displays loading and error states read from the store.
  - **Relationships:** Calls `loginAction` on `useAuthStore`. Does not call the API directly; all HTTP logic is encapsulated in the store.

- **`RegisterForm.tsx` (React Component)**
  - **Responsibility:** Renders the user registration form. On submission, calls `POST /auth/register` directly via Axios. On success, calls `setAuthSession` on `useAuthStore` to hydrate the session and navigates to `/onboarding`.
  - **Relationships:** Calls `POST /auth/register` on the **Backend API** via HTTPS. Calls `setAuthSession` on `useAuthStore`.

- **`ForgotPasswordForm.tsx` (React Component)**
  - **Responsibility:** Implements a multi-step forgot password flow: Step 1 enters email; Step 2 verifies OTP; Step 3 resets password. Each step calls the corresponding backend endpoint directly via Axios.
  - **Relationships:** Calls `POST /auth/forgot-password` and `POST /auth/reset-password` on the **Backend API** via HTTPS.

- **`useAuthStore.ts` (Zustand Store)**
  - **Responsibility:** Central global state store for authentication. Manages `user`, `token`, `isLoading`, and `error` state. Implements `loginAction` (calls `POST /auth/login` via Axios, persists token and user to `localStorage`), `logoutAction` (clears state and localStorage), `setAuthSession` (hydrates state from external login flows), and `markOnboardingCompleted` (updates `user.hasCompletedOnboarding` flag in both in-memory state and localStorage).
  - **Relationships:** Called by `LoginForm`, `RegisterForm`, `PlacementTest`, and `OnboardingGuard`. Sends HTTPS requests to the **Backend API Application**.

#### Onboarding Feature Module

- **`OnboardingApp.tsx` (React Component)**
  - **Responsibility:** Multi-step UI component managing two onboarding steps via local React state: (1) "Set Your Pace" — user selects a weekly study hours commitment (2h / 4h / 6h / 8+h); (2) "English Level" — user either self-selects a CEFR level or triggers the Placement Test. Navigates to `/dashboard` upon completion.
  - **Relationships:** Conditionally renders `PlacementTest` component when user selects to take the placement test.

- **`PlacementTest.tsx` (React Component)**
  - **Responsibility:** Fetches placement test questions from the backend (`GET /placement-test/questions`) on component mount via Axios (no auth required). Displays questions one-by-one with navigation controls. On final submission, sends all answers to `POST /placement-test/submit` with the Bearer token. Calls `markOnboardingCompleted` on `useAuthStore` to update the global session state after a successful submission.
  - **Relationships:** Reads `token` from `useAuthStore`. Sends HTTPS requests to the **Backend API Application** for both fetching questions and submitting answers. Calls `markOnboardingCompleted` on `useAuthStore` after success.


## 2. Backend API Application Container (Backend)

### Container Description

- **Responsibility:** Core server application encapsulating all business logic. Currently implements: authentication (register, login, forgot/reset password with OTP via email), JWT-based route protection using Passport.js, user profile management and onboarding status updates, placement test delivery and smart-grading with CEFR level assignment, and lesson progress tracking (vocabulary and grammar).
- **Technology / Framework:** NestJS (Node.js framework) with TypeScript, Passport.js (JWT strategy via `@nestjs/passport`), `@nestjs/jwt` (JWT signing/verification), Bcryptjs (password hashing), Nodemailer with Gmail SMTP (OTP email delivery), Sequelize ORM (database abstraction layer).
- **Communication:**
  - Receives **HTTPS REST API** requests from the **Web Application**.
  - Connects to the **PostgreSQL Database** via **Sequelize ORM over TCP/IP**.
  - Sends OTP reset emails via **Gmail SMTP (Nodemailer)** as an external mail service.

### Component Diagram — Authentication & Placement Test Feature

``````mermaid
---
config:
  layout: dagre
---
graph TB
    WebApp["Web Application<br/>[Container: React & TypeScript]"]

    subgraph BackendContainer["Backend API Application [Container: NestJS & TypeScript]"]
        direction TB

        subgraph AuthModule["Auth Module (modules/auth/)"]
            AuthCtrl["AuthController<br/>[NestJS Controller]<br/>Routes: POST /auth/login,<br/>/auth/register, /auth/forgot-password,<br/>/auth/reset-password, /auth/logout.<br/>Validates DTOs. Delegates to AuthService."]
            JwtGuard["JwtGuard<br/>[NestJS Guard - Passport.js]<br/>Extends AuthGuard('jwt').<br/>Extracts Bearer token, validates via JwtStrategy.<br/>Throws 401 on expired or invalid tokens."]
            JwtStrategy["JwtStrategy<br/>[Passport.js Strategy]<br/>Verifies JWT signature using JWT_SECRET env var.<br/>Injects decoded payload (id, email, role)<br/>into req.user for downstream controllers."]
            AuthSvc["AuthService<br/>[NestJS Service]<br/>Core auth business logic:<br/>login: validates credentials, generates tokens.<br/>register: creates user then logs in.<br/>forgotPassword: generates OTP, hashes it,<br/>stores via UserService, sends via MailService.<br/>resetPassword: verifies OTP expiry and hash.<br/>Generates accessToken (15m) and refreshToken (7d)."]
        end

        subgraph UserModule["User Module (modules/user/)"]
            UserCtrl["UserController<br/>[NestJS Controller]<br/>Routes: GET /user/profile,<br/>PATCH /user/profile,<br/>PATCH /user/onboarding.<br/>All routes protected by JwtGuard."]
            UserSvc["UserService<br/>[NestJS Service]<br/>Data access layer for User model.<br/>Methods: findByEmail, validateUser,<br/>registerUser, updateProfile,<br/>updateOnboarding (weeklyStudyHours),<br/>markOnboardingComplete, updateResetOtp."]
        end

        subgraph PlacementModule["Placement Test Module (features/placement-test/)"]
            PTCtrl["PlacementTestController<br/>[NestJS Controller]<br/>Routes: GET /placement-test/questions (public),<br/>POST /placement-test/submit (JWT-guarded),<br/>GET /placement-test/my-roadmap (JWT-guarded),<br/>GET /placement-test/lesson-detail (public)."]
            PTSvc["PlacementTestService<br/>[NestJS Service]<br/>Loads placementtest.json and lesson.json from disk on startup.<br/>getQuestions(): returns questions without correct_answer field.<br/>submitTest(): grades answers per level, runs<br/>Smart Onboarding algorithm (70% accuracy threshold<br/>per CEFR level A1 to C2), assigns level,<br/>calls UserService.markOnboardingComplete."]
        end

        subgraph ProgressModule["Progress Module (modules/progress/)"]
            ProgressCtrl["ProgressController<br/>[NestJS Controller]<br/>Routes: POST /progress/lesson/:id/complete,<br/>GET /progress/level/:id,<br/>GET /progress/level/:id/lessons.<br/>All routes protected by JwtGuard."]
            ProgressSvc["ProgressService<br/>[NestJS Service]<br/>Manages lesson completion tracking.<br/>Uses UserProgress, VocabularyLesson,<br/>GrammarLesson Sequelize models.<br/>Calculates completion percentage per level."]
        end

        MailSvc["MailService<br/>[NestJS Service - messages/]<br/>sendResetOtp(to, otp):<br/>Sends OTP email via Nodemailer / Gmail SMTP.<br/>Used exclusively by AuthService."]
    end

    DB[("PostgreSQL Database<br/>[Container: PostgreSQL]")]
    GmailSMTP["Gmail SMTP<br/>[External Mail Service - Nodemailer]"]

    WebApp -->|POST /auth/login, /auth/register, /auth/forgot-password, /auth/reset-password / HTTPS| AuthCtrl
    WebApp -->|POST /auth/logout with Bearer Token / HTTPS| JwtGuard
    WebApp -->|GET and PATCH /user/profile, PATCH /user/onboarding / HTTPS| UserCtrl
    WebApp -->|GET /placement-test/questions / HTTPS| PTCtrl
    WebApp -->|POST /placement-test/submit with Bearer Token / HTTPS| PTCtrl
    WebApp -->|POST and GET /progress/ endpoints with Bearer Token / HTTPS| ProgressCtrl

    AuthCtrl -->|Delegates all auth logic| AuthSvc
    JwtGuard -->|Delegates token validation to| JwtStrategy
    JwtGuard -.->|Protects logout route in| AuthCtrl
    JwtGuard -.->|Protects all routes in| UserCtrl
    JwtGuard -.->|Protects submit and my-roadmap in| PTCtrl
    JwtGuard -.->|Protects all routes in| ProgressCtrl

    AuthSvc -->|findByEmail, validateUser, registerUser, updateResetOtp| UserSvc
    AuthSvc -->|sendResetOtp| MailSvc
    MailSvc -->|Sends OTP email / SMTP| GmailSMTP

    UserSvc -->|Reads and Writes User model / Sequelize ORM| DB

    PTCtrl -->|Delegates grading and data retrieval| PTSvc
    PTSvc -->|markOnboardingComplete| UserSvc

    UserCtrl -->|Delegates to| UserSvc

    ProgressCtrl -->|Delegates to| ProgressSvc
    ProgressSvc -->|Reads and Writes UserProgress, VocabularyLesson, GrammarLesson / Sequelize ORM| DB
``````

### Component Descriptions

#### Auth Module

- **`AuthController` (`auth.controller.ts`)**
  - **Responsibility:** Exposes all authentication REST endpoints: `POST /auth/login`, `POST /auth/register`, `POST /auth/forgot-password`, `POST /auth/reset-password`, `POST /auth/logout`. Validates incoming DTOs via NestJS pipes. The `/auth/logout` route is additionally protected by `JwtGuard`.
  - **Relationships:** Receives HTTPS requests from the **Web Application**. Delegates all logic to `AuthService`.

- **`AuthService` (`auth.service.ts`)**
  - **Responsibility:** Core authentication business logic. `login`: calls `UserService.validateUser` (bcrypt comparison), then generates an accessToken (15m) + refreshToken (7d) pair using `JwtService`. `register`: creates a user via `UserService` then immediately calls `login`. `forgotPassword`: generates a 6-digit numeric OTP, hashes it with bcrypt, stores it with a 15-minute expiry via `UserService`, and dispatches the raw OTP via `MailService`. `resetPassword`: verifies OTP has not expired and matches the stored bcrypt hash, then updates the password.
  - **Relationships:** Calls `UserService` for all user data operations. Calls `MailService` to dispatch OTP emails. Uses `JwtService` for token generation.

- **`JwtGuard` (`guards/jwt.guard.ts`)**
  - **Responsibility:** A NestJS Guard extending Passport's `AuthGuard('jwt')`. Intercepts requests on protected routes and triggers `JwtStrategy` to extract and validate the Bearer token. Overrides `handleRequest` to throw specific `UnauthorizedException` messages for `TokenExpiredError` and `JsonWebTokenError`.
  - **Relationships:** Delegates token verification to `JwtStrategy`. Applied via `@UseGuards(JwtGuard)` to `POST /auth/logout`, all `UserController` routes, `POST /placement-test/submit`, `GET /placement-test/my-roadmap`, and all `ProgressController` routes.

- **`JwtStrategy` (`strategies/jwt.strategy.ts`)**
  - **Responsibility:** Implements the Passport.js JWT strategy. Configures extraction from the Authorization Bearer header and verification using the `JWT_SECRET` environment variable. On successful verification, the decoded payload (`id`, `email`, `role`) is injected into `req.user` for use by downstream controllers.
  - **Relationships:** Invoked by `JwtGuard` during token verification.

#### User Module

- **`UserController` (`user.controller.ts`)**
  - **Responsibility:** Exposes user management endpoints: `GET /user/profile` (fetch own profile by ID extracted from JWT), `PATCH /user/profile` (update name, email, avatar, phone), `PATCH /user/onboarding` (persist weekly study hours commitment). All routes are protected by `JwtGuard`.
  - **Relationships:** Receives HTTPS requests from the **Web Application**. Delegates all logic to `UserService`.

- **`UserService` (`user.service.ts`)**
  - **Responsibility:** Data access and business logic layer for the `User` Sequelize model. Provides: `findByEmail`, `validateUser` (bcrypt password comparison), `registerUser` (bcrypt hashing then model create with duplicate email guard), `updateProfile` (with duplicate email guard), `updateOnboarding` (saves `weeklyStudyHours`), `markOnboardingComplete` (sets `hasCompletedOnboarding = true`), `updateResetOtp` (stores hashed OTP and expiry).
  - **Relationships:** Interacts with the **PostgreSQL Database** via Sequelize ORM. Called by `AuthService`, `UserController`, and `PlacementTestService`.

#### Placement Test Module

- **`PlacementTestController` (`placement-test.controller.ts`)**
  - **Responsibility:** Exposes four endpoints. `GET /placement-test/questions` (public): retrieves questions without revealing correct answers. `POST /placement-test/submit` (JWT-guarded): receives user answers and triggers grading. `GET /placement-test/my-roadmap` (JWT-guarded): retrieves the user's assigned CEFR roadmap. `GET /placement-test/lesson-detail` (public): retrieves detailed lesson content by ID and type.
  - **Relationships:** Receives HTTPS requests from the **Web Application**. Delegates all logic to `PlacementTestService`.

- **`PlacementTestService` (`placement-test.service.ts`)**
  - **Responsibility:** On startup (`OnModuleInit`), reads `placementtest.json` and `lesson.json` from the `database/data/` directory into memory. `getQuestions()`: returns question list with `correct_answer` fields stripped to prevent cheating. `submitTest()`: grades all answers, aggregates per-level accuracy stats (A1 to C2), runs the **Smart Onboarding algorithm** (if accuracy >= 70% for a level, the user advances to the next level; otherwise the current level is assigned), calls `UserService.markOnboardingComplete()`, and returns a detailed result payload including score, feedback title/message, and per-question correctness breakdown.
  - **Relationships:** Calls `UserService.markOnboardingComplete` after successful submission. Reads question and lesson data from in-memory JSON loaded from the filesystem at startup.

#### Progress Module

- **`ProgressController` (`progress.controller.ts`)**
  - **Responsibility:** Exposes lesson progress endpoints: `POST /progress/lesson/:lessonId/complete` (marks a lesson as completed for the authenticated user), `GET /progress/level/:levelId` (returns completion percentage for a given level and lesson type), `GET /progress/level/:levelId/lessons` (returns lesson list with per-lesson completion status). All routes are protected by `JwtGuard`.
  - **Relationships:** Receives HTTPS requests from the **Web Application**. Delegates to `ProgressService`.

- **`ProgressService` (`progress.service.ts`)**
  - **Responsibility:** Manages lesson completion tracking for both `vocabulary` and `grammar` lesson types. `completeLesson`: uses `findOrCreate` on `UserProgress` to idempotently mark a lesson complete, then returns updated level progress. `getLevelProgress`: counts total and completed lessons for a level and computes a percentage. `getLessonsWithStatus`: fetches all lessons in a level and merges completion flags from `UserProgress` records into a combined response.
  - **Relationships:** Interacts with the **PostgreSQL Database** via Sequelize ORM using the `UserProgress`, `VocabularyLesson`, and `GrammarLesson` models.

#### Shared Service

- **`MailService` (`messages/mail.service.ts`)**
  - **Responsibility:** Provides a single method `sendResetOtp(to, otp)` that composes and sends an HTML OTP reset email via Nodemailer. Configured at construction time with Gmail SMTP using `GMAIL_USER` and `GMAIL_APP_PASSWORD` environment variables.
  - **Relationships:** Called exclusively by `AuthService` during the `forgotPassword` flow. Communicates externally with **Gmail SMTP** as the mail delivery service.