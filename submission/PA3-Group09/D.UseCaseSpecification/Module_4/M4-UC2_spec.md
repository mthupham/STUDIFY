# STUDIFY
## Use-Case Specification: M4-UC2 Study Flashcards

**Version:** 2.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `06/08/2026` | `2.0` | Refactored and merged old UC6-UC9 into a single cohesive Use Case | `Thiên Phước` |

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes how a User conducts a flashcard study session. The User views flashcards one by one, flips them to read the explanation, and marks their study status (e.g., Know, Don't Know) to track progress. The User may also filter flashcards by tags before starting.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User navigates to the Study Flashcards section.

1. The system displays the Study Session setup screen.
2. The User initiates the study session without applying any filters.
3. The system displays the first flashcard, showing the **Term** prominently on the front face.
4. The User clicks the **Flip** button or taps the card.
5. The system reveals the back side, displaying the **Explanation**.
6. The system presents study status buttons (e.g., "Know", "Don't Know", "Review Later").
7. The User selects a study status.
8. The system records the status and automatically loads the next flashcard.
9. Steps 3-8 are repeated until all flashcards in the deck have been reviewed.
10. The system displays a session summary. The use case ends.

### 2.2 Alternative Flows

#### 2.2.1 Filter Flashcards by Tag
1. At Step 1 of the Basic Flow, the User clicks the **Filter by Tag** dropdown.
2. The system displays a list of available tags.
3. The User selects one or more tags.
4. The system filters the flashcard deck to include only the matching cards.
5. The flow resumes at Step 2 of the Basic Flow.

#### 2.2.2 Undo Status Marking
1. At Step 8 of the Basic Flow, a temporary "Undo" toast appears for a few seconds.
2. If the User realizes they made a mistake, they click **Undo**.
3. The system reverts to the previous flashcard and removes the recorded status.
4. The flow resumes at Step 6 of the Basic Flow.

---

## 7. UI Prototype

### 7.1 Basic Flow - Setup Screen
![Study Flashcards - Setup](../../Images/module_4/UC7_setup.png)

### 7.2 Basic Flow - Card Front
![Study Flashcards - Card Front](../../Images/module_4/UC7_card_front.png)

### 7.3 Basic Flow - Card Back
![Study Flashcards - Card Back](../../Images/module_4/UC7_card_back.png)

### 7.4 Basic Flow - Status Buttons
![Mark Status - Status Buttons](../../Images/module_4/UC9_status_buttons.png)

### 7.5 Basic Flow - Session Summary
![Study Flashcards - Session Summary](../../Images/module_4/UC7_session_summary.png)

### 7.6 Alternative Flow 2.2.1 - Tag Filter Dropdown
![Filter by Tag - Dropdown Open](../../Images/module_4/UC6_dropdown_open.png)

### 7.7 Alternative Flow 2.2.2 - Undo Toast
![Mark Status - Undo Toast](../../Images/module_4/UC9_undo_toast.png)


