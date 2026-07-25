# Self-Study Dashboard
## Use-Case Specification: UC14 - View Daily Study Widget

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft for UC14 (F2.5 Dashboard Widget) | `Lê Kim Hằng` |
---

### Table of Contents

- [Self-Study Dashboard](#self-study-dashboard)
  - [Use-Case Specification: UC14 - View Daily Study Widget](#use-case-specification-uc14---view-daily-study-widget)
    - [Revision History](#revision-history)
    - [Table of Contents](#table-of-contents)
  - [1. Use-Case Name](#1-use-case-name)
    - [1.1 Brief Description](#11-brief-description)
  - [2. Flow of Events](#2-flow-of-events)
    - [2.1 Basic Flow](#21-basic-flow)
    - [2.2 Alternative Flows](#22-alternative-flows)
      - [2.2.1 No Commitment Set](#221-no-commitment-set)
  - [3. Special Requirements](#3-special-requirements)
    - [3.1 Widget Responsiveness](#31-widget-responsiveness)
  - [4. Preconditions](#4-preconditions)
    - [4.1 Dashboard Access](#41-dashboard-access)
  - [5. Postconditions](#5-postconditions)
    - [5.1 Tasks Displayed](#51-tasks-displayed)
  - [6. Extension Points](#6-extension-points)
    - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC14: View Daily Study Widget**

### 1.1 Brief Description
This use case presents a dedicated schedule widget on the main Self-Study Dashboard. Based on the Learner's committed study hours (UC13), the widget displays assigned daily lessons, calculated session durations, and real-time completion checklists for the current day.

![Daily Study Widget Screen](../../Images/Module_2/UC14.png)

*Figure 14.1: "Today's Study Plan" widget showing daily quota progress, assigned lessons (Theory/Practice), and a contextual study tip.*

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The Learner lands on the Self-Study Dashboard page.
2. The widget invokes **UC15: Calculate Daily Tasks Schedule** (*<<include>> relationship*) to compute today's target lessons based on user commitment.
3. UC15 returns the list of daily assigned lessons and estimated total time.
4. The system renders the Daily Study Widget displaying:
   * Target time for today (e.g., "30 mins target").
   * Assigned lesson cards (e.g., "Lesson 3: Grammar Focus").
   * Completion checkboxes and start buttons for each task.
5. The Learner views their daily schedule or clicks a lesson task to jump directly into **UC3: Study Lesson**.
6. The use case ends.

### 2.2 Alternative Flows

#### 2.2.1 No Commitment Set

![alt text](../../Images/Module_2/UC14_no_commitment.png)

If the Learner has not yet configured their commitment hours via UC13:
1. The widget displays a default banner: "Set your daily study commitment to receive a personalized daily study plan!"
2. Clicking the banner redirects the Learner to **UC13: Set Study Commitment Hours**.

---

## 3. Special Requirements

### 3.1 Widget Responsiveness
The widget must render cleanly at the top of the mobile and desktop dashboard layout, allowing one-tap access to launch today's lessons.

---

## 4. Preconditions

### 4.1 Dashboard Access
The Learner must be authenticated and viewing the main dashboard interface.

---

## 5. Postconditions

### 5.1 Tasks Displayed
The Learner's daily agenda is visually presented without modifying underlying data.

---

## 6. Extension Points

### 6.1 None
No extension points for this use case.