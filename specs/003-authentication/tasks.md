# Tasks: Authentication & User Profile Management

**Input**: Design documents from `/specs/003-authentication/`

**Prerequisites**: `spec.md` (required), `plan.md` (required)

---

## 1. Authentication Specification
- [x] **T001** Draft functional specification and requirements mapping  
  - **Module/File**: [spec.md](./specs/003-authentication/spec.md)
  - **Dependencies**: None
  - **Expected Outcome**: Documented specifications mapping registration, login, JWT authorization, recovery, and profile update.
  - **Status**: **Completed**

---

## 2. Database & Data Persistence
- [x] **T002** Construct user entity model schema mapping in Sequelize  
  - **Module/File**: [user.model.ts](../../Backend/src/models/user.model.ts)
  - **Dependencies**: None
  - **Expected Outcome**: User entity defined with name, email, hashed password, role, avatar, and phone.
  - **Status**: **Completed**

- [x] **T003** Configure schema columns for forgot password state  
  - **Module/File**: [user.model.ts](../../Backend/src/models/user.model.ts)
  - **Dependencies**: T002
  - **Expected Outcome**: Columns `resetOtp` and `resetOtpExpires` added to schema.
  - **Status**: **Completed**

- [ ] **T004** Map persistent level and onboarding completion flags to database columns  
  - **Module/File**: [user.model.ts](../../Backend/src/models/user.model.ts)
  - **Dependencies**: T002
  - **Expected Outcome**: Relational fields added in PostgreSQL for tracking user levels and onboarding progress.
  - **Status**: **Not Implemented** (*Currently stored in volatile server memory*)

---

## 3. User Registration
- [x] **T005** Implement hash register logic in user service  
  - **Module/File**: [user.service.ts](../../Backend/src/modules/user/user.service.ts)
  - **Dependencies**: T002
  - **Expected Outcome**: Register function hashes passwords using bcrypt (10 rounds) and persists the record.
  - **Status**: **Completed**

- [x] **T006** Expose register endpoint in auth controller  
  - **Module/File**: [auth.controller.ts](../../Backend/src/modules/auth/auth.controller.ts)
  - **Dependencies**: T005
  - **Expected Outcome**: `POST /auth/register` creates user and automatically logs them in, returning JWT tokens.
  - **Status**: **Completed**

---

## 4. User Login
- [x] **T007** Implement user validation function  
  - **Module/File**: [user.service.ts](../../Backend/src/modules/user/user.service.ts)
  - **Dependencies**: T005
  - **Expected Outcome**: Compares plaintext password against database hashes using bcrypt.
  - **Status**: **Completed**

- [x] **T008** Expose login endpoint in auth controller  
  - **Module/File**: [auth.controller.ts](../../Backend/src/modules/auth/auth.controller.ts)
  - **Dependencies**: T007
  - **Expected Outcome**: `POST /auth/login` returns user details and JWT sessions.
  - **Status**: **Completed**

---

## 5. JWT Authentication
- [x] **T009** Setup JWT signing and generation service  
  - **Module/File**: [auth.service.ts](../../Backend/src/modules/auth/auth.service.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Signs access tokens (expires in 15m) and refresh tokens (expires in 7d).
  - **Status**: **Completed**

- [x] **T010** Implement Passport JWT strategy verification  
  - **Module/File**: [jwt.strategy.ts](../../Backend/src/modules/auth/strategies/jwt.strategy.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Extracts Bearer tokens and parses authorization claims.
  - **Status**: **Completed**

- [x] **T011** Sync authentication session on the client  
  - **Module/File**: [useAuthStore.ts](../../Frontend/src/features/auth/store/useAuthStore.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Access tokens and user profiles are saved to Zustand store and local storage.
  - **Status**: **Completed**

---

## 6. Authorization & Protected Routes
- [x] **T012** Construct JwtGuard protection class  
  - **Module/File**: [jwt.guard.ts](../../Backend/src/modules/auth/guards/jwt.guard.ts)
  - **Dependencies**: T010
  - **Expected Outcome**: Rejects unauthorized requests with 401 statuses.
  - **Status**: **Completed**

- [x] **T013** Enforce JwtGuard on protected profile endpoints  
  - **Module/File**: [user.controller.ts](../../Backend/src/modules/user/user.controller.ts)
  - **Dependencies**: T012
  - **Expected Outcome**: Access to retrieve profile metadata requires a valid JWT session.
  - **Status**: **Completed**

---

## 7. Forgot Password
- [x] **T014** Implement OTP generation and state updates  
  - **Module/File**: [auth.service.ts](../../Backend/src/modules/auth/auth.service.ts)
  - **Dependencies**: T003
  - **Expected Outcome**: Generates 6-digit OTP, bcrypt-hashes it, and saves it with 15m expiration.
  - **Status**: **Completed**

- [x] **T015** Implement SMTP Nodemailer mail service  
  - **Module/File**: [mail.service.ts](../../Backend/src/messages/mail.service.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Transport object connects to Gmail using configured credentials.
  - **Status**: **Completed**

- [x] **T016** Formulate and send verification email  
  - **Module/File**: [mail.service.ts](../../Backend/src/messages/mail.service.ts)
  - **Dependencies**: T015
  - **Expected Outcome**: Plain text OTP sent inside HTML template to recipient.
  - **Status**: **Completed**

- [x] **T017** Expose forgot password endpoint  
  - **Module/File**: [auth.controller.ts](../../Backend/src/modules/auth/auth.controller.ts)
  - **Dependencies**: T014, T016
  - **Expected Outcome**: `POST /auth/forgot-password` initiates password recovery OTP sequence.
  - **Status**: **Completed**

---

## 8. Reset Password
- [x] **T018** Implement OTP verify and new password hash service  
  - **Module/File**: [auth.service.ts](../../Backend/src/modules/auth/auth.service.ts)
  - **Dependencies**: T003
  - **Expected Outcome**: Compares OTP hashes, updates user password, and clears reset credentials in the database.
  - **Status**: **Completed**

- [x] **T019** Expose reset password endpoint  
  - **Module/File**: [auth.controller.ts](../../Backend/src/modules/auth/auth.controller.ts)
  - **Dependencies**: T018
  - **Expected Outcome**: `POST /auth/reset-password` updates user credentials in PostgreSQL.
  - **Status**: **Completed**

---

## 9. Frontend / UI
- [x] **T020** Build Login Form layout  
  - **Module/File**: [LoginForm.tsx](../../Frontend/src/features/auth/components/LoginForm.tsx)
  - **Dependencies**: None
  - **Expected Outcome**: UI page renders inputs for email, password, and error display boxes.
  - **Status**: **Completed**

- [x] **T021** Build Registration Form layout  
  - **Module/File**: [RegisterForm.tsx](../../Frontend/src/features/auth/components/RegisterForm.tsx)
  - **Dependencies**: None
  - **Expected Outcome**: Dual-panel registration page displaying credentials input.
  - **Status**: **Completed**

- [/] **T022** Build Forgot Password wizard  
  - **Module/File**: [ForgotPasswordForm.tsx](../../Frontend/src/features/auth/components/ForgotPasswordForm.tsx)
  - **Dependencies**: None
  - **Expected Outcome**: Interactive screen sequence for entering emails and new passwords.
  - **Status**: **Partially Completed** (*UI is built, but the logic uses mocked timeouts rather than API calls*)

- [x] **T023** Build Profile details page  
  - **Module/File**: [profile.jsx](../../Frontend/src/features/user-profile/profile.jsx)
  - **Dependencies**: None
  - **Expected Outcome**: Displays user session details (name, email, level) and supports editing.
  - **Status**: **Completed**

- [ ] **T024** Build Change Password form section inside Profile  
  - **Module/File**: [profile.jsx](file:///Users/mthu/HCMUS/STUDIFY/Frontend/src/features/user-profile/profile.jsx)
  - **Dependencies**: None
  - **Expected Outcome**: Section on page enables user to input new passwords and submit changes.
  - **Status**: **Not Implemented** (*UI markup exists, but no click handler or API call is written*)

---

## 10. Backend / API
- [x] **T025** Map AuthController endpoints routing  
  - **Module/File**: [auth.controller.ts](../../Backend/src/modules/auth/auth.controller.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Auth endpoints exposed under `/auth/*`.
  - **Status**: **Completed**

- [x] **T026** Map UserController endpoints routing  
  - **Module/File**: [user.controller.ts](../../Backend/src/modules/user/user.controller.ts)
  - **Dependencies**: None
  - **Expected Outcome**: User endpoints exposed under `/user/*`.
  - **Status**: **Completed**

- [x] **T027** Implement backend logout endpoint  
  - **Module/File**: [auth.controller.ts](../../Backend/src/modules/auth/auth.controller.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Exposes protected `POST /auth/logout` returning confirmation.
  - **Status**: **Completed**

---

## 11. Integration
- [x] **T028** Connect login form to Zustand auth store  
  - **Module/File**: [LoginForm.tsx](../../Frontend/src/features/auth/components/LoginForm.tsx)
  - **Dependencies**: T008, T020
  - **Expected Outcome**: Form submissions trigger API requests and save user details.
  - **Status**: **Completed**

- [x] **T029** Connect registration form to Axios submit  
  - **Module/File**: [RegisterForm.tsx](../../Frontend/src/features/auth/components/RegisterForm.tsx)
  - **Dependencies**: T006, T021
  - **Expected Outcome**: Form submits values to registration endpoint and updates session.
  - **Status**: **Completed**

- [x] **T030** Connect Profile save to PATCH endpoint  
  - **Module/File**: [profile.jsx](../../Frontend/src/features/user-profile/profile.jsx)
  - **Dependencies**: T013, T023
  - **Expected Outcome**: Save button triggers PATCH request, updating DB records and updating the frontend store.
  - **Status**: **Completed**

- [ ] **T031** Connect recovery UI to forgot password and reset API  
  - **Module/File**: [ForgotPasswordForm.tsx](../../Frontend/src/features/auth/components/ForgotPasswordForm.tsx)
  - **Dependencies**: T017, T019, T022
  - **Expected Outcome**: UI triggers backend OTP delivery and submits OTP to reset passwords.
  - **Status**: **Not Implemented** (*Currently uses mock setTimeout*)

- [ ] **T032** Connect client logout trigger to API logout route  
  - **Module/File**: [useAuthStore.ts](../../Frontend/src/features/auth/store/useAuthStore.ts)
  - **Dependencies**: T027
  - **Expected Outcome**: Clicking logout requests session token invalidation from backend.
  - **Status**: **Not Implemented** (*Frontend currently deletes tokens locally without invoking backend logout*)

---

## 12. Validation & Error Handling
- [x] **T033** Setup input validation on backend DTOs  
  - **Module/File**: [index.ts](../../Backend/src/common/decorators/index.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Payloads validated using class-validators.
  - **Status**: **Completed**

- [x] **T034** Intercept JWT strategy verification failures  
  - **Module/File**: [jwt.guard.ts](../../Backend/src/modules/auth/guards/jwt.guard.ts)
  - **Dependencies**: T012
  - **Expected Outcome**: Rejection errors converted to clear NestJS UnauthorizedExceptions.
  - **Status**: **Completed**

---

## 13. Testing
- [ ] **T035** Implement unit tests for auth services and guards  
  - **Module/File**: Backend auth unit specs  
  - **Dependencies**: None
  - **Expected Outcome**: Asserts password comparison logic and token signing are functioning correctly.
  - **Status**: **Not Implemented** (*No unit tests exist for this module*)

- [ ] **T036** Implement E2E integration test for API authentication routes  
  - **Module/File**: Backend auth E2E spec  
  - **Dependencies**: None
  - **Expected Outcome**: Automates user register, login, and authorization validation.
  - **Status**: **Not Implemented** (*No E2E tests exist for this module*)

---

## 14. Documentation
- [x] **T037** Construct Spec Kit specs, plan, and tasks files  
  - **Module/File**: [spec.md](./spec.md), [plan.md](./plan.md), [tasks.md](./tasks.md)
  - **Dependencies**: None
  - **Expected Outcome**: Documentation artifacts added without changing codebase.
  - **Status**: **Completed**
