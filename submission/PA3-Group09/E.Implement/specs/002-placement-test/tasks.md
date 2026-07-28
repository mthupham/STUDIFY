# Tasks: Placement Test & Onboarding

**Input**: Design documents from `/specs/002-placement-test/`

**Prerequisites**: `spec.md` (required), `plan.md` (required)

---

## Phase 1: Setup & Data Initialization

**Purpose**: Establish base structures, load questions and roadmap resources, and initialize components.

- [x] **T001** Setup backend placement-test endpoints routing structure  
  - **Module/File**: [placement-test.controller.ts](../../Backend/src/features/placement-test/placement-test.controller.ts), [placement-test.module.ts](../../Backend/src/features/placement-test/placement-test.module.ts)
  - **Dependencies**: None
  - **Expected Outcome**: PlacementTestController initialized and bound to the app routing.
  - **Status**: **Completed**

- [x] **T002** Create static data files containing placement questions and roadmaps  
  - **Module/File**: [placementtest.json](../../Backend/database/data/placementtest.json), [lesson.json](../../Backend/database/data/lesson.json)
  - **Dependencies**: None
  - **Expected Outcome**: Structured JSON database configurations containing test questions (10 items, levels A1-C2) and lesson contents are saved.
  - **Status**: **Completed**

- [x] **T003** Declare placement test database models inside Sequelize  
  - **Module/File**: [placement_test.model.ts](../../Backend/src/models/placement_test.model.ts), [placement_question.model.ts](../../Backend/src/models/placement_question.model.ts)
  - **Dependencies**: None
  - **Expected Outcome**: PlacementTest and PlacementQuestion schemas declared as inactive models.
  - **Status**: **Completed**

- [x] **T004** Build onboarding router shell on the frontend  
  - **Module/File**: [OnboardingApp.jsx](../../Frontend/src/features/onboarding/OnboardingApp.jsx)
  - **Dependencies**: None
  - **Expected Outcome**: Setup main onboarding screen switcher wrapper supporting commitment, proficiency and quiz screens.
  - **Status**: **Completed**

---

## Phase 2: Onboarding Survey preferences (User Story 1 & 2)

**Purpose**: Enable users to select study hours pace and indicate level knowledge.

- [x] **T005** Build commitment pace choice interface  
  - **Module/File**: [OnboardingFlow.jsx](../../Frontend/src/features/onboarding/OnboardingFlow.jsx)
  - **Dependencies**: T004
  - **Expected Outcome**: Users can select study hours targets (e.g. 2 hours/week, 4 hours/week).
  - **Status**: **Completed**

- [/] **T006** Build manual level selection form UI  
  - **Module/File**: [OnboardingFlow.jsx](../../Frontend/src/features/onboarding/OnboardingFlow.jsx)
  - **Dependencies**: T005
  - **Expected Outcome**: Users who know their level can pick from A1 to C2.
  - **Status**: **Partially Completed** (*The button pathway and routing exist, but the level choice list selector is not identified in the current implementation*).

- [ ] **T007** Implement manual level submit endpoint on backend  
  - **Module/File**: [placement-test.controller.ts](../../Backend/src/features/placement-test/placement-test.controller.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Users can skip the test and directly save their starting level.
  - **Status**: **Pending** (*Not identified in the current implementation*).

---

## Phase 3: Diagnostic Placement Test Grading (User Story 3)

**Purpose**: Render questions, record options, and grade accuracy dynamically to assign CEFR levels.

- [x] **T008** Implement Smart Onboarding evaluation algorithm  
  - **Module/File**: [placement-test.service.ts](../../Backend/src/features/placement-test/placement-test.service.ts)
  - **Dependencies**: T002
  - **Expected Outcome**: Grades submissions, calculates correctness per CEFR level, and assigns user level using sequential 70% accuracy threshold.
  - **Status**: **Completed**

- [x] **T009** Implement in-memory volatility map cache for user assigned level  
  - **Module/File**: [placement-test.service.ts](../../Backend/src/features/placement-test/placement-test.service.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Keeps level assigned values mapping to userId in an active `Map` state.
  - **Status**: **Completed**

- [x] **T010** Build layout shell and Question Map for Placement Test UI  
  - **Module/File**: [PlacementTest.jsx](../../Frontend/src/features/onboarding/PlacementTest.jsx)
  - **Dependencies**: T004
  - **Expected Outcome**: Visual dashboard layout featuring 10-question grid status circles, live accuracy gauge, and options.
  - **Status**: **Completed** (*Layout design and structure completed, but static question text is used*).

- [ ] **T011** Implement dynamic question loading in Frontend test UI  
  - **Module/File**: [PlacementTest.jsx](../../Frontend/src/features/onboarding/PlacementTest.jsx)
  - **Dependencies**: T010
  - **Expected Outcome**: UI pulls placement questions from backend API instead of using static mock question.
  - **Status**: **Pending** (*Not identified in the current implementation*).

- [ ] **T012** Integrate answers recording state management  
  - **Module/File**: [PlacementTest.jsx](../../Frontend/src/features/onboarding/PlacementTest.jsx)
  - **Dependencies**: T010
  - **Expected Outcome**: User selections for questions 1 to 10 are recorded and kept in state.
  - **Status**: **Pending** (*Not identified in the current implementation*).

- [ ] **T013** Connect API client submission logic on frontend  
  - **Module/File**: [PlacementTest.jsx](../../Frontend/src/features/onboarding/PlacementTest.jsx)
  - **Dependencies**: T012
  - **Expected Outcome**: API request sent to `/placement-test/submit` with answers, redirecting user on success.
  - **Status**: **Pending** (*Not identified in the current implementation*).

- [x] **T014** Create API input validation rules  
  - **Module/File**: [submit-test.dto.ts](../../Backend/src/features/placement-test/submit-test.dto.ts)
  - **Dependencies**: T001
  - **Expected Outcome**: Validate that userId is provided and answers object format is sent.
  - **Status**: **Completed**

---

## Phase 4: Roadmap Generation & Navigation (User Story 4)

**Purpose**: Assemble the sequential curriculum list and retrieve learning details.

- [x] **T015** Implement lesson-pairing and chapter generation logic  
  - **Module/File**: [placement-test.service.ts](../../Backend/src/features/placement-test/placement-test.service.ts)
  - **Dependencies**: T002
  - **Expected Outcome**: Automatically pairs one vocabulary and one grammar lesson into sequence chapters.
  - **Status**: **Completed**

- [x] **T016** Expose user roadmap API endpoint  
  - **Module/File**: [placement-test.controller.ts](../../Backend/src/features/placement-test/placement-test.controller.ts)
  - **Dependencies**: T015
  - **Expected Outcome**: GET `/placement-test/my-roadmap?userId=xxx` returns structured JSON chapters matching level.
  - **Status**: **Completed**

- [x] **T017** Expose lesson detail API endpoint  
  - **Module/File**: [placement-test.controller.ts](../../Backend/src/features/placement-test/placement-test.controller.ts)
  - **Dependencies**: T002
  - **Expected Outcome**: GET `/placement-test/lesson-detail?lessonId=xxx&type=xxx` returns vocabulary items or grammar details.
  - **Status**: **Completed**

- [ ] **T018** Connect visual dashboard roadmap to API client  
  - **Module/File**: [RoadmapPage.jsx](../../Frontend/src/features/learning/roadmap/RoadmapPage.jsx)
  - **Dependencies**: T016
  - **Expected Outcome**: Renders chapters and lessons fetched from the server instead of mock state.
  - **Status**: **Pending** (*Not identified in the current implementation*).

---

## Phase 5: Database Persistence & Routing Security (Alignment Gaps)

**Purpose**: Establish permanent database storage and enforce route authorization.

- [ ] **T019** Create Sequelize database migration and seeder scripts for placement test  
  - **Module/File**: Backend database migration scripts  
  - **Dependencies**: T003
  - **Expected Outcome**: Tables `PlacementTests` and `PlacementQuestions` are initialized and populated with JSON contents in PostgreSQL database.
  - **Status**: **Pending** (*Not identified in the current implementation*).

- [ ] **T020** Refactor service to query SQL database instead of static files  
  - **Module/File**: [placement-test.service.ts](../../Backend/src/features/placement-test/placement-test.service.ts)
  - **Dependencies**: T019
  - **Expected Outcome**: Placement test questions and roadmap items are queried from PostgreSQL.
  - **Status**: **Pending** (*Not identified in the current implementation*).

- [ ] **T021** Persist assigned level in User database entity  
  - **Module/File**: [user.model.ts](../../Backend/src/models/user.model.ts), [user.service.ts](../../Backend/src/modules/user/user.service.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Adds persistent assigned level fields in the SQL database so states are not lost on reboot.
  - **Status**: **Pending** (*Not identified in the current implementation*).

- [ ] **T022** Secure PlacementTestController routes with JWT Authorization  
  - **Module/File**: [placement-test.controller.ts](../../Backend/src/features/placement-test/placement-test.controller.ts)
  - **Dependencies**: None
  - **Expected Outcome**: Endpoints protected by JWT Auth guard, resolving security parameter queries.
  - **Status**: **Pending** (*Not identified in the current implementation*).

---

## Phase 6: Testing & Quality Assurance

- [ ] **T023** Write backend unit tests for grading and chapter pairing logic  
  - **Module/File**: Backend placement test spec test file  
  - **Dependencies**: T008, T015
  - **Expected Outcome**: Evaluates accuracy under mock scores to verify target CEFR assignments.
  - **Status**: **Pending** (*No test file exists in the codebase*).

- [ ] **T024** Write E2E integration test for the full placement flow  
  - **Module/File**: Backend E2E integration spec file  
  - **Dependencies**: T022
  - **Expected Outcome**: Automates request pipeline verifying login, survey complete, and dashboard loading.
  - **Status**: **Pending** (*No E2E test file exists in the codebase*).
