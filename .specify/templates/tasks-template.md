---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 [P] Setup feature folders: Backend/src/features/onboarding, Backend/src/features/virtual-study-room, Frontend/src/features/onboarding, Frontend/src/features/virtual-study-room
- [ ] T002 [P] Create shared DTOs directory: Backend/src/features/[feature]/dtos for input validation
- [ ] T003 Configure environment variables: API_URL, JWT_EXPIRY, MAX_FILE_SIZE, POMODORO_DURATION in .env file
- [ ] T004 [P] Setup Sequelize migrations framework for new models
- [ ] T005 [P] Create base API response interceptor following { success, data, message } envelope pattern
- [ ] T006 [P] Setup error handling middleware for consistent error responses

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create User model in Backend/src/models/user.model.ts with email, password (hashed), englishLevel, timeCommitment fields
- [ ] T008 Implement AuthService in Backend/src/features/authentication/services/ with login/register/JWT token generation
- [ ] T009 Create JWT authentication guard and decorator in Backend/src/common/
- [ ] T010 [P] Create onboarding survey DTOs (OnboardingSurveyDto, OnboardingResponseDto) in Backend/src/features/onboarding/dtos/
- [ ] T011 [P] Create VirtualStudyRoom model in Backend/src/models/virtual-study-room.model.ts with roomCode, masterId, members array
- [ ] T012 [P] Create Task model in Backend/src/models/task.model.ts with title, description, dueDate, assignedMembers
- [ ] T013 Setup real-time WebSocket support for synchronization (Socket.io or NestJS gateway if using)
- [ ] T014 [P] Create Zustand authentication store in Frontend/src/features/auth/store/useAuthStore.ts
- [ ] T015 [P] Create API service layer in Frontend/src/services/api.service.ts with Axios interceptors for JWT tokens
- [ ] T016 Setup responsive layout wrapper in Frontend/src/layouts/MainLayout.tsx with header/sidebar

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Personalized Onboarding Survey (Priority: P1) 🎯 MVP

**Goal**: Enable new users to quickly answer 2 survey questions and automatically receive a personalized IT-focused CEFR learning roadmap

**Independent Test**: Create new account → Complete survey in <2 minutes → Verify IT roadmap displays on dashboard

### Implementation for User Story 1

- [ ] T017 [P] [US1] Create OnboardingService in Backend/src/features/onboarding/services/onboarding.service.ts with saveSurvey() and getOnboardingStatus() methods
- [ ] T018 [P] [US1] Create OnboardingController in Backend/src/features/onboarding/controllers/ with POST /api/v1/onboarding/survey endpoint
- [ ] T019 [US1] Implement Roadmap model in Backend/src/models/roadmap.model.ts linked to User entity with CEFR levels
- [ ] T020 [US1] Create RoadmapService in Backend/src/features/onboarding/services/roadmap.service.ts to generate IT-focused roadmap based on English level and time commitment
- [ ] T021 [US1] Create onboarding survey UI component in Frontend/src/features/onboarding/pages/OnboardingSurvey.tsx with 2 dropdown questions
- [ ] T022 [P] [US1] Create time commitment options component in Frontend/src/features/onboarding/components/TimeCommitmentSelect.tsx
- [ ] T023 [P] [US1] Create English level assessment component in Frontend/src/features/onboarding/components/EnglishLevelSelect.tsx
- [ ] T024 [US1] Create onboarding store in Frontend/src/features/onboarding/store/useOnboardingStore.ts to manage survey state
- [ ] T025 [US1] Implement survey submission flow: validate input → call /api/v1/onboarding/survey → redirect to dashboard
- [ ] T026 [US1] Add route protection: bypass onboarding if user has already completed survey (check hasCompletedOnboarding flag)
- [ ] T027 [US1] Create dashboard redirect logic after onboarding completion

**Checkpoint**: User Story 1 should be fully functional - new users can complete onboarding and see personalized roadmap

---

## Phase 4: User Story 2 - Self-Study Roadmap & Progress Tracking (Priority: P1)

**Goal**: Allow users to view CEFR-standardized lessons, complete quizzes, and see real-time progress percentage updated on dashboard

**Independent Test**: Open lesson → Answer quiz questions → Submit → Verify progress bar increments correctly (±2%) within 5 seconds

### Implementation for User Story 2

- [ ] T028 [P] [US2] Create Lesson model in Backend/src/models/lesson.model.ts with cefLevel, profession, content, lessonOrder fields
- [ ] T029 [P] [US2] Create Quiz model in Backend/src/models/quiz.model.ts with questions array, lessonId foreign key
- [ ] T030 [P] [US2] Create QuestionBank model in Backend/src/models/question-bank.model.ts with professional context questions
- [ ] T031 [US2] Create LessonService in Backend/src/features/self-study/services/lesson.service.ts with getLessonsByLevel(), getQuizForLesson() methods
- [ ] T032 [US2] Create ProgressService in Backend/src/features/self-study/services/progress.service.ts to track completion percentage
- [ ] T033 [P] [US2] Create quiz submission endpoint POST /api/v1/quizzes/{quizId}/submit in SelfStudyController
- [ ] T034 [US2] Implement progress calculation logic: completedLessons / totalLessons * 100 with real-time database update
- [ ] T035 [P] [US2] Create dashboard layout component in Frontend/src/features/dashboard/pages/Dashboard.tsx
- [ ] T036 [P] [US2] Create progress bar component in Frontend/src/features/dashboard/components/ProgressBar.tsx displaying real-time percentage
- [ ] T037 [P] [US2] Create lesson list component in Frontend/src/features/self-study/components/LessonList.tsx
- [ ] T038 [US2] Create lesson detail page in Frontend/src/features/self-study/pages/LessonDetail.tsx with lesson content display
- [ ] T039 [US2] Create quiz UI component in Frontend/src/features/self-study/components/QuizForm.tsx with multiple-choice questions
- [ ] T040 [US2] Implement quiz submission flow with loading state and success notification
- [ ] T041 [US2] Add polling or WebSocket listener to update progress bar in real-time (refresh every 2 seconds)
- [ ] T042 [P] [US2] Create lesson completed modal component in Frontend/src/features/self-study/components/LessonCompletedModal.tsx

**Checkpoint**: Users can complete lessons/quizzes and see real-time progress updates on dashboard

---

## Phase 5: User Story 3 - Virtual Study Room & Group Code Join (Priority: P1)

**Goal**: Enable users to create virtual study rooms with unique codes and join existing rooms for group study

**Independent Test**: Create room with code → Join room from different account using code → Both see same room content

### Implementation for User Story 3

- [ ] T043 [P] [US3] Create VirtualStudyRoomService in Backend/src/features/virtual-study-room/services/room.service.ts with createRoom(), joinRoom(), generateRoomCode() methods
- [ ] T044 [P] [US3] Create RoomCode generator utility in Backend/src/utils/room-code-generator.ts (6-character alphanumeric, collision-free)
- [ ] T045 [US3] Create POST /api/v1/rooms endpoint to create new room in RoomController
- [ ] T046 [US3] Create POST /api/v1/rooms/join endpoint to join existing room by code
- [ ] T047 [US3] Implement room membership tracking: store master and member IDs with timestamps
- [ ] T048 [P] [US3] Create CreateRoomForm component in Frontend/src/features/virtual-study-room/components/CreateRoomForm.tsx
- [ ] T049 [P] [US3] Create JoinRoomForm component in Frontend/src/features/virtual-study-room/components/JoinRoomForm.tsx with code input validation
- [ ] T050 [P] [US3] Create RoomCodeDisplay component in Frontend/src/features/virtual-study-room/components/RoomCodeDisplay.tsx to show shareable code
- [ ] T051 [US3] Create virtual study room page in Frontend/src/features/virtual-study-room/pages/VirtualStudyRoom.tsx
- [ ] T052 [US3] Create members list component in Frontend/src/features/virtual-study-room/components/MembersList.tsx
- [ ] T053 [US3] Implement real-time room sync: display members, tasks, and Pomodoro state from single source of truth
- [ ] T054 [P] [US3] Create useRoomStore in Frontend/src/features/virtual-study-room/store/useRoomStore.ts for room state management
- [ ] T055 [US3] Add room leave endpoint DELETE /api/v1/rooms/{roomId}/leave

**Checkpoint**: Users can create rooms and join via code; room state persists across browser refreshes

---

## Phase 6: User Story 4 - Task Assignment & Notification Widget (Priority: P1)

**Goal**: Enable Room Masters to assign study tasks with deadlines; members see tasks in dashboard notification widget

**Independent Test**: Master creates task "Complete IT Vocab 3 by 8 PM" → Member sees task in notification widget within 2 seconds

### Implementation for User Story 4

- [ ] T056 [P] [US4] Create TaskService in Backend/src/features/virtual-study-room/services/task.service.ts with createTask(), assignToMembers(), getTasksForMember() methods
- [ ] T057 [P] [US4] Create POST /api/v1/rooms/{roomId}/tasks endpoint in RoomController
- [ ] T058 [P] [US4] Create GET /api/v1/tasks/my-tasks endpoint to retrieve user's assigned tasks
- [ ] T059 [US4] Implement task broadcast logic: when task created, emit event to all room members
- [ ] T060 [US4] Setup real-time notifications via WebSocket or polling (GET /api/v1/notifications)
- [ ] T061 [P] [US4] Create CreateTaskForm component in Frontend/src/features/virtual-study-room/components/CreateTaskForm.tsx with title, description, deadline inputs
- [ ] T062 [P] [US4] Create TaskAssignmentModal component in Frontend/src/features/virtual-study-room/components/TaskAssignmentModal.tsx to select members
- [ ] T063 [US4] Create NotificationWidget component in Frontend/src/features/dashboard/components/NotificationWidget.tsx displaying pending tasks
- [ ] T064 [US4] Create TaskCard component in Frontend/src/features/dashboard/components/TaskCard.tsx with title, deadline, mark-as-done button
- [ ] T065 [US4] Implement polling/WebSocket listener to fetch new tasks every 2 seconds
- [ ] T066 [P] [US4] Create mark-task-complete endpoint PATCH /api/v1/tasks/{taskId}/complete
- [ ] T067 [US4] Add deadline notification: highlight overdue tasks in red, completed tasks with checkmark
- [ ] T068 [P] [US4] Create useNotificationStore in Frontend/src/features/dashboard/store/useNotificationStore.ts

**Checkpoint**: Masters can assign tasks; members receive real-time notifications with visible task list

---

## Phase 7: User Story 5 - Shared File Repository (Priority: P2)

**Goal**: Enable room members to upload/download supplementary materials (PDFs, images) within study room

**Independent Test**: Upload PDF → See in shared list → Download from another account → File integrity verified

### Implementation for User Story 5

- [ ] T069 [P] [US5] Create FileRepository model in Backend/src/models/file-repository.model.ts with fileName, fileUrl, uploadedBy, roomId, fileSize fields
- [ ] T070 [P] [US5] Create FileUploadService in Backend/src/features/virtual-study-room/services/file-upload.service.ts with upload(), download(), validateFileSize() methods
- [ ] T071 [US5] Setup file storage strategy (local storage or S3) with MAX_FILE_SIZE validation (20MB limit)
- [ ] T072 [US5] Create POST /api/v1/rooms/{roomId}/files/upload endpoint with multipart form data handling
- [ ] T073 [US5] Create GET /api/v1/rooms/{roomId}/files endpoint to list all files in room
- [ ] T074 [US5] Create GET /api/v1/files/{fileId}/download endpoint for secure file download
- [ ] T075 [P] [US5] Create FileUploadZone component in Frontend/src/features/virtual-study-room/components/FileUploadZone.tsx with drag-and-drop
- [ ] T076 [P] [US5] Create FileList component in Frontend/src/features/virtual-study-room/components/FileList.tsx showing uploaded files
- [ ] T077 [US5] Create FileUploadModal component with file type validation (PDF, JPG, PNG only)
- [ ] T078 [US5] Implement upload progress indicator during file transfer
- [ ] T079 [US5] Add error handling for failed uploads with retry mechanism

**Checkpoint**: File sharing fully functional; members can upload and retrieve study materials

---

## Phase 8: User Story 6 - Pomodoro Timer (Priority: P2)

**Goal**: Provide synchronized Pomodoro timer (25 min focus / 5 min break) visible to all room members

**Independent Test**: Start timer in one browser → Verify countdown synchronized in another browser within ±1 second

### Implementation for User Story 6

- [ ] T080 [P] [US6] Create PomodoroSession model in Backend/src/models/pomodoro-session.model.ts with status (idle/focus/break), startTime, roomId, participantIds fields
- [ ] T081 [P] [US6] Create PomodoroService in Backend/src/features/virtual-study-room/services/pomodoro.service.ts with startSession(), pauseSession(), resetSession() methods
- [ ] T082 [US6] Create WebSocket/real-time event handlers for Pomodoro state synchronization
- [ ] T083 [US6] Create POST /api/v1/rooms/{roomId}/pomodoro/start endpoint
- [ ] T084 [US6] Create PATCH /api/v1/rooms/{roomId}/pomodoro/pause endpoint
- [ ] T085 [P] [US6] Create PomodoroTimer component in Frontend/src/features/virtual-study-room/components/PomodoroTimer.tsx displaying countdown
- [ ] T086 [P] [US6] Create PomodoroControls component in Frontend/src/features/virtual-study-room/components/PomodoroControls.tsx (Start, Pause, Reset buttons)
- [ ] T087 [US6] Implement client-side timer countdown with server-side verification for accuracy
- [ ] T088 [US6] Implement notification sound and visual alert when focus/break session ends
- [ ] T089 [P] [US6] Create usePomodoroStore in Frontend/src/features/virtual-study-room/store/usePomodoroStore.ts
- [ ] T090 [US6] Add Pomodoro statistics tracking (sessions completed, total focus time)

**Checkpoint**: Pomodoro timer synchronized across all room members with <±1 second drift tolerance

---

## Phase 9: User Story 7 - AI Speaking Assistant (Priority: P1, Post-MVP)

**Goal**: Enable users to practice English speaking in professional context with AI feedback

**Independent Test**: Record English response → Receive AI feedback on pronunciation and grammar → Score displayed

### Implementation for User Story 7

- [ ] T091 [P] [US7] Create AIDialogueService in Backend/src/features/ai-speaking/services/ai-dialogue.service.ts with submitAudio() method
- [ ] T092 [P] [US7] Create DialogueScenario model in Backend/src/models/dialogue-scenario.model.ts with scenario prompts for IT contexts
- [ ] T093 [US7] Create POST /api/v1/ai-speaking/submit endpoint accepting audio blob/base64
- [ ] T094 [US7] Integrate third-party AI API (Speech-to-Text + LLM for feedback generation)
- [ ] T095 [P] [US7] Create MicrophoneRecorder component in Frontend/src/features/ai-speaking/components/MicrophoneRecorder.tsx with record/stop buttons
- [ ] T096 [P] [US7] Create ScenarioSelector component in Frontend/src/features/ai-speaking/components/ScenarioSelector.tsx for dialogue context selection
- [ ] T097 [US7] Create AI feedback display component in Frontend/src/features/ai-speaking/components/AIFeedback.tsx showing pronunciation score and corrections
- [ ] T098 [US7] Implement audio recording using Web Audio API
- [ ] T099 [US7] Create AI Speaking page in Frontend/src/features/ai-speaking/pages/AISpeakingPage.tsx
- [ ] T100 [P] [US7] Create useAISpeakingStore in Frontend/src/features/ai-speaking/store/useAISpeakingStore.ts

**Checkpoint**: Users can record speaking practice and receive AI-generated feedback

---

## Phase 10: User Story 8 - Automated Task Assignment (Priority: P2)

**Goal**: Automatically generate personalized daily study tasks based on onboarding time commitment

**Independent Test**: Set "15 min/day" onboarding → Dashboard generates 1-2 micro-tasks daily → Tasks refresh at midnight

### Implementation for User Story 8

- [ ] T101 [P] [US8] Create DailyTaskGenerator service in Backend/src/features/self-study/services/daily-task-generator.service.ts
- [ ] T102 [P] [US8] Implement task generation algorithm: map time commitment → quiz/lesson count
- [ ] T103 [US8] Setup scheduled job (cron or database trigger) to generate daily tasks at midnight
- [ ] T104 [US8] Create AutoGeneratedTask model in Backend/src/models/auto-generated-task.model.ts linked to User
- [ ] T105 [US8] Create GET /api/v1/tasks/daily endpoint returning today's auto-generated tasks
- [ ] T106 [P] [US8] Create DailyTasksWidget component in Frontend/src/features/dashboard/components/DailyTasksWidget.tsx
- [ ] T107 [US8] Implement task completion tracking for daily tasks
- [ ] T108 [US8] Add profile settings page to allow users to update time commitment dynamically
- [ ] T109 [US8] When time commitment changes, recalculate remaining uncompleted tasks for current day

**Checkpoint**: Users see automatically generated daily tasks matching their time commitment

---

## Phase 11: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T110 [P] Documentation: README.md updated with feature overview and quickstart instructions
- [ ] T111 [P] Implement global error boundary in Frontend for graceful error handling
- [ ] T112 [P] Add loading skeletons to all async data displays
- [ ] T113 Code cleanup: remove console.log(), unused imports, debug code
- [ ] T114 [P] Performance: add React.memo to components that don't need re-render
- [ ] T115 [P] Accessibility: audit components with axe-core for WCAG compliance
- [ ] T116 [P] Setup API rate limiting: 100 requests/minute per user
- [ ] T117 Run full test suite and verify no regressions
- [ ] T118 [P] Cross-browser testing: Chrome, Firefox, Safari, Edge
- [ ] T119 Mobile responsiveness testing on iPhone, iPad, Android devices
- [ ] T120 Security audit: SQL injection, XSS, CSRF prevention verification
- [ ] T121 Database performance testing with 10k+ users
- [ ] T122 API load testing: verify <200ms p95 response time under load
- [ ] T123 Validate quickstart.md instructions work end-to-end

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User Stories 1, 2, 3, 4, 6 can proceed in parallel (P1 priority)
  - User Story 5 and 8 can start after Phase 2 (P2 priority)
  - User Story 7 is post-MVP (P1 but deferred)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - Depends on User Story 1 (user must complete onboarding)
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on US1/US2
- **User Story 4 (P1)**: Can start after Foundational (Phase 2) - Depends on US3 (rooms must exist)
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Depends on US3 (file storage in rooms)
- **User Story 6 (P2)**: Can start after Foundational (Phase 2) - Depends on US3 (Pomodoro in rooms)
- **User Story 7 (P1, Post-MVP)**: Can start after Phase 2 - No direct story dependencies
- **User Story 8 (P2)**: Depends on US1 (needs onboarding time commitment) and US2 (task source)

### Parallel Opportunities

- All Phase 1 setup tasks marked [P] can run in parallel
- All Phase 2 foundational tasks marked [P] can run in parallel
- Once Phase 2 completes:
  - Developer A: US1 → US2 implementation
  - Developer B: US3 → US4 implementation  
  - Developer C: US5 & US6 implementation
  - Developer D: US7 (if starting post-MVP phase)
- Within each user story, all Backend and Frontend model creation tasks marked [P] can run in parallel

---

## Implementation Strategy

### MVP First (User Stories 1-4 + Core of 6)

1. Complete Phase 1: Setup (1-2 days)
2. Complete Phase 2: Foundational (2-3 days)
3. Complete Phase 3: User Story 1 (1 day)
4. Complete Phase 4: User Story 2 (2 days)
5. Complete Phase 5: User Story 3 (1 day)
6. Complete Phase 6: User Story 4 (2 days)
7. Add Core Pomodoro from Phase 8 (1 day)
8. **STOP and VALIDATE**: Test all stories independently → Deploy MVP

### Post-MVP Additions

9. Phase 7: User Story 5 (File Sharing) - 1-2 days
10. Phase 8: User Story 6 (Full Pomodoro) - 1 day
11. Phase 9: User Story 7 (AI Speaking) - 3-5 days
12. Phase 10: User Story 8 (Auto Task Gen) - 2 days
13. Phase 11: Polish & Deployment

---

## Notes

- [P] tasks = different files, no dependencies; can be completed in parallel
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each phase or logical group
- Stop at any checkpoint to validate story independently
- Estimated total timeline for MVP: 10-12 days for a 3-person team
- Post-MVP additions: 8-10 additional days
