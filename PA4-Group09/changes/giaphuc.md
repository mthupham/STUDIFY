# Table of contents
- [Table of contents](#table-of-contents)
- [1. \[Name of changes document\]](#1-name-of-changes-document)
  - [1.1 Project Overview](#11-project-overview)
    - [Changes](#changes)
    - [Reason for Change](#reason-for-change)

# 1. [Name of changes document]

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
