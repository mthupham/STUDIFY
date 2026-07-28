# STUDIFY
## Use-Case Specification: Create Flashcard

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Create Flashcard Use-Case Specification | `Thiên Phước` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [User Chooses Manual Entry](#221-user-chooses-manual-entry)
      2. [User Chooses to Create from Highlighted Text](#222-user-chooses-to-create-from-highlighted-text)
      3. [Missing Required Fields](#223-missing-required-fields)
      4. [User Cancels Flashcard Creation](#224-user-cancels-flashcard-creation)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the general process by which a User creates a new flashcard within the STUDIFY application. It serves as the core (base) use case for flashcard creation, encompassing the two primary creation methods: **manual entry** (UC2 – Enter Flashcard Manually) and **creation from highlighted text** (UC3 – Create Flashcard from Highlighted Text). Regardless of method, every flashcard consists of a **Term** (front side) and an **Explanation** (back side), and may optionally be assigned **Tags** (UC5 – Add Tags). The Create Flashcard use case includes UC4 (Write Explanation) as a mandatory step.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User selects the option to create a new flashcard from any accessible entry point in the application (e.g., the "+" button in the flashcard collection, the toolbar shortcut, or the contextual popup on highlighted text).

1. The system identifies that the User wishes to create a new flashcard.

2. The system presents the User with the flashcard creation interface. The interface includes:
   - A **Term** field (required) – the front face of the flashcard.
   - An **Explanation** field (required) – the back face of the flashcard.
   - A **Tags** input component (optional) – for organizing the flashcard.

3. The User provides the **Term** for the flashcard (via manual input or auto-population from highlighted text).

4. The User provides the **Explanation** for the flashcard (refer to UC4 – Write Explanation). This is a mandatory included use case.

5. Optionally, the User adds one or more tags to the flashcard (refer to UC5 – Add Tags). This is an extending use case triggered at the User's discretion.

6. The User clicks the **Save** button to confirm creation.

7. The system validates that both the **Term** and **Explanation** fields are non-empty.

8. The system creates and persists the new flashcard record in the database, associated with the authenticated User's account.

9. The system associates any provided tags with the new flashcard.

10. The system displays a success notification (e.g., "Flashcard created successfully!").

11. The use case ends successfully. The new flashcard is immediately available in the User's flashcard collection.

---

### 2.2 Alternative Flows

#### 2.2.1 User Chooses Manual Entry

This alternative flow describes how the User creates a flashcard by manually typing both the Term and Explanation. This delegates to the full specification in UC2 (Enter Flashcard Manually).

1. The User selects the **"Add Manually"** creation mode from the flashcard creation interface.
2. The system presents the empty term and explanation fields.
3. The User manually types the term and explanation.
4. The flow resumes at Step 5 of the Basic Flow.

#### 2.2.2 User Chooses to Create from Highlighted Text

This alternative flow describes how the User creates a flashcard by highlighting text in the application. This delegates to the full specification in UC3 (Create Flashcard from Highlighted Text).

1. The User selects text within the application and chooses the **"Create Flashcard"** contextual option.
2. The system opens the flashcard creation panel with the **Term** field pre-populated with the selected text.
3. The User reviews the pre-populated term and fills in the Explanation.
4. The flow resumes at Step 5 of the Basic Flow.

#### 2.2.3 Missing Required Fields

This alternative flow occurs when the User attempts to save the flashcard without completing one or both required fields.

1. The User clicks **Save** with the Term or Explanation field (or both) empty.
2. The system highlights the empty field(s) in red and displays inline error messages.
3. The form remains open with previously entered data preserved.
4. The flow returns to Step 3 or Step 4 of the Basic Flow.

#### 2.2.4 User Cancels Flashcard Creation

This alternative flow occurs when the User decides not to proceed with creating the flashcard.

1. The User clicks the **Cancel** button or closes the creation panel at any point before saving.
2. The system prompts: "Are you sure you want to discard this flashcard?"
3. If confirmed, the system discards all entered data and closes the creation interface.
4. If not confirmed, the system returns the User to the creation form with data preserved.
5. The use case ends without creating a flashcard.

---

## 3. Special Requirements

### 3.1 Usability Requirements

- The flashcard creation interface must be accessible from multiple entry points in the application (e.g., the navigation bar, the flashcard collection page, and contextual menus within content pages).
- The creation form must be clean, uncluttered, and focused on the three primary elements: Term, Explanation, and Tags.
- A character count indicator should be displayed for both the Term and Explanation fields.

### 3.2 Performance Requirements

- The flashcard creation interface must render within 500 milliseconds.
- Flashcard save operations must complete and confirm within 1 second under normal network conditions.

### 3.3 Data Integrity Requirements

- Saved flashcards must be immediately consistent across all views (e.g., the collection page, study session, and search results).
- The system must ensure no data loss occurs if a network interruption happens during save. The system should queue and retry the save operation.

### 3.4 Accessibility Requirements

- All form fields must be properly labeled for screen reader compatibility.
- Keyboard navigation must be fully supported throughout the creation form.

---

## 4. Preconditions

### 4.1 User Authentication

- The User must be authenticated (logged in) to the STUDIFY system.

### 4.2 Flashcard Module Availability

- The flashcard creation module must be operational and accessible to the User.

---

## 5. Postconditions

### 5.1 Successful Flashcard Creation

After the use case is completed successfully:

- A new flashcard record is created and durably stored in the system.
- The flashcard is associated with the authenticated User's account.
- The flashcard's Term and Explanation are stored as provided by the User.
- Any assigned tags are associated with the flashcard and reflected in the User's tag library.
- The flashcard is immediately visible and available in the User's collection, study sessions, and search results.

### 5.2 Cancelled Creation

If the User cancels:

- No new flashcard is created.
- The User's flashcard collection and tag library remain unchanged.

---

## 6. Extension Points

### 6.1 Add Tags

This use case is extended by UC5 (Add Tags) when, during Step 5 of the Basic Flow, the User chooses to assign tags to the flashcard being created.

### 6.2 Write Explanation

This use case includes UC4 (Write Explanation) as a mandatory step (Step 4 of the Basic Flow). The User must provide an explanation for the flashcard term before saving.

### 6.3 Enter Flashcard Manually

UC2 (Enter Flashcard Manually) is a specialization of this use case, triggered when the User chooses to type the Term directly.

### 6.4 Create Flashcard from Highlighted Text

UC3 (Create Flashcard from Highlighted Text) is a specialization of this use case, triggered when the User highlights text in the application to auto-populate the Term field.

---

## 7. UI Prototype

### 7.1 Basic Flow — Flashcard Creation Form (Main Screen)
*Shows the full creation form with Term field, Explanation text area, Tags input, and Save/Cancel buttons.*
![Flashcard Creation - Main Form](../../images/module_4/UC1_main_form.png)

### 7.2 Basic Flow — Mode Selection Screen
*Shows the two creation modes: "Add Manually" vs "Create from Highlighted Text".*
![Flashcard Creation - Mode Selection](../../images/module_4/UC1_mode_selection.png)

### 7.3 Alternative Flow 2.2.3 — Validation Error State (Missing Fields)
*Shows inline red error indicators when Term or Explanation is left empty upon submission.*
![Flashcard Creation - Validation Error](../../images/module_4/UC1_validation_error.png)

### 7.4 Alternative Flow 2.2.4 — Cancel Confirmation Dialog
*Shows the confirmation modal when the User attempts to discard an unsaved flashcard.*
![Flashcard Creation - Cancel Dialog](../../images/module_4/UC1_cancel_dialog.png)

### 7.5 Success State — Flashcard Saved Notification
*Shows the success toast/notification after the flashcard is saved successfully.*
![Flashcard Creation - Success Toast](../../images/module_4/UC1_success_toast.png)
