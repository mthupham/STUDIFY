# STUDIFY
## Use-Case Specification: Add Tags

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Add Tags Use-Case Specification | `Group 09` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [Tag Already Assigned to Flashcard](#221-tag-already-assigned-to-flashcard)
      2. [Creating a New Tag](#222-creating-a-new-tag)
      3. [User Removes a Tag](#223-user-removes-a-tag)
      4. [Tag Name Exceeds Maximum Length](#224-tag-name-exceeds-maximum-length)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the process by which a User adds one or more tags to a flashcard. Tags are short, descriptive labels (e.g., "grammar", "IELTS", "verbs", "lesson-3") that allow the User to categorize and organize flashcards for easier retrieval and filtering. This use case is triggered during flashcard creation (UC1 – Enter Flashcard Manually, UC2 – Create Flashcard from Highlighted Text, UC5 – Create Flashcard) or when editing an existing flashcard. It extends those use cases.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User interacts with the tag input component on the flashcard creation or editing interface.

1. The system displays the tag input component on the flashcard form. The component shows a text input field and, if the User has previously created tags, a list of suggested existing tags.

2. The User clicks on the tag input field and begins typing a tag name.

3. The system performs a real-time search against the User's existing tag library and displays a dropdown list of matching tags as suggestions.

4. The User selects a tag from the suggestion dropdown list.

5. The system attaches the selected tag to the current flashcard and displays it as a tag chip/badge within the tag input area.

6. The User may repeat Steps 2–5 to add additional tags.

7. When the User is satisfied with the assigned tags, they proceed with saving the flashcard (via the parent use case – UC5 Create Flashcard).

8. The system saves the flashcard along with all associated tags.

9. The use case ends successfully.

---

### 2.2 Alternative Flows

#### 2.2.1 Tag Already Assigned to Flashcard

This alternative flow occurs when the User attempts to add a tag that is already assigned to the current flashcard.

1. The User types a tag name or selects from the dropdown.
2. The system detects that the selected tag is already associated with the current flashcard.
3. The system does not add a duplicate tag and displays a subtle notification (e.g., "This tag is already added").
4. The tag input field is cleared and ready for a new entry.
5. The flow returns to Step 2 of the Basic Flow.

#### 2.2.2 Creating a New Tag

This alternative flow occurs when the User types a tag name that does not exist in their tag library.

1. The User types a tag name in the tag input field.
2. The system performs a search and finds no matching existing tags.
3. The system displays an option in the dropdown such as: **'Create new tag: "[typed name]"'**.
4. The User selects this option.
5. The system creates a new tag with the typed name, adds it to the User's personal tag library, and immediately attaches it to the current flashcard.
6. The new tag appears as a tag chip/badge on the flashcard form.
7. The flow returns to Step 6 of the Basic Flow.

#### 2.2.3 User Removes a Tag

This alternative flow occurs when the User wants to remove a tag that has already been added to the current flashcard form.

1. The User clicks the **"×"** (remove) button on a tag chip/badge displayed in the tag input area.
2. The system removes the tag from the current flashcard's tag list.
3. The tag chip/badge disappears from the tag input area.
4. The tag is NOT deleted from the User's global tag library; it is only disassociated from this flashcard.
5. The flow returns to Step 6 of the Basic Flow (if the User continues editing tags).

#### 2.2.4 Tag Name Exceeds Maximum Length

This alternative flow occurs when the User types a tag name that is too long.

1. The User types a tag name that exceeds the maximum allowed character limit (e.g., 50 characters).
2. The system prevents further input beyond the character limit.
3. The system displays an inline warning: "Tag name must not exceed 50 characters."
4. The User shortens the tag name.
5. The flow returns to Step 3 of the Basic Flow.

---

## 3. Special Requirements

### 3.1 Usability Requirements

- The tag input component must support a typeahead/autocomplete mechanism that filters existing tags in real time as the User types.
- Tags must be displayed as visually distinct chips/badges within the input area, with a clear remove button on each chip.
- The tag input must accept tag creation on pressing the **Enter** key or **comma** key in addition to clicking the dropdown option.

### 3.2 Performance Requirements

- Tag suggestions must appear within 200 milliseconds of the User beginning to type.
- Tag assignment and removal actions must be reflected in the UI instantly (optimistic update).

### 3.3 Data Consistency Requirements

- Tag names must be case-insensitive for duplicate detection (e.g., "Grammar" and "grammar" are treated as the same tag).
- Tags are personal to each User; one User's tags are not shared with or visible to other Users.

### 3.4 Scalability Requirements

- The system must support Users with large tag libraries (e.g., 500+ tags) without degrading the autocomplete performance.

---

## 4. Preconditions

### 4.1 User Authentication

- The User must be authenticated (logged in) to the STUDIFY system.

### 4.2 Flashcard Form is Active

- The User must be on the flashcard creation or editing interface where the tag input component is displayed.

### 4.3 Parent Use Case is Active

- This use case is only reachable from within the context of a parent use case: UC1 (Enter Flashcard Manually), UC2 (Create Flashcard from Highlighted Text), or UC5 (Create Flashcard).

---

## 5. Postconditions

### 5.1 Tags Successfully Assigned

After the use case is completed successfully:

- The selected tag(s) are associated with the flashcard.
- Any newly created tags are added to the User's personal tag library.
- The tag associations are persisted when the parent flashcard is saved.

### 5.2 No Tags Added

If the User skips the tag input:

- The flashcard is saved with no tags assigned.
- The User's existing tag library remains unchanged.

### 5.3 Tag Removed

If the User removes a previously added tag:

- The tag is no longer associated with the current flashcard.
- The tag continues to exist in the User's personal tag library for future use.

---

## 6. Extension Points

### 6.1 Filter Flashcards by Tag

Tags created and assigned in this use case are subsequently used in UC4 (Filter Flashcards by Tag), where the User can filter their flashcard collection by one or more tags.
