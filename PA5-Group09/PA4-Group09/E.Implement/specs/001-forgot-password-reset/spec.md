# Feature Specification: Forgot Password Reset

**Feature Branch**: `[001-forgot-password-reset]`

**Created**: 2026-07-23

**Status**: Draft

**Input**: User description: "Create or update a Spec Kit feature specification for the existing Studify backend auth flow focused on forgot password. The repo already has NestJS endpoints and service methods in Backend/src/modules/auth/auth.controller.ts and Backend/src/modules/auth/auth.service.ts for forgot-password and reset-password. The user wants to work slowly and in stages, so produce only the specification artifact first, not the implementation plan or tasks yet. Use the existing .specify templates and project conventions if needed. Scope should cover: request password reset by email, generate and send OTP by email, store hashed OTP with expiry, verify OTP, reset password, invalidate/reset OTP after success, and error cases for invalid email, missing reset request, expired OTP, invalid OTP. Keep the spec aligned with the current implementation style and NestJS backend. Return the spec content you created and the file path(s) you wrote."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Request a password reset by email (Priority: P1)

As a user who forgot my password, I want to request a reset using my email address so that I can receive a one-time code and regain access to my account.

**Why this priority**: The reset flow starts here. Without a reliable request step, users cannot begin password recovery.

**Independent Test**: Submit a registered email address and verify that the system accepts the request, creates a one-time reset code, and sends it to the user by email.

**Acceptance Scenarios**:

1. **Given** a user provides a registered email address, **When** they request a password reset, **Then** the system creates a new reset code, records an expiry time, and sends the code to that email address.
2. **Given** a user provides an email address that is not registered, **When** they request a password reset, **Then** the system rejects the request with a clear invalid email error.
3. **Given** a user already has a pending reset code, **When** they request a new reset, **Then** the previous code becomes invalid and only the newest code remains usable.

---

### User Story 2 - Complete password reset with OTP verification (Priority: P1)

As a user who received a reset code, I want to verify the code and set a new password so that I can securely restore access to my account.

**Why this priority**: This is the core outcome of the feature. The user must be able to finish the reset securely after receiving the code.

**Independent Test**: Enter a valid email, a valid one-time code, and a new password, then verify that the password changes and the reset code can no longer be reused.

**Acceptance Scenarios**:

1. **Given** a user has an active and unexpired reset request, **When** they submit the matching code and a new password, **Then** the system updates the password and clears the reset code state.
2. **Given** a user submits a code that does not match the stored reset code, **When** they try to complete the reset, **Then** the system rejects the request with an invalid OTP error.
3. **Given** a user submits a code after the reset request has expired, **When** they try to complete the reset, **Then** the system rejects the request with an expired OTP error.
4. **Given** a user tries to complete a reset without any pending reset request, **When** they submit the form, **Then** the system rejects the request with a missing reset request error.

---

## Edge Cases

- A user enters an email address with an invalid format before the reset request is submitted.
- A user requests multiple reset codes in a short period and only the latest code should remain valid.
- A user attempts to reuse a code after the password has already been changed.
- A user submits the correct code after the expiry window has passed.
- A user submits a reset form for an account that never requested a reset.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system must allow a user to request password recovery using an email address associated with an existing account.
- **FR-002**: The system must generate a one-time reset code and deliver it to the user through email.
- **FR-003**: The system must store only a protected version of the reset code and an expiry time.
- **FR-004**: The system must verify the submitted code before allowing a password change.
- **FR-005**: The system must reject password reset attempts when there is no active reset request for the account.
- **FR-006**: The system must reject password reset attempts when the reset code is expired or does not match.
- **FR-007**: The system must clear the stored reset code and expiry immediately after a successful password reset.
- **FR-008**: The system must ensure that an older reset code cannot be used after a newer reset request is created.
- **FR-009**: The system must return clear, consistent responses for success and error outcomes during the reset flow.
- **FR-010**: The system must preserve the existing account identity rules so the reset flow is tied to the user email.

### Key Entities *(include if feature involves data)*

- **User Account**: The authenticated account identified by email and password.
- **Password Reset State**: The active reset code and its expiry status associated with a user account.
- **Reset Email**: The email message delivered to the user that contains the one-time reset code and instructions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: At least 95% of valid password reset requests result in a delivered reset email within 1 minute.
- **SC-002**: 100% of reset attempts with an invalid, expired, or missing code are rejected with a clear error.
- **SC-003**: 100% of successful password resets clear the previous reset code so it cannot be reused.
- **SC-004**: 90% of users who already have access to their email can complete the full reset flow in under 3 minutes.
- **SC-005**: No account can be reset without both a matching email and a valid unexpired code.

## Assumptions

- Users have access to the email inbox associated with their account.
- The reset code remains valid for a short, fixed period that is already used by the existing backend flow.
- The existing Studify auth module and email delivery service will continue to be reused.
- The account password policy remains the same as the current authentication rules unless a separate feature changes it.
- Only one active reset code per user account is considered valid at a time.
