# STUDIFY
## Use-Case Specification: M4-UC1 Create Flashcard

**Version:** 2.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `06/08/2026` | `2.0` | Refactored and merged old UC1-UC5 into a single cohesive Use Case | `Thiên Phước` |

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the process by which a User creates a new flashcard within the STUDIFY application. The User can create a flashcard manually or from highlighted text. The User must provide a Term and an Explanation, and may optionally add Tags to categorize the flashcard.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User selects the option to create a new flashcard.

1. The system presents the User with the flashcard creation interface.
2. The User enters the **Term** in the designated input field.
3. The User enters the **Explanation** in the text area provided. The system enforces a character limit and provides a rich-text formatting toolbar.
4. (Optional) The User adds one or more **Tags**. As the User types, the system suggests existing tags via an autocomplete dropdown.
5. The User clicks the **Save** button.
6. The system validates that both the Term and Explanation fields are not empty.
7. The system saves the new flashcard and displays a success toast notification.
8. The use case ends.

### 2.2 Alternative Flows

#### 2.2.1 User Chooses to Create from Highlighted Text
1. Instead of clicking the standard create button, the User highlights text in a study document.
2. A contextual tooltip appears with an "Add to Flashcard" icon.
3. The User clicks the icon.
4. The system opens the flashcard creation form with the **Term** pre-filled using the highlighted text.
5. The flow resumes at Step 3 of the Basic Flow.

#### 2.2.2 Missing Required Fields (Validation Error)
1. At Step 6 of the Basic Flow, if the Term or Explanation is empty, the system highlights the missing fields in red.
2. The system displays an error message indicating that both fields are required.
3. The flow returns to Step 2 of the Basic Flow.

#### 2.2.3 User Cancels Flashcard Creation
1. At any point before saving, the User clicks **Cancel**.
2. If text has been entered, the system shows a confirmation dialog: "Discard unsaved changes?".
3. If the User confirms, the system discards the input and closes the form. The use case ends.

---

## 7. UI Prototype

### 7.1 Basic Flow - Main Form
![Flashcard Creation - Main Form](../../Images/module_4/UC1_main_form.png)

### 7.2 Basic Flow - Term Input
![Enter Manually - Term Input](../../Images/module_4/UC2_term_input.png)

### 7.3 Basic Flow - Explanation Input
![Write Explanation - Typing Active](../../Images/module_4/UC4_typing_active.png)

### 7.4 Basic Flow - Add Tags
![Add Tags - Autocomplete Dropdown](../../Images/module_4/UC5_autocomplete.png)
![Add Tags - Tags Applied](../../Images/module_4/UC5_tags_applied.png)

### 7.5 Alternative Flow 2.2.1 - Contextual Tooltip
![Highlight - Contextual Tooltip](../../Images/module_4/UC3_tooltip.png)
![Highlight - Pre-filled Panel](../../Images/module_4/UC3_prefilled_panel.png)

### 7.6 Alternative Flow 2.2.2 - Validation Error
![Flashcard Creation - Validation Error](../../Images/module_4/UC1_validation_error.png)

### 7.7 Alternative Flow 2.2.3 - Cancel Dialog
![Flashcard Creation - Cancel Dialog](../../Images/module_4/UC1_cancel_dialog.png)

---

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

---

## Use-Case Specification: M4-UC3 Use Pomodoro Timer

**Version:** 2.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `06/08/2026` | `2.0` | Renamed ID to M4-UC3 | `Thiên Phước` |

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes how a User utilizes the Pomodoro Timer built into the STUDIFY application to manage their study sessions. It includes starting focus sessions, taking short or long breaks, and customizing timer intervals.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User opens the Pomodoro Timer widget.

1. The system displays the Pomodoro Timer interface with the default Focus duration (e.g., 25:00) and a Start button.
2. The User clicks **Start**.
3. The system begins the countdown.
4. When the Focus countdown reaches 00:00, the system plays an alert and automatically transitions to the **Short Break** phase (e.g., 5:00).
5. The system begins the Short Break countdown.
6. When the Short Break countdown reaches 00:00, the system transitions back to the Focus phase.
7. After the configured number of Pomodoros (e.g., 4), the system transitions to a **Long Break** phase (e.g., 15:00) instead of a Short Break.
8. The use case ends when the User closes the timer.

### 2.2 Alternative Flows

#### 2.2.1 User Pauses the Timer
1. While running, the User clicks **Pause**.
2. The system halts the countdown.
3. The User clicks **Resume** to restart.

#### 2.2.2 User Resets the Timer
1. The User clicks the **Reset** button.
2. A confirmation dialog appears.
3. If confirmed, the timer resets to its full duration for the current phase.

#### 2.2.3 User Customizes Timer Settings
1. The User clicks the **Settings** icon.
2. The system displays a panel where the User adjusts Focus Duration, Break Duration, etc.
3. The User clicks **Save**, and the new settings take effect immediately for the next phase.

#### 2.2.4 User Skips a Break
1. During a Break phase, the User clicks **Skip Break**.
2. The system immediately ends the break and transitions to the next Focus phase.

---

## 7. UI Prototype

### 7.1 Basic Flow - Focus Running
![Pomodoro - Focus Running](../../Images/module_4/UC10_focus_running.png)

### 7.2 Basic Flow - Short Break
![Pomodoro - Short Break](../../Images/module_4/UC10_short_break.png)

### 7.3 Basic Flow - Long Break
![Pomodoro - Long Break](../../Images/module_4/UC10_long_break.png)

### 7.4 Alternative Flow 2.2.1 - Paused
![Pomodoro - Paused](../../Images/module_4/UC10_paused.png)

### 7.5 Alternative Flow 2.2.2 - Reset Dialog
![Pomodoro - Reset Dialog](../../Images/module_4/UC10_reset_dialog.png)

### 7.6 Alternative Flow 2.2.3 - Settings Panel
![Pomodoro - Settings Panel](../../Images/module_4/UC10_settings_panel.png)

### 7.7 Alternative Flow 2.2.4 - Skip Break
![Pomodoro - Skip Break](../../Images/module_4/UC10_skip_break.png)
