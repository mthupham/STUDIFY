# Studify
## Use-Case Specification: Remember Login

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
    - [2.2.1 Token Expired](#221-token-expired)
    - [2.2.2 Token Revoked or Invalidated](#222-token-revoked-or-invalidated)
- [3. Special Requirements](#3-special-requirements)
- [4. Preconditions](#4-preconditions)
- [5. Postconditions](#5-postconditions)
- [6. Extension Points](#6-extension-points)
![Giao diện UC6](../../Images/Module_1/UC6.png)
---

## 1. Use-Case Name

**UC6 — Remember Login**

### 1.1 Brief Description

This use case allows the system to keep a Registered User authenticated across sessions by issuing a persistent authentication token when the user selects "Remember Login" during UC2 — Login. This use case extends UC2, executing only when the user opts in, and enables automatic re-authentication on subsequent visits without requiring the login form to be resubmitted.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case begins as an extension of UC2 — Login, triggered when the Registered User checks the "Remember Login" option during login.

1. Following successful credential validation in UC2, the system generates a long-lived authentication token unique to the Registered User's session.
2. The system securely stores this token on the Registered User's device (e.g., as an HTTP-only, secure cookie).
3. The system records the token, its expiration date, and the associated device/session metadata in its persistent storage for future validation.
4. On a subsequent visit, when the Registered User opens Studify without an active session, the system checks for a valid "Remember Login" token on the device.
5. If a valid token is found, the system automatically authenticates the Registered User and grants access without displaying the login form.
6. The use case ends successfully.

### 2.2 Alternative Flows

#### 2.2.1 Token Expired

At step 4 of the Basic Flow, if the "Remember Login" token found on the device has expired:

1. The system discards the expired token.
2. The system redirects the user to the standard Login screen (UC2), requiring them to re-enter their credentials.
3. The use case ends without automatic authentication.

#### 2.2.2 Token Revoked or Invalidated

At step 4 of the Basic Flow, if the token has been explicitly revoked (e.g., due to logout with revocation, as described in UC3 — Logout, or a security-related action such as a password change):

1. The system rejects the token as invalid.
2. The system clears the invalid token from the device.
3. The system redirects the user to the standard Login screen (UC2), requiring them to re-enter their credentials.
4. The use case ends without automatic authentication.

---

## 3. Special Requirements

### 3.1 Token Security

"Remember Login" tokens must be cryptographically random, transmitted only over HTTPS, and stored as HTTP-only cookies to prevent access via client-side scripts (mitigating XSS-based theft).

### 3.2 Token Expiration Policy

Tokens should have a defined maximum lifetime (e.g., 30 days) after which they automatically expire and require the user to log in again.

### 3.3 Token Rotation

To reduce the risk of token replay attacks, the system should rotate (reissue) the token periodically or upon each use, invalidating the previous token value.

### 3.4 Single Point of Revocation

The system must allow tokens to be revoked immediately and independently of their expiration date (e.g., if a user reports a stolen device).

---

## 4. Preconditions

### 4.1 Successful Login with Opt-In

The Registered User must have previously completed UC2 — Login and explicitly selected the "Remember Login" option.

---

## 5. Postconditions

### 5.1 Persistent Token Issued

A valid, securely stored authentication token exists on the Registered User's device, enabling automatic re-authentication on future visits.

### 5.2 Automatic Authentication (on subsequent visits)

When the token is valid, the Registered User is automatically authenticated without needing to resubmit login credentials.

---

## 6. Extension Points

### 6.1 None

*This use case is itself an extension of UC2 — Login and does not currently define further extension points into other use cases.*
