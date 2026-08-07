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
**Prompt 01**
* Tool: Claude (Sonnet 5)
* Purpose: Review a Mermaid Use Case Diagram for the "Self-Study Dashboard" subsystem based on two reference articles covering common Use Case Diagram mistakes and how to write effective Use Case Specifications.
* Prompt used: "dựa vào hai nguồn trên [thinhnotes.com – Use Case Diagram và 5 sai lầm thường gặp; thinhnotes.com – Viết đặc tả Use Case sao đơn giản nhưng hiệu quả], hãy review đoạn code mermaid này" ("Based on the two sources above, please review this Mermaid diagram code") [with the original Mermaid code attached, containing 11 use cases (UC1–UC11) and include/extend/generalization relationships between the Learner actor and the Self-Study Dashboard system]
* AI-generated content:
  * Identified naming issues (UC6, UC7 used noun phrases instead of the Verb + Noun convention; UC1, UC2 had overly long names with parenthetical notes).
  * Flagged misuse of the `<<include>>` relationship to decompose a screen-navigation flow (How) instead of extracting genuinely reusable functionality (What), and pointed out that the include direction was logically backwards (UC1 including UC2, UC2 including UC3).
  * Recommended merging UC9–UC10–UC11 (Track Progress → View % → Calculate %) into a single UC, moving the real-time percentage calculation into a Business Rule/NFR of the specification instead of a separate UC.
  * Pointed out that the `<<extend>>` relationship between UC8 and UC9 lacked an Extension Point and was semantically mismatched (closer to a Trigger/Post-condition than an extend), with an example of a correctly-used extend relationship.
  * Identified a conflict between a direct actor association (Learner → UC3) and an include relationship (UC2 include UC3) reaching the same UC.
  * Noted that 11 UCs exceeded the recommended guideline and that UCs were inconsistently mixed across requirement levels (business-level vs. implementation-level).
* Student's work and validation:
  * Supplied the original Mermaid diagram and the two reference articles as the basis for comparison.
  * Cross-checked each point raised by the AI against the source articles to confirm accuracy (e.g., verifying the definitions of include/extend and UC naming conventions).
  * Selectively applied the suggested revisions to the final UML diagram submitted for the Self-Study Dashboard specification (PA3-2026), adjusting further to fit the module's actual scope.



**Prompt 02**
* Tool: Claude (Sonnet 5)
* Purpose: Get a deeper explanation of the "Use Case Diagram mistaken for Workflow" mistake identified in the previous review, and concrete guidance on how to restructure the Studify Self-Study Dashboard UC diagram correctly.
* Prompt used: "nói kĩ hơn về việc nhầm UC case diagram thành workflow, nên sửa như thế nào cho đúng?" ("Explain in more detail the mistake of confusing a Use Case Diagram with a Workflow, and how it should be corrected")
* AI-generated content:
  * Clarified the core distinction: a Use Case Diagram answers "WHAT can the Actor achieve" (independent goals), not "HOW/in what click-by-click order" — the latter belongs in the Basic/Alternative Flow of the Use Case Specification, or in a BPMN/Activity Diagram for cross-UC process views.
  * Listed 4 diagnostic signs of a diagram that is actually a workflow in disguise (include chains matching screen-click order; UC's that "can't happen" if a middle step is removed; UC names that read like screen/section titles rather than goals; UC's with no reuse potential).
  * Introduced a "stopping-point test" - asking whether the Learner has achieved a complete, independent value/goal if they stopped at that exact step - and applied it to distinguish true UCs ("Study a Lesson", "Track Learning Progress") from mere steps ("View Lesson Detail").
  * Proposed a concrete 4-step fix for the Studify diagram: (1) list the Learner's true top-level goals (3 root UCs: follow the roadmap, take a quiz, track progress); (2) collapse the roadmap → lesson-detail → theory screen sequence into the Basic Flow of a single "Follow the Learning Roadmap" UC; (3) keep "Take Quiz" as an independent UC since it's reusable/callable on its own, with Multiple-Choice/Fill-in-Blank kept as legitimate generalizations; (4) move "real-time completion % calculation" into a Post-Condition/Business Rule of "Track Learning Progress" instead of a separate UC.
* Student's work and validation:
  * Prompted for a deeper explanation after the initial review flagged this specific mistake, to fully understand the underlying UML principle before applying it.
  * Cross-checked the "stopping-point test" and the 4 diagnostic signs against the reference articles to confirm they matched the source material's intent rather than being invented reasoning.
  * Used the 4-step restructuring method to rebuild the actual Self-Study Dashboard UC diagram submitted for PA3-2026, adapting the root-goal list and Basic Flow content to match the real scope of the module rather than copying the AI's version verbatim.

**Prompt 03**
* Tool: Claude (Sonnet 5)
* Purpose: Get concrete, Studify-specific examples of correctly-applied `<<extend>>` and `<<generalization>>` relationships to reinforce the UML concepts covered in the earlier reviews.
* Prompt used: "cho ví dụ về extend và generalization trong các use case này" ("Give examples of extend and generalization within these use cases")
* AI-generated content:
  * Three `<<extend>>` examples grounded in Studify's actual scope, each with an explicit Extension Point: "View Review Suggestions" extending "View Quiz Result" (Extension Point: quiz score < 70%); "Speaking Practice" extending "Study Lesson" (Extension Point: lesson has a Speaking module, tying back to the earlier Azure Pronunciation API work); and "Receive Study Reminder" extending "Track Learning Progress" (Extension Point: inactive > 3 days).
  * Reiterated that every extend relationship must show its Extension Point directly on the diagram, unlike the original UC8→UC9 extend which had none.
  * Three `<<generalization>>` examples: the already-used Multiple-Choice/Fill-in-Blank as children of "Take Quiz"; a new Login example (Email Login / Google Login as children of "Login", matching Studify's existing JWT + Passport.js setup) with a note that this relationship is often left out of the diagram and handled in the specification's flows instead; and an Actor-level example (Free Learner / Premium Learner as children of Learner) explicitly framed as a future possibility, not a current requirement.
  * Explained the inheritance mechanic behind generalization — a child UC automatically inherits any include relationship of its parent without needing to redraw it.
  * Provided a summary comparison table contrasting Extend vs. Generalization across four dimensions: essence, whether it's optional, what must accompany it (Extension Point vs. none), and Studify-specific examples.
* Student's work and validation:
  * Requested examples applied specifically to the Studify use cases already under discussion, rather than generic UML examples.
  * Verified the extend/generalization definitions and the inheritance behavior against the reference articles to confirm correctness.
  * Selected which examples were realistic for the current project scope (e.g., recognized that Actor-level generalization for Free/Premium Learner was not yet applicable) versus which were forward-looking design notes, and used this judgment to decide what to actually include in the PA3-2026 UML specification versus what to leave as future considerations.

**Prompt 04**
* Tool: Claude (Sonnet 5)
* Purpose: Start syncing the lesson data displayed under the Studify roadmap with the backend — the level badge had already been synced via the placement test API, but the lesson nodes underneath were still showing hardcoded mock data.
* Prompt used: "ok giờ tôi muốn đồng bộ phần lesson ở phía dưới roadmap này, level thì đã đồng bộ từ placement test rồi" ("I now want to sync the lesson section below this roadmap — the level part is already synced from the placement test")
* AI-generated content: Observed that the roadmap UI was currently rendering "Lesson 1, 2, 3..." from hardcoded mock data rather than real backend data, and explained that before proposing any fix, it needed to see exactly where the frontend was currently pulling its lesson data from. Asked the student to paste the relevant frontend file (e.g. `RoadmapPage.jsx` or an equivalently named component) so the actual data-fetching logic could be inspected directly instead of guessed at.
* Student's work and validation: Framed the specific integration gap (level synced, lessons not yet synced) based on their own understanding of what had and hadn't been wired up in the codebase, and located and provided the requested frontend file in the next message so the AI could trace the real code path rather than work from assumptions.

**Prompt 05**
* Tool: Claude (Sonnet 5)
* Purpose: Confirm the exact shape of the data the roadmap should eventually consume, using a real sample `roadmap.json`, and get a precise read on whether the current frontend code was already fetching that data from the user or still working off static mock data.
* Prompt used: "ok vậy đây là mẫu roadmap.json mà web sẽ lấy từ người dùng, cái bây giờ tôi cần là biết code hiện tại có lấy data từ người dùng -> thu nhập nó theo dạng này -> sau đó xuất ra UI" ("Here's a sample roadmap.json the web app will get from the user — what I need now is to know whether the current code takes user data, shapes it into this format, and then renders it to the UI") [with a `roadmap.json` sample containing levels and level ranges pasted in]
* AI-generated content: Inspected the provided frontend code and reported that it was importing lesson/node data directly from a hardcoded JSON mock file via `import roadmapData from '../../../mocks/roadmap.json'`, meaning none of the lesson content was actually derived from the user or backend at all — it was static regardless of who was logged in or what their progress was.
* Student's work and validation: Supplied a real, project-specific `roadmap.json` sample as the target data contract rather than letting the AI assume a generic shape, and used the confirmation that lessons were still fully mocked as the trigger to plan out the real integration work themselves.

**Prompt 06**
* Tool: Claude (Sonnet 5)
* Purpose: Get a full picture of which parts of the roadmap feature were already wired to real data versus still mocked, what the correct end-to-end data flow should look like, and what concretely was blocking the sync, in order to plan the implementation.
* Prompt used: Continued from the same exchange as Prompt 05, digging further into the trace of the roadmap data flow.
* AI-generated content: Clarified that only the level badge fields (`assignedLevel`, `currentLevelTitle`) were backed by a real API call to `/placement-test/my-roadmap`, while all lesson/node data was still coming from the mock JSON with no connection to user data at all. Laid out the correct end-to-end flow that would be needed instead: placement test result → `assignedLevel` persisted somewhere durable → `GET /roadmap` called with the auth token → backend reads the user's `assignedLevel` together with their `UserProgress` → backend returns roadmap views annotated with the correct per-lesson status (completed/active/locked) → frontend renders that instead of the mock JSON. Alongside this, it flagged three concrete blockers found in the current implementation: `RoadmapService` was reading from `roadmap_levels`/`roadmap_lessons` tables in the database that were currently empty, the `assignedLevel` value obtained after the placement test was only being kept in in-memory storage (`userLevelStorage`) and would be lost on server restart, and the frontend had no API call at all wired up for fetching roadmap nodes. It also outlined the fastest viable direction to unblock this: drop the DB-backed `RoadmapService` approach in favor of reading lesson structure from a static `lesson.json` combined with the real `UserProgress` table in the database, deriving each lesson's status from that combination.
* Student's work and validation: Used the AI's trace as a diagnostic tool to fully understand where the current implementation was broken and why, rather than as a source of code - the three blockers and the proposed data flow were used purely as a reference to design and implement the actual sync logic (persisting `assignedLevel`, wiring the roadmap API call, and replacing the mock JSON) themselves, consistent with the project's rule of using AI only for consultation, not code generation.


**Screenshots/Chat History:** *See Appendix*

---

## Khánh Linh's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Gia Phúc's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Thiên Phước's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Minh Thư's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

# Appendix: AI Usage Proof

## Kim Hằng

--

## Khánh Linh

--

## Gia Phúc

--

## Thiên Phước

--

# Minh Thư
