
## UC9 — Take Onboarding Survey

### TC-SURV-001

**Title:** Forced redirection to onboarding for a user who hasn't completed it

**Preconditions:**

* User is logged in with an account where `hasCompletedOnboarding = false`.

**Steps:**

1. After login, manually navigate to `/dashboard` (or any other protected route).

**Expected Result:**

* `OnboardingGuard` redirects the user to `/onboarding` instead of allowing access to `/dashboard`.

**Priority:** High

---

### TC-SURV-002

**Title:** Step 1 — select weekly study time commitment (auto-advance, no Next/Continue button)

**Preconditions:**

* User is on `/onboarding`, Step 1 ("Set Your Pace").
* Note: Step 1 has no "Next"/"Continue" button — clicking one of the weekly-hour option cards is itself the action that advances the flow.

**Steps:**

1. Click one of the weekly hour options (2h / 4h / 6h / 8+h).

**Expected Result:**

* The selection is registered and the wizard automatically advances to Step 2 ("English Level") immediately — no separate confirmation click is required.

**Priority:** High

---

### TC-SURV-003

**Title:** Step 1 — user cannot advance to Step 2 without selecting a weekly hour option

**Preconditions:**

* User is on `/onboarding`, Step 1 ("Set Your Pace").
* No weekly-hour option has been selected yet.

**Steps:**

1. On Step 1, do not click any of the weekly hour options (2h / 4h / 6h / 8+h).
2. Try to reach Step 2 by any other means available on the page (e.g. pressing Enter, clicking elsewhere on the card, scrolling) without selecting an option.

**Expected Result:**

* User remains on Step 1; Step 2 ("English Level") is never displayed.
* There is no "Next"/"Continue"/"Skip" control that would allow bypassing the mandatory selection — advancing is only possible by clicking one of the four pace options.

**Priority:** Medium

---

### TC-SURV-004

**Title:** Step 2 — choose "Yes, I know my level" (self-select path) instead of taking the placement test

**Preconditions:**

* User has completed Step 1.
* User is on Step 2 ("English Level") showing two option cards: "Yes, I know my level" and "No, I want to take a placement test".

**Steps:**

1. On Step 2, click the "Yes, I know my level" card.
2. Select a specific CEFR level from the options provided on the next screen.
3. Confirm the selection to proceed.

**Expected Result:**

* System navigates to a level selection screen after clicking the card.
* After confirming the level, `hasCompletedOnboarding` becomes `true`.
* User is redirected to `/dashboard`.
* A personalized roadmap is generated and displayed based on the manually selected CEFR level.

**Priority:** High

---

### TC-SURV-005

**Title:** Step 2 — choose to take the Placement Test instead of self-selecting

**Steps:**

1. On Step 2, click the option to take the Placement Test.

**Expected Result:**

* `PlacementTest.tsx` component launches correctly and starts fetching questions.

**Priority:** High

---

### TC-SURV-006

**Title:** Refresh page mid-survey (after Step 1, before Step 2 completion)

**Steps:**

1. Complete Step 1 (select weekly hours) but do not complete Step 2.
2. Refresh the browser page (F5).

**Expected Result:**

* Document actual behavior: either Step 1 progress is retained (user resumes at Step 2), or the survey resets to Step 1 — confirm this matches the intended UX design.

**Priority:** Medium

---

### TC-SURV-007

**Title:** Use browser back button during the survey

**Steps:**

1. Start the onboarding survey, complete Step 1, move to Step 2.
2. Click the browser's Back button.

**Expected Result:**

* No broken UI state, console errors, or crash; app either returns to Step 1 or safely stays on the current step.

**Priority:** Low

---

### TC-SURV-008

**Title:** Access to protected routes after completing onboarding

**Preconditions:**

* User has just completed onboarding (Step 1 + Step 2).

**Steps:**

1. Try navigating to `/dashboard`, `/roadmap`, `/lessons`.

**Expected Result:**

* `OnboardingGuard` allows access to all protected routes without redirecting back to `/onboarding`.

**Priority:** High

---

### TC-SURV-009

**Title:** Already-onboarded user manually navigates to `/onboarding`

**Preconditions:**

* User has `hasCompletedOnboarding = true`.

**Steps:**

1. Manually type `/onboarding` in the browser address bar and navigate.

**Expected Result:**

* Document actual behavior: system either redirects the user back to `/dashboard`, or allows them to redo onboarding — confirm this matches intended design (currently no explicit guard against re-access was documented, so this may surface a gap).

**Priority:** Medium

---

### TC-SURV-010

**Title:** Verify onboarding data is persisted correctly in the database

**Preconditions:**

* Access to the database (e.g. DBeaver).

**Steps:**

1. Complete the onboarding survey (Step 1 + Step 2) for a test account.
2. Query the `User` table for that account.

**Expected Result:**

* `weeklyStudyHours` reflects the selected value from Step 1.
* `hasCompletedOnboarding` = `true`.
* CEFR level field is populated (self-selected value or placement test result).

**Priority:** High

---

## UC12 — Take Placement Test

### TC-PLACE-001

**Title:** GET placement test questions does not expose correct answers

**Preconditions:**

* User is on the Placement Test screen (public endpoint, no login required to view questions).

**Steps:**

1. Open browser DevTools → Network tab.
2. Trigger `GET /placement-test/questions`.
3. Inspect the JSON response body.

**Expected Result:**

* Response contains question text and answer options only.
* The `correct_answer` field is NOT present anywhere in the response payload.

**Priority:** High

---

### TC-PLACE-002

**Title:** Correct answers are not exposed via Inspect Element / DOM

**Steps:**

1. Load the Placement Test page.
2. Right-click → Inspect Element on a question, and search the rendered DOM/HTML source for the correct answer.

**Expected Result:**

* No correct-answer data is embedded in the DOM, inline scripts, or data attributes.

**Priority:** High

---

### TC-PLACE-003

**Title:** Answering all questions correctly (100%) assigns the highest CEFR level

**Preconditions:**

* User has started the Placement Test.

**Steps:**

1. Answer every question correctly across all levels.
2. Submit the test (`POST /placement-test/submit`).

**Expected Result:**

* User is assigned the highest CEFR level available in the question bank (e.g. C2).
* Result payload shows 100% (or near-100%) accuracy per level.

**Priority:** High

---

### TC-PLACE-004

**Title:** Answering all questions incorrectly (0%) assigns the lowest CEFR level

**Steps:**

1. Answer every question incorrectly.
2. Submit the test.

**Expected Result:**

* User is assigned the lowest CEFR level (A1).

**Priority:** High

---

### TC-PLACE-005

**Title:** Exactly 70% accuracy at a level — boundary check

**Steps:**

1. Answer questions for a given level such that accuracy is exactly 70%.
2. Submit the test.

**Expected Result:**

* Per the "≥ 70%" rule, the user advances past that level to the next one (boundary is inclusive).

**Priority:** Medium

---

### TC-PLACE-006

**Title:** 69% accuracy at a level — does not advance

**Steps:**

1. Answer questions for a given level such that accuracy is just below 70% (e.g. 69%).
2. Submit the test.

**Expected Result:**

* User does NOT advance past that level; assigned level stays at or below the current level.

**Priority:** Medium

---

### TC-PLACE-007

**Title:** Submit the test with unanswered questions

**Steps:**

1. Answer only some of the questions, leaving others blank.
2. Submit the test.

**Expected Result:**

* System handles missing answers gracefully — either treats them as incorrect, or returns a validation error prompting the user to complete all questions (confirm actual behavior).
* No server crash (no HTTP 500).

**Priority:** Medium

---

### TC-PLACE-008

**Title:** Submit placement test without a valid Bearer token

**Steps:**

1. Send `POST /placement-test/submit` directly (e.g. via Postman) without an `Authorization` header, or with an expired/invalid token.

**Expected Result:**

* Request is rejected with HTTP 401 Unauthorized (blocked by `JwtGuard`).

**Priority:** High

---

### TC-PLACE-009

**Title:** Successful submission displays result and navigates to dashboard with generated roadmap

**Steps:**

1. Complete and submit the placement test as a logged-in user.
2. Observe the result screen.
3. Click the "Dashboard" button to proceed.

**Expected Result:**

* After submission, the system displays a Result page showing the test score and assigned CEFR level.
* User is not auto-redirected; they must explicitly click the button to go to the dashboard.
* Upon clicking, `markOnboardingComplete` is triggered (`hasCompletedOnboarding = true`), user is redirected to `/dashboard`, and a CEFR roadmap is generated based on the assigned level.

**Priority:** High

---

### TC-PLACE-010

**Title:** Resubmitting the placement test a second time

**Preconditions:**

* User has already submitted the placement test once.

**Steps:**

1. Attempt to call `POST /placement-test/submit` again with a new set of answers.

**Expected Result:**

* Document actual behavior: system either blocks resubmission (test locked after first attempt), allows a retake, or recalculates and overwrites the roadmap — confirm this matches the intended design.

**Priority:** Low

---

### Test Execution
| Test Case ID  | Execution Date | Status | Actual Result   | Bug ID |
| ------------- | -------------- | ------ | ---------------- | ------ |
| TC-SURV-001   | 2026-08-21     | Pass   | `OnboardingGuard` redirected user to `/onboarding` successfully. |        |
| TC-SURV-002   | 2026-08-21     | Pass   | Selection registered and auto-advanced to Step 2 immediately. |        |
| TC-SURV-003   | 2026-08-21     | Pass   | Could not advance to Step 2 without clicking a pace option. |        |
| TC-SURV-004   | 2026-08-21     | **Fail** | API for manual level selection is not connected. User is stuck and cannot complete onboarding. | BUG-004 |
| TC-SURV-005   | 2026-08-21     | Pass   | `PlacementTest.tsx` launched and fetched questions correctly. |        |
| TC-SURV-006   | 2026-08-21     | Pass   | Step 1 progress was retained upon page refresh. |        |
| TC-SURV-007   | 2026-08-21     | Pass   | Browser back button safely kept user on the current step without crashing. |        |
| TC-SURV-008   | 2026-08-21     | Pass   | Accessed protected routes successfully (tested via Placement Test path). |        |
| TC-SURV-009   | 2026-08-21     | Pass   | System redirected the onboarded user back to `/dashboard`. |        |
| TC-SURV-010   | 2026-08-21     | Pass   | `weeklyStudyHours` and CEFR level persisted correctly in DB (via Placement Test path). |        |
| TC-PLACE-001  | 2026-08-21     | Pass   | JSON response contained options but no `correct_answer` fields. |        |
| TC-PLACE-002  | 2026-08-21     | Pass   | Inspected DOM; no correct answers were exposed in HTML/attributes. |        |
| TC-PLACE-003  | 2026-08-21     | Pass   | 100% accuracy assigned C2 level correctly. |        |
| TC-PLACE-004  | 2026-08-21     | Pass   | 0% accuracy assigned A1 level correctly. |        |
| TC-PLACE-005  | 2026-08-21     | Pass   | Exactly 70% accuracy advanced the user to the next CEFR level. |        |
| TC-PLACE-006  | 2026-08-21     | Pass   | 69% accuracy kept the user at the current level. |        |
| TC-PLACE-007  | 2026-08-21     | Pass   | System handled missing answers as incorrect gracefully without crashing. |        |
| TC-PLACE-008  | 2026-08-21     | Pass   | Submission without token was blocked with HTTP 401. |        |
| TC-PLACE-009  | 2026-08-21     | Pass   | Result page displayed; clicking Dashboard updated status, redirected, and generated roadmap. |        |
| TC-PLACE-010  | 2026-08-21     | Pass   | Resubmission blocked; test locked after first attempt. |        |