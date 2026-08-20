# Table of contents
- [Table of contents](#table-of-contents)
- [1. Use-Case Specification and Use-Case Models for Function 01: Authentication and Onboarding](#1-use-case-specification-and-use-case-models-for-function-01-authentication-and-onboarding)
  - [1.1 Auth \& Onboarding Use Case Diagram (Remember Login)](#11-auth--onboarding-use-case-diagram-remember-login)
    - [Changes](#changes)
    - [Reason for Change](#reason-for-change)
- [2. Use-Case Specification and Use-Case Models for Function 02: Quiz and Assessment](#2-use-case-specification-and-use-case-models-for-function-02-quiz-and-assessment)
  - [1.1 Module 2 Use Case Specifications](#11-module-2-use-case-specifications)
    - [Changes](#changes-1)
    - [Reason for Change](#reason-for-change-1)
- [3. Use-Case Specification and Use-Case Models for Function 03: Virtual Study Room](#3-use-case-specification-and-use-case-models-for-function-03-virtual-study-room)
  - [1.1 Project Overview](#11-project-overview)
    - [Changes](#changes-2)
    - [Reason for Change](#reason-for-change-2)
- [4. Use-Case Specification and Use-Case Models for Function 05: Flashcard](#4-use-case-specification-and-use-case-models-for-function-05-flashcard)
  - [1.1 Module 4 Use Cases](#11-module-4-use-cases)
    - [Changes](#changes-3)
    - [Reason for Change](#reason-for-change-3)
- [5. Use-Case Specification and Use-Case Models for Function 05: AI Speaking Assistant](#5-use-case-specification-and-use-case-models-for-function-05-ai-speaking-assistant)
  - [1.1 Project Overview](#11-project-overview-1)
    - [Changes](#changes-4)
    - [Reason for Change](#reason-for-change-4)

# 1. Use-Case Specification and Use-Case Models for Function 01: Authentication and Onboarding

## 1.1 Auth & Onboarding Use Case Diagram (Remember Login)

> **Authors:** [Nguyễn Khánh Lin]h | **Reviewer:** [Minh Thư] | **Editor:** [Nguyễn Khánh Linh]

### Changes

* Reversed the `<<extend>>` relationship direction between `Remember Login` and `Login` in the Module 1 use-case diagram, changing `Login -.->|extend| Remember Login` to `Remember Login -.->|extend| Login`.
* Removed the direct actor association `Registered User --- Remember Login` from the use-case diagram.

### Reason for Change

* Per UML convention, the `<<extend>>` arrow must point from the extending use case to the base use case, since `Remember Login` is an optional behavior added to `Login`, not the reverse.
* `Remember Login` is only triggered inside the flow of `Login` (when the user checks the "Remember me" option) via the `<<extend>>` relationship, so it should not carry a direct actor association; actors connect directly only to base use cases they independently initiate.

# 2. Use-Case Specification and Use-Case Models for Function 02: Quiz and Assessment

## 1.1 Module 2 Use Case Specifications
> **Authors:** [Lê Kim Hằng] | **Reviewer:** [Minh Thư] | **Editor:** [Lê Kim Hằng]

### Changes

- Resolved merge conflict in `UC5_spec.md` by removing duplicate 27-line incomplete version.
- Standardized author attribution across 7 UC files (UC3, UC4, UC8, UC12, UC13, UC14, UC15) from `Kim Hằng` / `System Analyst` to `` `Lê Kim Hằng` ``.
- Created consolidated specification file `M2_specs.md` combining all 15 UC specifications (UC1–UC15) with comprehensive Table of Contents.
- Added 12 alternative flow diagrams to visual documentation across UC specifications.
- Fixed use case reference naming consistency: updated UC8 references from `"View Quiz Result"` to `"View Quiz/Assessment Result"` in UC5 and UC9.

### Reason for Change

- Removed unresolved merge conflict that caused duplicate and conflicting content in Take Quiz use case specification.
- Standardized author identification to ensure consistent documentation practices and clear responsibility tracking.
- Consolidated 15 separate UC files into single document aligned with Module 4 and 5 patterns for improved maintainability and navigation.
- Enhanced visual documentation with alternative flow diagrams for complete specification coverage.
- Corrected incomplete use case naming references to improve traceability and prevent confusion in specification relationships.

# 3. Use-Case Specification and Use-Case Models for Function 03: Virtual Study Room

## 1.1 Project Overview
> **Authors:** [Minh Thư] | **Reviewer:** [Thiên Phước] | **Editor:** [Minh Thư]

### Changes
* Consolidated 7 individual use cases under Module03 into a single master document.

* Reviewed and updated all embedded images, media paths, and document links to ensure complete consistency and fix rendering/link errors.
### Reason for Change
* Centralization & Maintenance: Streamlines documentation structure and improves readability by combining fragmented use cases into one unified file.

* Accuracy & Error Prevention: Ensures all visual assets and reference paths align correctly within the merged document structure to avoid broken links and missing image errors.

# 4. Use-Case Specification and Use-Case Models for Function 05: Flashcard

## 1.1 Module 4 Use Cases
> **Authors:** [Thiên Phước] | **Reviewer:** [Minh Thư] | **Editor:** [Thiên Phước]

### Changes
- Refactored Module 4 Use Case Model in `report.md` to remove invalid `<<include>>` workflows.
- Merged fragmented Use Case Specifications into 3 main Use Cases (`M4-UC1`, `M4-UC2`, `M4-UC3`).
- Added `M4-` prefix to all Module 4 Use Case IDs to ensure global uniqueness.
- Inserted missing UI Prototypes for Alternative Flows into the new specifications.

### Reason for Change
- Address TA feedback regarding "abusing `<<include>>` as a workflow" (Functional Decomposition).
- Resolve duplicate Use Case IDs across modules.
- Ensure Use Case diagrams strictly adhere to UML standards.

# 5. Use-Case Specification and Use-Case Models for Function 05: AI Speaking Assistant

## 1.1 Project Overview
> **Authors:** [Gia Phúc] | **Reviewer:** [Minh Thư] | **Editor:** [Gia Phúc]

### Changes

* Refactored Module 5 Use Case Model to introduce UC5 as the parent Use Case and remove invalid \<\<include\>\> workflows.  
* Updated UC5 to explicitly include UC5.1, UC5.2, and UC5.3, with UC5.4 extending UC5.3.  
* Removed redundant direct \<\<include\>\> calls to UC5.1 from UC5.2 and UC5.3 specs.  
* Merged all specs into one spec file

### Reason for Change

* Resolve evaluator feedback on "abusing \<\<include\>\> as a workflow" (Functional Decomposition).  
* Align written specifications strictly with standard UML Use Case rules.  
* Resolve the problem of “UC specs should be merged into one file”
