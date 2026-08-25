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

## Kim Hằng's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Khánh Linh's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Gia Phúc's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Thiên Phước's AI Usage:

* Tool:
* Purpose:
* Prompt used:
* AI-generated content: (brief description)
* Student's work and validation:

**Screenshots/Chat History:** *See Appendix*

---

## Minh Thư's AI Usage:

**Prompt 01**
* Tool: Gemini 3.6 Thinking
* Purpose: Debugging Pomodoro timer state logic in TypeScript/Zustand (fixing a 2-second countdown skip issue and updating default mode reset behavior).
* Prompt used: "kiểm tra xem vì sao khi bắt đầu, nó bị trừ 2s? tức là từ 1 phút, nó không xuống 59s mà xuống thẳng 58s. và t muốn chỉnh sửa thêm: khi ấn refresh timer hay reload gì đấy, nó sẽ tự động quay về mode focus chứ không phải relax" [accompanied by the TypeScript Zustand store code]
* AI-generated content: 
  *  Explanation of root cause: Using Math.floor alongside event loop execution delays in setInterval(1000) caused $58.99\text{s}$ to round down immediately to $58\text{s}$. 
  *  Refactored TypeScript code replacing Math.floor with Math.ceil, increasing interval frequency to $200\text{ms}$ for smooth accuracy, and modifying resetTimer and getInitialStorage to always default to "focus" mode upon reload or reset.
* Student's work and validation: 
  * Provided original application code and pinpointed specific UI/UX bugs (timer skipping from 01:00 straight to 00:58 and unexpected session retention on reload).
  * Validated the suggested fix by testing the countdown behavior to ensure smooth decrement from 01:00 $\rightarrow$ 00:59, verifying interval accuracy, and confirming the store correctly resets to "focus" mode on page refresh.

**Prompt 02**
* Tool: Gemini 3.6 Thinking
* Purpose: Maintain Pomodoro timer state and browser tab title updates across route transitions (e.g., navigating from /dashboard/pomodoro to /dashboard).
* Prompt used: "useEffect(() => { ... }) cái này, t muốn khi người dùng di chuyển sang tab khác trong studify (vdu: đường dẫn hiện tại là /dashboard/pomodoro, khi user di chuyển qua đường dẫn /dashboard thì vẫn sẽ hiện giống vậy)"
* AI-generated content: Explanation of component unmounting during route changes and a solution architecture converting the custom hook into a global React Context (PomodoroContext.tsx).
* Student's work and validation: Provided original useEffect title update code; reviewed the Context approach and decided to explore popup/widget options before committing to implementation.

**Prompt 03**
* Tool: Gemini 3.6 Thinking
* Purpose: Debug a React default import vs. named export error.
* Prompt used: "Uncaught SyntaxError: The requested module '/src/features/pomodoro/PomodoroTimer.ts' does not provide an export named 'default' (at App.tsx:26:8)"
* AI-generated content: Explained default vs. named exports and provided two fixes: adding export default to the component file or using named imports { Pomodoro } in App.tsx.
* Student's work and validation: Caught the runtime error in browser dev tools and applied the export/import syntax fix.

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

--

# Minh Thư
![alt text](../evidence/thu_screenshots/thu_1.png)
![alt text](../evidence/thu_screenshots/thu_2.png)
![alt text](../evidence/thu_screenshots/thu_3.png)

