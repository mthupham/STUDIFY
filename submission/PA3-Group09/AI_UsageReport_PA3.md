# AI Usage Report – PA3 (Group 01)

## Table of Contents

- [AI Usage in PA3](#ai-usage-in-pa3)
  - [Kim Hằng's AI Usage](#kim-hằngs-ai-usage)
  - [Gia Phúc's AI Usage](#gia-phúcs-ai-usage)
  - [Khánh Linh's AI Usage](#khánh-linhs-ai-usage)
  - [Thiên Phước's AI Usage](#thiên-phướcs-ai-usage)
  - [Minh Thư's AI Usage](#minh-thưs-ai-usage)
- [Appendix: AI Usage Proof](#appendix-ai-usage-proof)
  - [Kim Hằng](#kim-hằng)
    - [KH.1](#kh1)
    - [KH.2](#kh2)
    - [KH.3](#kh3)
    - [KH.4](#kh4)
    - [KH.5](#kh5)
  - [Gia Phúc](#gia-phúc)
    - [GP.1](#gp1)
    - [GP.2](#gp2)
  - [Khánh Linh](#khánh-linh)
    - [KL.1](#kl1)
    - [KL.2](#kl2)
    - [KL.3](#kl3)
    - [KL.4](#kl4)
    - [KL.5](#kl5)
  - [Thiên Phước](#thiên-phước)
    - [TP.1](#tp1)
    - [TP.2](#tp2)
    - [TP.3](#tp3)
    - [TP.4](#tp4)
  - [Minh Thư](#minh-thư)
    - [MT.1](#mt1)
    - [MT.2](#mt2)
    - [MT.3](#mt3)

---

# AI Usage in PA3

## Kim Hằng's AI Usage:

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 09:48 on July 23, 2026, prompt: [Pasted the incremental-compilation error log from the terminal, showing: "error TS2304: Cannot find name 'RoadmapModule'", "error TS2304: Cannot find name 'LessonModule'", and three "error TS2612: Property 'id' will overwrite the base property in 'Model<any, any>'" errors], used to diagnose a batch of NestJS/TypeScript compilation errors that appeared after adding the Roadmap and Lesson modules and their Sequelize models to the backend; AI split the diagnosis into two parts — (1) it identified that `RoadmapModule` and `LessonModule` were referenced in `app.module.ts`'s `imports` array without being imported at the top of the file, and provided the exact `import` statements to add; (2) it explained that the `TS2612` errors were caused by Sequelize-TypeScript's `strict` mode conflicting with the base `Model` class's built-in `id` property, and recommended adding the `declare` modifier in front of each `id` property declaration; student pasted the actual compiler error output, decided to fix the import errors first, then applied the `declare` modifier fix afterward, and verified each suggested file path against the actual project structure before applying changes.

**Screenshots:** *See Appendix [KH.1](#kh1)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 09:52 on July 23, 2026, prompt: [Shared the current, partly-commented-out import/module block in app.module.ts and asked why the "Cannot find name" errors were still occurring even though the import syntax looked correct], used to verify whether the `RoadmapModule`/`LessonModule` files actually existed at the expected paths and correctly exported their classes, since the import syntax itself appeared valid; AI explained that a `TS2304` error despite correct import syntax usually means the target file doesn't exist or doesn't `export` the class, listed the exact expected file paths, and showed a correct minimal `@Module` + `export class` example for reference; student checked the project folder structure against the paths the AI listed, confirmed the two module files existed, and fixed a missing `export` keyword in one of them based on the AI's explanation.

**Screenshots:** *See Appendix [KH.2](#kh2)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 09:59 on July 23, 2026, prompt: [Pasted an updated terminal compilation log showing only the three "TS2612: Property 'id' will overwrite the base property" errors remaining, after the module/import errors had been fixed], used to confirm the earlier import fix had resolved the module errors and to get the exact remaining fix needed for the Sequelize-TypeScript `id` property warnings; AI confirmed the two module errors were gone and provided a precise before/after code change for each of the three affected model files (`grammar-item.model.ts`, `lesson.model.ts`, `vocabulary-item.model.ts`), instructing to add the `declare` keyword directly before each `id` property while keeping existing decorators unchanged; student applied the exact `declare id: ...;` change to all three model files as instructed, then re-ran the compiler to confirm the errors were resolved.

**Screenshots:** *See Appendix [KH.3](#kh3)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 10:00 on July 23, 2026, prompt: [Pasted an npm error log: "npm error code EJSONPARSE... Invalid package.json: JSONParseError: Expected property name or '}' in JSON at position 236 (line 13 column 1) while parsing near '...\"dependencies\": {\r\n<<<<<<< HEAD\r\n...'"], used to diagnose why `npm install` was failing with a JSON parse error immediately after pulling/merging changes from a teammate's branch; AI identified that the error was caused by unresolved Git merge-conflict markers (`<<<<<<< HEAD`, `=======`, `>>>>>>>`) left inside `package.json` after a merge, and walked through the steps to locate the conflict markers, manually merge the two competing dependency lists into one valid JSON object, and re-validate the file's JSON syntax; student located the conflict markers in `package.json`, merged the dependency lists manually following the AI's guidance, removed the Git markers, and re-ran `npm install` to confirm the fix worked.

**Screenshots:** *See Appendix [KH.4](#kh4)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 10:34 on July 23, 2026, prompt: "tôi muốn database cả hai máy dc đồng bộ với nhau nên mới kết nối chung mật khẩu như vậy", used to get clarification on the correct way to share/synchronize the team's PostgreSQL database between two teammates' machines, after configuring both machines' `.env` files with the same database password; AI pointed out that using the same password on both machines does not synchronize the databases — since `DB_HOST=localhost` was set in the `.env`, each machine's app would always connect to its own locally running PostgreSQL instance regardless of the password; it explained that true synchronization requires both machines to connect to one single shared PostgreSQL server (either one teammate's machine acting as host, or a cloud-hosted database); student understood the root architectural misunderstanding based on the AI's explanation and decided to reconfigure the `.env` file to point to a single shared database host instead of `localhost`.

**Screenshots:** *See Appendix [KH.5](#kh5)*

---

## Gia Phúc's AI Usage:

- *Copilot.* Copilot, GitHub via Visual Studio Code, accessed 21:45 on July 20, 2026, prompt: "Where can i find the styles of these 3 string: 'Set your pace', 'Do you know your current English level?', 'Choose the correct preposition: She's interested\_\_\_\_\_learning new languages.'", used to search for the location of these texts' styling rules in the codebase; AI provided the exact style file locations for each string, student then customized the styles to make the text fit the page's general visual design.

**Screenshots:** *See Appendix [GP.1](#gp1)*

- *Google Gemini.* Gemini (version not specified), Google, gemini.google.com, accessed 23:15 on July 22, 2026, prompt: "Using mermaid, write the code to draw a diagram of this use case: Learner – UC5.1: Speech recognition, UC5.2: Convert speech to text => Give the appropriate reply, UC5.3: Evaluate performance on specific criteria, UC5.4: Provide guidance on how to improve – AI", used to generate a Mermaid diagram for the use case; AI provided the complete Mermaid code to draw the diagram, student checked that the rendered diagram matched the description and adjusted if needed.

**Screenshots:** *See Appendix [GP.2](#gp2)*

---

## Khánh Linh's AI Usage:

- *Gemini Pro.* Gemini Pro, Google, accessed 14:00 on July 20, 2026, prompt: "How to connect the Placement Test interface with the Backend API?", used to understand the integration approach between the frontend Placement Test UI and the NestJS backend; AI explained the API call structure and required request/response format, student implemented the connection based on the guidance and validated it against the actual backend endpoints.

**Screenshots:** *See Appendix [KL.1](#kl1)*

- *Gemini Pro.* Gemini Pro, Google, accessed on July 21, 2026, prompt: "How to fix a Sequelize configuration error and a database connection issue?", used to diagnose a Sequelize ORM misconfiguration that was preventing the database from connecting; AI identified the root cause and suggested the corrected configuration parameters, student applied the fix and verified the connection was successfully established.

**Screenshots:** *See Appendix [KL.2](#kl2)*

- *Gemini Pro.* Gemini Pro, Google, accessed on July 22, 2026, prompt: "How to fix a Tailwind CSS configuration error?", used to resolve a Tailwind CSS build error that was breaking the frontend styling pipeline; AI explained the misconfiguration in the Tailwind config file and provided the corrected setup, student applied the fix and confirmed the styles were rendering correctly.

**Screenshots:** *See Appendix [KL.3](#kl3)*

- *Gemini Pro.* Gemini Pro, Google, accessed on July 23, 2026, prompt: "How to design a Roadmap API based on the database data?", used to plan the structure of a Roadmap API endpoint, including how to query and shape relational database data into a hierarchical roadmap response; AI suggested an approach for structuring the API and response format, student reviewed the suggestion against the project's database schema and implemented the endpoint accordingly.

**Screenshots:** *See Appendix [KL.4](#kl4)*

- *Gemini Pro.* Gemini Pro, Google, accessed on July 24, 2026, prompt: "How to build the API for scoring the Placement Test?", used to design the scoring logic and API endpoint for the Placement Test feature; AI explained a general approach for scoring logic, response structure, and grading calculation, student independently implemented the scoring algorithm based on the project's specific test criteria and validated the results against expected outputs.

**Screenshots:** *See Appendix [KL.5](#kl5)*

---

## Thiên Phước's AI Usage:

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 10:30 on July 23, 2026, prompt: "Dựa trên file template.md và danh sách Use Case ở trên, hãy tạo lần lượt các file UC1_spec.md, UC2_spec.md, ..., tương ứng với từng Use Case và đặt trong folder D:\HCMUS\Year 2\HK3\IntroSE\STUDIFY\submission\PA3-Group09\D.UseCaseSpecification\Module_4. Với mỗi file: Tuân thủ hoàn toàn cấu trúc của template.md. Điền đầy đủ thông tin (logic, đầy đủ, chi tiết) dựa trên Use Case tương ứng để tôi có thể đưa các specification này vào Stitch để tạo UI sau này. Đảm bảo tính nhất quán giữa các Use Case. Xuất mỗi file dưới dạng một khối Markdown riêng.", used to automatically generate complete Use-Case Specification files (UC1_spec.md through UC10_spec.md) for Module 4 of the STUDIFY project, based on a provided RUP template and the list of use cases from the use-case diagram; AI created 10 structured Markdown specification files, each following the RUP template with fields such as Brief Description, Basic Flow, Alternative Flows, Special Requirements, Preconditions, Postconditions, and Extension Points tailored to each use case; student supplied the use-case list, the template file, and the target directory, then reviewed each generated file for logical accuracy and cross-checked with the use-case diagram relationships (include/extend), correcting inconsistencies where the AI's descriptions did not align with the diagram structure.

**Screenshots:** *See Appendix [TP.1](#tp1)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 11:15 on July 23, 2026, prompt: "giờ mình sẽ đính kèm lần lượt mỗi file Use-case specification cho stitch, giờ cần prompt như thế nào nhỉ", used to get a recommended prompt template for interacting with Google Stitch (an AI-powered UI design tool) when attaching each Use-Case Specification file, so that Stitch generates UI screens consistent with the specifications; AI produced a detailed reusable prompt template for Stitch including role framing, design requirements (dark-mode, teal/blue-purple palette, Inter typography), and a list of required UI elements; student evaluated the suggested template and adopted it as-is for Stitch sessions after reading through all the requirements it specified.

**Screenshots:** *See Appendix [TP.2](#tp2)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 14:00 on July 23, 2026, prompt: "Sắp xếp lại danh sách use-case theo work flow đi", used to reorganize the 10 use cases of Module 4 into a logical workflow order reflecting how a real user would interact with the system, in order to determine the most sensible sequence for attaching spec files to Stitch; AI reorganized the use cases into three workflow phases (Phase 1 – Tạo Flashcard, Phase 2 – Học Flashcard, Phase 3 – Hỗ trợ học tập) and generated a workflow diagram illustrating dependencies and branching; student reviewed the proposed phases against the use-case diagram and confirmed the grouping before applying this ordering when batching spec files for Stitch input.

**Screenshots:** *See Appendix [TP.3](#tp3)*

- *Antigravity (Claude Sonnet 4.5).* Claude Sonnet 4.5, Antigravity IDE by Google DeepMind, accessed 16:30 on July 23, 2026, prompt: "Tôi nên đính kèm 1 lúc những file UC spec nào cho stitch?", used to determine the optimal grouping of UC specification files to attach to Stitch in a single session so that Stitch generates coherent, context-aware UI screens; AI recommended grouping into three batches based on include/extend relationships: Batch 1 – Flashcard Creation Screen (UC5, UC1, UC2, UC3, UC8), Batch 2 – Study Session Screen (UC6, UC4, UC9, UC10), Batch 3 – Pomodoro Timer Widget (UC7 alone); student applied this batching strategy directly when working with Stitch and confirmed the reasoning against the use-case model diagram before finalizing.

**Screenshots:** *See Appendix [TP.4](#tp4)*

---

## Minh Thư's AI Usage:

- *ChatGPT.* GPT-5.5, OpenAI, ChatGPT web application, accessed 15:28 on July 20, 2026, prompt: "Based on the project requirements and the existing project documentation, help me organize and improve the structure of the report. Identify which sections should be included, suggest a logical order, and make the content clear and consistent with a software engineering project. Do not invent project information that is not provided.", used to obtain suggestions for organizing the project's documentation and improving the overall structure of the report; AI suggested possible document structures, section organization, and improvements in wording and consistency; student reviewed the suggested structure and selected only the parts appropriate for the actual project, then independently wrote and verified all project-specific information without directly submitting any AI-generated content.

**Screenshots:** *See Appendix [MT.1](#mt1)*

- *ChatGPT.* GPT-5.5, OpenAI, ChatGPT web application, accessed 19:58 on July 22, 2026, prompt: "Rewrite the following project documentation in clear and professional academic English while preserving the original meaning and technical information. Do not add new facts or change the intended meaning.", used to improve grammar, clarity, consistency, and professionalism of English text in project documentation including project plans, use-case specifications, revision history, and explanatory statements; AI suggested alternative wording, corrected grammar, and improved sentence structure; the original technical information and ideas were provided by the student, who then reviewed the rewritten content and modified it where necessary to ensure the meaning remained unchanged and accurately reflected the actual project.

**Screenshots:** *See Appendix [MT.2](#mt2)*

- *ChatGPT.* GPT-5.5, OpenAI, ChatGPT web application, accessed 13:13 on July 24, 2026, prompt: "Based on the Studify application's requirements and use cases, help me create a detailed prompt for an AI UI design tool to design the interface. The design should support features such as authentication, onboarding, study schedules, study materials, tasks, study groups, and progress tracking. Suggest an appropriate layout, navigation structure, components, and user flow while keeping the design consistent and practical for a student-focused application.", used to assist in brainstorming and describing UI/UX concepts and to prepare prompts for UI design tools during the development of the Studify application's interface; AI suggested UI layout ideas, navigation structures, component organization, and descriptions usable as input for UI design tools; student independently defined the project's actual features, target users, and functional requirements, then adapted AI suggestions as design references while making all final decisions regarding UI layout, information hierarchy, navigation, and visual design.

**Screenshots:** *See Appendix [MT.3](#mt3)*

---

# Appendix: AI Usage Proof

## Kim Hằng

### KH.1

![Kim Hằng – Prompt 1 answer (NestJS/TS compilation error diagnosis)](./A1.png)

![Kim Hằng – Prompt 1 answer (continued)](./A1_2.png)

![Kim Hằng – Prompt 1 question](./Q1.png)

### KH.2

![Kim Hằng – Prompt 2 answer (missing export verification)](./A2.png)

![Kim Hằng – Prompt 2 question](./Q2.png)

### KH.3

![Kim Hằng – Prompt 3 answer (TS2612 declare modifier fix)](./A3.png)

![Kim Hằng – Prompt 3 question](./Q3.png)

### KH.4

![Kim Hằng – Prompt 4 answer (package.json merge conflict fix)](./A4.png)

![Kim Hằng – Prompt 4 question](./Q4.png)

### KH.5

![Kim Hằng – Prompt 5 answer (DB sync architecture)](./A5.png)

![Kim Hằng – Prompt 5 question](./Q5.png)

---

## Gia Phúc

### GP.1

![Gia Phúc – Prompt 1 (Copilot, style search)](./Phuc_1.png)

### GP.2

![Gia Phúc – Prompt 2 (Gemini, Mermaid diagram)](./Phuc_2.png)

---

## Khánh Linh

### KL.1

![Khánh Linh – Prompt 1 (Placement Test API connection)](./Linh_1.png)

![Khánh Linh – Prompt 1b](./1b.png)

![Khánh Linh – Prompt 1c](./1c.png)

### KL.2

![Khánh Linh – Prompt 2 (Sequelize config error)](./2.png)

### KL.3

![Khánh Linh – Prompt 3a (Tailwind CSS error)](./3a%20copy.png)

![Khánh Linh – Prompt 3b](./3b%20copy.png)

![Khánh Linh – Prompt 3c](./3c%20copy.png)

### KL.4

![Khánh Linh – Prompt 4a (Roadmap API design)](./4a%20copy.png)

![Khánh Linh – Prompt 4b](./4b%20copy.png)

### KL.5

![Khánh Linh – Prompt 5a (Placement Test scoring API)](./5a.png)

![Khánh Linh – Prompt 5b](./5b.png)

---

## Thiên Phước

### TP.1

![Thiên Phước – Prompt 1 (UC Spec generation)](./Phuoc_1.png)

### TP.2

![Thiên Phước – Prompt 2 (Stitch prompt template)](./Phuoc_2.png)

### TP.3

![Thiên Phước – Prompt 3A (Workflow reordering)](./3A.png)

![Thiên Phước – Prompt 3B](./3B.png)

![Thiên Phước – Prompt 3C](./3C.png)

### TP.4

![Thiên Phước – Prompt 4A (UC batching for Stitch)](./4A.png)

![Thiên Phước – Prompt 4B](./4B.png)

---

## Minh Thư

### MT.1

![Minh Thư – Prompt 1 (Report structure suggestions)](./prompt01.png)

### MT.2

![Minh Thư – Prompt 2 (English rewriting)](./prompt02.png)

### MT.3

![Minh Thư – Prompt 3 (UI design prompt generation)](./prompt03.png)
