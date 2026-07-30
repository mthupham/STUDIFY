# Software Architecture Document — Studify


## 2. C4 Model — Level 1: System Context Diagram

The System Context diagram is the highest-level view in the C4 Model. It treats Studify as a single black-box system, and shows only: (1) who the human actors are, and (2) which external systems it depends on. Internal structure (frontend, backend, database) is intentionally *not* shown at this level — that level of detail belongs to the Level 2 Container diagram.

```mermaid
C4Context
  title System Context Diagram (Level 1) - Studify System

  Person(student, "Student / Working Professional", "Learner who registers/logs in, takes the CEFR placement test, follows the personalized IT-English roadmap, practices with Flashcards & Pomodoro, joins study groups, and practices speaking with the AI assistant.")
  Person(groupMaster, "Group Leader (Study Group Master)", "A learner who created or leads a small study group (2-5 members); assigns tasks with deadlines and shares study materials with group members.")

  System(studify, "Studify System", "An independent web application for learning conversational and IT-specialized English, integrating account management, CEFR-based self-study, interactive study groups, and AI-assisted speaking practice.")

  System_Ext(aiService, "AI Speech & LLM Service", "Third-party AI service (Speech-to-Text & LLM) that transcribes spoken audio and evaluates grammar, vocabulary, context relevance, and provides feedback/suggestions.")
  System_Ext(cloudStorage, "Cloud Storage Service", "Cloud storage provider (e.g., AWS S3 / Cloudinary) used to store and serve shared study group materials such as PDFs and images.")

  Rel(student, studify, "Registers/logs in, takes placement test, follows roadmap, solves quizzes, uses Flashcards/Pomodoro, joins groups, practices AI speaking", "HTTPS / Web Browser")
  Rel(groupMaster, studify, "Creates groups, assigns tasks with deadlines, uploads PDF/image materials, tracks member progress", "HTTPS / Web Browser")

  Rel(studify, aiService, "Sends audio recordings & scenario prompts; receives transcriptions and evaluation scores (Grammar, Vocab, Context) with guidance", "HTTPS / REST API")
  Rel(studify, cloudStorage, "Uploads, stores, and serves download URLs for shared group materials (PDF, Images)", "HTTPS / REST API")
```

### 2.1 Written Explanation

**Actors (Person elements)**
Studify is used by a single underlying actor role — the registered learner — but the diagram separates two usage patterns because they interact with the system differently:
- **Student / Working Professional:** the primary end-user across every sprint of the project — registering and completing onboarding (PA1), following their personalized roadmap and self-study dashboard (PA2), joining virtual study rooms and reviewing flashcards (PA3), and practicing speaking with the AI assistant (PA4).
- **Group Leader (Study Group Master):** the same type of user account, but acting in an elevated role *within a specific study group* — creating the group, assigning tasks/deadlines, and uploading shared materials (PA3). This is a permission distinction (RBAC), not a separate account type, which is why both actors connect to the same central system rather than to different systems.

**The System (Studify)**
Drawn as a single box because, at Context level, we deliberately hide implementation detail. Whether it's built with React, NestJS, or PostgreSQL is irrelevant here — what matters is that it is one cohesive system responsible for authentication, learning content delivery, group collaboration, and AI-assisted speaking practice.

**External Systems (System_Ext)**
Two systems sit outside Studify's boundary because they are operated by third parties, not by the team:
- **AI Speech & LLM Service:** Studify does not implement its own speech recognition or language model. It sends recorded audio/prompts out to a third-party AI service and receives back a transcription plus a structured evaluation (grammar, vocabulary, relevance, suggestions), which powers the PA4 AI Speaking Assistant feature.
- **Cloud Storage Service:** shared documents and images uploaded in a Virtual Study Room (PA3) are not stored inside Studify's own database; they are pushed to and retrieved from an external object storage provider, with only metadata/URLs kept internally.

Notably, PostgreSQL and the JWT/bcrypt authentication mechanism are **not** represented as external systems, because they are internal components that Studify itself owns and operates — they will instead appear as containers in the Level 2 Container Diagram, not as external dependencies at this Context level.

