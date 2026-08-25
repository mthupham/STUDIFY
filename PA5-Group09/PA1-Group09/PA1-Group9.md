# Project Assignment 1 (PA1-Group 9)

## A. Group Registration

| Student ID | Name | Email |
| :--- | :--- | :--- |
| **24127164** | Lê Kim Hằng | lkhang2429@clc.fitus.edu.vn |
| **24127550** | Phạm Minh Thư | pmthu2417@clc.fitus.edu.vn |
| **24127510** | Nguyễn Kim Thiên Phước | nktphuoc2412@clc.fitus.edu.vn |
| **24127217** | Hồ Gia Phúc | hgphuc2425@clc.fitus.edu.vn |
| **24127198** | Nguyễn Khánh Linh | nklinh2421@clc.fitus.edu.vn |

## B. Project Proposal 
_Performer: Minh Thư._ 
_Reviewer: Other members of the team._
_Editor: Minh Thư._

### Introduction
**Studify** is a web application tailored for students and working professionals looking to master conversational and specialized English. The platform aligns its content with the Common European Framework of Reference for Languages (**CEFR**) and customizes learning paths for specific industries such as **IT**. 

Studify sets itself apart by blending personalized self-study with structured study groups. By incorporating management tools that foster discipline and group interaction, the platform effectively tackles the common challenge of online learning: boredom and early dropout.

* **Target User:** The primary users are university students preparing for the job market and working professionals who need to improve their English communication skills for career advancement or daily workspace operations.
* **Environment:** Web Application
* **Core AI Feature:** AI Speaking Assistant

### Key Features
1. **Placement Test and Personalized Roadmap:** This feature assesses the user’s professional background and career goals during registration to automatically generate a tailored learning path aligned with CEFR standards. 
2. **Study Group:** Users can create private or public study groups, generating a unique group code for members to join, while assigning distinct roles like Leader and Member. This system builds an organized, accountable micro-community where leaders can guide the group and peers can motivate each other, effectively reducing the isolation that leads to dropping out.
3. **Shared File Repository:** This feature provides a dedicated cloud space within each study group for members and Masters to upload, view, and download supplementary learning materials such as PDFs, industry templates, or images. It centralizes all necessary learning assets in one secure place, eliminating the need to use fragmented third-party messaging apps for document sharing. 
4. **AI Speaking Assistant:** This feature leverages advanced voice recognition and natural language processing to simulate realistic, industry-specific roleplay conversations, such as a mock interview for an IT role or a project pitch presentation for a manager.
5. **Pomodoro and flashcard:** This feature helps users stay focused during study sessions and enhance memory retention through time-managed learning and flashcard-based review.
6. **Progress bar tracking and notification widget:** This feature helps users monitor their learning progress, track completed tasks and goals, and receive timely notifications and reminders to maintain consistent study habits.

![Flowchart made by Mermaid](Flowchart.png)

## C. Existing App Survey

**Similar Apps:** 
1. Englishups 
![Sreenshot of Englishups - logic/signup](C.%20Screenshots%20Englishups/01%20-%20login_signup.png)
![Screenshot of Englishups - Homepage](C.%20Screenshots%20Englishups/02%20-%20Home%20page.png)
![Screenshot of Englishups - Key feature](C.%20Screenshots%20Englishups/03%20-%20Lessons_Tests%20(Key%20feature).png)

2. Study4
![Screenshot of Study4 - Register](C.%20Screenshots%20Study4/resgister.png)
![Screenshot of Study4 - AI Speaking Asssistant](C.%20Screenshots%20Study4/AI_Speaking_Assistant.png)
![Screenshot of Study4 - Learning roadmap](C.%20Screenshots%20Study4/learningRoadmap.png)
![Screenshot of Study4 - Multiple choice exercise](C.%20Screenshots%20Study4/multipleChoicesExcercises.png)
![Screenshot of Study4 - Orientation Survey](C.%20Screenshots%20Study4/takeOrientationSurvey.png)
![Screenshot of Study4 - Test](C.%20Screenshots%20Study4/test.png)

### 1. What Features These Existing Apps Have in Common 
_Performer: Thiên Phước._
_Reviewer: Other members of the team._
_Editor: Minh Thư._

* **Massive Self-Paced Repositories:** Both platforms host extensive, centralized databases of learning content - whether it is conversational video dialogues or giant banks of IELTS/TOEIC reading and listening practice tests.
* **Solo Learning Framework:** Both apps are fundamentally designed as a "single-player" experience, where the user logs in, consumes content independently, practices at their own pace, and leaves without interacting with other learners.
* **Instant Answer Validation:** Each system features an automated grading engine that instantly flags whether a user's selection or text input is correct right after submission, offering immediate feedback.

### 2. What Studify Will Do Differently or Better 
_Performer: Thiên Phước._
_Reviewer: Other members of the team._
_Editor: Minh Thư._

* **Hyper-Niche Career Focus vs. Academic/General English:**  Study4 trains you to pass a standardized exam, and Englishups teaches general everyday conversations. Studify focuses strictly on the workplace. You learn the exact English needed for an IT scrum meeting, a Marketing pitch, or a financial audit - all mapped directly to practical CEFR milestones.
* **Peer Accountability vs. Solitary Burnout:** Existing apps treat online learning as a lonely task, which naturally leads to high drop-out rates. Studify introduces Study Group with a clear user hierarchy (Leader/Member) and collective task deadlines.
* **Contextual AI Roleplay:** Instead of passive listening or standard test-taking, Studify’s AI Speaking Assistant simulates real professional pressure. The AI acts as a demanding interviewer or a difficult client, giving users a safe, judgment-free space to practice high-stakes workspace verbal communication.

### 3. UI/UX Patterns to Adopt from Competitors 
_Performer: Thiên Phước_
_Reviewer: Gia Phúc_
_Editor: Minh Thư_

We plan to adopt and optimize three highly successful, battle-tested UI/UX patterns from Englishups and Study4 to keep our interface clean and professional:
* **The Split-Screen Layout (Study4):** For our Quiz System and Lesson Delivery, we will adopt Study4’s excellent split-screen design. The left side will display the industry-specific dialogue or vocabulary text, while the right side displays the interactive quiz questions or AI speaking prompt, eliminating annoying scrolling.
![The Split-Screen Layout](C.%20Adopted%20UI-UX/(Study4)%20The%20Split-Screen%20Layout.png)

* **Visual Analytical Dashboards (Study4):** We will adapt Study4’s clean analytics charts for our Progress Tracking Dashboard. Specifically, we will use their visual layout to display daily study streaks, and a clean history of incorrect quiz answers for quick review.
![Visual Analytical Dashboards](C.%20Adopted%20UI-UX/(Study4)%20Visual%20Analytical%20Dashboards.png)

* **Tag-Based Content Filtering (Englishups):** To keep the user workspace professional and clutter-free, we will implement Englishups’ streamlined tagging system. Users can filter lessons, shared group documents, and vocabulary lists by specific industries (e.g., #Tech, #Marketing) with a single tap, keeping navigation effortless.
![Tag-Based Content Filtering (Englishups)](C.%20Adopted%20UI-UX/(Englishups)%20Tag-Based%20Content%20Filtering.png)

## D. Team Contract

### 1. Team Roles and Responsibilities 
_Performer: Minh Thư._
_Reviewer: Other members of the team._
_Editor: Minh Thư._

* **Minh Thư (PM / UI-UX / BA):** DDesigns the Figma UI/UX, creates the specialized English curriculum (JSON), codes the Landing Page, and manages project timelines and QA/QC testing.
* **Kim Hằng (Backend Lead):** AArchitectures the database schema (ERD) and develops core APIs for authentication, onboarding setup, and individual learning progress tracking.
* **Khánh Linh (Backend Developer):** Defines API specifications (Swagger/Postman), generates mock data, and builds backend logic for group management, task assignments, and file sharing.
* **Thiên Phước (Frontend Lead):** Initializes the frontend repository architecture and implements the UI and API integration for the login, onboarding, and learning roadmap flows.
* **Gia Phúc (Frontend Developer):** Develops the user dashboard, designs the virtual study room interface, and implements the Pomodoro timer along with the task notification widgets.

### 2. Communication Plan 
_Performer: Minh Thư._
_Reviewer: Thiên Phước, Kim Hằng._
_Editor: Minh Thư._

* **Weekly Meetings:** Conduct a face-to-face meeting every week to review progress, debug complex issues together, and plan tasks for the next phase.
* **File & Resource Sharing:** Use  Google Drive for storing project documentation, meeting minutes, and academic evidence; use GitHub for source code management and version control.
* **Daily Communication:** Use Messenger for quick announcements, instant updates, and daily team discussions.

### 3. Work Schedule 
_Performer: Minh Thư._
_Reviewer: Other members of the team._
_Editor: Minh Thư._

Tasks are assigned on a weekly basis through **Jira**.

### 4. Code and Documentation Standards 
_Performer: Kim Hằng._
_Reviewer: Minh Thư, Thiên Phước._
_Editor: Minh Thư._

#### Coding Conventions & Tools
* **Frontend:** *ReactJS, Shadcn UI, Tailwind CSS*
* **Backend:** *TypeScript, Nest.js, Socket.io, PostgresSQL*

#### Naming Conventions
* `camelCase`(first letter lowercase, first letter of subsequent words capitalized): Variables, functions, and standard methods.
* `PascalCase`(all uppercase, separated by underscores): React components, classes, and interfaces.
* `UPPER_SNAKE_CASE`(capitalize the first letter of every word): Constants and environment variables.

#### Code Review & Testing Procedures
The code review process is divided into two distinct phases to ensure both structural integrity and functional accuracy:

##### Phase 1: Technical Review
1. **Pull Request Creation:** Developers must open a PR against the `develop` or `main` branch with a brief explanation of what the code does.
2. **Peer Review:** At least one peer must review the code on GitHub.
3. **Review Focus:** Checking adherence to coding conventions, identifying potential memory leaks, catching unhandled null/undefined scenarios, and ensuring overall readability.

##### Phase 2: Live Team Walkthrough
* **Feature Demonstration:** Once technical review is approved, the author runs the application locally and walks the team through the feature from an end-user perspective during the team meeting.
* **Business Logic Alignment:** Verifies that the feature meets project requirements, matches UI/UX patterns, and integrates correctly into the system.

##### Testing Procedures
* Before the meeting, the author must outline **3 to 5 core test cases**.
* Following the walkthrough, team members (excluding the author) are assigned to manually test the feature and try to "break" it to ensure graceful error handling.
* Bugs discovered must be documented in the shared workspace, including:
    * Steps to reproduce the error.
    * Expected behavior vs. Actual behavior.
    * Screenshots or console error logs.
* The original author is responsible for resolving these bugs before the feature branch can be officially merged.

### 5. Accountability and Performance 
_Performer: Minh Thư._
_Reviewer: Kim Hằng, Thiên Phước._
_Editor: Minh Thư._

To maintain project momentum and guarantee high-quality deliverables, every team member's weekly contributions will be assessed based on three distinct performance levels:

#### A. Performance Levels
* **Level 1: Excellent Performance**
    * *Criteria:* Deliverables are fully functional with all requested features implemented, submitted on or before the established deadline, and contain zero major errors or critical bugs during team testing.
* **Level 2: Satisfactory Performance**
    * *Criteria:* Deliverables include all required features and are submitted strictly on time, but contain minor technical bugs or UI/UX anomalies that require quick fixes during the code review phase.
* **Level 3: Unsatisfactory Performance**
    * *Criteria:* Deliverables fail to meet the weekly deadline, OR core requested features are missing

#### B. Grace Period & Prior Notice
If a member encounters severe technical blockers or unexpected personal emergencies, they must notify the team via Discord at least **72 hours before the deadline** to request an extension or ask for assistance. Failure to give advance notice will automatically categorize any late submission as **Level 3**, regardless of the reason.

#### C. Consequences for Low Performance
* **First-time Level 3:** The member will receive an official warning from the Project Manager and must complete all pending tasks within the first 3 days of the following week.
* **Consecutive Level 3 (2 weeks in a row):** The member's Peer Review contribution score will be deducted by **10% to 20%** depending on the team's final consensus, which will directly impact their final grading.

#### D. Performance Tracking Mechanism
Every member's weekly performance status (Level 1/2/3) will be recorded directly into the team’s shared **Google Sheet**. This spreadsheet will serve as the primary, transparent, and objective database to calculate individual contribution points for the final Peer Assessment report submitted to the Course Instructor and Teaching Assistant (TA).

### 6. Decision-Making Process 
_Performer: Minh Thư._
_Reviewer: Other members of the team._
_Editor: Minh Thư._

* **Consensus for Major Decisions:**  Strategic decisions-such as changing the project scope, altering core features (e.g., modifying the AI Speaking Assistant or Pomodoro mechanics), or reallocating major functional groups—require a unanimous consensus. Every team member must agree before implementation.
* **Majority Vote for Operational Decisions:** Day-to-day operational decisions (e.g., choosing a UI color palette, selecting a specific npm package, or setting internal task deadlines) will be decided by a simple majority vote (50% + 1). Voting will take place during official group meetings or via our primary communication channel (e.g., Discord/Slack) with a 24-hour voting window.
* **The Final Say (Tie-Breaker):** In the event of a persistent tie or an inability to reach a consensus within 48 hours, the Project Manager / Group Leader has the final authority to make the decision to prevent project stagnation. However, the Leader must justify their choice to the team based on the project timeline and technical feasibility.

### 7. Conflict Resolution 
_Performer: Minh Thư._
_Reviewer: Thiên Phước, Kim Hằng._
_Editor: Minh Thư._

Disagreements are natural in technical collaborations. To maintain a healthy, productive working environment, the team will follow a strict 3-step escalation framework:
* **Step 1: Direct, Peer-to-Peer Dialogue:** The conflicting parties must schedule a private, constructive discussion to voice their perspectives calmly. The focus must remain strictly on objective project requirements (code quality, design logic, workload distribution) rather than personal differences.
* **Step 2: Team Mediation Meeting:** If the issue remains unresolved after 48 hours, the conflict will be brought to a full team meeting. The Group Leader will act as an unbiased mediator. Both sides will present their arguments, and the remaining uninvolved team members will vote or propose a middle-ground compromise.
* **Step 3: External Escalation:** If a team member completely refuses to cooperate, fails to deliver assigned functional groups, or causes a toxic environment that threatens the project deadline, the Group Leader will document the issue (e.g., commit history, chat logs) and officially escalate it to the Teaching Assistant (TA) or Course Instructor for formal intervention or grading adjustments.

### 7. Review and Update Process 
_Performer: Minh Thư_
_Reviewer: Other members of the team_
_Editor: Minh Thư_

* **Scheduled Reviews:** The team formally reviews this contract at the end of each major project milestone.
* **Making Quick Changes:** Any member can suggest a change if they notice issues like communication delays or unfair workloads.
* **How to Update:** Suggestions must be brought up in a meeting and approved by at least **two-thirds (2/3) of the team** before updating the file in the shared folder.

## E. Development Tools and Process Setup
_Performer: Minh Thư._
_Reviewer: Thiên Phước, Kim Hằng._
_Editor: Minh Thư._

* **Communication tool:** Messenger
* **Task management tool following the Scrum model:** Jira
![Screenshot of Jira Backlog](E.%20Jira/Jira-backlog.png)
![Screenshot of Jira Board](E.%20Jira/Jira-Board.png)

* **Github:** [Repository](https://github.com/mthupham/STUDIFY)

Folder structure:

```

├── Backend
│   ├── database
│   ├── src
│   │   └── features
│   │       ├── ai-speaking
│   │       ├── authentication
│   │       ├── flashcard
│   │       ├── onboarding
│   │       ├── pomodoro
│   │       ├── self-study
│   │       └── virtual-study-room
│   └── test
└── Frontend
    ├── public
    └── src
        ├── assets
        └── features
            ├── ai-speaking
            ├── authentication
            ├── flashcard
            ├── onboarding
            ├── pomodoro
            ├── self-study
            └── virtual-study-room
```
Gitlog:
```
cda33cf (HEAD -> main, origin/main, origin/HEAD) chore: reorganize feature directories and add .gitkeep files
e0bda92 complete file structure
1becd33 Merge pull request #1 from mthupham/FE-init
7951531 (origin/FE-init) chore: initial project structure and core tech stack setup
0ffa3d4 (origin/Backend) set up framework
ac1632d Initial commit
```