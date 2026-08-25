export interface SpeakingQuestion {
  id: string;
  scenario: 'technical' | 'daily' | 'interview';
  question: string;
}

export const SPEAKING_QUESTIONS: SpeakingQuestion[] = [
  // =========================================================
  // TECHNICAL ENGLISH
  // =========================================================

  {
    id: 'technical-001',
    scenario: 'technical',
    question:
      'How would you explain microservices architecture to a junior developer?',
  },
  {
    id: 'technical-002',
    scenario: 'technical',
    question:
      'What is the difference between a frontend and a backend application?',
  },
  {
    id: 'technical-003',
    scenario: 'technical',
    question:
      'How would you explain what an API is to someone who has never worked with software?',
  },
  {
    id: 'technical-004',
    scenario: 'technical',
    question:
      'What would you do if an API suddenly became much slower than usual?',
  },
  {
    id: 'technical-005',
    scenario: 'technical',
    question:
      'How would you improve the performance of a web application?',
  },
  {
    id: 'technical-006',
    scenario: 'technical',
    question:
      'What are the advantages and disadvantages of using Docker in software development?',
  },
  {
    id: 'technical-007',
    scenario: 'technical',
    question:
      'How would you design a backend system that needs to support many concurrent users?',
  },
  {
    id: 'technical-008',
    scenario: 'technical',
    question:
      'How would you explain the difference between SQL and NoSQL databases?',
  },
  {
    id: 'technical-009',
    scenario: 'technical',
    question:
      'What factors would you consider when choosing a database for a new application?',
  },
  {
    id: 'technical-010',
    scenario: 'technical',
    question:
      'How would you explain the benefits of using a CI/CD pipeline?',
  },

  // =========================================================
  // DAILY TECH SYNC
  // =========================================================

  {
    id: 'daily-001',
    scenario: 'daily',
    question:
      'What did you work on yesterday, and what are you planning to work on today?',
  },
  {
    id: 'daily-002',
    scenario: 'daily',
    question:
      'What is your biggest blocker right now, and how are you planning to solve it?',
  },
  {
    id: 'daily-003',
    scenario: 'daily',
    question:
      'Can you give your team a quick update on what you are currently working on?',
  },
  {
    id: 'daily-004',
    scenario: 'daily',
    question:
      'Tell me about a bug you found recently and how you fixed it.',
  },
  {
    id: 'daily-005',
    scenario: 'daily',
    question:
      'How would you explain a technical problem to a non-technical teammate?',
  },
  {
    id: 'daily-006',
    scenario: 'daily',
    question:
      'How would you ask a teammate for help when you are blocked on a task?',
  },
  {
    id: 'daily-007',
    scenario: 'daily',
    question:
      'How would you communicate that a task is taking longer than expected?',
  },
  {
    id: 'daily-008',
    scenario: 'daily',
    question:
      'Describe a situation where you had to change your priorities during a project.',
  },
  {
    id: 'daily-009',
    scenario: 'daily',
    question:
      'How do you usually communicate progress and problems with your team?',
  },
  {
    id: 'daily-010',
    scenario: 'daily',
    question:
      'What would you do if a teammate disagreed with your approach to a task?',
  },

  // =========================================================
  // TECH INTERVIEW
  // =========================================================

  {
    id: 'interview-001',
    scenario: 'interview',
    question:
      'Tell me about a software project you have worked on.',
  },
  {
    id: 'interview-002',
    scenario: 'interview',
    question:
      'What was your role in your most recent development project?',
  },
  {
    id: 'interview-003',
    scenario: 'interview',
    question:
      'What programming language do you use most often, and why do you like it?',
  },
  {
    id: 'interview-004',
    scenario: 'interview',

    question:
      'Tell me about a difficult technical problem you encountered and how you solved it.',
  },
  {
    id: 'interview-005',
    scenario: 'interview',
    question:
      'Describe a time when you improved the performance of an application.',
  },
  {
    id: 'interview-006',
    scenario: 'interview',
    question:
      'Tell me about a time when you disagreed with another developer. How did you handle the situation?',
  },
  {
    id: 'interview-007',
    scenario: 'interview',
    question:
      'Describe a situation where you had to learn a new technology quickly.',
  },
  {
    id: 'interview-008',
    scenario: 'interview',
    question:
      'How would you approach debugging a problem that you cannot reproduce locally?',
  },
  {
    id: 'interview-009',
    scenario: 'interview',
    question:
      'How do you make sure that your code is maintainable and easy for other developers to understand?',
  },
  {
    id: 'interview-010',
    scenario: 'interview',
    question:
      'Why do you think good communication is important for software developers?',
  },
];