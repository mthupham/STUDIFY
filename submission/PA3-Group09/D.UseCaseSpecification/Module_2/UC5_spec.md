# Self-Study Dashboard
## Use-Case Specification: UC5 - Take Quiz

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft for UC5: Take Quiz | System Analyst |

---

### Table of Contents

- [Self-Study Dashboard](#self-study-dashboard)
  - [Use-Case Specification: UC5 - Take Quiz](#use-case-specification-uc5---take-quiz)
    - [Revision History](#revision-history)
    - [Table of Contents](#table-of-contents)
  - [1. Use-Case Name](#1-use-case-name)
    - [1.1 Brief Description](#11-brief-description)
  - [2. Flow of Events](#2-flow-of-events)
    - [2.1 Basic Flow](#21-basic-flow)
    - [2.2 Alternative Flows](#22-alternative-flows)
      - [2.2.1 Incomplete Quiz Submission](#221-incomplete-quiz-submission)
      - [2.2.2 Session Timeout / Connectivity Loss](#222-session-timeout--connectivity-loss)
  - [3. Special Requirements](#3-special-requirements)
    - [3.1 Performance Requirement](#31-performance-requirement)
    - [3.2 Usability Requirement](#32-usability-requirement)
  - [4. Preconditions](#4-preconditions)
    - [4.1 Lesson Context](#41-lesson-context)
  - [5. Postconditions](#5-postconditions)
    - [5.1 State Update](#51-state-update)
  - [6. Extension Points](#6-extension-points)
    - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC5: Take Quiz**

### 1.1 Brief Description
This use case allows a Learner to complete a quiz as part of a specific lesson to assess their understanding of the studied material. The use case accommodates various question formats, specifically Multiple Choice (UC6) and Fill in the Blank (UC7). Upon submission, the system evaluates the answers and triggers the result display process.

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The Learner selects the "Start Quiz" action from the lesson interface (originating from UC3: Study Lesson).
2. The system initializes the quiz session and retrieves the set of questions associated with the current lesson.
3. The system presents the quiz interface to the Learner, rendering specific question types:
   * **Multiple Choice (UC6):** System displays a question with predefined options. Learner selects one or more correct options.
   * **Fill in the Blank (UC7):** System displays text with missing words. Learner types the corresponding text into the input fields.
4. The Learner navigates through the questions, providing answers.
5. The Learner selects the "Submit Quiz" action.
6. The system validates that all required questions have been answered.
7. The system records the submitted answers, evaluates them against the correct keys, and calculates the final score.
8. The system transitions the Learner to **UC8: View Quiz Result** (*<<include>> relationship*).

### 2.2 Alternative Flows

#### 2.2.1 Incomplete Quiz Submission
If, at step 6 of the Basic Flow, the system detects that the Learner has left one or more questions unanswered:
1. The system displays a warning message indicating which questions are incomplete.
2. The system prompts the Learner to either "Return to Quiz" or "Submit Anyway".
3. If the Learner selects "Return to Quiz", the system returns to step 4 of the Basic Flow.
4. If the Learner selects "Submit Anyway", the system marks unanswered questions as incorrect and proceeds to step 7 of the Basic Flow.

#### 2.2.2 Session Timeout / Connectivity Loss
If the Learner's connection drops or the session times out before step 5 of the Basic Flow:
1. The system attempts to auto-save the Learner's current progress locally or to the server.
2. Upon reconnection, the system prompts the Learner to resume the quiz from the last saved state.
3. The flow resumes at step 4 of the Basic Flow.

---

## 3. Special Requirements

### 3.1 Performance Requirement
The system must retrieve and render the quiz questions within 2 seconds of the Learner initiating the quiz to ensure a seamless learning experience.

### 3.2 Usability Requirement
The quiz interface must visually indicate the Learner's progress (e.g., 5/10 questions answered) and allow for easy navigation between previous and next questions before final submission.

---

## 4. Preconditions

### 4.1 Lesson Context
The Learner must be logged into the Self-Study Dashboard, actively engaged in a lesson (UC3: Study Lesson), and ideally have completed studying the required theory (UC4: Study Theory) before accessing the quiz.

---

## 5. Postconditions

### 5.1 State Update
The Learner's quiz attempts, submitted answers, and calculated score are successfully saved in the system's database. The system is now ready to execute UC8 (View Quiz Result).

---

## 6. Extension Points

### 6.1 None
There are no explicit extension points for this specific use case (Note: UC8 extends to UC9, but UC5 strictly includes UC8).