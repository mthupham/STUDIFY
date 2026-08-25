# Software Development Plan

**Project Name:** `Studify`
**Document Version:** `2.0`
**Date:** `24/Jul/2026`

---

## Revision History

| Date      | Version | Description   | Author     |
| :-------- | :------ | :------------ | :--------- |
| `11/Jul/2026` | `1.0`   | Initial version of the Software Development Plan | `Minh Thư` |
| `24/Jul/2026` | `2.0`   | Revised the Software Development Plan based on the TA's feedback | `Minh Thư` |

---

## Table of Contents

- [Software Development Plan](#software-development-plan)
  - [Revision History](#revision-history)
  - [Table of Contents](#table-of-contents)
  - [1. Introduction](#1-introduction)
    - [1.1 Purpose](#11-purpose)
    - [1.2 Scope](#12-scope)
    - [1.3 Overview](#13-overview)
  - [2. Project Overview](#2-project-overview)
    - [2.1 Project Purpose, Scope, and Objectives](#21-project-purpose-scope-and-objectives)
    - [2.2 Assumptions and Constraints](#22-assumptions-and-constraints)
    - [2.3 Project Deliverables](#23-project-deliverables)
  - [3. Project Organization](#3-project-organization)
    - [3.1 Organizational Structure](#31-organizational-structure)
    - [3.2 Roles and Responsibilities](#32-roles-and-responsibilities)
  - [4. Management Process](#4-management-process)
    - [4.1 Project Estimates](#41-project-estimates)
    - [4.2 Project Plan](#42-project-plan)
      - [4.2.1 Phase Plan](#421-phase-plan)
      - [4.2.2 Iteration Objectives](#422-iteration-objectives)
      - [4.2.3 Releases](#423-releases)
      - [4.2.4 Project Schedule](#424-project-schedule)
      - [4.2.5 Project Resourcing](#425-project-resourcing)
    - [4.3 Project Monitoring and Control](#43-project-monitoring-and-control)
      - [4.3.1 Requirements Management](#431-requirements-management)
      - [4.3.2 Reporting and Measurement](#432-reporting-and-measurement)
      - [4.3.3 Risk Management](#433-risk-management)
      - [4.3.4 Configuration Management](#434-configuration-management)

## 1. Introduction
> **Authors:** [Minh Thư] | **Reviewer:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc] | **Editor:** [Minh Thư]

### 1.1 Purpose

The purpose of the Software Development Plan is to describe the development plan for **Studify**, a web application tailored for students and working professionals looking to master conversational and specialized English. The platform aligns its content with the **Common European Framework of Reference for Languages (CEFR)** and customizes learning paths for specific industries such as **IT**.

The project focuses on delivering a robust **Minimum Viable Product (MVP)** featuring adaptive general conversation modules and a specialized curriculum tailored for the **Information Technology (IT)** sector.

The following people are involved in the Software Development Plan:

* Project Manager / Business Analyst / UI-UX: Uses the plan to coordinate project activities, manage project scope, and oversee UI/UX-related work.
* Backend Lead: Uses the plan to coordinate backend development activities and review backend tasks.
* Frontend Lead: Uses the plan to coordinate frontend development activities and review frontend tasks.
* Backend Developer: Uses the plan to understand assigned backend development tasks and their deadlines.
* Frontend Developer: Uses the plan to understand assigned frontend development tasks and their deadlines.

### 1.2 Scope

This Software Development Plan describes the overall development plan for the **Studify** project.

The project aims to design and develop a dynamic, responsive web application that bridges the gap between traditional language learning and practical, career-oriented communication. The platform merges **CEFR proficiency standards** with data-driven personalization to offer users a structured yet flexible ecosystem for language acquisition.

The primary project phase focuses on delivering a robust **MVP** with:

* Adaptive general conversation modules.
* A specialized curriculum tailored for the **IT** sector.
* AI-driven diagnostic testing upon registration.
* IT-focused modules covering Agile terminologies, client communication, and cross-cultural tech collaboration.
* Scenario-based conversational exercises.
* Progress analytics for daily streaks, vocabulary retention, and CEFR sub-skill milestones.

### 1.3 Overview

This Software Development Plan contains the following information:

* **Project Overview** — describes the purpose, scope, objectives, key features, and target audience of the Studify project.
* **Project Organization** — describes the project team structure and the roles of the five team members.
* **Management Process** — describes the project schedule, incremental builds, sprint plans, project risks, and future sprint activities.

---

## 2. Project Overview
> **Authors:** [Minh Thư] | **Reviewer:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc] | **Editor:** [Minh Thư]

### 2.1 Project Purpose, Scope, and Objectives

**Project Purpose:**

The **Studify** project aims to design and develop a dynamic, responsive web application that bridges the gap between traditional language learning and practical, career-oriented communication. By merging **CEFR proficiency standards** with data-driven personalization, the platform will offer users a structured yet flexible ecosystem to accelerate their language acquisition.

The primary phase of the project focuses on delivering a robust **Minimum Viable Product (MVP)** that features adaptive general conversation modules alongside a highly specialized curriculum tailored for the **Information Technology (IT)** sector.

**Objectives:**

* **Standardized Benchmarking:** Integrate automated diagnostic tools to accurately map user proficiency against CEFR levels (A1 to C2).
* **Contextualized Learning:** Replace generic vocabulary with high-utility, industry-specific language tracks, starting with IT-focused communication such as technical stand-ups, client pitches, and code documentation review.
* **Micro-Learning Architecture:** Deliver bite-sized, interactive lessons optimized for the busy schedules of students and working professionals.
* **Measurable Progression:** Provide transparent dashboard analytics to show skill growth and readiness for real-world professional scenarios.

**Project Scope / Key Features:**

| Module                   | Functional Description                                                                                                      | Target Output                                        |
| :----------------------- | :-------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| **Adaptive Placement**   | AI-driven diagnostic test upon registration.                                                                                | Establishes user's baseline CEFR level.              |
| **The IT Track**         | Specialized modules covering Agile terminologies, client communication, and cross-cultural tech collaboration.              | Mastery of industry-specific jargon and soft skills. |
| **Interactive Roleplay** | Scenario-based conversational exercises, such as simulating a software deployment crisis or a job interview.                | Improved verbal fluency and situational confidence.  |
| **Progress Analytics**   | Visual data tracking daily streaks, vocabulary retention, and CEFR sub-skill milestones for Speaking, Reading, and Writing. | Actionable insights for targeted improvement.        |

**Target Audience:**

* **Tech Students & Graduates:** Individuals looking to pass international language benchmarks or secure internships in multinational corporations.
* **Active IT Professionals:** Software engineers, product managers, and QA leads who need to articulate complex technical concepts clearly to non-technical global stakeholders.

### 2.2 Assumptions and Constraints

**Assumptions:**

* The project will be developed by a team of five members consisting of a PM/BA/UI-UX, Backend Lead, Backend Developer, Frontend Lead, and Frontend Developer.
* The team will produce five incremental builds for testing and review.
* The final sprint will include a demo of all project features.
* Cross-functional pairing will be used so that no single team member holds exclusive knowledge of critical areas.
* Centralized and up-to-date project documentation will be maintained to enable other team members to take over responsibilities with minimal disruption.
* If Speech-to-Text or LLM services are unavailable, the application will fall back to standard multiple-choice or text-based assessments.
* Pre-tested, deterministic rule-based evaluation will be used for initial diagnostic tests before relying on AI-generated grading.

**Constraints:**

* The project is organized into 5 incremental builds for testing and review.
* The final sprint includes a demo of all project features.
* Sprint scope is organized according to the defined sprint schedule.
* A strict Minimum Viable Product (MVP) is focused solely on the IT track and core CEFR proficiency tracking.
* New feature requests must undergo a formal change-impact assessment before approval.
* Feature scope is frozen for each sprint to prevent mid-sprint additions.
* A 20% buffer is allocated in all major sprint milestones to accommodate unexpected delays.
* API monitoring, billing alerts, and daily usage caps are required to prevent unexpected downtime and cost overruns.

### 2.3 Project Deliverables

| Artifact / Deliverable            | Phase / Iteration     | Target Delivery Date | Audience / Target   |
| :-------------------------------- | :-------------------- | :------------------- | :------------------ |
| **Build 1.0**                     | End of Sprint 1 (PA1) | **06/Jun/2026**      | Testing and review  |
| **Build 2.0**                     | End of Sprint 2 (PA2) | **11/Jul/2026**      | Testing and review  |
| **Build 3.0**                     | End of Sprint 3 (PA3) | **25/Jul/2026**      | Testing and review  |
| **Build 4.0 — Release Candidate** | End of Sprint 4 (PA4) | **08/Aug/2026**      | Testing and review  |
| **Build 5.0 — Final Production**  | End of Sprint 5 (PA5) | **15/Aug/2026**      | Final semester demo |

---

## 3. Project Organization
> **Authors:** [Minh Thư] | **Reviewer:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc] | **Editor:** [Minh Thư]

### 3.1 Organizational Structure

The project team consists of five members with assigned roles covering project management, business analysis, UI/UX, frontend development, and backend development.

The team structure is:

* **PM/BA/UI-UX**
* **Backend Lead**
* **Backend Developer**
* **Frontend Lead**
* **Frontend Developer**

The Project Plan identifies the following project organization:

| Student ID   | Name                   | Email                                                                 | Role               |
| :----------- | :--------------------- | :-------------------------------------------------------------------- | :----------------- |
| **24127164** | Lê Kim Hằng            | [lkhang2429@clc.fitus.edu.vn](mailto:lkhang2429@clc.fitus.edu.vn)     | Backend Lead       |
| **24127550** | Phạm Minh Thư          | [pmthu2417@clc.fitus.edu.vn](mailto:pmthu2417@clc.fitus.edu.vn)       | PM/BA/UI-UX        |
| **24127510** | Nguyễn Kim Thiên Phước | [nktphuoc2412@clc.fitus.edu.vn](mailto:nktphuoc2412@clc.fitus.edu.vn) | Frontend Lead      |
| **24127217** | Hồ Gia Phúc            | [hgphuc2425@clc.fitus.edu.vn](mailto:hgphuc2425@clc.fitus.edu.vn)     | Frontend Developer |
| **24127198** | Nguyễn Khánh Linh      | [nklinh2421@clc.fitus.edu.vn](mailto:nklinh2421@clc.fitus.edu.vn)     | Backend Developer  |

### 3.2 Roles and Responsibilities

| Person                     | Role               | Responsibilities                                                                                                                                                                                                                               |
| :------------------------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Phạm Minh Thư**          | PM/BA/UI-UX        | Project management, business analysis, and UI/UX. Responsible for UI/UX design tasks, including interfaces for the Self-Study Dashboard, Pomodoro, and Flashcard features.                                                                     |
| **Lê Kim Hằng**            | Backend Lead       | Backend leadership. Responsible for developing the core algorithm for the daily study schedule and reviewing backend development tasks.                                                                                                        |
| **Nguyễn Kim Thiên Phước** | Frontend Lead      | Frontend leadership. Responsible for researching and building the Visual Tree Roadmap Component, implementing Selection API functionality for text highlighting and keyboard shortcuts, and reviewing frontend development tasks.              |
| **Hồ Gia Phúc**            | Frontend Developer | Frontend development. Responsible for building lesson and quiz interfaces, implementing the Progress Bar and Daily Schedule Widget, developing Pomodoro countdown logic and audio notifications, and building Flashcard-related UI components. |
| **Nguyễn Khánh Linh**      | Backend Developer  | Backend development. Responsible for developing APIs for lesson tree structures, lesson and quiz content, learning progress updates, and Flashcards.                                                                                           |

**Missing:** The Project Plan does not provide a complete responsibility description for every role across all project disciplines and workflow details.

---

## 4. Management Process
> **Authors:** [Minh Thư] | **Reviewer:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc] | **Editor:** [Minh Thư]

### 4.1 Project Estimates

The project is planned across **5 sprints** with a total duration of **10 weeks**:

* **Sprint 1 (PA1):** 3 weeks — Authentication & Onboarding.
* **Sprint 2 (PA2):** 2 weeks — Self-Study Dashboard, Pomodoro.
* **Sprint 3 (PA3):** 2 weeks — Virtual Study Room, Flash Card.
* **Sprint 4 (PA4):** 2 weeks — AI Speaking Assistant.
* **Sprint 5 (PA5):** 1 week — System Testing, Bug Fixing & Final Demo.

The project will produce **five incremental builds**, with each build completed at the end of its corresponding sprint.

A 20% buffer is allocated in all major sprint milestones to accommodate unexpected delays.

### 4.2 Project Plan

The project follows a sprint-based incremental development plan consisting of 5 sprints and 5 incremental builds.

#### 4.2.1 Phase Plan

**Sprint Schedule Overview:**

| Sprint | Duration | Main Activities | Expected Output |
| :--- | :--- | :--- | :--- |
| **Sprint 1 (PA1)** | 3 weeks | Authentication & Onboarding | Build 1.0 — Baseline system |
| **Sprint 2 (PA2)** | 2 weeks | Self-Study Dashboard, Pomodoro | Build 2.0 — Self-Study Dashboard integration and Pomodoro |
| **Sprint 3 (PA3)** | 2 weeks | Virtual Study Room, Flashcard | Build 3.0 — Virtual Study Room integration and Flashcard |
| **Sprint 4 (PA4)** | 2 weeks | AI Speaking Assistant | Build 4.0 — Release Candidate |
| **Sprint 5 (PA5)** | 1 week | System Testing, Bug Fixing & Final Demo | Build 5.0 — Final Production |

**Build Plan:**

* **Build 1.0 (End of Sprint 1):** Baseline system with User Registration, Login, and Onboarding classification flow.
* **Build 2.0 (End of Sprint 2):** Integration of Self-Study Dashboard, visual roadmap, lesson/quiz modules, and Pomodoro widgets.
* **Build 3.0 (End of Sprint 3):** Addition of the Virtual Study Room including RBAC, file sharing, real-time chat via WebSocket, and Flashcard feature.
* **Build 4.0 (End of Sprint 4 — Release Candidate):** Full system integration including the AI Speaking Assistant with STT & LLM processing.
* **Build 5.0 (End of Sprint 5 — Final Production):** Fully tested, bug-free build ready for the final semester demo.

#### 4.2.2 Iteration Objectives

**Sprint-based objectives available in the Project Plan:**

* **Sprint 1:** Authentication & Onboarding.
* **Sprint 2:** Self-Study Dashboard, Pomodoro.
* **Sprint 3:** Virtual Study Room, Flashcard.
* **Sprint 4:** AI Speaking Assistant.
* **Sprint 5:** System Testing, Bug Fixing & Final Demo.

#### 4.2.3 Releases

The project will produce five incremental builds:

* **Build 1.0:** Baseline system with User Registration, Login, and Onboarding classification flow.
* **Build 2.0:** Self-Study Dashboard, visual roadmap, lesson/quiz modules, and Pomodoro widgets.
* **Build 3.0:** Virtual Study Room with RBAC, file sharing, real-time chat via WebSocket, and Flashcard feature.
* **Build 4.0 — Release Candidate:** Full system integration including the AI Speaking Assistant with STT & LLM processing.
* **Build 5.0 — Final Production:** Fully tested, bug-free build ready for the final semester demo.

#### 4.2.4 Project Schedule

Build Plan:

| Phase / Milestone  | Target Start Date | Target Completion Date | Milestone / Release Type                |
| :----------------- | :---------------- | :--------------------- | :-------------------------------------- |
| **Sprint 1 (PA1)** | **23/May/2026**   | **06/Jun/2026**        | Authentication & Onboarding             |
| **Sprint 2 (PA2)** | **06/Jun/2026**   | **11/Jul/2026**        | Self-Study Dashboard & Utilities        |
| **Sprint 3 (PA3)** | **11/Jul/2026**   | **25/Jul/2026**        | Virtual Study Room, Flashcard           |
| **Sprint 4 (PA4)** | **25/Jul/2026**   | **08/Aug/2026**        | AI Speaking Assistant                   |
| **Sprint 5 (PA5)** | **08/Aug/2026**   | **15/Aug/2026**        | System Testing, Bug Fixing & Final Demo |
| **Build 1.0**      | **23/May/2026**   | **06/Jun/2026**        | Baseline system                         |
| **Build 2.0**      | **06/Jun/2026**   | **11/Jul/2026**        | Self-Study Dashboard integration        |
| **Build 3.0**      | **11/Jul/2026**   | **25/Jul/2026**        | Virtual Study Room integration          |
| **Build 4.0**      | **25/Jul/2026**   | **08/Aug/2026**        | Release Candidate                       |
| **Build 5.0**      | **08/Aug/2026**   | **15/Aug/2026**        | Final Production                        |

Detailed Plan for Upcoming Sprint (Sprint 2):
* **Focus:** Virtual Study Room & Flashcard Enhancement
* **Duration:** 2 Weeks (e.g., July 11, 2026 - July 25, 2026)

| Task Description| Assignee (Doer)| Reviewer| Due Date|
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------------------------------------- | ----------- |
| **[UI/UX]** Design UI-UX interfaces for Virtual Study Room, including Group Management, Task Widget, Document Repository, real-time Chat Box, and Flashcard features, with detailed user flows and button functionalities. | Minh Thư (PM/BA/UI-UX)      | Thiên Phước (Frontend Lead), Kim Hằng (Backend Lead) | 13/Jul/2026 |
| **[UI/UX]** Finalize the UI/UX design for Group Management, including Create Group, Join Group via Code, Group Member List, and Group Leader controls.                                                                     | Minh Thư (PM/BA/UI-UX)      | Thiên Phước (Frontend Lead)                          | 14/Jul/2026 |
| **[BE]** Implement Role-Based Access Control (RBAC) for Group Leader and Group Member roles, including permission validation for group-related actions.                                                                    | Kim Hằng (Backend Lead)     | Minh Thư (PM/BA/UI-UX)                               | 16/Jul/2026 |
| **[BE]** Develop a unique and secure Group Code generation algorithm for creating and joining study groups.                                                                                                                | Kim Hằng (Backend Lead)     | Khánh Linh (Backend Dev)                             | 16/Jul/2026 |
| **[BE]** Build APIs for Create Group, Join Group via Code, Leave Group, and Retrieve Group Information and Member List.                                                                                                    | Khánh Linh (Backend Dev)    | Kim Hằng (Backend Lead)                              | 18/Jul/2026 |
| **[FE]** Build the Group Management interface, including Create Group, Join Group via Code, Group Details, and Member List components.                                                                                     | Thiên Phước (Frontend Lead) | Minh Thư (PM/BA/UI-UX)                               | 19/Jul/2026 |
| **[BE]** Design database schema and develop APIs for Task Assignment, including task creation, assignment to group members, status updates, and task retrieval.                                                            | Khánh Linh (Backend Dev)    | Kim Hằng (Backend Lead)                              | 20/Jul/2026 |
| **[FE]** Build the Task Widget and Task Assignment interface, supporting task creation, member assignment, task status tracking, and task completion.                                                                      | Gia Phúc (Frontend Dev)     | Thiên Phước (Frontend Lead)                          | 21/Jul/2026 |
| **[BE]** Configure AWS S3/Cloudinary storage and develop Upload/Download APIs for study materials and group documents.                                                                                                     | Kim Hằng (Backend Lead)     | Khánh Linh (Backend Dev)                             | 21/Jul/2026 |
| **[FE]** Build the Document Repository interface with file drag-and-drop upload, file list display, download, and basic file management functionalities.                                                                   | Gia Phúc (Frontend Dev)     | Thiên Phước (Frontend Lead)                          | 22/Jul/2026 |
| **[BE]** Set up the WebSocket (Socket.io) architecture and required events for real-time group chat communication.                                                                                                         | Kim Hằng (Backend Lead)     | Thiên Phước (Frontend Lead)                          | 22/Jul/2026 |
| **[FE]** Connect the WebSocket client and implement real-time Chat Box functionality, including message sending, receiving, and chat state management.                                                                     | Thiên Phước (Frontend Lead) | Kim Hằng (Backend Lead)                              | 23/Jul/2026 |
| **[FE]** Implement the Flashcard study interface and interaction logic, including card flipping, keyboard shortcuts, and vocabulary review flow.                                                                           | Gia Phúc (Frontend Dev)     | Thiên Phước (Frontend Lead)                          | 23/Jul/2026 |
| **[BE]** Integrate Flashcard data with the existing Flashcard APIs and ensure synchronization between Flashcard collections, Tags, and the study interface.                                                                | Khánh Linh (Backend Dev)    | Kim Hằng (Backend Lead)                              | 24/Jul/2026 |
| **[Documentation]** Prepare the Weekly Report and AI Usage Report documenting the team's progress, completed tasks, AI-assisted activities, and lessons learned during the sprint.                                         | Minh Thư (PM/BA/UI-UX)      | All Team Members                                     | 25/Jul/2026 |


High-Level Plan for Future Sprints:

*Sprint 4: AI Speaking Assistant:*
* **Self-Training & R&D:** Research STT APIs, Web Audio API, and LLM Prompt Engineering.
* **Design:** UI for AI Voice Chat interface and detailed evaluation display.
* **Backend:** * Integrate third-party STT API.
* Design and test Prompt Engineering for LLM (GPT-4o/Claude) to output strict JSON (Grammar, Vocab, Relevance, Suggestions).
* Build APIs to receive audio streams, process via AI, and save history/scores.
* **Frontend:** * Implement Web Audio API/MediaRecorder for precise voice recording.
* Build Chat UI with loading animations and render JSON evaluation data.
* **Documentation:** Weekly Report and AI Usage Report for the recent Sprint.

*Sprint 5: Testing, Bug Fixing & Demo Preparation:*
* **Testing:** Conduct End-to-End (E2E) user flow testing across all modules.
* **Bug Fixing:** Resolve issues identified in UI, Backend logic, and Real-time connections.
* **Optimization:** Refactor code and optimize Database queries.
* **Deployment:** Finalize production environment deployment.
* **Documentation & Demo:** Prepare final presentation slides, rehearse the product demo, and finalize the PA5 Project Report.


#### 4.2.5 Project Resourcing

The project requires five team members with the following roles:

**1 PM/BA/UI-UX: Phạm Minh Thư.**
**1 Backend Lead: Lê Kim Hằng.**
**1 Backend Developer: Nguyễn Khánh Linh.**
**1 Frontend Lead: Nguyễn Kim Thiên Phước.**
**1 Frontend Developer: Hồ Gia Phúc.**

The project requires skills and experience in:

* Project management and business analysis.
* UI/UX design.
* Frontend development.
* Backend development.
* Database schema design.
* API development.
* WebSocket real-time communication.
* AWS S3/Cloudinary file storage.
* Speech-to-Text APIs.
* Web Audio API and MediaRecorder.
* LLM Prompt Engineering.
* Testing, bug fixing, database optimization, and deployment.
---

### 4.3 Project Monitoring and Control

Project monitoring and control are performed through:

* Sprint Schedule Monitoring: The project is divided into five sprints with defined durations and objectives.
* Task Assignment: Tasks are assigned to specific team members.
* Task Review: Each Sprint 2 task has an assigned reviewer.
* Due Date Tracking: Tasks have defined due dates.
* Incremental Build Monitoring: Five incremental builds are produced for testing and review.
* Risk Management: Project risks are identified and mitigation strategies are defined.
* Scope Control: New feature requests require a formal change-impact assessment, and sprint scope is frozen to prevent mid-sprint additions.
* Documentation: Weekly Reports, AI Usage Reports, final presentation slides, and the PA5 Project Report are included in the project plan.
* Testing and Quality Control: Sprint 5 includes End-to-End user flow testing, bug fixing, code refactoring, and database query optimization.
* Deployment Monitoring: The production environment is finalized during Sprint 5.

#### 4.3.1 Requirements Management

The Project Plan defines the project scope through the MVP, key features, sprint schedule, build plan, and high-level plans for future sprints.

Scope control is addressed through the following risk mitigation strategies:

* Define a strict **MVP** focused solely on the IT track and core CEFR proficiency tracking.
* Maintain a dedicated **"Nice-to-Have" backlog** for Phase 2 features.
* Require all new feature requests to undergo a formal **change-impact assessment** before approval.
* Freeze the feature scope for each sprint to prevent mid-sprint additions.

#### 4.3.2 Reporting and Measurement

Sprint tasks are monitored using:
* Task Description.
* Assignee (Doer).
* Reviewer.
* Due Date.

Project progress is also evaluated through the completion of the five incremental builds and the testing and review activities associated with each build. Sprint 5 includes End-to-End user flow testing across all modules, bug fixing, code refactoring, database query optimization, and production environment deployment.

#### 4.3.3 Risk Management

The Project Plan identifies the following risks:

| Risk Ranking | Risk Description and Impact | Mitigation Strategy and/or Contingency Plan
| :----------: | :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   **High**   | **Scope Creep ("Just One More Feature" Trap)** — Impact: High | Define a strict MVP focused solely on the IT track and core CEFR proficiency tracking. Maintain a dedicated "Nice-to-Have" backlog for Phase 2 features. Require all new feature requests to undergo a formal change-impact assessment before approval. Freeze the feature scope for each sprint to prevent mid-sprint additions.                                                                                                                                                                                                                
|   **High**   | **API Failures or Inaccurate CEFR Grading** — Impact: High    | Design a graceful degradation mechanism so that if Speech-to-Text or LLM services are unavailable, the application falls back to standard multiple-choice or text-based assessments. Use pre-tested, deterministic rule-based evaluation for initial diagnostic tests before relying on AI-generated grading. Implement API monitoring, billing alerts, and daily usage caps to prevent unexpected downtime and cost overruns. Regularly validate AI-generated CEFR scores against human-reviewed samples to ensure grading accuracy and consistency.
|  **Medium**  | **Member Unavailability & Bottlenecks** — Impact: Medium      | Establish cross-functional pairing so no single team member holds exclusive knowledge of critical areas. Allocate a 20% buffer in all major sprint milestones to accommodate unexpected delays. Maintain centralized and up-to-date project documentation, enabling other team members to take over responsibilities with minimal disruption.                                                                                                                                                                                                     

#### 4.3.4 Configuration Management

Configuration and scope control for the project include:

* Maintaining centralized and up-to-date project documentation.
* Performing a formal change-impact assessment for new feature requests before approval.
* Freezing the feature scope for each sprint to prevent mid-sprint additions.
* Maintaining a dedicated "Nice-to-Have" backlog for Phase 2 features.
* Including project documentation and deliverables as part of the planned project outputs.

The project also includes final documentation and deliverables such as Weekly Reports, AI Usage Reports.