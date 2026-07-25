# Self-Study Dashboard
## Use-Case Specification: UC10 - View Roadmap Completion % (Progress Bar)

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft for UC10: View Roadmap Completion % |`Lê Kim Hằng` |

---

### Table of Contents

- [Self-Study Dashboard](#self-study-dashboard)
  - [Use-Case Specification: UC10 - View Roadmap Completion % (Progress Bar)](#use-case-specification-uc10---view-roadmap-completion--progress-bar)
    - [Revision History](#revision-history)
    - [Table of Contents](#table-of-contents)
  - [1. Use-Case Name](#1-use-case-name)
    - [1.1 Brief Description](#11-brief-description)
  - [2. Flow of Events](#2-flow-of-events)
    - [2.1 Basic Flow](#21-basic-flow)
    - [2.2 Alternative Flows](#22-alternative-flows)
      - [2.2.1 Roadmap Fully Completed (100%)](#221-roadmap-fully-completed-100)
      - [2.2.2 Roadmap Just Started (0%)](#222-roadmap-just-started-0)
  - [3. Special Requirements](#3-special-requirements)
    - [3.1 Visual Accessibility](#31-visual-accessibility)
    - [3.2 Responsive Design](#32-responsive-design)
  - [4. Preconditions](#4-preconditions)
    - [4.1 Active Roadmap Context](#41-active-roadmap-context)
  - [5. Postconditions](#5-postconditions)
    - [5.1 UI Component Rendered](#51-ui-component-rendered)
  - [6. Extension Points](#6-extension-points)
    - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC10: View Roadmap Completion % (Progress Bar)**

### 1.1 Brief Description
This use case defines the presentation of the Learner's progress across their current learning level (e.g., Level A1 Roadmap). It is invoked as an included use case by UC9 (Track Learning Progress). Its primary responsibility is to render a visual progress bar and display the exact percentage of completion, which it retrieves by triggering UC11 (Calculate Completion %).

![Roadmap Completion Progress Bar Screen](../../Images/Module_2/UC9_10.png)

*Figure 10.1: Circular progress indicator (45% Total) with lessons-completed summary, part of the Student Dashboard rendered by this use case.*

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The use case begins when UC9 (Track Learning Progress) or another relevant dashboard view requests the display of the overall roadmap progress.
2. The system invokes **UC11: Calculate Completion % (real-time)** (*<<include>> relationship*) to compute the exact numerical value based on the Learner's completed lessons versus total lessons in the roadmap.
3. UC11 returns the calculated percentage (e.g., 45%) to this use case.
4. The system renders the visual progress bar component on the user interface. 
   * The bar is filled proportionally to represent the calculated percentage.
   * The exact numerical percentage (e.g., "45%") is displayed either inside or immediately adjacent to the progress bar.
   * The system displays a text summary (e.g., "45 of 100 lessons completed").
5. The use case ends, and the system continues rendering the rest of the parent dashboard (UC9).

### 2.2 Alternative Flows

#### 2.2.1 Roadmap Fully Completed (100%)

![alt text](../../Images/Module_2/UC10_level_completed.png)

If UC11 returns a value of 100%:
1. The system renders the progress bar completely filled.
2. The system applies a distinct visual styling (e.g., a gold color, a glowing effect, or a "completed" badge) to signify mastery of the level.
3. The system may display a "Level Completed!" congratulatory message alongside the progress bar.

#### 2.2.2 Roadmap Just Started (0%)
If UC11 returns a value of 0% (the Learner has not completed any lessons in this roadmap):
1. The system renders an empty progress bar track.
2. The exact percentage is displayed as "0%".
3. The system displays an encouraging prompt, such as "0 lessons completed. Start your first lesson today!"

---

## 3. Special Requirements

### 3.1 Visual Accessibility
The progress bar must utilize a color contrast ratio that meets standard accessibility guidelines (e.g., WCAG 2.1 AA) so that visually impaired users can easily distinguish the "filled" portion of the bar from the "unfilled" background track. 

### 3.2 Responsive Design
The progress bar component must be responsive. It should dynamically resize its width to fit perfectly within the constraints of mobile screens, tablets, and desktop monitors without distorting or clipping the percentage text.

---

## 4. Preconditions

### 4.1 Active Roadmap Context
The Learner must be enrolled in a specific learning level/roadmap, and the parent use case (UC9) must pass the specific roadmap identifier to this use case so that progress can be visualized accurately.

---

## 5. Postconditions

### 5.1 UI Component Rendered
The visual progress bar and text summary are successfully drawn on the user interface, reflecting the most up-to-date completion status. The underlying database state remains unchanged.

---

## 6. Extension Points

### 6.1 None
There are no extension points for this specific use case.