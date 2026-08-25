# STUDIFY
## Use-Case Specification: Filter Flashcards by Tag

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Filter Flashcards by Tag Use-Case Specification | `Thiên Phước` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [No Flashcards Match the Selected Tag(s)](#221-no-flashcards-match-the-selected-tags)
      2. [User Clears All Filters](#222-user-clears-all-filters)
      3. [User Applies Multiple Tags](#223-user-applies-multiple-tags)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the process by which a User filters their personal flashcard collection by selecting one or more tags. When a tag filter is applied, the system narrows the displayed flashcard list to show only flashcards that are associated with the selected tag(s). This allows the User to study or review a targeted subset of their cards, such as all cards tagged "IELTS Vocabulary" or "lesson-5". This use case extends UC7 (Study Flashcards).

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User accesses the flashcard collection interface or the study session setup screen and activates the tag filter feature.

1. The system displays the flashcard collection or study session interface, including a **Tag Filter** component (e.g., a multi-select dropdown, sidebar tag list, or filter bar).

2. The system populates the Tag Filter component with all tags that exist in the User's personal tag library, ordered alphabetically.

3. The User clicks on the Tag Filter component to expand it and view the available tags.

4. The User selects one tag from the list.

5. The system immediately filters the displayed flashcard list, showing only flashcards that have the selected tag associated with them.

6. The system displays a visual indicator of the active filter (e.g., a highlighted tag chip in the filter bar with the tag name).

7. The system displays the count of matching flashcards (e.g., "Showing 12 of 45 flashcards").

8. The User reviews the filtered flashcard list.

9. The use case ends successfully. The filtered view remains active until the User clears the filter or navigates away.

---

### 2.2 Alternative Flows

#### 2.2.1 No Flashcards Match the Selected Tag(s)

This alternative flow occurs when the applied tag filter returns no results.

1. The User selects a tag from the filter.
2. The system applies the filter and finds no flashcards associated with the selected tag.
3. The system displays an empty state message, such as: "No flashcards found for the selected tag(s). Try selecting a different tag or create new flashcards."
4. The Tag Filter component remains visible, allowing the User to change their selection.
5. The flow returns to Step 4 of the Basic Flow.

#### 2.2.2 User Clears All Filters

This alternative flow occurs when the User wants to remove all active tag filters and return to the full flashcard list.

1. At any point while a tag filter is active, the User clicks the **"Clear Filters"** button or deselects all active tags.
2. The system removes all active tag filters.
3. The system displays the complete, unfiltered flashcard list.
4. The visual indicators of active filters are removed from the UI.
5. The use case ends, returning the User to the default unfiltered view.

#### 2.2.3 User Applies Multiple Tags

This alternative flow occurs when the User selects more than one tag to filter by.

1. After selecting an initial tag (Step 4 of the Basic Flow), the User clicks on additional tags in the Tag Filter component.
2. The system applies all selected tags simultaneously using a logical **AND** or **OR** operator, as configured:
   - **Default behavior (AND):** Only flashcards that contain ALL of the selected tags are displayed.
   - **Alternative behavior (OR):** Flashcards that contain ANY of the selected tags are displayed. The User may toggle between AND/OR filter logic via a control in the filter panel.
3. The system updates the flashcard list to reflect the combined filter.
4. The system updates the active filter indicator to show all selected tag chips.
5. The system updates the displayed count accordingly.
6. The flow resumes at Step 8 of the Basic Flow.

---

## 3. Special Requirements

### 3.1 Usability Requirements

- The Tag Filter component must be persistently visible and accessible without requiring the User to navigate away from the current page.
- Active filter tags must be clearly indicated with a distinct visual style (e.g., highlighted/filled chip) compared to inactive tags.
- The filter must update the flashcard list in real time without requiring a page reload.

### 3.2 Performance Requirements

- Tag filter results must be rendered within 500 milliseconds of the User selecting a tag, even for large flashcard collections.
- The tag list in the filter component must load within 300 milliseconds.

### 3.3 Persistence Requirements

- The active tag filter state must persist during the current session. If the User navigates to another section and returns to the flashcard list, the active filter should be restored.
- Tag filters are not persisted across sessions (a fresh login resets filters to unfiltered).

---

## 4. Preconditions

### 4.1 User Authentication

- The User must be authenticated (logged in) to the STUDIFY system.

### 4.2 Flashcard Collection is Non-Empty

- The User must have at least one flashcard in their personal collection to access the flashcard interface.

### 4.3 Tags Exist in the User's Tag Library

- The User must have at least one tag previously created and assigned to flashcards (via UC5 – Add Tags) for the filter component to display available tags.

---

## 5. Postconditions

### 5.1 Filter Applied

After the use case is completed successfully:

- The flashcard list is filtered to display only flashcards that match the selected tag(s).
- The active tag filter is visually indicated in the UI.
- The User can interact with (study, edit, delete) any flashcard visible in the filtered list.

### 5.2 Filter Cleared

If the User clears the filter:

- The complete, unfiltered flashcard list is restored.
- All tag filter indicators are removed from the UI.

---

## 6. Extension Points

### 6.1 Study Flashcards

This use case extends UC7 (Study Flashcards). The filtered set of flashcards produced by this use case can be used as the input deck for a study session, allowing the User to study only the cards matching their selected tag(s).

---

## 7. UI Prototype

### 7.1 Basic Flow — Flashcard Collection with Tag Filter Bar
*Shows the full unfiltered flashcard list with the Tag Filter component visible.*
![Filter by Tag - Full List](../../images/module_4/UC6_full_list.png)

### 7.2 Basic Flow — Tag Filter Dropdown Expanded
*Shows the filter dropdown open and displaying the User's full tag library.*
![Filter by Tag - Dropdown Open](../../images/module_4/UC6_dropdown_open.png)

### 7.3 Basic Flow — Filtered Results (Active Tag Chip + Result Count)
*Shows the narrowed flashcard list with an active tag chip and "Showing X of Y cards" count.*
![Filter by Tag - Filtered Results](../../images/module_4/UC6_filtered_results.png)

### 7.4 Alternative Flow 2.2.1 — No Results (Empty State)
*Shows the empty state message when no flashcards match the selected tag.*
![Filter by Tag - No Results](../../images/module_4/UC6_no_results.png)

### 7.5 Alternative Flow 2.2.3 — Multiple Tags Applied
*Shows multiple active tag chips in the filter bar and the resulting filtered card list.*
![Filter by Tag - Multiple Tags](../../images/module_4/UC6_multiple_tags.png)
