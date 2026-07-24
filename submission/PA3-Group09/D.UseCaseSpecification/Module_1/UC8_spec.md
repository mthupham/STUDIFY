# Studify
## Use-Case Specification: Take Onboarding Survey

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
    - [2.2.1 User Already Knows Their English Level](#221-user-already-knows-their-english-level)
    - [2.2.2 User Does Not Know Their English Level](#222-user-does-not-know-their-english-level)
    - [2.2.3 User Abandons Survey Midway](#223-user-abandons-survey-midway)
- [3. Special Requirements](#3-special-requirements)
- [4. Preconditions](#4-preconditions)
- [5. Postconditions](#5-postconditions)
- [6. Extension Points](#6-extension-points)

---

## 1. Use-Case Name

**UC9 — Take Onboarding Survey**

### 1.1 Brief Description

This use case guides a newly registered user through an onboarding questionnaire immediately after account creation, gathering information about their available study time and current English proficiency level. It is always executed (included) as part of UC1 — Register New Account. This use case always includes UC10 — Answer Study Time Availability and UC11 — Indicate Current English Level, may optionally extend into UC12 — Take Placement Test depending on the user's response, and always includes UC13 — Auto-generate CEFR Roadmap once the necessary information is gathered.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case begins automatically once UC1 — Register New Account completes successfully, redirecting the newly Registered User into the onboarding flow.

1. The system displays the onboarding survey's first question.
2. The system performs UC10 — Answer Study Time Availability, presenting the Registered User with a set of predefined options describing how much time they intend to dedicate to studying English (e.g., "15 minutes/day," "30 minutes/day," "1 hour/day," "Flexible/varies").
3. The Registered User selects one option and proceeds.
4. The system performs UC11 — Indicate Current English Level, asking whether the Registered User already knows their current English proficiency level.
5. If the user indicates they already know their level, the flow proceeds via Alternative Flow 2.2.1.
6. If the user indicates they do not know their level, the flow proceeds via Alternative Flow 2.2.2.
7. Once the user's English level has been determined (either through direct input or the placement test), the system performs UC13 — Auto-generate CEFR Roadmap to create a personalized learning roadmap.
8. The system presents the generated roadmap to the Registered User and marks onboarding as complete.
9. The use case ends successfully.

### 2.2 Alternative Flows

#### 2.2.1 User Already Knows Their English Level

At step 5 of the Basic Flow, if the Registered User indicates they already know their current English proficiency level (e.g., A1–C2 per CEFR):

1. The system displays a list of CEFR levels (A1, A2, B1, B2, C1, C2) for the user to choose from.
2. The Registered User selects their self-assessed level.
3. The system records the selected level as the user's starting point.
4. The flow resumes at step 7 of the Basic Flow.

#### 2.2.2 User Does Not Know Their English Level

At step 6 of the Basic Flow, if the Registered User indicates they do not know their current English proficiency level:

1. The system performs UC12 — Take Placement Test, presenting a short test of 10–15 questions arranged from easy to difficult.
2. The Registered User answers the placement test questions.
3. The system evaluates the responses and determines an estimated CEFR level based on the results.
4. The system records the determined level as the user's starting point.
5. The flow resumes at step 7 of the Basic Flow.

#### 2.2.3 User Abandons Survey Midway

At any step of the Basic Flow, if the Registered User closes the application or navigates away before completing the survey:

1. The system saves the Registered User's progress up to the last completed question.
2. On the user's next visit, the system resumes the survey from the last incomplete question rather than restarting from the beginning.
3. The flow resumes at the appropriate step of the Basic Flow based on saved progress.

---

## 3. Special Requirements

### 3.1 Mandatory Completion

The onboarding survey should be presented in a way that strongly encourages completion (e.g., cannot be permanently dismissed) since it is required to generate the user's personalized CEFR roadmap, a core feature of Studify.

### 3.2 Response Time

Each survey step should load and respond within 1 second under normal network conditions to maintain a smooth onboarding experience.

### 3.3 Progress Persistence

Survey progress must be saved incrementally (e.g., after each question) so that users who abandon and return do not lose previously entered answers.

---

## 4. Preconditions

### 4.1 Newly Registered Account

The Registered User must have just completed UC1 — Register New Account and not yet completed the onboarding survey.

### 4.2 Onboarding Not Yet Completed

The Registered User's account must not already have a completed onboarding status; a user who has already finished onboarding is not re-prompted with this use case during normal login.

---

## 5. Postconditions

### 5.1 Study Preferences Recorded

The Registered User's intended study time availability is stored in their profile.

### 5.2 English Level Determined

The Registered User's starting English proficiency level (either self-reported or determined via placement test) is recorded in their profile.

### 5.3 Roadmap Generated

A CEFR-based learning roadmap has been generated and associated with the Registered User's account (via UC13).

### 5.4 Onboarding Marked Complete

The Registered User's account is flagged as having completed onboarding, so this use case is not triggered again on subsequent logins.

---

## 6. Extension Points

### 6.1 Placement Test Trigger

*Location: Alternative Flow 2.2.2, step 1.* This is the point at which control optionally passes from UC9 to UC12 — Take Placement Test, executed only when the Registered User does not already know their current English level.
