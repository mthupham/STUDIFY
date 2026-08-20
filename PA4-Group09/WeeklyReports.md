# Weekly Report - Sprint 4 (PA4)

## Overview
* **Project Period:** PA4
* **Target Project:** Virtual Study Room & Online Learning Platform

---

# Meeting 1: Weekly Scrum Meeting (30/07/2026)

### =========== 30/07/2026, Sprint 4 ===========

**Meeting Period:** July 30, 2026

## Team Members Present
* **Phạm Minh Thư** – BA / UI-UX / PM
* **Nguyễn Kim Thiên Phước** – Frontend Lead
* **Lê Kim Hằng** – Backend Lead
* **Nguyễn Khánh Linh** – Backend Developer
* **Hồ Gia Phúc** – Frontend Developer

## Team Members Absent
* None

---

## Status Reports

### Phạm Minh Thư – BA / UI-UX / PM

#### Completed Tasks
* Refined UI components and smoothly connected Frontend (FE) and Backend (BE) for placement test testing.
* Updated "Set your pace" icons for each target study hour option.
* Removed the dashboard view during test-taking to improve aesthetics and keep student focus.
* Added a countdown timer in the top-right corner of the test screen.
* Designed UI for post-test review screen, making the overall user flow much clearer.

#### To-do Tasks
* Complete UI designs and frontend implementation for all remaining pages, specifically Module 3 (Virtual Study Room), by August 2, 2026.
* Handle Module 3 - F3.1 (Group Management).

#### Issues / Obstacles
* Strict deadline approaching (only 3 weeks remaining).
* Division between FE and BE roles caused bottlenecks; team structure needed adjustment.

#### Actions (if any)
* Restructured team strategy: Minh Thư takes sole responsibility for all remaining UI development, allowing other team members to manage full-stack/backend feature implementations.

---

### Lê Kim Hằng – Backend Lead

#### Completed Tasks
* Completed API integration for placement tests (tested and verified by Minh Thư).
* Showed and reviewed backend development roadmap.

#### To-do Tasks
* Prepare and record demo video next week (following PA3 requirements).
* Coordinate backend meeting to merge backend code into the `main` branch safely.
* Implement Backend for Module 3 - F3.5 (Real-time Chat).

#### Issues / Obstacles
* Merging backend code into `main` branch is complex and carries high risk of conflicts.

#### Actions (if any)
* Organize a BE-focused session to merge code carefully into `main`.

---

### Nguyễn Khánh Linh – Backend Developer

#### Completed Tasks
* Finished API integration for the placement test alongside Kim Hằng.

#### To-do Tasks
* Participate in merging backend code into the `main` branch.
* Implement Backend for Module 3 - F3.4 (Shared File Repository: PDF and image upload, view, and download features).

#### Issues / Obstacles
* Issue 1: High potential for code conflicts during `main` branch merge.
* Issue 2: Handling multi-format file uploads efficiently.

#### Actions (if any)
* Align with BE Lead on code standardization before merging.

---

### Hồ Gia Phúc – Frontend Developer

#### Completed Tasks
* Supported frontend integration and testing for placement test.

#### To-do Tasks
* Fix lesson icon alignment issue based on Figma design feedback.
* Update left dashboard sidebar on the lesson page so navigation items dynamically follow user scrolling (currently static).
* Implement Module 3 - F3.3 (Task Assignment & Personal Dashboard Notification Widget).

#### Issues / Obstacles
* UI rendering bugs in lesson page (icons misaligned, static sidebar).

#### Actions (if any)
* Modify frontend components on the lesson page to match Figma specifications.

---

### Nguyễn Kim Thiên Phước – Frontend Lead

#### Completed Tasks
* Conducted frontend integration and flow testing with backend APIs.

#### To-do Tasks
* Address UI feedback regarding lesson page icons and dynamic sidebar movement.
* Implement Module 3 - F3.2 (Role Authorization: Leader vs. Member permissions).

#### Issues / Obstacles
* Issue 1: Main branch synchronization with backend code updates.
* Issue 2: Role-based state management on frontend.

#### Actions (if any)
* Work directly with BE team during code merge.

---

## Summary of the Meeting

### Details of the Meeting
* **Placement Test Progress:**
  * FE and BE integration for placement test completed smoothly. Tested by Minh Thư.
  * UI improvements: "Set your pace" hour icons updated; removed dashboard during test for better UI; added top-right countdown clock; designed review UI post-test.
  * Result: User navigation flow is significantly clearer than previous iterations.
* **Lesson UI Feedback:**
  * Lesson icons are misaligned; FE needs to align them with Figma designs.
  * Left sidebar on the lesson page is currently static; FE needs to make menu items dynamically highlight/follow scrolling.
* **Team Restructuring & Work Allocation Strategy:**
  * With only **3 weeks left**, team agreed to drop strict FE/BE role separation.
  * **New Model:** 1 person (Minh Thư) codes ALL remaining UI. Remaining members manage end-to-end backend and feature implementation (including database schema and UI tweaks as needed).
  * **Timeline Goals:** Minh Thư finishes UI by **August 2, 2026**. Remaining members complete assigned features by **August 9, 2026**.
* **Module 3 Breakdown: Virtual Study Room (2–5 members capacity):**
  * **F3.1 Group Management:** Create new study group (auto-generated Group Code); Join group via Code. *(Assigned to: Minh Thư)*
  * **F3.2 Role Authorization:** Leader permissions (manage group, assign tasks, upload docs) vs Member permissions (view info, receive tasks, download docs). *(Assigned to: Thiên Phước)*
  * **F3.3 Task Assignment:** Leader creates study schedule, tasks, deadlines; Member views assigned task list via personal dashboard notification widget. *(Assigned to: Gia Phúc)*
  * **F3.4 Shared File Repository:** Upload supplementary learning material (PDF, Images); View and download shared files. *(Assigned to: Khánh Linh)*
  * **F3.5 Real-time Chat:** Group discussion chatbox. *(Assigned to: Kim Hằng)*
* **Action Items & Priorities:**
  1. BE merge code to `main` branch (High priority, handle with care).
  2. FE fix lesson UI based on feedback (icons and dynamic sidebar).
  3. Minh Thư complete UI for Module 3.
  4. Kim Hằng prepare demo video for PA4 submission (similar to PA3).

---

# Meeting 2: Weekly Scrum Meeting (02/08/2026)

### =========== 02/08/2026, Sprint 4 ===========

**Meeting Period:** August 2, 2026

## Team Members Present
* **Phạm Minh Thư** – BA / UI-UX / PM
* **Nguyễn Kim Thiên Phước** – Frontend Lead
* **Lê Kim Hằng** – Backend Lead
* **Nguyễn Khánh Linh** – Backend Developer
* **Hồ Gia Phúc** – Frontend Developer

## Team Members Absent
* None

---

## Status Reports

### Summary of Meeting & UI Demo
* **Minh Thư** presented newly coded UI for:
  * Practice Lesson screen.
  * General Virtual Study Group / Group Study interface.
* **Pending UI Components to finish:**
  * Schedule & Deadline management UI.
  * Task Assignment UI.
  * Member Management interface.
  * Group Repository interface.
* **Critical Finding:** All Study Group features currently lack Backend (BE) integration.
* **Action Taken:** Team will log Jira tasks for all completed UIs requiring BE development.
* **Discovered Bugs:**
  * **Sign-in Page Bug:** A black background area/bar appears at the bottom of the sign-in screen. Needs CSS layout fix.
* **Documentation Reminder:**
  * Must compile and complete the **AI Usage Report** for PA4 submission.

---

# Sprint Review

### What Went Well
* Successfully integrated FE and BE for Placement Test with smooth test execution.
* Clarified and streamlined user experience for test taking and post-test review screens.
* Reorganized team workflow efficiently to overcome strict FE/BE boundary bottlenecks.
* Completed initial UI designs for Practice Lessons and Group Study.

### What Went Wrong
* Lesson page UI had alignment bugs (icons off-center, static sidebar).
* Sign-in page exhibited UI rendering defect (black bar at bottom).
* Virtual Study Group features currently lack backend services.

### Problems and Causes

| Problem | Cause |
| --- | --- |
| Misaligned lesson icons & static sidebar | FE implemented static container CSS without following dynamic Figma layout guidelines. |
| Black area bug on Sign-in page | CSS viewport height/background sizing mismatch on lower resolution screens. |
| Lack of BE for Study Group features | Backend team was focused on Placement Test API completion and code merge to `main`. |

### What Can Be Done Differently in the Next Sprint
* Implement feature-based full-stack ownership to avoid FE waiting on BE APIs.
* Enforce pre-merge code reviews to prevent main branch synchronization issues.

### Lessons Learned
* Early usability feedback (e.g., removing cluttered dashboards during exams) significantly improves end-user focus.
* Cross-functional ownership accelerates progress during critical final sprint weeks.

---

## Sprint Planning

### Next Sprint
Sprint 4 (Phase 2) / Target Completion: August 9, 2026

### Sprint Objective
Complete remaining Module 3 UI, resolve sign-in CSS bugs, and deliver full backend integration for Virtual Study Room features (F3.1 – F3.5).

### Prioritized Tasks / User Stories / Use Cases

| Priority | Task / User Story / Use Case | Assignee | Expected Outcome |
| --- | --- | --- | --- |
| High | BE Code Merge to `main` | Kim Hằng, Khánh Linh | Stable merged codebase on `main` branch |
| High | Lesson Page UI Fixes | Gia Phúc, Thiên Phước | Aligned icons and dynamic scroll sidebar |
| High | Fix Sign-in Page Black Area | Minh Thư, Thiên Phước | CSS background fix on sign-in page |
| High | Module 3 Remaining UI | Minh Thư | Finished UI for Schedule, Tasks, Member Management & Repository |
| High | F3.1 Group Management | Minh Thư | Create/Join group via Code |
| High | F3.2 Role Authorization | Thiên Phước | Leader/Member role-based permissions |
| High | F3.3 Task Assignment | Gia Phúc | Leader assigns tasks; Member receives notification widget |
| High | F3.4 Shared File Repository | Khánh Linh | PDF/Image upload and file downloading |
| High | F3.5 Real-time Chat | Kim Hằng | Group chat functionality |
| Medium | AI Usage Report | All Members | Documented AI usage report for PA4 |
| Medium | PA4 Demo Video Preparation | Kim Hằng | Recorded video demonstration |

### Task Assignment

| Team Member | Assigned Tasks |
| --- | --- |
| Phạm Minh Thư | Complete Module 3 UI (Schedule, Task, Member Mgmt, Repo); Fix sign-in UI; Implement F3.1 Group Mgmt |
| Nguyễn Kim Thiên Phước | Fix Lesson UI feedback; Implement F3.2 Role Authorization; Assist sign-in UI fix |
| Lê Kim Hằng | Lead BE code merge to `main`; Implement F3.5 Real-time Chat; Record PA4 demo video |
| Nguyễn Khánh Linh | Merge BE code to `main`; Implement F3.4 Shared File Repository |
| Hồ Gia Phúc | Fix Lesson icons & dynamic sidebar; Implement F3.3 Task Assignment & Dashboard Widget |

### Expected Deliverables
* Fully functional Placement Test module merged into `main`.
* Corrected Lesson page and Sign-in page UI.
* Jira tasks created for all frontend components requiring backend integration.
* Fully functional Virtual Study Room (Module 3) with full-stack capability ready by August 9, 2026.
* AI Usage Report and PA4 Demo Video completed.



Dữ liệu trò chuyện của bạn trên Khoa CNTT - KHTN sẽ không được dùng để cải thiện các mô hình của chúng tôi. Gemini là AI và có thể mắc sai sót. Quyền riêng tư của bạn và GeminiMở trong cửa sổ mới

# Weekly Report - Sprint 4 (PA4)

## Overview
* **Project Period:** PA4
* **Date Range:** July 30, 2026 – August 2, 2026
* **Target Project:** Virtual Study Room & Online Learning Platform

---

# Meeting 1: Weekly Scrum Meeting (30/07/2026)

### =========== 30/07/2026, Sprint 4 ===========

**Meeting Period:** July 30, 2026

## Team Members Present
* **Phạm Minh Thư** – BA / UI-UX / PM
* **Nguyễn Kim Thiên Phước** – Frontend Lead
* **Lê Kim Hằng** – Backend Lead
* **Nguyễn Khánh Linh** – Backend Developer
* **Hồ Gia Phúc** – Frontend Developer

## Team Members Absent
* None

---

## Status Reports

### Phạm Minh Thư – BA / UI-UX / PM

#### Completed Tasks
* Refined UI components and smoothly connected Frontend (FE) and Backend (BE) for placement test testing.
* Updated "Set your pace" icons for each target study hour option.
* Removed the dashboard view during test-taking to improve aesthetics and keep student focus.
* Added a countdown timer in the top-right corner of the test screen.
* Designed UI for post-test review screen, making the overall user flow much clearer.

#### To-do Tasks
* Complete UI designs and frontend implementation for all remaining pages, specifically Module 3 (Virtual Study Room), by August 2, 2026.
* Handle Module 3 - F3.1 (Group Management).

#### Issues / Obstacles
* Strict deadline approaching (only 3 weeks remaining).
* Division between FE and BE roles caused bottlenecks; team structure needed adjustment.

#### Actions (if any)
* Restructured team strategy: Minh Thư takes sole responsibility for all remaining UI development, allowing other team members to manage full-stack/backend feature implementations.

---

### Lê Kim Hằng – Backend Lead

#### Completed Tasks
* Completed API integration for placement tests (tested and verified by Minh Thư).
* Showed and reviewed backend development roadmap.

#### To-do Tasks
* Prepare and record demo video next week (following PA3 requirements).
* Coordinate backend meeting to merge backend code into the `main` branch safely.
* Implement Backend for Module 3 - F3.5 (Real-time Chat).

#### Issues / Obstacles
* Merging backend code into `main` branch is complex and carries high risk of conflicts.

#### Actions (if any)
* Organize a BE-focused session to merge code carefully into `main`.

---

### Nguyễn Khánh Linh – Backend Developer

#### Completed Tasks
* Finished API integration for the placement test alongside Kim Hằng.

#### To-do Tasks
* Participate in merging backend code into the `main` branch.
* Implement Backend for Module 3 - F3.4 (Shared File Repository: PDF and image upload, view, and download features).

#### Issues / Obstacles
* Issue 1: High potential for code conflicts during `main` branch merge.
* Issue 2: Handling multi-format file uploads efficiently.

#### Actions (if any)
* Align with BE Lead on code standardization before merging.

---

### Hồ Gia Phúc – Frontend Developer

#### Completed Tasks
* Supported frontend integration and testing for placement test.

#### To-do Tasks
* Fix lesson icon alignment issue based on Figma design feedback.
* Update left dashboard sidebar on the lesson page so navigation items dynamically follow user scrolling (currently static).
* Implement Module 3 - F3.3 (Task Assignment & Personal Dashboard Notification Widget).

#### Issues / Obstacles
* UI rendering bugs in lesson page (icons misaligned, static sidebar).

#### Actions (if any)
* Modify frontend components on the lesson page to match Figma specifications.

---

### Nguyễn Kim Thiên Phước – Frontend Lead

#### Completed Tasks
* Conducted frontend integration and flow testing with backend APIs.

#### To-do Tasks
* Address UI feedback regarding lesson page icons and dynamic sidebar movement.
* Implement Module 3 - F3.2 (Role Authorization: Leader vs. Member permissions).

#### Issues / Obstacles
* Issue 1: Main branch synchronization with backend code updates.
* Issue 2: Role-based state management on frontend.

#### Actions (if any)
* Work directly with BE team during code merge.

---

## Summary of the Meeting

### Details of the Meeting
* **Placement Test Progress:**
  * FE and BE integration for placement test completed smoothly. Tested by Minh Thư.
  * UI improvements: "Set your pace" hour icons updated; removed dashboard during test for better UI; added top-right countdown clock; designed review UI post-test.
  * Result: User navigation flow is significantly clearer than previous iterations.
* **Lesson UI Feedback:**
  * Lesson icons are misaligned; FE needs to align them with Figma designs.
  * Left sidebar on the lesson page is currently static; FE needs to make menu items dynamically highlight/follow scrolling.
* **Team Restructuring & Work Allocation Strategy:**
  * With only **3 weeks left**, team agreed to drop strict FE/BE role separation.
  * **New Model:** 1 person (Minh Thư) codes ALL remaining UI. Remaining members manage end-to-end backend and feature implementation (including database schema and UI tweaks as needed).
  * **Timeline Goals:** Minh Thư finishes UI by **August 2, 2026**. Remaining members complete assigned features by **August 9, 2026**.
* **Module 3 Breakdown: Virtual Study Room (2–5 members capacity):**
  * **F3.1 Group Management:** Create new study group (auto-generated Group Code); Join group via Code. *(Assigned to: Minh Thư)*
  * **F3.2 Role Authorization:** Leader permissions (manage group, assign tasks, upload docs) vs Member permissions (view info, receive tasks, download docs). *(Assigned to: Thiên Phước)*
  * **F3.3 Task Assignment:** Leader creates study schedule, tasks, deadlines; Member views assigned task list via personal dashboard notification widget. *(Assigned to: Gia Phúc)*
  * **F3.4 Shared File Repository:** Upload supplementary learning material (PDF, Images); View and download shared files. *(Assigned to: Khánh Linh)*
  * **F3.5 Real-time Chat:** Group discussion chatbox. *(Assigned to: Kim Hằng)*
* **Action Items & Priorities:**
  1. BE merge code to `main` branch (High priority, handle with care).
  2. FE fix lesson UI based on feedback (icons and dynamic sidebar).
  3. Minh Thư complete UI for Module 3.
  4. Kim Hằng prepare demo video for PA4 submission (similar to PA3).

---

# Meeting 2: Weekly Scrum Meeting (02/08/2026)

### =========== 02/08/2026, Sprint 4 ===========

**Meeting Period:** August 2, 2026

## Team Members Present
* **Phạm Minh Thư** – BA / UI-UX / PM
* **Nguyễn Kim Thiên Phước** – Frontend Lead
* **Lê Kim Hằng** – Backend Lead
* **Nguyễn Khánh Linh** – Backend Developer
* **Hồ Gia Phúc** – Frontend Developer

## Team Members Absent
* None

---

## Status Reports

### Summary of Meeting & UI Demo
* **Minh Thư** presented newly coded UI for:
  * Practice Lesson screen.
  * General Virtual Study Group / Group Study interface.
* **Pending UI Components to finish:**
  * Schedule & Deadline management UI.
  * Task Assignment UI.
  * Member Management interface.
  * Group Repository interface.
* **Critical Finding:** All Study Group features currently lack Backend (BE) integration.
* **Action Taken:** Team will log Jira tasks for all completed UIs requiring BE development.
* **Discovered Bugs:**
  * **Sign-in Page Bug:** A black background area/bar appears at the bottom of the sign-in screen. Needs CSS layout fix.
* **Documentation Reminder:**
  * Must compile and complete the **AI Usage Report** for PA4 submission.

---

# Sprint Review

### What Went Well
* Successfully integrated FE and BE for Placement Test with smooth test execution.
* Clarified and streamlined user experience for test taking and post-test review screens.
* Reorganized team workflow efficiently to overcome strict FE/BE boundary bottlenecks.
* Completed initial UI designs for Practice Lessons and Group Study.

### What Went Wrong
* Lesson page UI had alignment bugs (icons off-center, static sidebar).
* Sign-in page exhibited UI rendering defect (black bar at bottom).
* Virtual Study Group features currently lack backend services.

### Problems and Causes

| Problem | Cause |
| --- | --- |
| Misaligned lesson icons & static sidebar | FE implemented static container CSS without following dynamic Figma layout guidelines. |
| Black area bug on Sign-in page | CSS viewport height/background sizing mismatch on lower resolution screens. |
| Lack of BE for Study Group features | Backend team was focused on Placement Test API completion and code merge to `main`. |

### What Can Be Done Differently in the Next Sprint
* Implement feature-based full-stack ownership to avoid FE waiting on BE APIs.
* Enforce pre-merge code reviews to prevent main branch synchronization issues.

### Lessons Learned
* Early usability feedback (e.g., removing cluttered dashboards during exams) significantly improves end-user focus.
* Cross-functional ownership accelerates progress during critical final sprint weeks.

---

## Sprint Planning

### Next Sprint
Sprint 4 (Phase 2) / Target Completion: August 9, 2026

### Sprint Objective
Complete remaining Module 3 UI, resolve sign-in CSS bugs, and deliver full backend integration for Virtual Study Room features (F3.1 – F3.5).

### Prioritized Tasks / User Stories / Use Cases

| Priority | Task / User Story / Use Case | Assignee | Expected Outcome |
| --- | --- | --- | --- |
| High | BE Code Merge to `main` | Kim Hằng, Khánh Linh | Stable merged codebase on `main` branch |
| High | Lesson Page UI Fixes | Gia Phúc, Thiên Phước | Aligned icons and dynamic scroll sidebar |
| High | Fix Sign-in Page Black Area | Minh Thư, Thiên Phước | CSS background fix on sign-in page |
| High | Module 3 Remaining UI | Minh Thư | Finished UI for Schedule, Tasks, Member Management & Repository |
| High | F3.1 Group Management | Minh Thư | Create/Join group via Code |
| High | F3.2 Role Authorization | Thiên Phước | Leader/Member role-based permissions |
| High | F3.3 Task Assignment | Gia Phúc | Leader assigns tasks; Member receives notification widget |
| High | F3.4 Shared File Repository | Khánh Linh | PDF/Image upload and file downloading |
| High | F3.5 Real-time Chat | Kim Hằng | Group chat functionality |
| Medium | AI Usage Report | All Members | Documented AI usage report for PA4 |
| Medium | PA4 Demo Video Preparation | Kim Hằng | Recorded video demonstration |

### Task Assignment

| Team Member | Assigned Tasks |
| --- | --- |
| Phạm Minh Thư | Complete Module 3 UI (Schedule, Task, Member Mgmt, Repo); Fix sign-in UI; Implement F3.1 Group Mgmt |
| Nguyễn Kim Thiên Phước | Fix Lesson UI feedback; Implement F3.2 Role Authorization; Assist sign-in UI fix |
| Lê Kim Hằng | Lead BE code merge to `main`; Implement F3.5 Real-time Chat; Record PA4 demo video |
| Nguyễn Khánh Linh | Merge BE code to `main`; Implement F3.4 Shared File Repository |
| Hồ Gia Phúc | Fix Lesson icons & dynamic sidebar; Implement F3.3 Task Assignment & Dashboard Widget |

### Expected Deliverables
* Fully functional Placement Test module merged into `main`.
* Corrected Lesson page and Sign-in page UI.
* Jira tasks created for all frontend components requiring backend integration.
* Fully functional Virtual Study Room (Module 3) with full-stack capability ready by August 9, 2026.
* AI Usage Report and PA4 Demo Video completed.