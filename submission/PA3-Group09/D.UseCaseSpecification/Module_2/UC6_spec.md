# Self-Study Dashboard
## Use-Case Specification: UC6 - Multiple Choice

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial draft for UC6: Multiple Choice | System Analyst |`Lê Kim Hằng` |

---

### Table of Contents

- [Self-Study Dashboard](#self-study-dashboard)
  - [Use-Case Specification: UC6 - Multiple Choice](#use-case-specification-uc6---multiple-choice)
    - [Revision History](#revision-history)
    - [Table of Contents](#table-of-contents)
  - [1. Use-Case Name](#1-use-case-name)
    - [1.1 Brief Description](#11-brief-description)
  - [2. Flow of Events](#2-flow-of-events)
    - [2.1 Basic Flow](#21-basic-flow)
    - [2.2 Alternative Flows](#22-alternative-flows)
      - [2.2.1 Changing Selection](#221-changing-selection)
      - [2.2.2 Maximum Selection Limit Reached (Multiple Answers)](#222-maximum-selection-limit-reached-multiple-answers)
  - [3. Special Requirements](#3-special-requirements)
    - [3.1 Accessibility Requirement](#31-accessibility-requirement)
    - [3.2 Visual Distinction](#32-visual-distinction)
  - [4. Preconditions](#4-preconditions)
    - [4.1 Question Instantiation](#41-question-instantiation)
  - [5. Postconditions](#5-postconditions)
    - [5.1 Answer Recorded](#51-answer-recorded)
  - [6. Extension Points](#6-extension-points)
    - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC6: Multiple Choice**

### 1.1 Brief Description
This use case describes the specific interaction when a Learner encounters a Multiple Choice question during a quiz. As a specialization (generalization relationship) of UC5: Take Quiz, it details how the system presents a question with predefined options and how the Learner selects their intended answer(s). It supports both single-correct-answer (radio buttons) and multiple-correct-answer (checkboxes) formats.

![Multiple Choice Question Screen](../../Images/Module_2/UC6.png)

*Figure 6.1: Multiple Choice question (single-answer, radio button format) showing four answer options with a "Check Answer" action.*

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The use case begins when the quiz engine (UC5) loads a question designated as the "Multiple Choice" type.
2. The system displays the question prompt text and/or media (images, audio).
3. The system displays a list of predefined answer options below the prompt.
   * If the question allows only **one** correct answer, the options are presented as mutually exclusive radio buttons.
   * If the question allows **multiple** correct answers, the options are presented as independent checkboxes.
4. The Learner selects their desired option(s) by clicking or tapping on them.
5. The system visually highlights the selected option(s) to confirm the input.
6. The system temporarily stores the Learner's selection in the active quiz session.
7. The use case ends when the Learner navigates to another question or proceeds to submit the quiz (returning control to UC5).

### 2.2 Alternative Flows

#### 2.2.1 Changing Selection
If the Learner changes their mind before navigating away or submitting:
1. **Single-answer format:** The Learner selects a different radio button. The system automatically deselects the previously chosen option and highlights the new one.
2. **Multiple-answer format:** The Learner clicks an already selected checkbox to deselect it, or clicks unselected checkboxes to add to their choices. The system updates the visual state and session storage accordingly.

#### 2.2.2 Maximum Selection Limit Reached (Multiple Answers)
If a multiple-answer question has a predefined maximum number of allowed selections (e.g., "Select the 2 correct statements"):
1. The Learner selects the maximum allowed number of options.
2. If the Learner attempts to select an additional option, the system ignores the input and briefly displays a tooltip or message stating, "You can only select up to [X] options."
3. The Learner must deselect a currently chosen option before selecting a new one.

---

## 3. Special Requirements

### 3.1 Accessibility Requirement
The multiple-choice interface must be fully navigable using a keyboard (e.g., using `Tab` to move between options and `Space` to select/deselect). The options must also be readable by standard screen readers.

### 3.2 Visual Distinction
The user interface must clearly differentiate between single-answer questions (using standard circular radio buttons) and multiple-answer questions (using standard square checkboxes) so the Learner immediately understands the expected interaction.

---

## 4. Preconditions

### 4.1 Question Instantiation
The Learner must be actively executing UC5 (Take Quiz), and the system must have successfully retrieved a question payload from the database explicitly flagged as a "Multiple Choice" type.

---

## 5. Postconditions

### 5.1 Answer Recorded
The state of the system is updated to reflect the Learner's selected options for this specific question within the temporary quiz session memory. The system is ready to evaluate these answers once the overall quiz is submitted in UC5.

---

## 6. Extension Points

### 6.1 None
There are no extension points for this specific use case.