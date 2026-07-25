# Studify
## Use-Case Specification: Validate Registration Info

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
    - [2.2.1 Invalid Email Format](#221-invalid-email-format)
    - [2.2.2 Weak Password](#222-weak-password)
    - [2.2.3 Duplicate Email or Username](#223-duplicate-email-or-username)
- [3. Special Requirements](#3-special-requirements)
- [4. Preconditions](#4-preconditions)
- [5. Postconditions](#5-postconditions)
- [6. Extension Points](#6-extension-points)
![Giao diện UC6](../../Images/Module_1/UC6.png)
---

## 1. Use-Case Name

**UC7 — Validate Registration Info**

### 1.1 Brief Description

This use case describes the system's internal process of verifying that the information submitted during account registration — email, password, and username — is well-formed, secure, and unique. It is always executed (included) as part of UC1 — Register New Account, and does not exist as a standalone user-facing action; it is triggered automatically by the system rather than directly invoked by an actor.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case begins automatically when UC1 — Register New Account reaches the validation step, immediately after the Guest submits the registration form.

1. The system receives the submitted Email, Password, and Username values from UC1.
2. The system checks that the Email field conforms to a valid email address format (e.g., contains "@" and a valid domain structure).
3. The system checks that the Password meets the minimum security policy (e.g., minimum 8 characters, at least one number, at least one letter).
4. The system checks that the Username meets formatting rules (e.g., allowed characters, minimum/maximum length).
5. The system queries the database to confirm that neither the Email nor the Username is already associated with an existing account.
6. If all checks pass, the system returns a "valid" result to UC1, allowing the registration process to proceed to account creation.
7. The use case ends successfully.

### 2.2 Alternative Flows

#### 2.2.1 Invalid Email Format

At step 2 of the Basic Flow, if the Email does not match a valid email format:

1. The system returns a "validation failed" result to UC1, specifying that the email format is invalid.
2. UC1 displays the corresponding error message to the Guest (see UC1, Alternative Flow 2.2.2).
3. The use case ends without proceeding to account creation.

#### 2.2.2 Weak Password

At step 3 of the Basic Flow, if the Password does not meet the minimum security policy:

1. The system returns a "validation failed" result to UC1, specifying which password rule was not met.
2. UC1 displays the corresponding error message to the Guest (see UC1, Alternative Flow 2.2.2).
3. The use case ends without proceeding to account creation.

#### 2.2.3 Duplicate Email or Username

At step 5 of the Basic Flow, if either the Email or Username already exists in the database:

1. The system returns a "validation failed" result to UC1, specifying which field (email and/or username) is already in use.
2. UC1 displays the corresponding error message to the Guest (see UC1, Alternative Flow 2.2.1).
3. The use case ends without proceeding to account creation.

---

## 3. Special Requirements

### 3.1 Response Time

Validation checks, including the database uniqueness query, should complete within 500 milliseconds under normal load to keep the overall registration flow responsive.

### 3.2 Case-Insensitive Uniqueness

Email and username uniqueness checks should be case-insensitive (e.g., "User@Example.com" and "user@example.com" are treated as the same email) to prevent duplicate accounts through case variation.

### 3.3 Consistent Validation Rules

Password and username formatting rules must be consistently enforced on both the client side (for immediate feedback) and the server side (for security), with the server-side check being authoritative.

---

## 4. Preconditions

### 4.1 Triggered by Registration

This use case can only be initiated as part of UC1 — Register New Account; it cannot be triggered independently by any actor.

---

## 5. Postconditions

### 5.1 Validation Result Returned

A clear "valid" or "validation failed" (with reason) result is returned to UC1, determining whether the registration process may proceed.

### 5.2 No Side Effects on Failure

If validation fails, no account record is created or modified in the database.

---

## 6. Extension Points

### 6.1 None

*This use case is included by UC1 — Register New Account and does not currently define further extension points into other use cases.*
