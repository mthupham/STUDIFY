## Table of contents

* [Table of contents](#table-of-contents)
* [1. PA3 Changes - Module 1 Use Case Diagram](#1-pa3-changes---module-1-use-case-diagram)
   * [1.1 Auth & Onboarding Use Case Diagram (Remember Login)](#11-auth--onboarding-use-case-diagram-remember-login)
      * [Changes](#changes)
      * [Reason for Change](#reason-for-change)

# 1. PA3 Changes - Module 1 Use Case Diagram

## 1.1 Auth & Onboarding Use Case Diagram (Remember Login)

> **Authors:** Nguyễn Khánh Linh | **Reviewer:** [TBD] | **Editor:** Nguyễn Khánh Linh

### Changes

* Reversed the `<<extend>>` relationship direction between `Remember Login` and `Login` in the Module 1 use-case diagram, changing `Login -.->|extend| Remember Login` to `Remember Login -.->|extend| Login`.
* Removed the direct actor association `Registered User --- Remember Login` from the use-case diagram.

### Reason for Change

* Per UML convention, the `<<extend>>` arrow must point from the extending use case to the base use case, since `Remember Login` is an optional behavior added to `Login`, not the reverse.
* `Remember Login` is only triggered inside the flow of `Login` (when the user checks the "Remember me" option) via the `<<extend>>` relationship, so it should not carry a direct actor association; actors connect directly only to base use cases they independently initiate.
