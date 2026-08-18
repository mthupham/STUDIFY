## A.1 Test Plan

**Performed by:** [Minh Thư]
**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]
**Edited by:** [Minh Thư]

### A.1.1 Test Objectives

* Verify that implemented features work according to the requirements.
* Verify that user workflows work correctly from end to end.
* Identify functional defects and edge cases.
* Validate AI-powered features with representative inputs.
* Verify that previously identified bugs have been fixed.

### A.1.2 Test Scope

#### In Scope

The following features are included in functional testing:

- Authentication
- Onboarding
- Personalized Learning Path
- Study Groups
- AI Speaking Assistant

Testing covers the main functional workflows, valid and invalid inputs, error handling authorization, data persistence, and relevant edge cases for these features.

#### Out of Scope

The following features are not included in the formal functional test suite:

- Flashcards
- Pomodoro
- Group Chat

These features may be manually checked during the final product demonstration but are not included in the 50 formal functional test cases.

### A.1.3 Features to Be Tested

| Feature ID | Feature        | Related Use Case | Priority |
| ---------- | -------------- | ---------------- | -------- |
| F01        | Authentication and O | UC01             | High     |
| F02        | Onboarding     | UC02             | High     |
| F03        | Personalized Learning Path| UC03 | High |
| F04        | Study Groups   | UC04             | High     |
| F05        | AI Speaking    | UC05             | High     |

### A.1.4 Test Environment

| Category         | Configuration             |
| ---------------- | ------------------------- |
| Operating System | macOS / Windows           |
| Browser          | Chrome                    |
| Frontend         | React + Vite              |
| Backend          | NestJS                    |
| Database         | PostgreSQL / Supabase     |
| Deployment       | Vercel / Render           |
| Testing Type     | Manual Functional Testing |

### A.1.5 Testing Tools

* Browser Developer Tools
* Postman / Swagger
* PostgreSQL / Supabase
* Git
* Spec Kit
* [Other tools]

### A.1.6 Test Schedule

| Phase              | Date   | Activity               | Responsible |
| ------------------ | ------ | ---------------------- | ----------- |
| Preparation        | [18th August] | Prepare test cases     | [Minh Thư]      |
| Execution          | [19th August] | Execute test cases     | [Minh Thư]      |
| Bug Fixing         | [20th August] | Fix defects            | [Minh Thư]      |
| Regression Testing | [21th August] | Re-test fixed features | [Minh Thư]      |
| Final Review       | [22th August] | Review results         | [Minh Thư]      |

### A.1.7 Responsibilities

| Member | Responsibility                        |
| ------ | ------------------------------------- |
| [Minh Thư] | Test planning                         |
| [Kim Hằng] | Authentication and onboarding testing |
| [Thiên Phước] | Personalized Learning Path |
| [Khánh Linh] | Study group testing                   |
| [Gia Phúc] | AI feature testing                    |
| [Minh Thư] | Final review                          |

### A.1.8 Entry Criteria

Testing can begin when:

* Required features are implemented.
* The application can be launched successfully.
* Test environment is available.
* Test data is prepared.
* Test cases have been reviewed.
* Critical blocking defects from previous testing have been resolved.

### A.1.9 Exit Criteria

Testing is considered complete when:

* All planned test cases have been executed.
* All failed test cases have corresponding bug reports.
* Critical and high-severity defects are resolved or documented.
* Regression testing has been completed.
* Test results have been reviewed by the team.

---