# STUDIFY
## Use-Case Specification: Mark Study Status

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Mark Study Status Use-Case Specification | `Group 09` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [User Marks "Don't Know"](#221-user-marks-dont-know)
      2. [User Marks "Review Later"](#222-user-marks-review-later)
      3. [User Uses Keyboard Shortcut to Mark Status](#223-user-uses-keyboard-shortcut-to-mark-status)
      4. [User Changes a Previously Marked Status](#224-user-changes-a-previously-marked-status)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the process by which a User self-assesses and records their knowledge of a flashcard after reviewing it during a study session. After flipping a card to view its explanation (UC9 – Flip Card to View Explanation), the User rates how well they knew the answer by selecting a **study status** (e.g., "Know", "Don't Know", "Review Later"). The system records this rating and uses it to update the flashcard's study progress, which may inform a spaced repetition algorithm to schedule future reviews. This use case is included by UC6 (Study Flashcards).

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts immediately after the User has flipped a flashcard to view its Explanation during a study session (upon completion of UC9 – Flip Card to View Explanation).

1. The system displays the **Mark Study Status** controls below or alongside the flipped flashcard. The controls consist of three buttons:
   - ✅ **"Know"** (green): The User knew the answer confidently.
   - ❌ **"Don't Know"** (red): The User did not know the answer.
   - 🔁 **"Review Later"** (yellow/amber): The User partially knew the answer or wants to review again soon.

2. The User selects **"Know"** to indicate they knew the term and its explanation confidently.

3. The system records the **"Know"** status for this flashcard in the current study session.

4. The system updates the flashcard's study metadata:
   - Increments the "correct" count for this card.
   - Schedules the next review date according to the spaced repetition algorithm (the next review is set further in the future for well-known cards).
   - Marks the card as "mastered" if it has been marked "Know" a sufficient number of consecutive times (configurable threshold).

5. The system advances to the next flashcard in the study session deck (returning control to UC6 – Study Flashcards, Step 8).

6. The use case ends for the current card.

---

### 2.2 Alternative Flows

#### 2.2.1 User Marks "Don't Know"

This alternative flow describes the behavior when the User did not know the flashcard's term or explanation.

1. After viewing the Explanation (Step 1 of the Basic Flow), the User clicks the ❌ **"Don't Know"** button.
2. The system records the **"Don't Know"** status for this flashcard.
3. The system updates the flashcard's study metadata:
   - Increments the "incorrect" count for this card.
   - Resets or shortens the spaced repetition interval, scheduling the card for an earlier re-review (e.g., within the same session or the next day).
   - Adds this card to the "Difficult" or "Re-review" pile of the current session.
4. The system may re-insert this card into the session queue (e.g., it will appear again near the end of the current session).
5. The system advances to the next new card in the deck.
6. The flow returns to Step 5 of the Basic Flow (advance to next card).

#### 2.2.2 User Marks "Review Later"

This alternative flow describes the behavior when the User partially knew the answer or wants a second look.

1. After viewing the Explanation (Step 1 of the Basic Flow), the User clicks the 🔁 **"Review Later"** button.
2. The system records the **"Review Later"** status for this flashcard.
3. The system updates the flashcard's study metadata:
   - Does not increment the correct count.
   - Schedules the card for an intermediate re-review date (shorter interval than "Know" but longer than "Don't Know").
   - Adds the card to a secondary review queue within the same session (it will reappear once near the end).
4. The system advances to the next card in the primary deck.
5. The flow returns to Step 5 of the Basic Flow (advance to next card).

#### 2.2.3 User Uses Keyboard Shortcut to Mark Status

This alternative flow describes keyboard-based status marking for accessibility and efficient study.

1. After the card has been flipped (UC9 completed), the User presses one of the designated keyboard shortcuts:
   - **Key "1"** or **Arrow Right** → Marks **"Know"**.
   - **Key "2"** or **Arrow Down** → Marks **"Review Later"**.
   - **Key "3"** or **Arrow Left** → Marks **"Don't Know"**.
2. The system recognizes the keypress and processes it as the equivalent button click.
3. The system records the status and the flow continues as per the corresponding Basic or Alternative flow above.

#### 2.2.4 User Changes a Previously Marked Status

This alternative flow occurs within a session when the User wants to change the status they marked for the most recently reviewed card.

1. After marking a status and being shown the next card, the User clicks an **"Undo"** button (if provided) within a 3-second grace period.
2. The system cancels the advancement and returns the User to the previously marked card.
3. The system un-records the previously selected status.
4. The system re-displays the Mark Study Status controls for the returned card.
5. The User selects a new status.
6. The flow resumes at Step 3 of the Basic Flow (or corresponding alternative flow) with the new status.

---

## 3. Special Requirements

### 3.1 Usability Requirements

- The three status buttons must be large, clearly labeled, and color-coded to minimize the cognitive load during a study session.
- The buttons must only appear after the card has been flipped (i.e., after UC9 is triggered), to prevent premature marking without reviewing the explanation.
- The current card's marked status must be visually reflected immediately upon selection (e.g., a brief highlight/animation on the chosen button).

### 3.2 Performance Requirements

- The status must be recorded and the next card must be loaded within 300 milliseconds of the User pressing a status button.
- Study status updates must be saved to the backend asynchronously (non-blocking) to maintain a smooth session experience.

### 3.3 Spaced Repetition Algorithm Requirements

- The system must implement a spaced repetition scheduling algorithm (e.g., SM-2 or a simplified variant) based on the User's marked status history.
- The next review date for each card must be calculated and stored after each status marking.
- Cards marked "Don't Know" must be prioritized in future sessions.

### 3.4 Data Persistence Requirements

- All study status records must be durable: once a status is recorded and the User advances, the data must not be lost even in the event of a network interruption (use local storage as a fallback).

---

## 4. Preconditions

### 4.1 Active Study Session

- The User must be in an active flashcard study session (UC6 – Study Flashcards).

### 4.2 Card Has Been Flipped

- The flashcard must have been flipped (UC9 – Flip Card to View Explanation must have been completed) before the Mark Study Status controls are made available. The controls must not be accessible before the card is flipped.

### 4.3 User Authentication

- The User must be authenticated (logged in) to the STUDIFY system.

---

## 5. Postconditions

### 5.1 Status Recorded

After the use case is completed successfully:

- The selected study status ("Know", "Don't Know", or "Review Later") is recorded for the current flashcard within the current study session.
- The flashcard's overall study metadata (correct count, incorrect count, review interval, next review date) is updated accordingly.
- The session progresses to the next flashcard.

### 5.2 Session Summary Impact

At the end of the study session:

- The system's session summary (displayed after the last card in UC6) reflects the breakdown of cards by marked status (e.g., 15 "Know", 3 "Don't Know", 2 "Review Later").

### 5.3 Long-term Study Progress

After persistent saving:

- The User's study progress for each flashcard is updated in the system, influencing the spaced repetition schedule for that card.
- Cards consistently marked "Know" multiple times may be labeled as **"Mastered"** and deprioritized in future sessions.

---

## 6. Extension Points

This use case has no extension points of its own. It is a mandatory component included by UC6 (Study Flashcards), and is triggered after UC9 (Flip Card to View Explanation) completes for each card during a study session.
