# PA5 Project Report

**Project:** Studify

**Group:** Group [9]

**Course:** [Course Name]

**Date:** [25/08/2026]

- [PA5 Project Report](#pa5-project-report)
- [A. Test Plan and Test Cases](#a-test-plan-and-test-cases)
- [A.2 Test Case Design](#a2-test-case-design)
  - [A.2.1 Use Case Coverage](#a21-use-case-coverage)
- [A.3 Functional Test Cases and Test Execution](#a3-functional-test-cases-and-test-execution)
  - [Authentication](#authentication)
  - [Onboarding](#onboarding)
  - [Personalized Learning Path](#personalized-learning-path)
  - [Study Groups](#study-groups)
  - [AI Speaking Assistant](#ai-speaking-assistant)
- [A.7 Bug Report](#a7-bug-report)
  - [Authentication](#authentication-1)
  - [Onboarding](#onboarding-1)
- [A.9 Test Summary](#a9-test-summary)
  - [Overall Results](#overall-results)
  - [Results by Feature](#results-by-feature)
  - [Conclusion](#conclusion)
- [C. Reflective Report](#c-reflective-report)
  - [C.1 Team Experience](#c1-team-experience)
    - [What Went Well](#what-went-well)
    - [Challenges](#challenges)
    - [How We Addressed the Challenges](#how-we-addressed-the-challenges)
  - [C.2 Spec Kit Experience](#c2-spec-kit-experience)
    - [Benefits](#benefits)
    - [Limitations](#limitations)
    - [Comparison with Traditional Development](#comparison-with-traditional-development)
    - [Lessons Learned](#lessons-learned)
  - [C.3 AI Tools Usage](#c3-ai-tools-usage)
    - [AI Tools Used](#ai-tools-used)
    - [Effective Uses](#effective-uses)
    - [Limitations](#limitations-1)
    - [Human Review](#human-review)
  - [C.4 SDLC Feedback](#c4-sdlc-feedback)
    - [What Worked Well](#what-worked-well)
    - [Problems with the Current Process](#problems-with-the-current-process)
    - [Proposed Improvements](#proposed-improvements)
    - [Expected Benefits](#expected-benefits)
  - [C.5 Individual Contributions](#c5-individual-contributions)
    - [\[Lê Kim Hằng\]](#lê-kim-hằng)
    - [\[Nguyễn Kim Thiên Phước\]](#nguyễn-kim-thiên-phước)
    - [\[Hồ Gia Phúc\]](#hồ-gia-phúc)
    - [\[Phạm Minh Thư\]](#phạm-minh-thư)
    - [\[Nguyễn Khánh Linh\]](#nguyễn-khánh-linh)
- [D. Final Submission](#d-final-submission)
  - [PA1 to PA4 documents](#pa1-to-pa4-documents)
  - [Complete Source Code](#complete-source-code)
  - [AI Usage Evidence](#ai-usage-evidence)
  - [Git History](#git-history)

---

# A. Test Plan and Test Cases

**Test Plan:** [Click here to view document](./TestPlan.pdf)

# A.2 Test Case Design

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

## A.2.1 Use Case Coverage

| Use Case  | Description                | Number of Test Cases |
| --------- | -------------------------- | -------------------: |
| UC01      | Authentication             |                   10 |
| UC02      | Onboarding                 |                   10 |
| UC03      | Personalized Learning Path |                   10 |
| UC04      | Study Groups               |                   10 |
| UC05      | AI Speaking Assistant      |                   10 |
| **Total** |                            |               **50** |

---

# A.3 Functional Test Cases and Test Execution

## Authentication

**Performed by:** [Kim Hằng]

**Reviewed by:** [Minh Thư]

**Edited by:** [Kim Hằng]

**Test Cases and Test Execution:** [Click here to view document](./TestCases/Authentication.pdf)

---

## Onboarding

**Performed by:** [Kim Hằng]

**Reviewed by:** [Minh Thư]

**Edited by:** [Kim Hằng]

**Test Cases and Test Execution:** [Click here to view document](./TestCases/Onboarding.pdf)

---

## Personalized Learning Path

**Performed by:** [Thiên Phước]

**Reviewed by:** [Minh Thư]

**Edited by:** [Thiên Phước]

**Test Cases and Test Execution:** [Click here to view document](./TestCases/PersonalizedLearningPath.pdf)

---

## Study Groups

**Performed by:** [Khánh Linh]

**Reviewed by:** [Minh Thư]

**Edited by:** [Khánh Linh]

**Test Cases and Test Execution:** [Click here to view document](./TestCases/StudyGroup.pdf)

---

## AI Speaking Assistant

**Performed by:** [Gia Phúc]

**Reviewed by:** [Minh Thư]

**Edited by:** [Gia Phúc]

**Test Cases and Test Execution:** [Click here to view document](./TestCases/AISpeaking.pdf)

---

# A.7 Bug Report

## Authentication

**Performed by:** [Kim Hằng]

**Reviewed by:** [Minh Thư]

**Edited by:** [Kim Hằng]

**Bug Report for Authentication:** [Click here to view document](./BugReport/Authentication.pdf)

---

## Onboarding

**Performed by:** [Kim Hằng]

**Reviewed by:** [Minh Thư]

**Edited by:** [Kim Hằng]

**Bug Report for Authentication:** [Click here to view document](./BugReport/Onboarding.pdf)

---

# A.9 Test Summary

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

## Overall Results

| Metric           | Result |
| ---------------- | -----: |
| Features Tested  |      5 |
| Total Test Cases |     80 |
| Executed         |     79 |
| Passed           |     75 |
| Failed           |      4 |
| Pass Rate        |    95% |
| Bugs Found       |      4 |
| Bugs Fixed       |      0 |

## Results by Feature

| Feature                    | Test Cases | Passed | Failed | Pass Rate |
| -------------------------- | ---------: | -----: | -----: | --------: |
| Authentication             |         30 |     26 |      3 |     89.7% |
| Onboarding                 |         20 |     19 |      1 |     95.0% |
| Personalized Learning Path |         10 |     10 |      0 |    100.0% |
| Study Groups               |         10 |     10 |      0 |    100.0% |
| AI Speaking                |         10 |     10 |      0 |    100.0% |

## Conclusion

Overall the system demonstrates strong stability across most features: 75 of 79 executed test cases passed (95% pass rate). The remaining known issues are documented as four open bugs (BUG-001..BUG-004) affecting authentication and onboarding: weak-password acceptance, missing account lockout, access-token expiry mismatch, and the manual-level-selection routing bug. Prioritize fixes for `BUG-002` (security: lockout/rate-limiting) and `BUG-004` (onboarding flow) before the final release, then re-run the affected test cases and update the report.

---

# C. Reflective Report

## C.1 Team Experience

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

### What Went Well

The team worked effectively by dividing responsibilities according to individual strengths and maintaining clear ownership of different components. Team members communicated regularly through Git, Jira, and group discussions, which helped us track progress and coordinate frontend, backend, database, and testing tasks.

One positive aspect was the team's ability to integrate different components into a single product. For example, the frontend and backend teams coordinated API contracts and authentication requirements to connect features such as Flashcards, Study Groups, and the AI Speaking Assistant. The team also used Git branches and pull requests to reduce conflicts and allow members to review changes before merging.

Another strength was the team's willingness to help each other when technical problems occurred. Instead of treating tasks as completely independent, members discussed implementation issues and shared debugging information, which helped the project continue progressing when individual members became blocked.

### Challenges

The main challenges came from integration, changing requirements, and technical debugging. Some backend APIs did not initially match the data structures expected by the frontend, resulting in errors during integration. Authentication and CORS configuration also caused problems when the frontend and backend were deployed separately.

Another challenge was dealing with third-party services. The project used services such as Supabase and AI APIs, and some issues were caused by configuration, authentication, API limitations, or deployment environments rather than by the application's own code.

At the team level, scheduling and coordinating work was also challenging. Since different features depended on one another, delays in one component could affect other members' tasks.

### How We Addressed the Challenges

We addressed technical issues by testing APIs independently using tools such as Swagger before integrating them with the frontend. When errors occurred, we checked logs, request payloads, response codes, environment variables, and database schemas to identify the actual source of the problem instead of assuming that the error was caused by a single component.

For integration problems, the team improved communication about API contracts and data formats. We also used Git branches and incremental commits so that changes could be isolated and reverted when necessary.

From these challenges, we learned that successful teamwork in software development requires more than completing individual tasks. Clear communication, shared technical documentation, early integration, and systematic debugging are necessary to prevent small problems from becoming larger integration issues.

---

## C.2 Spec Kit Experience

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

### Benefits

Using Spec Kit helped the team think about requirements before immediately implementing features. Instead of starting directly from code, we were encouraged to clarify what a feature should do, its expected behavior, constraints, and acceptance criteria.

This was particularly useful for features with multiple interactions, such as the learning roadmap, study groups, and AI Speaking Assistant. Having a clearer specification made it easier to identify the required inputs, outputs, edge cases, and relationships between components.

Spec-driven development also improved communication within the team. A written specification provided a common reference point for developers, testers, and other team members, reducing the risk that different members would have different interpretations of the same requirement.

### Limitations

The main limitation was the additional time required to create and maintain specifications. When requirements changed during development, the specification also needed to be updated. For smaller or straightforward tasks, creating detailed specifications sometimes felt slower than implementing the feature directly.

Another limitation was that a specification cannot completely predict technical problems. Even when a feature was clearly described, unexpected issues could still appear during implementation, such as API limitations, database constraints, deployment configuration, or third-party service failures.

### Comparison with Traditional Development

Compared with our previous approach, where development often started directly from requirements and code, Spec Kit provided a more structured workflow. Traditional development was faster at the beginning because developers could immediately start implementing their ideas, but it sometimes resulted in misunderstandings and rework.

Specification-driven development requires more effort during the planning stage, but it can reduce ambiguity and make implementation and testing more systematic. For a project with multiple team members and interconnected features, we found that having a shared specification was generally more beneficial than relying only on informal discussions.

### Lessons Learned

The main lesson was that specifications are most useful when they are specific enough to guide implementation but flexible enough to accommodate reasonable changes. We also learned that specifications should be treated as living documents rather than documents that are written once and never updated.

In future projects, we would define acceptance criteria and important edge cases earlier, especially for features involving multiple components or external services.

---

## C.3 AI Tools Usage

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

### AI Tools Used

| Tool           | Purpose                                                                                                    |
| -------------- | ---------------------------------------------------------------------------------------------------------- |
| ChatGPT        | Requirement analysis, technical explanations, SQL development, debugging, documentation, and brainstorming |
| GitHub Copilot | Code completion and assistance during implementation                                                       |
| Gemini         | Experimentation with AI-powered features and grammar/explanation generation                                |

### Effective Uses

AI tools were particularly useful for explaining unfamiliar technical concepts and accelerating repetitive development tasks. For example, ChatGPT helped the team understand SQL queries, nested queries, triggers, database constraints, API errors, and backend/frontend integration problems.

AI was also useful during debugging. By providing error messages, code snippets, and relevant context, the team could quickly generate possible causes and solutions. This helped reduce the time spent searching through documentation for relatively common problems.

Another effective use was documentation and project planning. AI helped transform rough ideas into structured requirements, test cases, technical explanations, and development tasks. This allowed the team to spend more time evaluating and refining the content instead of creating every document from scratch.

### Limitations

AI-generated code was not always correct or compatible with the project's existing architecture. Sometimes the suggested solution used a different framework version, incorrect API syntax, or assumptions about the database schema that did not match the actual implementation.

AI could also provide plausible explanations for errors without identifying the real root cause. For example, deployment, authentication, CORS, environment variables, and third-party API problems sometimes required direct inspection of logs and configuration rather than relying on AI-generated suggestions.

There were also cases where AI-generated implementations appeared reasonable but failed during actual testing. This demonstrated that generated code should be treated as a starting point rather than as a verified solution.

### Human Review

The team did not directly accept AI-generated outputs without verification. Generated code was reviewed against the project's existing architecture, dependencies, database schema, and requirements before being integrated.

The team tested implementations locally and through API testing tools, inspected error logs, and verified actual application behavior. When an AI suggestion was incorrect, we modified or replaced it based on evidence from the project environment and official documentation.

This process reinforced an important principle: AI can accelerate development, but the developer remains responsible for understanding, testing, and validating the final result.

---

## C.4 SDLC Feedback

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

### What Worked Well

The SDLC process provided a clear structure for moving from requirements to design, implementation, and testing. Breaking the project into different phases helped the team understand what needed to be completed at each stage.

Using Jira for task management also helped the team distribute work and track progress. Git provided version control and allowed members to work on separate features without constantly modifying the same codebase.

The iterative nature of the project was particularly useful because the team could identify problems during implementation and testing instead of waiting until the end of the project.

### Problems with the Current Process

One problem was that some requirements changed after implementation had already started. This resulted in additional development and testing work. Some dependencies between tasks were also discovered relatively late, which occasionally caused members to wait for another component before they could complete their own work.

Another issue was that technical integration was sometimes postponed until individual features were considered complete. As a result, problems between components could appear later than expected.

Documentation could also become outdated when implementation changed quickly. Maintaining consistency between requirements, design documents, Jira tasks, and the actual system required additional effort.

### Proposed Improvements

1. **Define API contracts and acceptance criteria earlier.**
   Important request/response formats, database assumptions, and acceptance criteria should be agreed upon before implementation begins.

2. **Integrate features incrementally.**
   Frontend, backend, and database components should be connected and tested as soon as a basic version is available instead of waiting until the entire feature is finished.

3. **Introduce regular requirement and documentation reviews.**
   At the end of each iteration, the team should review whether Jira tasks, specifications, test cases, and implementation are still consistent with each other.

### Expected Benefits

These improvements would reduce rework and make integration problems visible earlier. Clearer API contracts would reduce misunderstandings between team members, while incremental integration would prevent multiple components from developing incompatible assumptions.

Regular documentation reviews would also make the project easier to maintain and evaluate. Overall, these changes would make the SDLC more predictable, improve collaboration, and allow the team to spend less time fixing avoidable problems near the end of development.

## C.5 Individual Contributions

### [Lê Kim Hằng]

**Performed by:** [Kim Hằng]

**Reviewed by:** [Minh Thư]

**Edited by:** [Kim Hằng]

During the teamwork process, I learned how to collaborate more effectively with other members while also improving my communication skills within the team. Taking responsibility for developing different modules helped me gain a better understanding of individual responsibilities within a larger system. Overall, the teamwork experience helped me grow both professionally and in terms of collaboration and teamwork skills.

### [Nguyễn Kim Thiên Phước]

**Performed by:** [Thiên Phước]

**Reviewed by:** [Minh Thư]

**Edited by:** [Thiên Phước]

During the teamwork process, as the Frontend Lead, I made several contributions to the project, including setting up the frontend structure, implementing state management, and developing the UI for several features. In addition, I learned how to apply my knowledge of software architecture and graphs when working on reports with other team members, as well as how to write test cases and conduct testing.

The project also helped me become more confident in expressing my opinions and providing feedback during team meetings. As a result, I became more proactive and responsible in carrying out my tasks.

### [Hồ Gia Phúc]

**Performed by:** [Gia Phúc]

**Reviewed by:** [Minh Thư]

**Edited by:** [Gia Phúc]

During the devlopment of the project, my main focus was on frontend but due to some time constraints i also helped with a very small part of backend. Although my contribution wasn't as big as i had hoped, working together had helped me significantly improve my task management and overall web designing. I applause my leader and the backend team because it just looks so much more complicated than frontend design.

### [Phạm Minh Thư]

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước]

**Edited by:** [Minh Thư]

As a PM, BA, and UI/UX member, I was mainly responsible for bridging the gap between the team's ideas and the actual product. I participated in gathering and analyzing requirements, planning tasks, discussing priorities, and designing interfaces and user flows. I also worked closely with other members to make sure that the design and requirements were feasible from a technical perspective. This role helped me improve my ability to organize work, communicate with different team members, and look at the project from both the user's and the development team's perspectives.

### [Nguyễn Khánh Linh]

**Performed by:** [Khánh Linh]

**Reviewed by:** [Minh Thư]

**Edited by:** [Khánh Linh]

I contributed to implementing backend features, designing and working with APIs, and connecting the backend with the database and frontend. I also participated in debugging and testing APIs to ensure that the implemented features worked correctly and met the project's requirements. Through this role, I gained a better understanding of backend architecture, database operations, authentication, and the interaction between different components of a system. Working on backend tasks also taught me to pay more attention to data consistency, error handling, and the impact of backend changes on other parts of the application.

---

# D. Final Submission

**Performed by:** [Minh Thư]

**Reviewed by:** [Thiên Phước, Kim Hằng, Khánh Linh, Gia Phúc]

**Edited by:** [Minh Thư]

## PA1 to PA4 documents

- **PA1:** See in folder /PA1-Group09
- **PA2:** See in folder /PA2-Group09
- **PA3:** See in folder /PA3-Group09
- **PA4:** See in folder /PA4-Group09

## Complete Source Code
**See in Folder:** /SourceCode

**Folder Structure:** [Click here to view document](./SourceCode/FolderStructure.txt)

##  AI Usage Evidence
1. [Click here to view document](./PA2-Group09/D.%20AI%20Usage%20Report/AI_UsageReport.pdf)
2. [Click here to view document](./PA3-Group09/AI_UsageReport_PA3.pdf)
3. [Click here to view document](./PA4-Group09/AIUsageReport/AI_UsageReport_PA4.pdf)

## Git History

**Git log:** [Click here to view document](./gitlog.txt)