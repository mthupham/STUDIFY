# Implementation Plan: Authentication & Profile Management

**Branch**: `feat/Frontend/Authentication` | **Date**: 2026-07-25 | **Spec**: [spec.md](spec.md)

---

## 1. Overall Technical Context

- **Backend**: NestJS 11.0.1, Passport JWT strategy, bcryptjs
- **Frontend**: React 19.x, Zustand (State Management), Axios
- **Database**: PostgreSQL mapped via Sequelize ORM (`sequelize-typescript`)
- **Third-Party Email Services**: Gmail SMTP via Nodemailer

---

## 2. Technical Architecture & Components

```
┌────────────────────────────────────────────────────────────────────────┐
│                              FRONTEND SPA                              │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                         useAuthStore                           │   │
│   │     (Manages user session, JWT tokens, & localStorage state)    │   │
│   └───────────────┬───────────────────────────────┬────────────────┘   │
│                   │                               │                    │
│         ┌─────────┴─────────┐           ┌─────────┴─────────┐          │
│         ▼                   ▼           ▼                   ▼          │
│   ┌───────────┐       ┌───────────┐┌───────────┐      ┌───────────┐    │
│   │ LoginForm │       │RegisterForm│ForgotPass │      │ProfilePage│    │
│   │           │       │           ││Form(Mock) │      │           │    │
│   └─────┬─────┘       └─────┬─────┘└───────────┘      └─────┬─────┘    │
└─────────┼───────────────────┼───────────────────────────────┼──────────┘
          │                   │                               │
    POST  │             POST  │                         PATCH │
    /auth/login         /auth/register                  /user/profile
          │                   │                               │
          ▼                   ▼                               ▼
┌─────────┴───────────────────┴───────────────────────────────┴──────────┐
│                              BACKEND API                               │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                     Controllers & Handlers                      │  │
│  │   - AuthController (login, register, forgot-pass, reset-pass)   │  │
│  │   - UserController (profile view, profile patch update)         │  │
│  └────────────────────────────────┬────────────────────────────────┘  │
│                                   │                                    │
│                                   ▼                                    │
│  ┌─────────────────────────────────────────────────────────────────┐  │
│  │                        Business Services                        │  │
│  │   - AuthService (calculates credentials, JWT tokens, resets)    │  │
│  │   - UserService (executes Sequelize queries on User model)      │  │
│  │   - MailService (configures SMTP transporter & sends OTP)       │  │
│  └────────────────────────────────┬────────────────────────────────┘  │
│                                   │                                    │
│                      ┌────────────┴────────────┐                       │
│                      ▼                         ▼                       │
│            ┌───────────────────┐     ┌───────────────────┐             │
│            │  User Model (DB)  │     │  Nodemailer SMTP  │             │
│            │   (PostgreSQL)    │     │   (Gmail server)  │             │
│            └───────────────────┘     └───────────────────┘             │
└────────────────────────────────────────────────────────────────────────┘
```

### Backend Components

#### 1. Models
- **`User`** (`Backend/src/models/user.model.ts`):
  - Encapsulates database tables columns: `id`, `name`, `email`, `password` (bcrypt hash), `avatar`, `phone`, `role` (`admin` or `user`), `provider`, `resetOtp` (bcrypt hash of OTP), and `resetOtpExpires`.
  - Implements a custom `toJSON()` hook to exclude sensitive values (`password`, `resetOtp`, `resetOtpExpires`) before rendering JSON responses.

#### 2. Modules & Controllers
- **`AuthModule`** (`Backend/src/modules/auth/auth.module.ts`):
  - Registers the NestJS `JwtModule` with key configurations.
  - Registers `AuthService` and Passport strategies.
- **`AuthController`** (`Backend/src/modules/auth/auth.controller.ts`):
  - Exposes public and protected endpoints: `/auth/login`, `/auth/register`, `/auth/forgot-password`, `/auth/reset-password`, and `/auth/logout`.
- **`UserController`** (`Backend/src/modules/user/user.controller.ts`):
  - Exposes `/user/profile` (GET and PATCH) protected by `JwtGuard`.

#### 3. Services
- **`AuthService`** (`Backend/src/modules/auth/auth.service.ts`):
  - Validates user login credentials using the `UserService`.
  - Formulates access tokens (expires in 15 mins) and refresh tokens (expires in 7 days).
  - Handles password reset OTP generation, hashing, and verifying.
- **`UserService`** (`Backend/src/modules/user/user.service.ts`):
  - Directly queries PostgreSQL via Sequelize using the `User` model.
  - Implements user search, validation, hashing, registration, and profile patching.
- **`MailService`** (`Backend/src/messages/mail.service.ts`):
  - Configures a Nodemailer transporter using Gmail options.
  - Exposes `sendResetOtp(to, otp)` to deliver the verification OTP.

#### 4. Guards & Security
- **`JwtStrategy`** (`Backend/src/modules/auth/strategies/jwt.strategy.ts`):
  - Extracts the JWT access token from the request header as a Bearer Token.
  - Validates the token signature using the configured `JWT_SECRET`.
  - Binds the validated payload (`id`, `email`, `role`) to the request as `req.user`.
- **`JwtGuard`** (`Backend/src/modules/auth/guards/jwt.guard.ts`):
  - Extends Passport's passport-jwt AuthGuard.
  - Captures JWT validation errors and throws explicit NestJS Exception messages (e.g. `"Token expired."` for `TokenExpiredError`, `"Invalid token."` for `JsonWebTokenError`).

### Frontend Components

- **`useAuthStore.ts`** (`Frontend/src/features/auth/store/useAuthStore.ts`):
  - Zustand store managing the session state.
  - Syncs authentication states with `localStorage` (keys: `accessToken`, `authUser`).
  - Implements `loginAction` to query `/auth/login` and `logoutAction` to clear local states.
- **`LoginForm.tsx`** (`Frontend/src/features/auth/components/LoginForm.tsx`):
  - Submits user login details via `loginAction`. Displays validation error strings.
- **`RegisterForm.tsx`** (`Frontend/src/features/auth/components/RegisterForm.tsx`):
  - Performs direct Axios registration requests to `/auth/register`. On success, sets the auth session and redirects to the dashboard.
- **`profile.jsx`** (`Frontend/src/features/user-profile/profile.jsx`):
  - Authenticated component displaying profile fields. Allows editing profile details and patch updates using `axios.patch` to `/user/profile` with the authorization header.

---

## 3. Core Data Flows

### 1. User Login Flow
```
[LoginForm] ──(email, password)──► [useAuthStore: loginAction()]
                                             │
                       POST /auth/login      ▼
[useAuthStore] ───────────────────────────► [AuthController: login()]
                                                     │
                                                     ▼
                                            [AuthService: login()]
                                                     │
                                                     ▼
                                            [UserService: validateUser()]
                                                     │ (Fetch & compare bcrypt hash)
                                                     ▼
                                            [User Model / Postgres]
                                                     │
                                      (Tokens)       ▼
[useAuthStore] ◄─────────────────────────── [AuthService: generateTokens()]
      │
      ├─► Write "accessToken" and "authUser" to localStorage
      ├─► Update Zustand state (user, token)
      ▼
Navigate to "/dashboard"
```

### 2. Password Recovery & Reset Flow (API vs UI status)
- **Backend Flow (Implemented)**:
  1. POST `/auth/forgot-password` generates 6-digit OTP code. Hashed code is saved in PostgreSQL (`resetOtp`, `resetOtpExpires`), and plain code is dispatched via `MailService`.
  2. User receives OTP and submits it along with their email and new password to POST `/auth/reset-password`.
  3. Backend validates email, checks OTP expiry, compares bcrypt hash, updates password with a fresh hash, and clears OTP fields in PostgreSQL.
- **Frontend Flow (Mocked)**:
  - *Gap*: `ForgotPasswordForm.tsx` does **not communicate with the backend**. Submitting the email triggers a 700ms `setTimeout` which changes the UI step. Submitting the new password triggers another `setTimeout` printing a success alert without ever sending OTP or verification payloads to the API.

---

## 4. API Input Validation Constraints

Input validation is enforced in NestJS by class-validator using custom decorators in `Backend/src/common/decorators/index.ts`:

- **`LoginDto`**:
  - `email`: `@EmailRequired()` (Validates email structure and ensures field is non-empty).
  - `password`: `@StringRequired()` (Ensures password is a non-empty string).
- **`RegisterDto`**:
  - `email`: `@EmailRequired()`
  - `password`: `@StringRequired()`
  - `name`: `@StringRequired()`
- **`ForgotPasswordDto`**:
  - `email`: `@EmailRequired()`
- **`ResetPasswordDto`**:
  - `email`: `@EmailRequired()`
  - `otp`: `@StringRequired()`
  - `newPassword`: `@StringRequired()`
- **`UpdateProfileDto`**:
  - `name`: `@StringOptional()`
  - `email`: `@IsEmail()` (Optional, but must have valid format if provided).
  - `avatar`: `@StringOptional()`
  - `phone`: `@StringOptional()`

---

## 5. Security Architecture

1. **Password Safety**: Hashed using `bcryptjs` with 10 salt rounds before being stored. No plain passwords are saved or returned in API responses.
2. **Session Security**: JWTs contain no sensitive data (only `id`, `email`, and `role`).
3. **Guard Protection**: Protected resources are secured by extending Passport's JWT authentication framework, validating request signatures on every access.

---

## 6. Integration Gaps & Known Limitations

- **Zustand Logout Bypass**: The frontend `logoutAction` clears tokens locally but does not hit the backend `POST /auth/logout` endpoint.
- **Mocked Forgot Password Flow**: The frontend password recovery UI is completely detached from the NestJS reset password API.
- **Mocked Change Password Flow**: The change password card in the profile page lacks any JS submit functions or API interactions.
- **No Refresh Token Validation**: The database does not track issued refresh tokens, preventing token revocation or refresh-token rotation checks.
- **Password Complexity**: The backend accepts any non-empty string for password inputs; there are no length or character complexity validators in the DTO definitions.
