# STUDIFY
## Use-Case Specification: Flip Card to View Explanation

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/07/2026` | `1.0` | Initial version of Flip Card to View Explanation Use-Case Specification | `Thiên Phước` |

---

### Table of Contents

1. [Use-Case Name](#1-use-case-name)
   1. [Brief Description](#11-brief-description)
2. [Flow of Events](#2-flow-of-events)
   1. [Basic Flow](#21-basic-flow)
   2. [Alternative Flows](#22-alternative-flows)
      1. [Explanation Content is Empty](#221-explanation-content-is-empty)
      2. [User Flips Back to the Term Side](#222-user-flips-back-to-the-term-side)
      3. [User Uses Keyboard to Flip the Card](#223-user-uses-keyboard-to-flip-the-card)
3. [Special Requirements](#3-special-requirements)
4. [Preconditions](#4-preconditions)
5. [Postconditions](#5-postconditions)
6. [Extension Points](#6-extension-points)

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes the interaction by which a User flips a flashcard during a study session to reveal the **Explanation** (back side) after having viewed the **Term** (front side). This is a core interaction in the flashcard study experience. It simulates the physical act of turning over a traditional paper flashcard to check one's answer or review the associated definition, translation, or note. This use case is included by UC7 (Study Flashcards) and is triggered for every card presented during a session.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the system displays a flashcard with the **Term** visible on the front side during an active study session (UC7 – Study Flashcards).

1. The system displays the flashcard in its **front state**, showing:
   - The **Term** prominently in the center of the card.
   - A **"Flip"** button (or a tappable/clickable card surface) inviting the User to reveal the back.
   - A visual hint text such as "Click to reveal explanation."

2. The User clicks the **"Flip"** button or clicks/taps the card surface.

3. The system plays a flip animation (e.g., a 3D card rotation effect) to visually simulate the card turning over.

4. The system transitions the card from its front state to its **back state**, revealing:
   - The **Explanation** content as written during flashcard creation (UC4 – Write Explanation).
   - Optionally, the **Term** displayed in smaller text at the top of the card for reference context.
   - The **Mark Study Status** controls (UC9 – Mark Study Status) which become available after the flip.

5. The User reads the **Explanation** on the back of the card.

6. The use case ends. Control returns to UC7 (Study Flashcards), where the User is expected to mark their study status (UC9).

---

### 2.2 Alternative Flows

#### 2.2.1 Explanation Content is Empty

This alternative flow occurs when the flashcard was saved without an explanation (a data integrity edge case).

1. The User flips the card (Step 2 of the Basic Flow).
2. The system transitions the card to the back state.
3. The system detects that the Explanation field for this flashcard is empty.
4. The system displays a placeholder message on the back of the card: "No explanation has been added for this card. Tap Edit to add one."
5. An **"Edit Card"** shortcut button is displayed, linking to the flashcard editing interface.
6. The Mark Study Status controls still appear, allowing the User to continue the session.
7. The flow resumes at Step 5 of the Basic Flow.

#### 2.2.2 User Flips Back to the Term Side

This alternative flow occurs when the User wants to re-read the Term after having already flipped to the Explanation side.

1. After the card has been flipped to show the Explanation (Step 4 of the Basic Flow), the User clicks or taps the card again (or presses the designated keyboard key).
2. The system plays a reverse flip animation.
3. The system transitions the card back to its **front state**, showing the Term.
4. The Mark Study Status controls are hidden while the card is showing the Term side.
5. The flow returns to Step 2 of the Basic Flow, where the User can flip again to reveal the Explanation.

#### 2.2.3 User Uses Keyboard to Flip the Card

This alternative flow describes keyboard-based card flipping for accessibility and power users.

1. The User presses the **Spacebar** key while a flashcard is displayed.
2. The system recognizes the Spacebar as the flip shortcut.
3. The system performs the same flip animation and state transition as described in Steps 3–4 of the Basic Flow.
4. The flow resumes at Step 5 of the Basic Flow.

---

## 3. Special Requirements

### 3.1 Animation Requirements

- The card flip animation must use a CSS 3D transform (or equivalent) to simulate a realistic card flip, with a transition duration of 300–500 milliseconds.
- The animation must be smooth and must not cause layout shifts or visual glitches.
- The animation must be hardware-accelerated where possible to ensure consistent frame rate.

### 3.2 Usability Requirements

- The clickable/tappable area for flipping must cover the entire card surface, not only the "Flip" button, to maximize ease of interaction.
- The "Flip" button and card surface must have a clear visual affordance (e.g., hover state, shadow lift) indicating that they are interactive.
- On mobile devices, the flip action must also support a **swipe-up gesture** as an alternative to tapping.

### 3.3 Accessibility Requirements

- The Spacebar keyboard shortcut for flipping must be documented in a keyboard shortcut help guide within the study interface.
- The transition from front to back state must be announced to screen readers (e.g., using ARIA live regions): "Card flipped. Explanation: [explanation text]."
- Users who prefer reduced motion (system preference) must be offered a non-animated instantaneous reveal instead of the 3D flip animation.

### 3.4 Performance Requirements

- The flip action and resulting content reveal must occur within 100 milliseconds of the User's input (excluding the animation duration).

---

## 4. Preconditions

### 4.1 Active Study Session

- The User must be in an active flashcard study session (UC7 – Study Flashcards).

### 4.2 Card is Displayed in Front State

- A flashcard must currently be displayed with its Term (front side) visible. The flip action is only available when the card is showing the Term side.

### 4.3 User Authentication

- The User must be authenticated (logged in) to the STUDIFY system.

---

## 5. Postconditions

### 5.1 Explanation Revealed

After the use case is completed successfully:

- The flashcard's **Explanation** (back side content) is visible to the User.
- The **Mark Study Status** controls (UC9) are displayed, allowing the User to rate how well they knew the card.
- The card's visual state is changed to "back/flipped" for the duration of the current card interaction.

### 5.2 Card Returned to Front State

If the User flips back to the front (Alternative Flow 2.2.2):

- The Term is again visible.
- The Mark Study Status controls are hidden.
- The User can flip again to re-read the explanation.

---

## 6. Extension Points

This use case has no extension points of its own. It is a component included by UC7 (Study Flashcards) and provides the core card-flip interaction that subsequently triggers UC9 (Mark Study Status).

---

## 7. UI Prototype

### 7.1 Basic Flow — Card in Front State (Term Visible)
*Shows the flashcard front with the Term and a visible "Click to reveal" flip affordance.*
![Flip Card - Front State](../../images/module_4/UC8_card_front.png)

### 7.2 Basic Flow — Card in Back State (Explanation Revealed)
*Shows the flipped card back with the full Explanation content and Mark Status controls visible.*
![Flip Card - Back State](../../images/module_4/UC8_card_back.png)

### 7.3 Alternative Flow 2.2.1 — Empty Explanation on Card Back
*Shows the back of a card where no explanation exists, with an "Edit Card" shortcut link.*
![Flip Card - Empty Explanation](../../images/module_4/UC8_empty_explanation.png)

### 7.4 Alternative Flow 2.2.3 — Keyboard Shortcut Hint (Spacebar)
*Shows the keyboard shortcut hint label (Spacebar to flip) on the study interface.*
![Flip Card - Keyboard Hint](../../images/module_4/UC8_keyboard_hint.png)
