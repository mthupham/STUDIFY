### TC-AISPEAKING-001

**Title:** Open AI Speaking page with default scenario

**Preconditions:**

* User is logged in and has completed onboarding
* Backend is running

**Steps:**

1. Open the **AI Speaking** page from the sidebar
2. Check the scenario list, question area, and conversation history

**Expected Result:**

* Page loads with three scenarios: **Technical English**, **Daily Tech Sync**, and **Tech Interviews**
* **Technical English** is selected by default
* A speaking question is shown
* The question also appears in Conversation History
* Score cards show no score yet
* Error detection and feedback is empty
* **Start Listening** is enabled

**Priority:** High

---

### TC-AISPEAKING-002

**Title:** Change scenario to Daily Tech Sync

**Preconditions:**

* User is on the AI Speaking page
* A question is already loaded

**Steps:**

1. Click **Daily Tech Sync**
2. Check the new question and conversation history

**Expected Result:**

* A new daily-sync question is shown
* Conversation History is reset with the new question
* Previous answer, scores, and feedback are cleared
* **Start Listening** is enabled

**Priority:** High

---

### TC-AISPEAKING-003

**Title:** Change scenario to Tech Interviews

**Preconditions:**

* User is on the AI Speaking page

**Steps:**

1. Click **Tech Interviews**
2. Check the new question and conversation history

**Expected Result:**

* A new interview question is shown
* Conversation History shows the new question
* Score cards show no score yet
* Error detection and feedback is empty

**Priority:** High

---

### TC-AISPEAKING-004

**Title:** Record answer and see live transcript

**Preconditions:**

* User is on the AI Speaking page
* A question is loaded
* Microphone access is allowed

**Steps:**

1. Click **Start Listening**
2. Speak a short answer in English
3. Check the recording state and conversation history

**Expected Result:**

* **Stop Practice** becomes enabled
* Page shows that recording is active
* Spoken words appear in Conversation History while speaking

**Priority:** High

---

### TC-AISPEAKING-005

**Title:** Analyze answer and show feedback

**Preconditions:**

* User has recorded an answer
* Backend is running

**Steps:**

1. Click **Stop Practice**
2. Wait for analysis to finish
3. Check the score cards and feedback sections

**Expected Result:**

* Grammar, Tech Vocabulary, and Clarity scores are shown
* Grammar feedback and improvement tips are shown
* Vocabulary and clarity feedback are shown
* A new question is loaded for the next turn
* The previous question and answer stay in Conversation History

**Priority:** High

---

### TC-AISPEAKING-006

**Title:** Stop practice with no speech

**Preconditions:**

* User is on the AI Speaking page
* A question is loaded
* Microphone access is allowed

**Steps:**

1. Click **Start Listening**
2. Stay silent
3. Click **Stop Practice**

**Expected Result:**

* Error message is shown: **"No speech was detected. Please try again."**
* Scores do not change
* The same question remains for retry

**Priority:** Medium

---

### TC-AISPEAKING-007

**Title:** Show grammar errors after analysis

**Preconditions:**

* User is on the AI Speaking page
* A question is loaded
* Backend is running

**Steps:**

1. Click **Start Listening**
2. Speak a sentence with a grammar mistake, for example: "I am responsible for manage the database."
3. Click **Stop Practice**
4. Check the grammar feedback section

**Expected Result:**

* Grammar score is below 100
* The wrong phrase is shown with a correction suggestion
* Explanation and a better example sentence are shown

**Priority:** High

---

### TC-AISPEAKING-008

**Title:** Keep conversation history after multiple turns

**Preconditions:**

* User has completed at least one practice turn

**Steps:**

1. Complete one full practice turn
2. Complete a second practice turn
3. Check Conversation History

**Expected Result:**

* Previous questions and answers remain visible
* The latest question is shown for the current turn
* History includes all completed turns

**Priority:** Medium

---

### TC-AISPEAKING-009

**Title:** Disable scenario change during analysis

**Preconditions:**

* User is on the AI Speaking page
* A question is loaded

**Steps:**

1. Record an answer and click **Stop Practice**
2. While analysis is running, try to click another scenario

**Expected Result:**

* Scenario buttons cannot be clicked during analysis
* **Start Listening** and **Stop Practice** are disabled during analysis
* Scenario buttons work again after analysis finishes

**Priority:** Medium

---

### TC-AISPEAKING-010

**Title:** Show error when backend is unavailable

**Preconditions:**

* User is logged in
* Backend is stopped or unreachable

**Steps:**

1. Open the AI Speaking page or switch scenario while backend is down
2. Check the page response

**Expected Result:**

* Error message is shown: **"Unable to load question. Please check backend connection."**
* No question is loaded
* **Start Listening** stays disabled

**Priority:** Medium

---

### Test Execution

| Test Case ID      | Execution Date | Status  | Actual Result | Bug ID |
| ----------------- | -------------- | ------- | ------------- | ------ |
| TC-AISPEAKING-001 | 20/08/2026     | Pass    | Page loaded with default Technical English scenario and a question | N/A |
| TC-AISPEAKING-002 | 20/08/2026     | Pass    | Switched to Daily Tech Sync and a question is loaded | N/A |
| TC-AISPEAKING-003 | 20/08/2026     | Pass    | Switched to Tech Interviews and a question is loaded | N/A |
| TC-AISPEAKING-004 | 21/08/2026     | Pass    | User's speech is successfully displayed onto Conversation History | N/A |
| TC-AISPEAKING-005 | 21/08/2026     | Pass    | Feedbacks and score are displayed correctly | N/A |
| TC-AISPEAKING-006 | 20/08/2026     | Pass    | Error message is successfully displayed and score stayed the same | N/A |
| TC-AISPEAKING-007 | 21/08/2026     | Pass    | Mistake is spotted and feedbacks are loaded | N/A |
| TC-AISPEAKING-008 | 21/08/2026     | Pass    | Conversation History properly stored all revious questions and answers | N/A |
| TC-AISPEAKING-009 | 21/08/2026     | Pass    | Screnario menu is successfully blocked | N/A |
| TC-AISPEAKING-010 | 20/08/2026     | Pass    | Error message is successfully displayed | N/A |

### Notes from Test Run (20/08/2026)

* Random question API works for all three scenarios
* Invalid scenario and empty transcript return error responses
* No bugs found in the tested API paths during this session

### Notes from Test Run (20/08/2026)

* Speech-to-text is working as intended
* Analyze API returns scores and feedback correctly
* No bugs found in the tested API paths during this session

