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


## Thiên Phước's AI Usage:

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

* **Tool:** Antigravity AI (Gemini / Claude via IDE assistant)
* **Purpose:** Analyze TA's feedback on PA3, refactor the Module 4 Use Case Model (Mermaid) to resolve "Functional Decomposition" (workflow abuse), merge fragmented Use Case Specifications, and correct duplicate IDs and image references.
* **Prompt used:**

  > trưởng nhóm giao là mỗi thành viên tự sửa lại phần của mình đã làm trong PA3, trong đó thì mình đã làm Usecase cho module 4 ở phần D. Bạn phân tích kỹ xem mình có cần sửa gì dựa vào feedback của thầy không?

* **AI-generated content:** The AI reviewed the existing `report.md` and 10 fragmented specification files in `Module_4`. It identified that the use cases were inappropriately broken down into workflow steps (`include` abuse) and had duplicate IDs. It generated an implementation plan and then refactored the 10 files into 3 comprehensive specifications (`M4-UC1`, `M4-UC2`, `M4-UC3`), updated the Mermaid diagram, and correctly linked all UI prototype images.
* **Student's work and validation:** Reviewed the AI's analysis and the refactored use cases to ensure they adhere to UML standards and correctly represent the intended Module 4 functionality. Verified that the image paths were correct and the Mermaid diagram rendered properly.

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

**Screenshot 1 — AI reviewing the existing Level 3 diagram and identifying issues:**

![Phuoc AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/phuoc_1a.png)

**Screenshot 2 — AI reading source code and generating the revised Component Diagram:**

![Phuoc AI Usage - Screenshot 1b](../evidence/phuoc_screenshots/phuoc_1b.png)

**Screenshot 3 — AI analyzing TA feedback and refactoring Module 4 Use Cases:**

![Phuoc AI Usage - Screenshot 2a](../evidence/phuoc_screenshots/phuoc_2a.png)

**Screenshot 4 — AI generating the refactored Use Case specifications:**

![Phuoc AI Usage - Screenshot 2b](../evidence/phuoc_screenshots/phuoc_2b.png)

# Minh Thư
