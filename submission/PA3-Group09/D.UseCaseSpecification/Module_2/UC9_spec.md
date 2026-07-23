# Self-Study Dashboard
## Use-Case Specification: UC9 - Track Learning Progress

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft for UC9: Track Learning Progress | System Analyst |

---

### Table of Contents

- [Self-Study Dashboard](#self-study-dashboard)
  - [Use-Case Specification: UC9 - Track Learning Progress](#use-case-specification-uc9---track-learning-progress)
    - [Revision History](#revision-history)
    - [Table of Contents](#table-of-contents)
  - [1. Use-Case Name](#1-use-case-name)
    - [1.1 Brief Description](#11-brief-description)
  - [2. Flow of Events](#2-flow-of-events)
    - [2.1 Basic Flow](#21-basic-flow)
    - [2.2 Alternative Flows](#22-alternative-flows)
      - [2.2.1 New Learner (No Data)](#221-new-learner-no-data)
  - [3. Special Requirements](#3-special-requirements)
    - [3.1 Real-Time Data Accuracy](#31-real-time-data-accuracy)
  - [4. Preconditions](#4-preconditions)
    - [4.1 User Authentication](#41-user-authentication)
  - [5. Postconditions](#5-postconditions)
    - [5.1 Dashboard Rendered](#51-dashboard-rendered)
  - [6. Extension Points](#6-extension-points)
    - [6.1 Review Past Assessments](#61-review-past-assessments)

---

## 1. Use-Case Name
**UC9: Track Learning Progress**

### 1.1 Brief Description
This use case allows the Learner to monitor their overall educational journey within the Self-Study Dashboard. It aggregates data from completed lessons, study time, and quiz scores to provide a comprehensive view of the Learner's performance. It inherently relies on calculating and visualizing the roadmap completion percentage (UC10) and can be extended to view specific past quiz results (UC8).

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The Learner selects the "My Progress" or "Dashboard" tab from the main navigation menu.
2. The system queries the database to retrieve the Learner's historical learning data, including completed lessons, total study hours, and recent quiz scores.
3. The system executes **UC10: View Roadmap Completion %** (*<<include>> relationship*) to display the primary visual progress bar representing the Learner's journey through their current level (e.g., A1, A2).
4. The system populates the rest of the progress interface with detailed metrics (e.g., learning streaks, average quiz scores, and recent activities).
5. The Learner reviews their statistical data and overall progress.
6. The use case ends when the Learner navigates away from the progress dashboard.

### 2.2 Alternative Flows

#### 2.2.1 New Learner (No Data)
If the system detects that the Learner has not yet started any lessons or completed any quizzes:
1. Instead of displaying empty charts or "0%" metrics, the system displays a welcoming "Get Started" state.
2. The system prompts the Learner with a call-to-action button to navigate to the Learning Roadmap (UC1) to begin their first lesson.
3. The flow ends.

---

## 3. Special Requirements

### 3.1 Real-Time Data Accuracy
The data presented in the progress dashboard must accurately reflect the Learner's most recent activities. Any quizzes completed (UC5) or lessons marked as done (UC3) must immediately reflect in this dashboard upon reload.

---

## 4. Preconditions

### 4.1 User Authentication
The Learner must be logged into the Self-Study Dashboard system and have an active profile with an assigned learning level (e.g., A1, A2).

---

## 5. Postconditions

### 5.1 Dashboard Rendered
The system successfully renders the progress metrics on the screen. The state of the database remains unchanged as this is a read-only operation for the Learner.

---

## 6. Extension Points

### 6.1 Review Past Assessments
**Location:** Step 4 of the Basic Flow.
**Description:** While viewing the list of recent activities and scores within their progress dashboard, the Learner can click on a specific completed quiz. This action triggers the extension use case **UC8: View Quiz Result** (`<<extend>>` relationship), allowing the Learner to dive deeper into the detailed breakdown of their past performance without leaving the context of their overall progress tracking.