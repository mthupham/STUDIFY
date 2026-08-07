# AI Usage Report

## Table of Contents

- [AI Usage Report](#ai-usage-report)
  - [Table of Contents](#table-of-contents)
  - [Kim Hằng's AI Usage:](#kim-hằngs-ai-usage)
  - [Khánh Linh's AI Usage:](#khánh-linhs-ai-usage)
  - [Gia Phúc's AI Usage:](#gia-phúcs-ai-usage)
  - [Thiên Phước's AI Usage:](#thiên-phướcs-ai-usage)
  - [Minh Thư's AI Usage:](#minh-thưs-ai-usage)
- [Appendix: AI Usage Proof](#appendix-ai-usage-proof)
  - [Kim Hằng](#kim-hằng)
  - [Khánh Linh](#khánh-linh)
  - [Gia Phúc](#gia-phúc)
  - [Thiên Phước](#thiên-phước)
  - [Minh Thư](#minh-thư)

---

## Kim Hằng's AI Usage:

**Prompt 1**
* **Tool:** Claude (Sonnet 5)
* **Purpose:** Review a Mermaid Use Case Diagram for the "Self-Study Dashboard" subsystem based on two reference articles covering common Use Case Diagram mistakes and how to write effective Use Case Specifications.
* **Prompt used:** "dựa vào hai nguồn trên [thinhnotes.com – Use Case Diagram và 5 sai lầm thường gặp; thinhnotes.com – Viết đặc tả Use Case sao đơn giản nhưng hiệu quả], hãy review đoạn code mermaid này" ("Based on the two sources above, please review this Mermaid diagram code") [with the original Mermaid code attached, containing 11 use cases (UC1–UC11) and include/extend/generalization relationships between the Learner actor and the Self-Study Dashboard system]
* **AI-generated content:**
  * Identified naming issues (UC6, UC7 used noun phrases instead of the Verb + Noun convention; UC1, UC2 had overly long names with parenthetical notes).
  * Flagged misuse of the `<<include>>` relationship to decompose a screen-navigation flow (How) instead of extracting genuinely reusable functionality (What), and pointed out that the include direction was logically backwards (UC1 including UC2, UC2 including UC3).
  * Recommended merging UC9–UC10–UC11 (Track Progress → View % → Calculate %) into a single UC, moving the real-time percentage calculation into a Business Rule/NFR of the specification instead of a separate UC.
  * Pointed out that the `<<extend>>` relationship between UC8 and UC9 lacked an Extension Point and was semantically mismatched (closer to a Trigger/Post-condition than an extend), with an example of a correctly-used extend relationship.
  * Identified a conflict between a direct actor association (Learner → UC3) and an include relationship (UC2 include UC3) reaching the same UC.
  * Noted that 11 UCs exceeded the recommended guideline and that UCs were inconsistently mixed across requirement levels (business-level vs. implementation-level).
* **Student's work and validation:**
  * Supplied the original Mermaid diagram and the two reference articles as the basis for comparison.
  * Cross-checked each point raised by the AI against the source articles to confirm accuracy (e.g., verifying the definitions of include/extend and UC naming conventions).
  * Selectively applied the suggested revisions to the final UML diagram submitted for the Self-Study Dashboard specification (PA3-2026), adjusting further to fit the module's actual scope.

**Prompt 2**
* **Tool:** Claude (Sonnet 5)
* **Purpose:** Get a deeper explanation of the "Use Case Diagram mistaken for Workflow" mistake identified in the previous review, and concrete guidance on how to restructure the Studify Self-Study Dashboard UC diagram correctly.
* **Prompt used:** "nói kĩ hơn về việc nhầm UC case diagram thành workflow, nên sửa như thế nào cho đúng?" ("Explain in more detail the mistake of confusing a Use Case Diagram with a Workflow, and how it should be corrected")
* **AI-generated content:**
  * Clarified the core distinction: a Use Case Diagram answers "WHAT can the Actor achieve" (independent goals), not "HOW/in what click-by-click order" — the latter belongs in the Basic/Alternative Flow of the Use Case Specification, or in a BPMN/Activity Diagram for cross-UC process views.
  * Listed 4 diagnostic signs of a diagram that is actually a workflow in disguise (include chains matching screen-click order; UC's that "can't happen" if a middle step is removed; UC names that read like screen/section titles rather than goals; UC's with no reuse potential).
  * Introduced a "stopping-point test" — asking whether the Learner has achieved a complete, independent value/goal if they stopped at that exact step — and applied it to distinguish true UCs ("Study a Lesson", "Track Learning Progress") from mere steps ("View Lesson Detail").
  * Proposed a concrete 4-step fix for the Studify diagram: (1) list the Learner's true top-level goals (3 root UCs: follow the roadmap, take a quiz, track progress); (2) collapse the roadmap → lesson-detail → theory screen sequence into the Basic Flow of a single "Follow the Learning Roadmap" UC; (3) keep "Take Quiz" as an independent UC since it's reusable/callable on its own, with Multiple-Choice/Fill-in-Blank kept as legitimate generalizations; (4) move "real-time completion % calculation" into a Post-Condition/Business Rule of "Track Learning Progress" instead of a separate UC.
* **Student's work and validation:**
  * Prompted for a deeper explanation after the initial review flagged this specific mistake, to fully understand the underlying UML principle before applying it.
  * Cross-checked the "stopping-point test" and the 4 diagnostic signs against the reference articles to confirm they matched the source material's intent rather than being invented reasoning.
  * Used the 4-step restructuring method to rebuild the actual Self-Study Dashboard UC diagram submitted for PA3-2026, adapting the root-goal list and Basic Flow content to match the real scope of the module rather than copying the AI's version verbatim.

**Prompt 3**
* **Tool:** Claude (Sonnet 5)
* **Purpose:** Get concrete, Studify-specific examples of correctly-applied `<<extend>>` and `<<generalization>>` relationships to reinforce the UML concepts covered in the earlier reviews.
* **Prompt used:** "cho ví dụ về extend và generalization trong các use case này" ("Give examples of extend and generalization within these use cases")
* **AI-generated content:**
  * Three `<<extend>>` examples grounded in Studify's actual scope, each with an explicit Extension Point: "View Review Suggestions" extending "View Quiz Result" (Extension Point: quiz score < 70%); "Speaking Practice" extending "Study Lesson" (Extension Point: lesson has a Speaking module, tying back to the earlier Azure Pronunciation API work); and "Receive Study Reminder" extending "Track Learning Progress" (Extension Point: inactive > 3 days).
  * Reiterated that every extend relationship must show its Extension Point directly on the diagram, unlike the original UC8→UC9 extend which had none.
  * Three `<<generalization>>` examples: the already-used Multiple-Choice/Fill-in-Blank as children of "Take Quiz"; a new Login example (Email Login / Google Login as children of "Login", matching Studify's existing JWT + Passport.js setup) with a note that this relationship is often left out of the diagram and handled in the specification's flows instead; and an Actor-level example (Free Learner / Premium Learner as children of Learner) explicitly framed as a future possibility, not a current requirement.
  * Explained the inheritance mechanic behind generalization — a child UC automatically inherits any include relationship of its parent without needing to redraw it.
  * Provided a summary comparison table contrasting Extend vs. Generalization across four dimensions: essence, whether it's optional, what must accompany it (Extension Point vs. none), and Studify-specific examples.
* **Student's work and validation:**
  * Requested examples applied specifically to the Studify use cases already under discussion, rather than generic UML examples.
  * Verified the extend/generalization definitions and the inheritance behavior against the reference articles to confirm correctness.
  * Selected which examples were realistic for the current project scope (e.g., recognized that Actor-level generalization for Free/Premium Learner was not yet applicable) versus which were forward-looking design notes, and used this judgment to decide what to actually include in the PA3-2026 UML specification versus what to leave as future considerations.

**Prompt 4**
* **Tool:** Claude (Sonnet 5)
* **Purpose:** Start syncing the lesson data displayed under the Studify roadmap with the backend — the level badge had already been synced via the placement test API, but the lesson nodes underneath were still showing hardcoded mock data.
* **Prompt used:** "ok giờ tôi muốn đồng bộ phần lesson ở phía dưới roadmap này, level thì đã đồng bộ từ placement test rồi" ("I now want to sync the lesson section below this roadmap — the level part is already synced from the placement test")
* **AI-generated content:** Observed that the roadmap UI was currently rendering "Lesson 1, 2, 3..." from hardcoded mock data rather than real backend data, and explained that before proposing any fix, it needed to see exactly where the frontend was currently pulling its lesson data from. Asked the student to paste the relevant frontend file (e.g. `RoadmapPage.jsx` or an equivalently named component) so the actual data-fetching logic could be inspected directly instead of guessed at.
* **Student's work and validation:** Framed the specific integration gap (level synced, lessons not yet synced) based on their own understanding of what had and hadn't been wired up in the codebase, and located and provided the requested frontend file in the next message so the AI could trace the real code path rather than work from assumptions.

**Prompt 5**
* **Tool:** Claude (Sonnet 5)
* **Purpose:** Confirm the exact shape of the data the roadmap should eventually consume, using a real sample `roadmap.json`, and get a precise read on whether the current frontend code was already fetching that data from the user or still working off static mock data.
* **Prompt used:** "ok vậy đây là mẫu roadmap.json mà web sẽ lấy từ người dùng, cái bây giờ tôi cần là biết code hiện tại có lấy data từ người dùng -> thu nhập nó theo dạng này -> sau đó xuất ra UI" ("Here's a sample roadmap.json the web app will get from the user — what I need now is to know whether the current code takes user data, shapes it into this format, and then renders it to the UI") [with a `roadmap.json` sample containing levels and level ranges pasted in]
* **AI-generated content:** Inspected the provided frontend code and reported that it was importing lesson/node data directly from a hardcoded JSON mock file via `import roadmapData from '../../../mocks/roadmap.json'`, meaning none of the lesson content was actually derived from the user or backend at all — it was static regardless of who was logged in or what their progress was.
* **Student's work and validation:** Supplied a real, project-specific `roadmap.json` sample as the target data contract rather than letting the AI assume a generic shape, and used the confirmation that lessons were still fully mocked as the trigger to plan out the real integration work themselves.

**Prompt 6**
* **Tool:** Claude (Sonnet 5)
* **Purpose:** Get a full picture of which parts of the roadmap feature were already wired to real data versus still mocked, what the correct end-to-end data flow should look like, and what concretely was blocking the sync, in order to plan the implementation.
* **Prompt used:** Continued from the same exchange as Prompt 05, digging further into the trace of the roadmap data flow.
* **AI-generated content:** Clarified that only the level badge fields (`assignedLevel`, `currentLevelTitle`) were backed by a real API call to `/placement-test/my-roadmap`, while all lesson/node data was still coming from the mock JSON with no connection to user data at all. Laid out the correct end-to-end flow that would be needed instead: placement test result → `assignedLevel` persisted somewhere durable → `GET /roadmap` called with the auth token → backend reads the user's `assignedLevel` together with their `UserProgress` → backend returns roadmap views annotated with the correct per-lesson status (completed/active/locked) → frontend renders that instead of the mock JSON. Alongside this, it flagged three concrete blockers found in the current implementation: `RoadmapService` was reading from `roadmap_levels`/`roadmap_lessons` tables in the database that were currently empty, the `assignedLevel` value obtained after the placement test was only being kept in in-memory storage (`userLevelStorage`) and would be lost on server restart, and the frontend had no API call at all wired up for fetching roadmap nodes. It also outlined the fastest viable direction to unblock this: drop the DB-backed `RoadmapService` approach in favor of reading lesson structure from a static `lesson.json` combined with the real `UserProgress` table in the database, deriving each lesson's status from that combination.
* **Student's work and validation:** Used the AI's trace as a diagnostic tool to fully understand where the current implementation was broken and why, rather than as a source of code - the three blockers and the proposed data flow were used purely as a reference to design and implement the actual sync logic (persisting `assignedLevel`, wiring the roadmap API call, and replacing the mock JSON) themselves, consistent with the project's rule of using AI only for consultation, not code generation.

**Screenshots/Chat History:** *See Appendix*

---

## Khánh Linh's AI Usage:

**Prompt 1**
* **Tool:** ChatGPT
* **Purpose:** (28/07/2026) Asked ChatGPT to explain how an API for submitting answers in the lesson/exercise grading feature should work, including the difference between submitting a single answer and submitting a whole practice session.
* **Prompt used:** *Not provided*
* **AI-generated content:** *Not provided*
* **Student's work and validation:** Improved understanding of the backend grading flow and the responsibilities of the controller, service, and question data.

**Prompt 2**
* **Tool:** ChatGPT
* **Purpose:** (29/07/2026) Asked how frontend code should interpret API response structures, such as `data.questions` versus `data.data.questions`.
* **Prompt used:** *Not provided*
* **AI-generated content:** *Not provided*
* **Student's work and validation:** Clarified how frontend state depends on the exact JSON structure returned by the backend.

**Prompt 3**
* **Tool:** ChatGPT
* **Purpose:** (29/07/2026) Asked about the avatar upload architecture — the roles of Multer, static assets, the controller/service/model relationship, database mapping, JWT-based user ownership, and frontend fallback avatars.
* **Prompt used:** *Not provided*
* **AI-generated content:** *Not provided*
* **Student's work and validation:** Clarified how uploaded user files are connected to backend storage, database records, and authenticated users.

**Prompt 4**
* **Tool:** ChatGPT
* **Purpose:** (30/07/2026) Asked how the forgot-password and OTP authentication flow works — controller/service responsibilities, DTO validation, OTP hashing, expiration time, deletion after use, Nodemailer, Gmail 2-Step Verification, and App Passwords.
* **Prompt used:** *Not provided*
* **AI-generated content:** *Not provided*
* **Student's work and validation:** Gained a complete understanding of the password-reset security flow and email authentication requirements.

**Prompt 5**
* **Tool:** ChatGPT
* **Purpose:** (06/08/2026) Asked how multiple-choice answers can be automatically graded while written answers should be treated differently and shown for review rather than automatically marked correct or incorrect.
* **Prompt used:** *Not provided*
* **AI-generated content:** *Not provided*
* **Student's work and validation:** Helped define separate grading behavior for objective and written questions.

**Screenshots/Chat History:** *See Appendix*

---

## Gia Phúc's AI Usage:

**Prompt 1**
* **Tool:** Copilot, GitHub via Visual Studio Code
* **Purpose:** Perform a rapid UI check across the codebase to identify visual bugs, broken components, and rendering defects without manually clicking through every individual page.
* **Prompt used:** List all the prominent UI errors that can currently be seen
* **AI-generated content:** Generated a list of detected visual defects and layout inconsistencies, along with their corresponding page.
* **Student's work and validation:** Manually navigate to each reported page to verify the errors flagged. Filtered out any false reports and created a plan to fix valid layout and styling issues.

**Prompt 2**
* **Tool:** Google Gemini
* **Purpose:** Analyze functional requirement F3.4 (Shared File Repository) within the Virtual Study Room module to get an idea of user interactions, file format restrictions, and role-based permissions.
* **Prompt used:** Phân hệ 3: Không gian Học nhóm (Virtual Study Room) giới hạn từ 2 - 5 người

F3.1: Quản lý Phòng học/Nhóm học (Group Management)
Tạo nhóm học tập mới (Hệ thống tự động cấp Mã Code nhóm).
Tham gia nhóm học tập thông qua Mã Code (Join via Code).

F3.2: Phân quyền Thành viên (Role Authorization)
Quyền Leader (Trưởng nhóm): Quản lý nhóm, giao việc, đăng tài liệu.
Quyền Member (Thành viên): Xem thông tin, nhận nhiệm vụ, tải tài liệu.

F3.3: Quản lý & Giao Nhiệm vụ (Task Assignment)
Đối với Leader: Tạo lịch học, tạo nhiệm vụ, đặt hạn chót (Deadline) cho nhóm.
Đối với Member: Nhận và xem danh sách nhiệm vụ cần làm thông qua một Widget thông báo hiển thị trực tiếp tại Dashboard cá nhân khi đăng nhập.

F3.4: Kho lưu trữ tài liệu chung (Shared File Repository)
Đăng tải tài liệu học tập bổ sung (Hỗ trợ định dạng PDF, hình ảnh).
Xem và tải về (Download) tài liệu do các thành viên khác chia sẻ.

F3.5: Real-time chat
Các thành viên có thể thảo luận với nhau trong một khung chat chung.

Explain the flow of going to the group's page and accessing the file repository and download/upload files

* **AI-generated content:** Generated a 4-step user interaction flow detailing group navigation, file repository views, upload constraints/validation (PDF/image formats, storage limits), preview/download mechanics, and real-time chat notification triggers.
* **Student's work and validation:** Verified the process steps to define the UI structure (Shared Files tab, previews , upload UI).

**Prompt 3**
* **Tool:** Google Gemini
* **Purpose:** Check a Mermaid UC diagram with a feedback to identify any violations and align the new model with standard UML practices.
* **Prompt used:** can you check if my UC mermaid model fit my professor's feedback? anything that need changing?
flowchart LR
    %% Actors
    Learner(["Learner"])
    AI["AI Engine"]

    %% System Boundary
    subgraph AI_Speaking_Assistant ["AI Speaking Assistant"]
        UC51(("UC5.1: Speech recognition"))
        UC52(("UC5.2: Generate appropriate reply"))
        UC53(("UC5.3: Evaluate performance on specific criteria"))
        UC54(("UC5.4: Provide guidance on how to improve"))
    end

    %% Primary Interactions
    Learner --> UC51
    Learner --> UC52

    %% Relationships
    UC52 -. "<<include>>" .-> UC51
    UC53 -. "<<include>>" .-> UC51
    UC54 -. "<<extend>>" .-> UC53

    %% Secondary Actor Interactions
    UC51 --> AI
    UC52 --> AI
    UC53 --> AI
    UC54 --> AIcan you check this feedback if my mermaid model fit the criticise?
flowchart LR
    %% Actors
    Learner(["Learner"])
    AI["AI Engine"]

    %% System Boundary
    subgraph AI_Speaking_Assistant ["AI Speaking Assistant"]
        UC51(("UC5.1: Speech recognition"))
        UC52(("UC5.2: Generate appropriate reply"))
        UC53(("UC5.3: Evaluate performance on specific criteria"))
        UC54(("UC5.4: Provide guidance on how to improve"))
    end

    %% Primary Interactions
    Learner --> UC51
    Learner --> UC52

    %% Relationships
    UC52 -. "<<include>>" .-> UC51
    UC53 -. "<<include>>" .-> UC51
    UC54 -. "<<extend>>" .-> UC53

    %% Secondary Actor Interactions
    UC51 --> AI
    UC52 --> AI
    UC53 --> AI
    UC54 --> AI 
* **AI-generated content:** Analyzed the diagram against standard UML rules, identified anti-patterns such as functional decomposition and overuse of <<include>> relationships. Provided concrete refactoring suggestions to group low-level mechanics into goal-oriented use cases.
* **Student's work and validation:** Reviewed the critique against the current diagram. Verified which suggestions addressed the correct design flaws, updated the Mermaid diagram.

**Screenshots/Chat History:** *See Appendix*

---

## Thiên Phước's AI Usage:

**Prompt 1**
* **Tool:** Antigravity AI (Gemini / Claude via IDE assistant)
* **Purpose:** Review and improve the C4 Model Level 3 (Component Diagram) document — identify missing container descriptions, inappropriate feature selection, and incomplete component diagrams; then generate a fully revised document that accurately reflects the actual source code.
* **Prompt used:**

  > Đọc kĩ nhiệm vụ và yêu cầu dưới đây, có vấn đề gì về file C4 Model - Level 3 (Component Diagram).md không? Thiếu sót, thiếu diagram cho chức năng quan trọng nào không?
  >
  > C4 Model - Level 3 (Component Diagram): draw Component diagrams following the C4 Model for both the frontend and backend containers. Each diagram zooms into a container to show the major components inside it, their responsibilities, and the interactions between them. You are not required to draw Level 3 diagrams for every feature; instead, focus on the most important features that best represent the internal structure of each container.
  >
  > Requirements:
  > All diagrams must be drawn using Mermaid format. You may use standard Mermaid flowchart/graph syntax with C4-style labeling (Mermaid's experimental C4 syntax is not required).
  > For each container, provide a written description of:
  > Its responsibility and the services it provides.
  > The technology/framework used.
  > How it communicates with other containers (e.g., HTTP/HTTPS, WebSocket, database connection).
  > For each component in the Level 3 diagram, describe its responsibility and its relationships with other components.
  > Warning: The architecture diagrams must accurately reflect your actual implementation at the time of submission. Any inconsistency between the documented architecture and the source code will result in a grade penalty.
  >
  > As you continue implementing features, you must keep the architecture document up to date.

* **AI-generated content:** The AI reviewed the existing Level 3 diagram, identified two key problems: (1) missing Container Descriptions (Responsibility, Technology, Communication) required by the spec; (2) only Authentication was documented, which is too generic and does not showcase the system's unique architecture. The AI then read the actual source code across the entire codebase and rewrote the complete Level 3 document covering two features — **Authentication & Onboarding (Frontend)** and **Authentication & Placement Test (Backend)** — with accurate Mermaid diagrams and full component descriptions for all 11 real components found in the code.
* **Student's work and validation:** Reviewed the AI's analysis and confirmed the identified issues were correct. Verified that all component names, file paths, API endpoints, and inter-component relationships in the generated diagrams match the actual source code (e.g., `useAuthStore.ts`, `PlacementTestService`, `JwtGuard`, `ProgressService`). Validated the correctness of the Smart Onboarding algorithm description and the MailService / Gmail SMTP dependency.

**Screenshots/Chat History:** *See Appendix*

**Prompt 2**
* **Tool:** Antigravity AI (Gemini / Claude via IDE assistant)
* **Purpose:** Analyze TA's feedback on PA3, refactor the Module 4 Use Case Model (Mermaid) to resolve "Functional Decomposition" (workflow abuse), merge fragmented Use Case Specifications, and correct duplicate IDs and image references.
* **Prompt used:**

  > trưởng nhóm giao là mỗi thành viên tự sửa lại phần của mình đã làm trong PA3, trong đó thì mình đã làm Usecase cho module 4 ở phần D. Bạn phân tích kỹ xem mình có cần sửa gì dựa vào feedback của thầy không?

* **AI-generated content:** The AI reviewed the existing `report.md` and 10 fragmented specification files in `Module_4`. It identified that the use cases were inappropriately broken down into workflow steps (`include` abuse) and had duplicate IDs. It generated an implementation plan and then refactored the 10 files into 3 comprehensive specifications (`M4-UC1`, `M4-UC2`, `M4-UC3`), updated the Mermaid diagram, and correctly linked all UI prototype images.
* **Student's work and validation:** Reviewed the AI's analysis and the refactored use cases to ensure they adhere to UML standards and correctly represent the intended Module 4 functionality. Verified that the image paths were correct and the Mermaid diagram rendered properly.

**Screenshots/Chat History:** *See Appendix*

---

## Minh Thư's AI Usage:

**Prompt 1**
* **Tool:** Gemini 3.6 Thinking
* **Purpose:** Debugging Pomodoro timer state logic in TypeScript/Zustand (fixing a 2-second countdown skip issue and updating default mode reset behavior).
* **Prompt used:** "kiểm tra xem vì sao khi bắt đầu, nó bị trừ 2s? tức là từ 1 phút, nó không xuống 59s mà xuống thẳng 58s. và t muốn chỉnh sửa thêm: khi ấn refresh timer hay reload gì đấy, nó sẽ tự động quay về mode focus chứ không phải relax" [accompanied by the TypeScript Zustand store code]
* **AI-generated content:** 
  *  Explanation of root cause: Using Math.floor alongside event loop execution delays in setInterval(1000) caused $58.99\text{s}$ to round down immediately to $58\text{s}$. 
  *  Refactored TypeScript code replacing Math.floor with Math.ceil, increasing interval frequency to $200\text{ms}$ for smooth accuracy, and modifying resetTimer and getInitialStorage to always default to "focus" mode upon reload or reset.
* **Student's work and validation:** 
  * Provided original application code and pinpointed specific UI/UX bugs (timer skipping from 01:00 straight to 00:58 and unexpected session retention on reload).
  * Validated the suggested fix by testing the countdown behavior to ensure smooth decrement from 01:00 $\rightarrow$ 00:59, verifying interval accuracy, and confirming the store correctly resets to "focus" mode on page refresh.

**Prompt 2**
* **Tool:** Gemini 3.6 Thinking
* **Purpose:** Maintain Pomodoro timer state and browser tab title updates across route transitions (e.g., navigating from /dashboard/pomodoro to /dashboard).
* **Prompt used:** "useEffect(() => { ... }) cái này, t muốn khi người dùng di chuyển sang tab khác trong studify (vdu: đường dẫn hiện tại là /dashboard/pomodoro, khi user di chuyển qua đường dẫn /dashboard thì vẫn sẽ hiện giống vậy)"
* **AI-generated content:** Explanation of component unmounting during route changes and a solution architecture converting the custom hook into a global React Context (PomodoroContext.tsx).
* **Student's work and validation:** Provided original useEffect title update code; reviewed the Context approach and decided to explore popup/widget options before committing to implementation.

**Prompt 3**
* **Tool:** Gemini 3.6 Thinking
* **Purpose:** Debug a React default import vs. named export error.
* **Prompt used:** "Uncaught SyntaxError: The requested module '/src/features/pomodoro/PomodoroTimer.ts' does not provide an export named 'default' (at App.tsx:26:8)"
* **AI-generated content:** Explained default vs. named exports and provided two fixes: adding export default to the component file or using named imports { Pomodoro } in App.tsx.
* **Student's work and validation:** Caught the runtime error in browser dev tools and applied the export/import syntax fix.

**Screenshots/Chat History:** *See Appendix*

---

# Appendix: AI Usage Proof

## Kim Hằng

**Prompt 1**
![](./evidence/hang_screenshots/hang_1a.png)
![](./evidence/hang_screenshots/hang_1b.png)
![](./evidence/hang_screenshots/hang_1c.png)

**Prompt 2**
![](./evidence/hang_screenshots/hang_2a.png)
![](./evidence/hang_screenshots/hang_2b.png)
![](./evidence/hang_screenshots/hang_2c.png)

**Prompt 3**
![](./evidence/hang_screenshots/hang_3a.png)
![](./evidence/hang_screenshots/hang_3b.png)
![](./evidence/hang_screenshots/hang_3c.png)
![](./evidence/hang_screenshots/hang_3d.png)
![](./evidence/hang_screenshots/hang_3e.png)

**Prompt 4**
![](./evidence/hang_screenshots/hang_4.png)

**Prompt 5**
![](./evidence/hang_screenshots/hang_5.png)

**Prompt 6**
![](./evidence/hang_screenshots/hang_6a.png)
![](./evidence/hang_screenshots/hang_6b.png)

## Khánh Linh

**Prompt 1**
![](./evidence/klinh_screenshots/klinh_1a.png)
![](./evidence/klinh_screenshots/klinh_1b.png)
![](./evidence/klinh_screenshots/klinh_1c.png)

**Prompt 2**
![](./evidence/klinh_screenshots/klinh_2.png)

**Prompt 3**
![](./evidence/klinh_screenshots/klinh_3a.png)
![](./evidence/klinh_screenshots/klinh_3b.png)
![](./evidence/klinh_screenshots/klinh_3c.png)

**Prompt 4**
![](./evidence/klinh_screenshots/klinh_4a.png)
![](./evidence/klinh_screenshots/klinh_4b.png)
![](./evidence/klinh_screenshots/klinh_4c.png)

**Prompt 5**
![](./evidence/klinh_screenshots/klinh_5a.png)
![](./evidence/klinh_screenshots/klinh_5b.png)

## Gia Phúc

**Prompt 1**
![](./evidence/phuc_screenshots/phuc_1.png)

**Prompt 2**
![](./evidence/phuc_screenshots/phuc_2.1.png)
![](./evidence/phuc_screenshots/phuc_2.2.png)
![](./evidence/phuc_screenshots/phuc_2.3.png)
![](./evidence/phuc_screenshots/phuc_2.4.png)

**Prompt 3**
![](./evidence/phuc_screenshots/phuc_3.1.png)
![](./evidence/phuc_screenshots/phuc_3.2png)

## Thiên Phước

**Prompt 1**
![Phuoc AI Usage - Screenshot 1a](./evidence/phuoc_screenshots/phuoc_1a.png)
![Phuoc AI Usage - Screenshot 1b](./evidence/phuoc_screenshots/phuoc_1b.png)

**Prompt 2**
![Phuoc AI Usage - Screenshot 2a](./evidence/phuoc_screenshots/phuoc_2a.png)
![Phuoc AI Usage - Screenshot 2b](./evidence/phuoc_screenshots/phuoc_2b.png)

## Minh Thư

**Prompt 1**
![alt text](./evidence/thu_screenshots/thu_1.png)

**Prompt 2**
![alt text](./evidence/thu_screenshots/thu_2.png)

**Prompt 3**
![alt text](./evidence/thu_screenshots/thu_3.png)
