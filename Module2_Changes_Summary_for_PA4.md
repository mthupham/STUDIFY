# Module 2 Use Case Specification Changes - PA4 Update Summary

## TOC Addition (Add to changes.md Table of Contents)

```markdown
- [3. Use Case Specification (Module 2)](#3-use-case-specification-module-2)
  - [3.1 Merge Conflict Resolution in UC5](#31-merge-conflict-resolution-in-uc5)
    - [Changes](#changes-15)
    - [Reason for Change](#reason-for-change-15)
  - [3.2 Author Standardization Across UC Files](#32-author-standardization-across-uc-files)
    - [Changes](#changes-16)
    - [Reason for Change](#reason-for-change-16)
  - [3.3 Module 2 Specification Consolidation](#33-module-2-specification-consolidation)
    - [Changes](#changes-17)
    - [Reason for Change](#reason-for-change-17)
  - [3.4 Alternative Flow Illustration Enhancement](#34-alternative-flow-illustration-enhancement)
    - [Changes](#changes-18)
    - [Reason for Change](#reason-for-change-18)
  - [3.5 Use Case Reference Naming Consistency](#35-use-case-reference-naming-consistency)
    - [Changes](#changes-19)
    - [Reason for Change](#reason-for-change-19)
- [Summary of Changes in Use Case Specification (Module 2)](#summary-of-changes-in-use-case-specification-module-2)
```

---

## Full Sections to Add to changes.md (After Section 2)

```markdown
# 3. Use Case Specification (Module 2)

## 3.1 Merge Conflict Resolution in UC5
> **Authors:** [Lê Kim Hằng] | **Reviewer:** [Lê Kim Hằng] | **Editor:** [Lê Kim Hằng]

### Changes

* Identified and resolved a **merge conflict** in `UC5_spec.md` (Take Quiz use case).
* Removed duplicate content from the first version (incomplete, outdated specification) that had been merged without proper conflict resolution.
* Retained the complete, detailed second version of UC5 specification containing:
  * 11 steps in the Basic Flow (vs. 5 incomplete steps in the first version)
  * 6 Alternative Flows (vs. 2 incomplete flows in the first version)
  * Figure 5.1 with detailed scenario description
  * Specialization relationships for Multiple Choice and Fill in the Blank question types

### Reason for Change

* **Merge Conflict Rectification:** The file contained two unresolved versions of the same use case specification without proper merge markers, causing duplicate and conflicting content.
* **Quality Assurance:** Removed the incomplete version to ensure the specification accurately documents the Take Quiz use case flow.
* **Version Consistency:** The retained version aligns with the detailed specifications in UC6 and UC7 (Multiple Choice and Fill in the Blank specializations).

---

## 3.2 Author Standardization Across UC Files
> **Authors:** [Lê Kim Hằng] | **Reviewer:** [Lê Kim Hằng] | **Editor:** [Lê Kim Hằng]

### Changes

* Updated **author attribution** in the Revision History tables of 7 UC specification files:
  * **UC3:** Changed from `Kim Hằng` to `` `Lê Kim Hằng` ``
  * **UC4:** Changed from `Kim Hằng` to `` `Lê Kim Hằng` ``
  * **UC8:** Version 1.1 — Changed from `System Analyst` to `` `Lê Kim Hằng` ``
  * **UC12:** Changed from `System Analyst` to `` `Lê Kim Hằng` ``
  * **UC13:** Changed from `System Analyst` to `` `Lê Kim Hằng` ``
  * **UC14:** Changed from `System Analyst` to `` `Lê Kim Hằng` ``
  * **UC15:** Changed from `System Analyst` to `` `Lê Kim Hằng` ``

### Reason for Change

* **Attribution Accuracy:** Standardized author identification across all Module 2 use case specifications to ensure consistent documentation practices.
* **Responsibility Tracking:** Clearly identified the person responsible for each specification draft and updates.
* **Documentation Best Practice:** Maintained consistent author naming conventions across all UC documents.

---

## 3.3 Module 2 Specification Consolidation
> **Authors:** [Lê Kim Hằng] | **Reviewer:** [Lê Kim Hằng] | **Editor:** [Lê Kim Hằng]

### Changes

* **Created consolidated specification file** `M2_specs.md` combining all 15 individual UC specifications from Module 2 (UC1–UC15).
* **Organized file structure:**
  * Single comprehensive **Table of Contents** at the beginning linking to all 15 use cases.
  * Each UC specification retained with its original content, revision history, and metadata.
  * Maintained individual section headers for each UC for easy navigation via TOC anchors.
* **File format aligned** with Module 4 and Module 5 consolidation patterns.
* **Removed redundant individual UC files** (UC1_spec.md through UC15_spec.md and their corresponding PDFs) to reduce clutter and maintain a single source of truth.

### Reason for Change

* **Documentation Consolidation:** Addressed the need to organize 15 separate specification files into a single, cohesive document following the pattern established in Module 4 and Module 5.
* **Improved Navigation:** A single consolidated file with a comprehensive TOC improves accessibility and reduces the need to open multiple files for reference.
* **Scalability:** Easier to manage, version, and search within a single specification document.
* **Consistency:** Aligns Module 2 documentation structure with Modules 4 and 5, creating uniformity across the project specifications.

---

## 3.4 Alternative Flow Illustration Enhancement
> **Authors:** [Lê Kim Hằng] | **Reviewer:** [Lê Kim Hằng] | **Editor:** [Lê Kim Hằng]

### Changes

* **Added visual diagrams** to all Alternative Flow sections in the consolidated `M2_specs.md` file.
* **Images added to the following alternative flows:**
  * **UC1:** `UC1_empty_roadmap.png`, `UC1_connection_lost.png`
  * **UC2:** `UC2_empty_lesson.png`, `UC2_connection_lost.png`
  * **UC3:** `UC3_exit_early.png`
  * **UC4:** `UC4_empty_theory_content.png`, `UC4_revisit_lessson.png`
  * **UC5:** `UC5_unanswered_question.png`, `UC5_exit_quiz.png`
  * **UC8:** `UC8_assessment_failed.png`
  * **UC9:** `UC9_new_learner.png`
  * **UC10:** `UC10_level_completed.png`
  * **UC12:** `UC12_timer_expiration.png`
  * **UC13:** `UC13_invalid_value.png`
  * **UC14:** `UC14_no_commitment.png`
  * **UC15:** `UC15_all_level_tasks_completed.png`
* **Total images added:** 12 alternative flow diagrams, complementing the 15 basic flow diagrams already present.

### Reason for Change

* **Enhanced Readability:** Added visual representations of alternative flow states to improve user understanding of system behavior under edge cases and error conditions.
* **Completeness:** Each alternative flow now includes both textual description and corresponding wireframe/mockup images.
* **Visual Documentation:** Aligned with best practices for use case specifications by including diagrams for both nominal (basic flow) and exceptional (alternative flow) scenarios.
* **Better Communication:** Visual aids help stakeholders and developers quickly understand the system's behavior under various conditions.

---

## 3.5 Use Case Reference Naming Consistency
> **Authors:** [Lê Kim Hằng] | **Reviewer:** [Lê Kim Hằng] | **Editor:** [Lê Kim Hằng]

### Changes

* Identified and corrected **naming reference inconsistencies** in the consolidated `M2_specs.md` file where UC8 was referenced differently across use cases.
* **Fixed references in the following locations:**
  * **UC5 (Take Quiz) - Description:** Updated reference from `"View Quiz Result"` to `` `"View Quiz/Assessment Result"` `` to match UC8's actual name.
  * **UC5 (Take Quiz) - Step 10 in Basic Flow:** Updated include relationship reference from `"View Quiz Result"` to `` `"View Quiz/Assessment Result"` ``.
  * **UC5 (Take Quiz) - Extension Point 6.1:** Updated description from `"View Quiz Result"` to `` `"View Quiz/Assessment Result"` ``.
  * **UC9 (Track Learning Progress) - Alternative Flow 2.2:** Updated extend relationship reference from `"UC8: View Quiz Result"` to `` `"UC8: View Quiz/Assessment Result"` ``.

### Reason for Change

* **Reference Accuracy:** Ensured all internal references to UC8 use the complete, accurate use case name as defined in its specification.
* **Consistency:** Prevented confusion caused by partial or abbreviated references that could lead to traceability issues.
* **Documentation Quality:** Fixed truncated naming that could cause readers to miss the "Assessment" component of the use case, which handles both quiz and level assessment results.
* **Traceability:** Improved ability to cross-reference and validate use case dependencies and relationships within the specification document.

---

# Summary of Changes in Use Case Specification (Module 2)

The **Use Case Specifications for Module 2 (Self-Study Dashboard)** were revised to address technical issues, improve documentation consistency, enhance organization, and add visual clarity.

The major changes include:

1. **Resolved a merge conflict** in UC5_spec.md by removing duplicate, incomplete content and retaining the complete specification.
2. **Standardized author attribution** across UC3, UC4, UC8, UC12, UC13, UC14, and UC15 by replacing inconsistent author identifications (`Kim Hằng`, `System Analyst`) with the standardized `` `Lê Kim Hằng` ``.
3. **Consolidated all 15 UC specifications** from individual files into a single comprehensive `M2_specs.md` document, aligned with Module 4 and Module 5 documentation patterns.
4. **Fixed use case reference naming consistency** by updating all references to UC8 from abbreviated `"View Quiz Result"` to complete `"View Quiz/Assessment Result"` across UC5 and UC9.
5. **Added visual diagrams** to 12 alternative flow sections, complementing the existing basic flow illustrations.
6. **Removed individual UC specification files** (UC1_spec.md–UC15_spec.md and their PDFs) to maintain a single, organized source of truth.
7. **Improved specification organization** with a cohesive table of contents for easier navigation and reference.
8. **Enhanced visual documentation** to support better stakeholder understanding of both nominal and exceptional system behaviors.
```

---

## Quick Checklist for PA4 Implementation

- [ ] Add TOC entries for sections 3.1-3.5 to the Table of Contents
- [ ] Add all 5 subsections (3.1 through 3.5) after Section 2
- [ ] Add the Summary section at the end
- [ ] Update any anchor link references if needed
- [ ] Verify the numbering of "Changes" and "Reason for Change" (adjust if needed based on existing PA4 changes.md)

---

## Key Files Modified in PA3

- `D.UseCaseSpecification/Module_2/M2_specs.md` - NEW (1437 lines, all 15 UCs consolidated)
- `D.UseCaseSpecification/Module_2/UC3_spec.md` - Author updated
- `D.UseCaseSpecification/Module_2/UC4_spec.md` - Author updated
- `D.UseCaseSpecification/Module_2/UC5_spec.md` - Merge conflict fixed
- `changes.md` - Section 3 added with all subsections

