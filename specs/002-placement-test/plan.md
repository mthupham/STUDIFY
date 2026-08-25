# Implementation Plan: Placement Test & Onboarding

**Branch**: `placement-test` | **Date**: 2026-07-25 | **Spec**: [spec.md](spec.md)

---

## 1. Technical Context

- **Language/Version**: TypeScript (Backend NestJS), JavaScript/JSX (Frontend React)
- **Primary Dependencies**:
  - **Backend**: NestJS 11.x, Sequelize 6.x, class-validator
  - **Frontend**: React 19.x, Vite 8.x
- **Storage**: In-memory volatile Map (`userLevelStorage` inside `PlacementTestService`) and read-only static JSON database files (`database/data/placementtest.json`, `database/data/lesson.json`).
- **Database Models (Defined but currently unused)**:
  - `PlacementTest` (`Backend/src/models/placement_test.model.ts`)
  - `PlacementQuestion` (`Backend/src/models/placement_question.model.ts`)
  - `Roadmap` (`Backend/src/models/roadmap.model.ts`)
  - `Level` (`Backend/src/models/level.model.ts`)
  - `User` (`Backend/src/models/user.model.ts`) - lacks columns for assignedLevel or onboardingStatus.

---

## 2. Technical Architecture & Components

```
┌────────────────────────────────────────────────────────┐
│                      FRONTEND UI                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │                  OnboardingApp                   │  │
│  │  (Renders Dev Panel & Controls Screen Routing)   │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │                            │
│             ┌─────────────┴─────────────┐              │
│             ▼                           ▼              │
│   ┌───────────────────┐       ┌────────────────────┐   │
│   │  OnboardingFlow   │       │   PlacementTest    │   │
│   │ (Commitment/Pace) │       │ (Static Questionnaire)││
│   └───────────────────┘       └────────────────────┘   │
└────────────────────────────────────────────────────────┘
                            │
               (Not Connected to API Yet)
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                      BACKEND API                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │             PlacementTestController              │  │
│  │ (Exposes submit, my-roadmap, & lesson-detail)    │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │                            │
│                           ▼                            │
│  ┌──────────────────────────────────────────────────┐  │
│  │               PlacementTestService               │  │
│  │  - Grades test answers via 70% rule-based algo   │  │
│  │  - Groups lessons into Chapters for Roadmap      │  │
│  └────────────────────────┬─────────────────────────┘  │
│                           │                            │
│             ┌─────────────┴─────────────┐              │
│             ▼                           ▼              │
│   ┌───────────────────┐       ┌────────────────────┐   │
│   │ userLevelStorage  │       │     database/      │   │
│   │  (In-Memory Map)  │       │  data/*.json files │   │
│   └───────────────────┘       └────────────────────┘   │
└────────────────────────────────────────────────────────┘
```

### Frontend Components (`Frontend/src/features/onboarding/`)
- **`OnboardingApp.jsx`**: Handles routing state between onboarding phases (`'commitment' | 'proficiency' | 'quiz'`) and hosts a developer switcher banner at the top of the interface.
- **`OnboardingFlow.jsx`**: Handles Pace Commitment Selection (Step 1) and Proficiency selection questions (Step 2).
- **`PlacementTest.jsx`**: Displays a detailed, inline-styled dashboard layout featuring the 10-question map, choice cards, live accuracy widget, and previous/next question control buttons. Currently renders a static mock preposition question.

### Backend Services & Controllers (`Backend/src/features/placement-test/`)
- **`PlacementTestController`**: Directs traffic for test submissions, roadmap details retrieval, and lesson item details retrieval.
- **`PlacementTestService`**: Handles business logic, including loading JSON database items on startup, scoring submissions using a rule-based tiered algorithm, keeping user assigned levels in volatile memory, and organizing roadmap chapters.

---

## 3. Database Schema Mapping (Unused Gap)

Although the Sequelize schemas exist in the codebase, they are **completely bypassed** by the active placement-test endpoints. The following defines the actual database structures that are defined but inactive:

### Defined Sequelize Models

1. **`PlacementTest`** (Table: `PlacementTests`)
   - `id`: integer (Primary Key)
   - `testTitle`: string
   - Relationships: HasMany `PlacementQuestion`

2. **`PlacementQuestion`** (Table: `PlacementQuestions`)
   - `id`: integer (Primary Key)
   - `questionNumber`: integer
   - `level`: string (CEFR level: e.g. A1, A2)
   - `question`: text
   - `options`: json (options map: A, B, C, D)
   - `correctAnswer`: string
   - `testTitleId`: integer (Foreign Key referencing `PlacementTest`)

3. **`Roadmap`** (Table: `Roadmaps`)
   - `id`: integer (Primary Key)
   - `title`: string
   - `description`: text
   - Relationships: HasMany `Level`

4. **`Level`** (Table: `Levels`)
   - `id`: integer (Primary Key)
   - `levelTitle`: string
   - `roadmapId`: integer (Foreign Key referencing `Roadmap`)
   - Relationships: HasMany `VocabularyLesson`, `GrammarLesson`

5. **`User`** (Table: `Users`)
   - **Crucial Gap**: The `User` model currently lacks any columns representing the user's assessed English proficiency level (e.g. `assignedLevel`) or onboarding completion status (`hasCompletedOnboarding`), resulting in the current implementation utilizing the in-memory map.

---

## 4. API Endpoint Contracts

### 1. Submit Placement Test
- **Endpoint**: `POST /placement-test/submit`
- **Request Headers**: `Content-Type: application/json`
- **Request Body (SubmitTestDto)**:
  ```json
  {
    "userId": "string",
    "answers": {
      "1": "B",
      "2": "C",
      "3": "A"
    }
  }
  ```
- **Response Body (201 Created)**:
  ```json
  {
    "status": "success",
    "meta": {
      "userId": "string",
      "totalQuestions": 10,
      "totalCorrect": 8,
      "percentage": 80
    },
    "feedback": {
      "title": "EXCELLENT JOB!",
      "message": "Great technical aptitude! You have a highly capable analytical framework."
    },
    "assignedLevel": "B2",
    "recommendation": "Hệ thống đề xuất bạn nên bắt đầu học từ cấp độ: B2.",
    "analysis": {
      "A1": { "correct": 2, "total": 2 },
      "A2": { "correct": 2, "total": 2 },
      "B1": { "correct": 2, "total": 2 },
      "B2": { "correct": 1, "total": 2 },
      "C1": { "correct": 1, "total": 1 },
      "C2": { "correct": 0, "total": 1 }
    },
    "testDetails": [
      {
        "questionNumber": 5,
        "level": "B1",
        "questionText": "I ___ my keys. I can't find them anywhere.",
        "options": {
          "A": "have lost",
          "B": "lost",
          "C": "lose",
          "D": "losing"
        },
        "userAnswer": "A",
        "correctAnswer": "A",
        "isCorrect": true
      }
    ]
  }
  ```

### 2. Retrieve User Learning Roadmap
- **Endpoint**: `GET /placement-test/my-roadmap?userId=xxx`
- **Response Body (200 OK)**:
  ```json
  {
    "status": "success",
    "data": {
      "userId": "string",
      "assignedLevel": "B2",
      "levelTitle": "VANTAGE",
      "totalChapters": 4,
      "chapters": [
        {
          "chapterId": "CHAPT_B2_1",
          "chapterTitle": "Chương 1",
          "description": "Tối ưu hóa năng lực nền tảng phần 1",
          "isChapterUnlocked": true,
          "lessons": [
            {
              "lessonId": "job-interviews",
              "title": "Job Interviews & Professional Introductions",
              "type": "VOCABULARY",
              "totalItems": 15,
              "itemLabel": "15 Từ vựng",
              "status": "IN_PROGRESS",
              "progress": 25,
              "order": 1
            }
          ]
        }
      ]
    }
  }
  ```

### 3. Retrieve Lesson Details
- **Endpoint**: `GET /placement-test/lesson-detail?lessonId=xxx&type=xxx` (Type is either `VOCABULARY` or `GRAMMAR`)
- **Response Body (200 OK - Vocabulary Example)**:
  ```json
  {
    "status": "success",
    "type": "VOCABULARY",
    "level": "B2",
    "levelTitle": "VANTAGE",
    "lessonId": "job-interviews",
    "title": "Job Interviews & Professional Introductions",
    "content": [
      {
        "term": "Resume",
        "phonetic": "/rɪˈzjuːm/",
        "definition": "A brief account of a person’s education, qualifications, and previous experience, typically sent with a job application.",
        "example_sentence": "She sent her resume to several IT companies in the hope of getting an interview."
      }
    ]
  }
  ```

---

## 5. Security & Authentication Considerations

- **Current Status**: The `PlacementTestController` has **no authentication guards** applied. Anyone can call `POST /placement-test/submit` or `GET /placement-test/my-roadmap` with arbitrary `userId` strings.
- **Future Alignment**: To align with other core endpoints (such as `ProgressController`), the routes will eventually need the `@UseGuards(JwtGuard)` decorator, transitioning the `userId` lookup from explicit query parameters to user payloads attached to the request session.

---

## 6. Implementation Decisions & Trade-offs

1. **In-Memory and JSON file Database Bypass**:
   - *Decision*: Storing assigned CEFR levels in an in-memory `Map` and loading questions/roadmaps directly from local JSON files.
   - *Trade-off*: Speed of development was prioritized over production resilience. Level states are lost whenever the NestJS server process is restarted.
2. **Hardcoded Mock Questions on Frontend**:
   - *Decision*: Mocking a single hardcoded question on the frontend instead of integrating an API communication layer.
   - *Trade-off*: Visual UI design verification was completed, but full integration and dynamic test rendering remain pending.
