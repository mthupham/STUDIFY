# Feature Specification: Flashcard Management & Study Session

**Feature Branch**: `[001-flashcard-management]`

**Created**: 2026-08-08

**Status**: Implemented / Spec Kit Artifact

**Input**: Reverse-engineered from the Studify PA4 use-case documentation for flashcard creation and study flow, plus the existing Pomodoro and dashboard integration points in the frontend.

## User Scenarios & Testing

### User Story 1 - Create flashcards from manual input or highlighted text (Priority: P1)

As a learner, I want to create flashcards with a term and explanation so that I can capture vocabulary and grammar concepts for later revision.

**Why this priority**: This is the entry point for the flashcard feature and enables all downstream study workflows.

**Independent Test**: Create a flashcard with a term, explanation, and optional tags, then verify that it appears in the learner’s deck.

**Acceptance Scenarios**:

1. **Given** a learner opens the flashcard composer, **When** they provide a term and explanation and click Save, **Then** the system stores the flashcard and shows a success notification.
2. **Given** a learner highlights text in a study document, **When** they choose the contextual “Add to Flashcard” action, **Then** the composer opens with the selected text pre-filled as the term.
3. **Given** a learner leaves the term or explanation empty, **When** they attempt to save, **Then** the system blocks submission and highlights the invalid fields.

### User Story 2 - Study flashcards in a guided session (Priority: P1)

As a learner, I want to review flashcards one at a time, flip them, and mark whether I know them so that I can study efficiently.

**Why this priority**: The core educational value of flashcards is realized during the study session experience.

**Independent Test**: Start a study session, flip a card, mark its status, and verify that the next card appears automatically.

**Acceptance Scenarios**:

1. **Given** a learner has one or more flashcards, **When** they start a study session, **Then** the first card is shown with the term on the front side.
2. **Given** a learner flips a card, **When** they view the explanation, **Then** they can mark the card as Know, Don’t Know, or Review Later.
3. **Given** a learner marks a card, **When** the action is recorded, **Then** the next card is displayed and the session summary is updated.

### User Story 3 - Filter study sessions by tag (Priority: P2)

As a learner, I want to filter flashcards by tag so that I can revise the most relevant concepts for a topic.

**Why this priority**: Tag filtering improves relevance but is not required for the basic study loop.

**Independent Test**: Select a tag and verify that only matching flashcards are included in the study session.

**Acceptance Scenarios**:

1. **Given** a learner selects one or more tags, **When** they start study mode, **Then** only cards matching those tags are included.
2. **Given** a learner changes the tag filter mid-session, **When** they reinitialize the session, **Then** the deck is recalculated based on the new filter.

## Functional Scope

### Frontend Requirements
- Render a flashcard creation form with fields for term, explanation, optional tags, and save/cancel actions.
- Support contextual creation from highlighted text.
- Render a study-session view with front/back card flipping and status buttons.
- Allow tag-based deck filtering and undo of the latest status selection.

### Backend Requirements
- Expose REST endpoints for flashcard CRUD operations.
- Support filtering flashcards by tag or user.
- Record study-session actions and maintain session progress.

### Data Storage Requirements
- Store flashcards with text content, owner, creation timestamp, and optional tags.
- Store tag associations per flashcard.
- Persist study-session results for analytics or review history.

## API Contracts

### Flashcards
- POST /api/flashcards
  - Body: { term, explanation, tags?, createdBy }
  - Response: 201 { id, term, explanation, tags, createdAt }
- GET /api/flashcards
  - Query: tag, createdBy
  - Response: 200 { items: [...] }
- PATCH /api/flashcards/:id
  - Body: { term?, explanation?, tags? }
  - Response: 200 { id, term, explanation, tags }
- DELETE /api/flashcards/:id
  - Response: 200 { success: true }

### Study Session Tracking
- POST /api/flashcards/sessions
  - Body: { userId, cardId, status, sessionId? }
  - Response: 200 { success: true, nextCardId? }
- GET /api/flashcards/sessions/:sessionId
  - Response: 200 { id, cardsReviewed, completed, createdAt }

## Edge Cases & Failure Scenarios
- Missing term or explanation should fail validation with a clear error.
- Duplicate or malformed tag entries should be normalized.
- Unauthorized access to another learner’s flashcards should return 403.
- Missing flashcard IDs or invalid payloads should return 404/400.
- Server failure during save should return a safe error response and preserve the user’s draft state.

## Requirements

### Functional Requirements
- FR-001: The system must allow a learner to create a flashcard with a term and explanation.
- FR-002: The system must support optional tags for grouping and filtering.
- FR-003: The system must allow a learner to study flashcards one at a time with flip and status selection.
- FR-004: The system must filter the available deck based on tag selection.
- FR-005: The system must persist flashcards and study-action data for the owning learner.
- FR-006: The system must return consistent validation and error messages for invalid input.

### Key Entities
- Flashcard: core study object with term, explanation, owner, and timestamps.
- FlashcardTag: categorization entity used for filtering.
- StudySession: records the learner’s progress across an ordered review run.
