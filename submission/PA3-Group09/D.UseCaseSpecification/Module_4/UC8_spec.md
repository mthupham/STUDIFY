# STUDIFY
## Use-Case Specification: Write Explanation

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Write Explanation Use-Case Specification | `Group 09` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [User Leaves Explanation Empty](#221-user-leaves-explanation-empty)
      2. [User Formats the Explanation with Rich Text](#222-user-formats-the-explanation-with-rich-text)
      3. [User Exceeds Maximum Character Limit](#223-user-exceeds-maximum-character-limit)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the process by which a User writes the explanation (back side content) for a flashcard. The explanation is the information that will be revealed when the User flips a card during a study session (UC9 – Flip Card to View Explanation). It is a mandatory step included in the flashcard creation process (UC5 – Create Flashcard) and its specializations (UC1 – Enter Flashcard Manually, UC2 – Create Flashcard from Highlighted Text). The explanation may consist of a definition, translation, sample sentence, grammatical note, or any other descriptive content the User finds helpful for learning the associated term.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User focuses on or is directed to the **Explanation** field within the flashcard creation or editing interface.

1. The system displays the flashcard form with the **Explanation** text area clearly labeled (e.g., "Explanation / Back of Card").

2. The User clicks on or tabs to the **Explanation** text area.

3. The system activates the text area, showing a cursor and a placeholder prompt such as: "Enter a definition, translation, example sentence, or note…"

4. The User types the explanation content for the flashcard term. This may include:
   - A dictionary definition.
   - A translation into the User's native language.
   - One or more example sentences using the term.
   - Grammatical notes (e.g., part of speech, irregular forms).
   - Mnemonics or personal notes to aid memorization.

5. As the User types, the system displays a live character count indicator (e.g., "142 / 1000 characters").

6. The User reviews and finalizes the explanation text.

7. The use case ends. The written explanation is retained in the form and will be saved when the parent use case (UC5 – Create Flashcard) completes its save step.

---

### 2.2 Alternative Flows

#### 2.2.1 User Leaves Explanation Empty

This alternative flow occurs when the User tries to save the flashcard without providing an explanation.

1. The User leaves the **Explanation** field blank and clicks **Save** (via the parent use case).
2. The parent use case (UC5) performs validation and detects the empty Explanation field.
3. The system highlights the Explanation field with a red border and displays an inline error message: "Explanation is required."
4. The form remains open with all other entered data preserved.
5. The flow returns to Step 2 of the Basic Flow, prompting the User to fill in the Explanation.

#### 2.2.2 User Formats the Explanation with Rich Text

This alternative flow occurs when the User wishes to apply basic text formatting to the explanation content.

1. The User selects text they have already typed in the Explanation field.
2. The system displays a minimal formatting toolbar or supports markdown-style shortcuts, offering options such as:
   - **Bold** (Ctrl+B or `**text**`)
   - *Italic* (Ctrl+I or `*text*`)
   - Underline (Ctrl+U)
   - Bullet list
3. The User applies the desired formatting.
4. The system renders the formatted text in a preview area or applies the formatting directly within the text area (WYSIWYG mode).
5. The flow resumes at Step 5 of the Basic Flow.

#### 2.2.3 User Exceeds Maximum Character Limit

This alternative flow occurs when the User's explanation content exceeds the allowed maximum length.

1. The User types content that causes the character count to reach the maximum limit (e.g., 1000 characters).
2. The system prevents further text input beyond the limit.
3. The character count indicator changes to a warning style (e.g., turns red): "1000 / 1000 characters – maximum reached."
4. The User must shorten the explanation to proceed.
5. The flow resumes at Step 5 of the Basic Flow once the character count is below the limit.

---

## 3. Special Requirements

### 3.1 Usability Requirements

- The **Explanation** text area must be large enough to display several lines of text without requiring constant scrolling, and must be resizable or auto-expanding.
- The placeholder text must clearly guide the User on the types of content acceptable in the explanation field.
- The live character count must be clearly visible and update in real time as the User types.

### 3.2 Content Flexibility Requirements

- The Explanation field must accept a wide variety of content types including plain text, translations, definitions, example sentences, grammatical annotations, and phonetic transcriptions.
- The field must preserve line breaks and support multi-paragraph input.
- The field must support Unicode characters, including characters from non-Latin scripts (e.g., Vietnamese diacritics, Kanji, Cyrillic).

### 3.3 Accessibility Requirements

- The Explanation text area must be keyboard-navigable and properly labeled for screen readers.
- Error messages related to the Explanation field must be programmatically associated with the field for accessibility tools.

---

## 4. Preconditions

### 4.1 Flashcard Creation Form is Active

- The flashcard creation or editing interface must be open and the Explanation field must be rendered.

### 4.2 Parent Use Case is Active

- This use case is only reachable from within the context of a parent use case: UC5 (Create Flashcard), UC1 (Enter Flashcard Manually), or UC2 (Create Flashcard from Highlighted Text).

### 4.3 Term Field is Provided

- While not a hard prerequisite for writing the explanation, the User is expected to have already provided or reviewed the **Term** field before focusing on the Explanation. The system should not block the User from writing the explanation first.

---

## 5. Postconditions

### 5.1 Explanation Written

After the use case is completed successfully:

- The explanation text is stored in the **Explanation** field of the flashcard form.
- The content will be persisted to the database when the parent use case (UC5 – Create Flashcard) completes the save operation.

### 5.2 Explanation Displayed During Study

Once saved, the explanation will be displayed on the back side of the flashcard during study sessions (UC9 – Flip Card to View Explanation), providing the User with the learning content associated with the term.

---

## 6. Extension Points

This use case has no extension points. It is a component included by the parent flashcard creation use cases (UC5, UC1, UC2) and does not itself extend or include other use cases.
