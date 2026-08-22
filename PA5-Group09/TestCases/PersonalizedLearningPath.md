# Test Cases — Personalized Learning Path

**Covers Use Cases:**
- UC1 — View Learning Roadmap
- UC2 — View Lesson Details by Level
- UC3 — Study Lesson (progress update flow)
- UC9 — Track Learning Progress
- UC10 — View Roadmap Completion %

---

## UC1 — View Learning Roadmap

### TC-PLP-001

**Title:** Roadmap loads successfully for an authenticated user

**Preconditions:**

* User is logged in and has completed onboarding (`hasCompletedOnboarding = true`).
* User has an assigned CEFR level from the placement test or self-selection.

**Steps:**

1. Navigate to `/roadmap`.
2. Open browser DevTools → Network tab.
3. Observe the `GET /roadmap` request and response.

**Expected Result:**

* Request includes a valid `Authorization: Bearer <token>` header.
* Response returns HTTP 200 with JSON containing `levels`, `assignedLevel`, `views`, and `metrics`.
* The roadmap UI renders all 6 CEFR level sections (A1 through C2) as a horizontally scrollable path.

**Priority:** High

---

### TC-PLP-002

**Title:** Unauthenticated user cannot access the roadmap API

**Steps:**

1. Send `GET /roadmap` via Postman without an `Authorization` header, or with an expired/invalid token.

**Expected Result:**

* Request is rejected with HTTP 401 Unauthorized (blocked by `JwtGuard`).

**Priority:** High

---

### TC-PLP-003

**Title:** Node statuses reflect the user's actual progress

**Preconditions:**

* User has assigned level B1 from the placement test.
* User has completed 2 lessons in B1 (vocabulary and grammar both marked `isCompleted = true` in `user_progress` table).

**Steps:**

1. Navigate to `/roadmap`.
2. Inspect the response JSON from `GET /roadmap`, focusing on the B1 `views` entry.

**Expected Result:**

* Lessons 1 and 2 in B1 have `status: "completed"`.
* Lesson 3 in B1 has `status: "active"` (the first uncompleted lesson).
* Lessons 4+ in B1 have `status: "locked"`.
* All lessons in levels below B1 (A1, A2) have `status: "available"` or `"completed"`.

**Priority:** High

---

### TC-PLP-004

**Title:** Clicking a locked node does not navigate to the lesson

**Preconditions:**

* User is on the `/roadmap` page.
* At least one lesson node has `status: "locked"`.

**Steps:**

1. Click on a locked lesson node.

**Expected Result:**

* The system does NOT navigate to a lesson page.
* No console errors occur; the UI remains on the roadmap.

**Priority:** Medium

---

### TC-PLP-005

**Title:** Clicking an active or available node navigates to the lesson

**Preconditions:**

* User is on the `/roadmap` page.

**Steps:**

1. Click on a lesson node with `status: "active"`.

**Expected Result:**

* The system navigates to the lesson page for that specific lesson (e.g., `/lesson/:level/:lessonIndex`).
* The lesson content loads correctly.

**Priority:** High

---

## UC2 / UC3 — Study Lesson & Progress Update

### TC-PLP-006

**Title:** Completing a lesson updates the roadmap and unlocks the next node

**Preconditions:**

* User is on the active lesson (e.g., B1 Lesson 3).
* Both vocabulary and grammar sections are not yet completed.

**Steps:**

1. Review the theory section (Study Theory).
2. Click the "Mark as Complete" button.
3. Navigate back to `/roadmap` (click "Go to Roadmap" button or use nav).
4. Inspect the `GET /roadmap` response.

**Expected Result:**

* The just-completed lesson (B1 Lesson 3) now has `status: "completed"`.
* The next lesson (B1 Lesson 4) now has `status: "active"` (previously `"locked"`).
* `metrics.lessons` counter has incremented (e.g., from `"2/30"` to `"3/30"`).

**Priority:** High

---

### TC-PLP-007

**Title:** Exiting a lesson early leaves the lesson incomplete

**Preconditions:**

* User is in a lesson, currently on the theory section.

**Steps:**

1. Read through part of the theory content.
2. Click the browser's Back button or navigate away to `/roadmap`.

**Expected Result:**

* The lesson remains in an incomplete state (not marked as `"completed"` in the roadmap).
* No crash, console error, or data loss occurs.
* Re-entering the same lesson allows the user to continue.

**Priority:** Medium

---

## UC9 / UC10 — Track Learning Progress & Completion %

### TC-PLP-008

**Title:** Metrics panel displays accurate completion data

**Preconditions:**

* User has completed exactly 5 lessons total across all levels.
* Total lessons in the roadmap is 30.

**Steps:**

1. Navigate to `/roadmap`.
2. Observe the metrics/stats panel on the page.

**Expected Result:**

* The `lessons` metric displays `"5/30"`.
* The `level` metric displays the user's assigned CEFR level (e.g., `"B1"`).
* The `streak` value correctly reflects the user's consecutive daily study streak.

**Priority:** High

---

### TC-PLP-009

**Title:** Learning streak resets after missing a day

**Preconditions:**

* User had a 3-day learning streak.
* User did not complete any lesson for 2 consecutive days.

**Steps:**

1. Log in on the 3rd day of inactivity.
2. Navigate to `/roadmap`.
3. Observe the streak value in the metrics panel.

**Expected Result:**

* Streak displays `0` (reset because the last completion date is more than 1 day ago).

**Priority:** Medium

---

### TC-PLP-010

**Title:** Roadmap handles network/server error gracefully

**Preconditions:**

* User is logged in.

**Steps:**

1. Disconnect from the network (or simulate a server down scenario).
2. Navigate to `/roadmap`.

**Expected Result:**

* The UI displays a user-friendly error message (e.g., "Cannot load Roadmap.") instead of a blank screen or crash.
* No unhandled JavaScript errors in the console.

**Priority:** Medium

---

### Test Execution

| Test Case ID  | Execution Date | Status | Actual Result   | Bug ID |
| ------------- | -------------- | ------ | --------------- | ------ |
| TC-PLP-001    | 21/08/2026     | Pass   | Roadmap loads successfully with 6 CEFR levels, HTTP 200/304 response.             |        |
| TC-PLP-002    | 21/08/2026     | Pass   | Request without token returns HTTP 401 Unauthorized as expected.              |        |
| TC-PLP-003    | 21/08/2026     | Pass   | Correct node statuses returned (completed, active, locked) matching user progress.                |        |
| TC-PLP-004    | 21/08/2026     | Pass   | Clicking a locked node does not navigate to the lesson; no errors occur.                |        |
| TC-PLP-005    | 21/08/2026     | Pass   | Clicking an active/available node navigates to the lesson page and loads content correctly.         |        |
| TC-PLP-006    | 22/08/2026     | Pass   | Roadmap updates successfully after clicking "Mark as Complete" on theory. |        |
| TC-PLP-007    | 22/08/2026     | Pass   | Navigating away before marking complete keeps lesson status incomplete. |        |
| TC-PLP-008    | 22/08/2026     | Pass   | Metrics panel (level, lessons, streak) displays accurate data from API. |        |
| TC-PLP-009    | 22/08/2026     | Pass   | Streak is reset to 0 after missing a day of learning. |        |
| TC-PLP-010    | 22/08/2026     | Pass   | UI displays error message "Cannot load Roadmap." with no JS errors. |        |