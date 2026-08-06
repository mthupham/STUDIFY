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


