# Studify
## Use-Case Specification: Logout

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft | Khanh Linh |

---

### Table of Contents

- [1. Use-Case Name](#1-use-case-name)
  - [1.1 Brief Description](#11-brief-description)
- [2. Flow of Events](#2-flow-of-events)
  - [2.1 Basic Flow](#21-basic-flow)
  - [2.2 Alternative Flows](#22-alternative-flows)
    - [2.2.1 Session Already Expired](#221-session-already-expired)
    - [2.2.2 Logout with Remember Login Active](#222-logout-with-remember-login-active)
- [3. Special Requirements](#3-special-requirements)
- [4. Preconditions](#4-preconditions)
- [5. Postconditions](#5-postconditions)
- [6. Extension Points](#6-extension-points)

---

## 1. Use-Case Name

**UC3 — Logout**

### 1.1 Brief Description

This use case allows a Registered User to voluntarily end their authenticated session in the Studify system. Once logged out, the user is returned to a Guest state and must log in again (UC2) to access personalized features such as the dashboard, flashcards, virtual study rooms, or the AI speaking assistant.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case begins when the Registered User, currently authenticated, chooses to end their session.

1. The Registered User selects the "Logout" option from the account menu.
2. The system invalidates the user's current session token on the server side.
3. The system clears any session-related data stored on the client (e.g., session cookies, in-memory authentication state).
4. The system redirects the user to the public landing page or login screen.
5. The user is now treated as a Guest.
6. The use case ends successfully.

### 2.2 Alternative Flows

#### 2.2.1 Session Already Expired

At step 2 of the Basic Flow, if the system determines that the session token was already invalid or expired before the logout request was made:

1. The system proceeds directly to clearing any residual client-side data (step 3) without needing to invalidate a server-side session that no longer exists.
2. The system redirects the user to the login screen, optionally with a notice that their session had already expired.
3. The flow resumes at step 4 of the Basic Flow.

#### 2.2.2 Logout with Remember Login Active

At step 2 of the Basic Flow, if a "Remember Login" token (see UC6) is also active on the device:

1. The system asks the user whether they also want to revoke the "Remember Login" token, or only end the current session.
2. If the user chooses to revoke it, the system invalidates the persistent "Remember Login" token in addition to the current session.
3. If the user chooses not to revoke it, the persistent token remains valid, and the user will be automatically logged back in on their next visit.
4. The flow resumes at step 3 of the Basic Flow.

---

## 3. Special Requirements

### 3.1 Immediate Session Invalidation

Session invalidation on the server side must take effect immediately, preventing the same token from being reused to access protected resources after logout.

### 3.2 Response Time

The logout process should complete within 1 second under normal network conditions.

### 3.3 Data Integrity

Any in-progress user activity (e.g., an active Pomodoro timer session, unsaved flashcard progress) should be saved or gracefully handled before the session is terminated, where feasible.

---

## 4. Preconditions

### 4.1 Active Session

The user must currently have an active, authenticated session (i.e., must have previously completed UC2 — Login).

---

## 5. Postconditions

### 5.1 Session Terminated

The user's session token is invalidated and no longer grants access to protected resources.

### 5.2 User Returned to Guest State

The user is treated as a Guest and must complete UC2 — Login again to regain access to personalized features.

### 5.3 Client Data Cleared

Any session-related data stored on the client device is removed.

---

## 6. Extension Points

### 6.1 Remember Login Revocation

*Location: Basic Flow, step 2.* This is the point at which the system may prompt the user to also revoke an active "Remember Login" token (linked to UC6), allowing logout behavior to vary depending on whether persistent login was previously enabled.
