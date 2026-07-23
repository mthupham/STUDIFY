# Studify
## Use-Case Specification: View Lesson Details by Level

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft of use-case specification UC2 – View Lesson Details by Level | `<name>` |

---

### Table of Contents

- [1. Use-Case Name](#1-use-case-name)
  - [1.1 Brief Description](#11-brief-description)
- [2. Flow of Events](#2-flow-of-events)
  - [2.1 Basic Flow](#21-basic-flow)
  - [2.2 Alternative Flows](#22-alternative-flows)
    - [2.2.1 Level Has No Lessons](#221-level-has-no-lessons)
    - [2.2.2 Load Failure / Network Error](#222-load-failure--network-error)
    - [2.2.3 Learner Returns to Roadmap](#223-learner-returns-to-roadmap)
- [3. Special Requirements](#3-special-requirements)
  - [3.1 Performance](#31-performance)
  - [3.2 Usability](#32-usability)
- [4. Preconditions](#4-preconditions)
  - [4.1 Level Selected](#41-level-selected)
- [5. Postconditions](#5-postconditions)
  - [5.1 Lesson List Displayed](#51-lesson-list-displayed)
- [6. Extension Points](#6-extension-points)
  - [6.1 Lesson Selection](#61-lesson-selection)

---

## 1. Use-Case Name

**View Lesson Details by Level**

### 1.1 Brief Description

This use case allows the Learner to view a detailed list of lessons belonging to a specific level selected from the Learning Roadmap. For each lesson, the system displays summary information such as the lesson name, overview content, and completion status (Not Started / In Progress / Completed). This use case is included by the **View Learning Roadmap** use case, and it in turn includes the **Study Lesson** use case when the Learner selects a specific lesson to begin studying.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case begins immediately after the Learner selects a specific level on the Roadmap screen (triggered from the View Learning Roadmap use case).

1. The system receives the level ID that the Learner has selected (e.g., A1, A2, etc.).
2. The system queries the list of lessons belonging to that level from the database, ordered according to the recommended study sequence.
3. The system displays the lesson list, where each lesson includes: lesson name, short description, number of theory/quiz sections, and the Learner's current completion status.
4. The system displays an overall progress bar for the level, showing the ratio of completed lessons to the total number of lessons in that level.
5. The Learner selects a specific lesson from the list to begin studying.
6. The system executes the **Study Lesson** use case *(<<include>>)* to move the Learner to the detailed lesson study screen.
7. The use case ends when the study screen for the selected lesson has been successfully displayed.

### 2.2 Alternative Flows

#### 2.2.1 Level Has No Lessons

*Trigger condition: The selected level currently has no lessons configured in the system.*

1. At step 3 of the Basic Flow, the system detects that the lesson list for the level is empty.
2. The system displays the message "This level does not have any lessons yet. Please check back later."
3. The system provides a "Back to Learning Roadmap" button to return the Learner to the Roadmap screen.
4. The use case ends.

#### 2.2.2 Load Failure / Network Error

*Trigger condition: An error occurs while querying lesson list data from the server (network error, server 500 error, timeout).*

1. At step 2 of the Basic Flow, the request to fetch lesson data fails.
2. The system displays a user-friendly error message, e.g., "Unable to load the lesson list. Please check your network connection and try again."
3. The system provides a "Retry" button.
4. If the Learner selects "Retry," the flow returns to step 2 of the Basic Flow.
5. If the Learner takes no action, the use case ends.

#### 2.2.3 Learner Returns to Roadmap

*Trigger condition: The Learner wants to go back to the Roadmap screen instead of selecting a lesson.*

1. At any point after step 3 of the Basic Flow, the Learner selects the "Back" button.
2. The system navigates the Learner back to the View Learning Roadmap screen.
3. The use case ends.

---

## 3. Special Requirements

### 3.1 Performance

The lesson list for a level must be loaded and displayed within a maximum of 2 seconds under normal network conditions.

### 3.2 Usability

Each lesson in the list must clearly display its completion status (using a distinct icon or color for: Not Started / In Progress / Completed) so the Learner can easily identify which lesson to study next.

---

## 4. Preconditions

### 4.1 Level Selected

The Learner has selected a specific level from the View Learning Roadmap screen before this use case is executed.

---

## 5. Postconditions

### 5.1 Lesson List Displayed

The system has successfully displayed the lesson list for the selected level along with the Learner's corresponding completion status. If the Learner has selected a specific lesson, the Study Lesson screen has also been displayed (via the include relationship).

---

## 6. Extension Points

### 6.1 Lesson Selection

This extension point occurs at step 5 of the Basic Flow, immediately after the Learner selects a specific lesson from the list. This is the point where the **Study Lesson** use case is included to continue the flow of moving the Learner to the detailed lesson study screen.
