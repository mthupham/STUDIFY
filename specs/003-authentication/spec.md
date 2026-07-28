# Feature Specification: Authentication & User Profile Management

**Feature Branch**: `[feat/Frontend/Authentication]`

**Created**: 2026-07-25

**Status**: Draft

**Input**: User description: "Reconstruct the Spec Kit feature specification for the existing Studify authentication and profile management functional group. The specification must strictly reflect the actual current implementation."

---

## 1. Feature Overview & Purpose

The **Authentication & User Profile Management** functional group is the security gateway for the Studify application. It provides account creation, user sign-in, session authorization via JSON Web Tokens (JWT), email-based password recovery (via SMTP Gmail OTP), and profile management. 

This spec covers:
1. User registration and secure credential storage (bcrypt hashing).
2. User login and JWT token generation (Access Token: 15m, Refresh Token: 7d).
3. Secure route authorization using Passport JWT Guards.
4. Volatile session clearance (Logout).
5. Forgot password requests (OTP generation and delivery via Nodemailer).
6. Reset password (OTP validation and new password hashing).
7. Profile info updates (Name, email, avatar, phone).

---

## 2. User Roles Involved

- **Guest**: An unauthenticated user. Can register a new account, log in, request a password reset OTP, and complete the password reset flow.
- **Learner (Authenticated User)**: A user with an active, valid JWT. Can access protected features (such as progress tracking and profile editing), view and update their profile details, and log out.

---

## 3. User Stories

### User Story 1 - User Registration (Priority: P1)
As a new guest, I want to create an account by entering my name, email, and password so that I can access personalized study features.
* **Why this priority**: Registration is the initial entry point for creating an account.
* **Independent Test**: Submit a registration payload (`name`, `email`, `password`) to `/auth/register` and verify that the account is created in PostgreSQL and returns a JWT access token.
* **Acceptance Scenarios**:
  1. **Given** a guest provides a unique email, a name, and a password, **When** they submit the registration form, **Then** the backend hashes the password, persists the user in the database, and returns a `201` status with JWT tokens.
  2. **Given** a guest submits an email that is already registered, **When** they try to register, **Then** the backend rejects the request with a `400 Bad Request` and message `"User already exists."`.

---

### User Story 2 - User Login (Priority: P1)
As a registered user, I want to sign in with my email and password so that I can resume my study sessions.
* **Why this priority**: Login enables users to retrieve their credentials and re-establish their authenticated session.
* **Independent Test**: Post credentials to `/auth/login` and check that the server returns an access token, refresh token, and user metadata.
* **Acceptance Scenarios**:
  1. **Given** a user provides correct email and password, **When** they log in, **Then** the server returns an access token (expires in 15 mins) and a refresh token (expires in 7 days).
  2. **Given** a user provides an email not registered in the system, **When** they log in, **Then** the server returns a `400 Bad Request` with `"User not found."`.
  3. **Given** a user provides an incorrect password, **When** they log in, **Then** the server returns a `401 Unauthorized` with `"Invalid password."`.

---

### User Story 3 - Protected Resource Authorization (Priority: P1)
As an authenticated user, I want my API requests to be authorized via a token so that my profile and progress data remain secure.
* **Why this priority**: Essential to protect database records from unauthorized guest access.
* **Independent Test**: Send a GET request to `/user/profile` with and without a Bearer JWT, verifying access is granted only when the token is present and valid.
* **Acceptance Scenarios**:
  1. **Given** a valid Bearer JWT access token is attached to the request headers, **When** accessing a protected route, **Then** the system authorizes the request and attaches the user payload to `req.user`.
  2. **Given** an expired JWT access token is attached, **When** accessing a protected route, **Then** the system returns a `401 Unauthorized` status with `"Token expired."`.
  3. **Given** an invalid or modified JWT token is attached, **When** accessing a protected route, **Then** the system returns a `401 Unauthorized` status with `"Invalid token."`.

---

### User Story 4 - Request Password Reset OTP (Priority: P2)
As a user who forgot my password, I want to request a reset using my email so that I can receive a 6-digit OTP code via email.
* **Why this priority**: Essential first step for account recovery.
* **Independent Test**: Post a registered email to `/auth/forgot-password` and check if a hashed OTP is saved in the database with a 15-minute expiry and an email is dispatched.
* **Acceptance Scenarios**:
  1. **Given** a registered email, **When** a forgot-password request is sent, **Then** the system generates a 6-digit OTP, stores its bcrypt hash and a 15-minute expiration time in the database, and sends the plain OTP to the user's email.
  2. **Given** a non-registered email, **When** a forgot-password request is sent, **Then** the system rejects with a `400 Bad Request` and `"Invalid email."`.

---

### User Story 5 - Complete Password Reset (Priority: P2)
As a user who has received an OTP, I want to verify the OTP and set a new password so that I can restore access to my account.
* **Why this priority**: Concludes the password recovery flow.
* **Independent Test**: Post email, OTP, and new password to `/auth/reset-password` and verify that the user's password changes and the OTP is cleared.
* **Acceptance Scenarios**:
  1. **Given** a user has an active reset request, **When** they submit the correct OTP and a new password, **Then** the backend updates their password (hashed via bcrypt) and clears the `resetOtp` and `resetOtpExpires` columns (sets them to null).
  2. **Given** the OTP submitted has expired (past 15 mins), **When** they submit, **Then** the system rejects with `"OTP has expired"`.
  3. **Given** the OTP submitted does not match the hashed OTP, **When** they submit, **Then** the system rejects with `"Invalid OTP"`.
  4. **Given** there is no active reset request for the email, **When** they submit, **Then** the system rejects with `"No password reset request found"`.

---

### User Story 6 - View and Update Profile Info (Priority: P2)
As an authenticated user, I want to view my profile information and edit my details (name, email) so that my account credentials remain current.
* **Why this priority**: Basic profile administration.
* **Independent Test**: Retrieve `GET /user/profile` and patch updates via `PATCH /user/profile` verifying the changes persist in PostgreSQL.
* **Acceptance Scenarios**:
  1. **Given** an authenticated user is on the profile page, **When** they view the screen, **Then** the system displays their current name and email fetched from `/user/profile`.
  2. **Given** a user edits their name or email and saves, **When** a PATCH request is sent, **Then** the backend validates the fields, updates the user in the database, updates the Zustand store session, and returns the updated user.
  3. **Given** a user edits their email to one already registered by another user, **When** they save, **Then** the system rejects with `"Email already in use."`.

---

### User Story 7 - User Logout (Priority: P1)
As a logged-in user, I want to log out of the application so that my active session is closed.
* **Why this priority**: Security best practice for public/shared computers.
* **Independent Test**: Click logout and verify that `accessToken` and `authUser` are cleared from the frontend `localStorage`.
* **Acceptance Scenarios**:
  1. **Given** an authenticated user clicks the Logout button, **When** the logout action is triggered, **Then** the frontend clears the user details and tokens from `localStorage` and resets the Zustand auth state.

---

## 4. Main User Flows & Gaps

### Frontend-Backend Gaps
- **Forgot Password flow is MOCKED in Frontend**: 
  - *Gap*: The `ForgotPasswordForm.tsx` component **does not make any API calls** to `/auth/forgot-password` or `/auth/reset-password`. It uses `setTimeout` to mock OTP sending and password updating. It does not contain an OTP input field, which is required by the backend API.
- **Change Password section is a Static Placeholder in Frontend**:
  - *Gap*: The "Change Password" section inside the `profile.jsx` page has UI fields and an "Update Password" button, but it **lacks any submit handlers or API requests**. It is purely visual.
- **Logout API Endpoint bypass**:
  - *Gap*: The backend exposes a protected `POST /auth/logout` endpoint, but the frontend store `logoutAction` simply deletes the local storage tokens and state without notifying the backend.

---

## 5. Functional Requirements

### Frontend UI
- **FR-001**: Register form must collect Username (`name`), Email (`email`), Password (`password`), and a terms checkbox. It must validate that fields are filled and the checkbox is ticked before submitting.
- **FR-002**: Login form must collect Email and Password, display errors returned from the API, and offer a visual "Remember me" checkbox.
- **FR-003**: The Profile UI must support read-only mode and edit-mode toggles, rendering the current name, email, interface language, and CEFR level.

### Backend API & Logic
- **FR-004**: Input payloads must be validated using DTO decorators (`IsString`, `IsNotEmpty`, `IsEmail` encapsulated in custom decorators like `@EmailRequired`).
- **FR-005**: Password hashing must utilize bcrypt (10 salt rounds) for user registration and password updates.
- **FR-006**: JWT generation must output both an access token (expires in 15 minutes) and a refresh token (expires in 7 days).
- **FR-007**: Protected routes must be guarded by `JwtGuard` extending `@nestjs/passport`'s PassportStrategy.
- **FR-008**: Forgot password flow must generate a 6-digit OTP, store its hash and expiration time, and send the plain OTP to the user's email via Gmail SMTP using Nodemailer.

---

## 6. API Requirements (Contracts)

| Method | Endpoint | Description | Auth Guard |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate user credentials and return JWT tokens | None |
| `POST` | `/auth/register` | Register a new user, save in database, and log in | None |
| `POST` | `/auth/forgot-password` | Generate OTP and send email | None |
| `POST` | `/auth/reset-password` | Verify OTP and reset password | None |
| `POST` | `/auth/logout` | Ends the user session (returns message only) | `JwtGuard` |
| `GET` | `/user/profile` | Retrieve the logged-in user profile details | `JwtGuard` |
| `PATCH` | `/user/profile` | Update the user profile fields (name, email, avatar, phone) | `JwtGuard` |

---

## 7. Data Persistence Requirements

- **User Accounts**: Persisted in PostgreSQL database via the `User` model containing:
  - `email` (string, unique, non-null)
  - `password` (string, hashed, non-null)
  - `name` (string, non-null)
  - `avatar` (string, nullable)
  - `phone` (string, nullable)
  - `role` (enum: `admin`, `user`, default: `user`)
  - `provider` (string, nullable)
  - `resetOtp` (string, hashed, nullable)
  - `resetOtpExpires` (date, nullable)

---

## 8. Assumptions & Constraints

- **SMTP Dependability**: The forgot password email delivery assumes a valid `GMAIL_USER` and `GMAIL_APP_PASSWORD` are configured in the backend `.env` variables and that Google's SMTP servers are accessible.
- **Refresh Token Rotation**: The refresh token returned on login is currently not stored in the database or verified on subsequent refreshes (*Not identified in the current implementation*).
- **Password Strength Policy**: The backend DTOs only check that the password is a non-empty string. There are no length or character constraints enforced (*Not identified in the current implementation*).
