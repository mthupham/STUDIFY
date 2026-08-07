## Khánh Linh's AI Usage:

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

---

## Khánh Linh's AI Usage:

**1.**
* Tool: ChatGPT
* Purpose: Understand how the answer-submission API for the lesson/exercise grading feature should be designed
* Prompt used: "Explain how an API for submitting answers should work, including the difference between submitting a single answer and submitting a whole practice session."
* AI-generated content: An explanation of the grading flow, distinguishing single-answer submission vs. full-session submission, and how controller/service/question data interact.
* Student's work and validation: Used the explanation to design the actual grading API structure in the STUDIFY backend; cross-checked the suggested flow against the project's existing controller/service pattern before implementing.
**Screenshots/Chat History:** *See Appendix*
**2.**
* Tool: ChatGPT
* Purpose: Understand how frontend code should interpret different API response structures
* Prompt used: "How should frontend code interpret API responses such as `data.questions` versus `data.data.questions`?"
* AI-generated content: An explanation of common response-wrapping patterns and how nested response structures affect how frontend state should be set.
* Student's work and validation: Verified the actual response shape returned by the backend endpoint before writing the frontend state-handling code, to avoid assuming the wrong structure.
**Screenshots/Chat History:** *See Appendix*
**3.**
* Tool: ChatGPT
* Purpose: Understand the avatar upload architecture across backend and frontend
* Prompt used: "Explain the roles of Multer, static assets, controller/service/model, database mapping, JWT user ownership, and frontend fallback avatars in an avatar upload feature."
* AI-generated content: An explanation of how uploaded files flow from Multer through storage, how they are linked to a user record via JWT, and how the frontend falls back to a default avatar when none exists.
* Student's work and validation: Applied the explanation to trace and confirm the existing avatar upload implementation in the STUDIFY codebase rather than writing new code from the AI's answer.
**Screenshots/Chat History:** *See Appendix*
**4.**
* Tool: ChatGPT
* Purpose: Understand the forgot-password and OTP authentication flow
* Prompt used: "How does password-reset OTP work, including controller/service responsibilities, DTO validation, OTP hashing, expiration time, deletion after use, Nodemailer, Gmail 2-Step Verification, and App Passwords?"
* AI-generated content: An explanation of the end-to-end OTP security flow, covering hashing, expiration, single-use deletion, and the Gmail/Nodemailer email-sending requirements.
* Student's work and validation: Used the explanation to review and validate the security logic already implemented in the password-reset feature, checking that hashing and expiration handling matched the recommended practice.
**Screenshots/Chat History:** *See Appendix*
**5.**
* Tool: ChatGPT
* Purpose: Determine correct grading behavior for different question types
* Prompt used: "How can multiple-choice answers be automatically graded while written answers are treated differently and shown for review instead of automatically marked correct or incorrect?"
* AI-generated content: An explanation of the distinction between auto-gradable objective questions and written questions requiring manual/deferred review.
* Student's work and validation: Used this distinction to define the grading rules applied in the STUDIFY quiz feature, then implemented and tested the logic separately for each question type.

**Screenshots/Chat History:** *See Appendix*


# Appendix: AI Usage Proof

## Kim Hằng

--

## Khánh Linh
**Screenshot 1 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_1a.png)
**Screenshot 2 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_1b.png)
**Screenshot 3 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_1c.png)
**Screenshot 4 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_2.png)
**Screenshot 5 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_3a.png)
**Screenshot 6 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_3b.png)
**Screenshot 7:**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_3c.png)
**Screenshot 8 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_4a.png)
**Screenshot 9 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_4b.png)
**Screenshot 10 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_4c.png)
**Screenshot 11 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_5a.png)
**Screenshot 12 :**
![klinh AI Usage - Screenshot 1a](../evidence/phuoc_screenshots/klinh_5b.png)


--

## Gia Phúc

--

## Thiên Phước

--

# Minh Thư
