### TC-PLP-UC9-001

**Title:** User selects predefined study time and existing CEFR level

**Preconditions:**

* User has just registered an account and is on the Onboarding screen

**Steps:**

1. Select '30 mins/day' for study time
2. Select 'I know my level'
3. Select 'B1'

**Expected Result:**

* System successfully generates a personalized B1 roadmap
* User is redirected to the Dashboard

**Priority:** High

---

### TC-PLP-UC9-002

**Title:** User selects 'I don\'t know my level' and takes placement test

**Preconditions:**

* User is on the English level selection step

**Steps:**

1. Select 'I don\'t know my level'
2. Complete the placement test (UC12) with 70% accuracy

**Expected Result:**

* System estimates level as B1 based on test results
* System generates the corresponding B1 roadmap

**Priority:** High

---

### TC-PLP-UC9-003

**Title:** User abandons survey halfway and returns

**Preconditions:**

* User is on step 2 of the Onboarding survey

**Steps:**

1. Close the application or browser tab
2. Reopen the application and log in

**Expected Result:**

* System resumes the survey from step 2 with previously saved progress

**Priority:** Medium

---

### TC-PLP-UC9-004

**Title:** User attempts to skip the survey entirely

**Preconditions:**

* User is on the survey screen

**Steps:**

1. Attempt to navigate to the dashboard using the URL directly or back button

**Expected Result:**

* System blocks navigation
* User is forced to complete the survey before accessing the dashboard

**Priority:** Medium

---

### TC-PLP-UC9-005

**Title:** User selects 'Flexible/varies' for study time

**Preconditions:**

* User is on the study time selection step

**Steps:**

1. Select 'Flexible/varies'
2. Complete the rest of the survey

**Expected Result:**

* System generates a roadmap with an adaptable daily schedule feature enabled

**Priority:** High

---

### TC-PLP-UC9-006

**Title:** System handles network loss during auto-generation

**Preconditions:**

* User is on the final step of the survey

**Steps:**

1. Disconnect the network connection
2. Click the submit button

**Expected Result:**

* System displays an error message: 'Network error, please try again.'
* User data is not lost

**Priority:** High

---

### TC-PLP-UC9-007

**Title:** Placement test timeout during survey

**Preconditions:**

* User is taking the placement test during onboarding

**Steps:**

1. Wait for the timer to expire without answering all questions

**Expected Result:**

* System auto-submits current answers
* System calculates a level based on answered questions (or A1 if 0 answered)

**Priority:** Medium

---

### TC-PLP-UC9-008

**Title:** Verify starting nodes for A1 vs B2 users

**Preconditions:**

* Two different user accounts created

**Steps:**

1. Complete survey for User 1 indicating A1 level
2. Complete survey for User 2 indicating B2 level
3. Compare generated roadmaps

**Expected Result:**

* User 1 roadmap starts at beginner lessons
* User 2 roadmap has A1-B1 lessons marked as 'passed/unlocked'

**Priority:** High

---

### TC-PLP-UC9-009

**Title:** Re-taking the onboarding survey

**Preconditions:**

* User has already completed the onboarding survey

**Steps:**

1. Attempt to access the onboarding URL again directly

**Expected Result:**

* System redirects the user to the main Dashboard
* User is not allowed to take the survey again

**Priority:** Low

---

### TC-PLP-UC9-010

**Title:** Verify AI generation speed

**Preconditions:**

* User has completed all survey questions

**Steps:**

1. Click submit on the final survey step
2. Measure the time taken to generate the roadmap

**Expected Result:**

* The personalized roadmap is generated and displayed within 3-5 seconds

**Priority:** Low

---

### TC-PLP-UC1-011

**Title:** View roadmap with default view

**Preconditions:**

* User has an active, generated roadmap

**Steps:**

1. Navigate to the Learning Roadmap page

**Expected Result:**

* Roadmap is rendered correctly
* The current active lesson is centered on the screen

**Priority:** High

---

### TC-PLP-UC1-012

**Title:** Locked vs Unlocked lessons visibility

**Preconditions:**

* User is currently at lesson 3

**Steps:**

1. Observe the visual state of lessons 4 and beyond

**Expected Result:**

* Lessons 4+ are visually greyed out (locked)
* Clicking them does not start the lesson

**Priority:** High

---

### TC-PLP-UC1-013

**Title:** Completed lessons display

**Preconditions:**

* User has finished lesson 1

**Steps:**

1. Observe the lesson 1 node on the roadmap

**Expected Result:**

* Lesson 1 shows a 'Completed' checkmark or badge

**Priority:** High

---

### TC-PLP-UC1-014

**Title:** Zoom in and Zoom out functionality

**Preconditions:**

* User is on the Learning Roadmap page

**Steps:**

1. Use pinch to zoom (mobile) or zoom buttons (desktop)
2. Verify UI scaling

**Expected Result:**

* Roadmap scales smoothly without breaking UI elements
* Text remains readable

**Priority:** Medium

---

### TC-PLP-UC1-015

**Title:** View lesson details on click

**Preconditions:**

* User is on the Learning Roadmap page

**Steps:**

1. Click on an unlocked lesson node

**Expected Result:**

* A popup/modal appears showing the lesson title, estimated time, and topics

**Priority:** Medium

---

### TC-PLP-UC1-016

**Title:** Scroll/Pan to future levels

**Preconditions:**

* User is currently at level A1

**Steps:**

1. Swipe/drag to view B1/B2 levels on the roadmap

**Expected Result:**

* User can preview future level nodes
* All future nodes are properly displayed as locked

**Priority:** Medium

---

### TC-PLP-UC1-017

**Title:** Click on a locked lesson

**Preconditions:**

* User is on the Learning Roadmap page

**Steps:**

1. Click on a locked lesson node

**Expected Result:**

* System shows a tooltip/message: 'Complete previous lessons to unlock.'
* Lesson does not start

**Priority:** Low

---

### TC-PLP-UC1-018

**Title:** Display Level Assessment milestones

**Preconditions:**

* Roadmap is loaded and visible

**Steps:**

1. Look for milestone nodes at the end of a CEFR level (e.g., end of A1)

**Expected Result:**

* Milestone nodes have distinct UI styling (e.g., a Crown or Trophy icon) compared to regular lessons

**Priority:** Medium

---

### TC-PLP-UC1-019

**Title:** Roadmap state after finishing a lesson

**Preconditions:**

* User is on the roadmap and about to finish a lesson

**Steps:**

1. Finish the active lesson
2. Return to the roadmap

**Expected Result:**

* The next lesson unlocks with an animation
* The overall progress bar updates

**Priority:** High

---

### TC-PLP-UC1-020

**Title:** Roadmap rendering on mobile device

**Preconditions:**

* User is logged in on a mobile browser or app

**Steps:**

1. Open the Learning Roadmap page

**Expected Result:**

* Roadmap is fully responsive
* It uses vertical scrolling or fits the mobile width appropriately

**Priority:** High

---

### TC-PLP-UC12-021

**Title:** Perfect score on Level Assessment

**Preconditions:**

* User has reached a milestone (e.g., end of A1)

**Steps:**

1. Start the assessment
2. Answer all questions correctly
3. Submit the test

**Expected Result:**

* System awards a 'Pass' result
* Unlocks the next CEFR level (A2)
* Updates the roadmap

**Priority:** High

---

### TC-PLP-UC12-022

**Title:** Failing the Level Assessment

**Preconditions:**

* User has reached a milestone

**Steps:**

1. Start the assessment
2. Answer less than 50% correctly
3. Submit the test

**Expected Result:**

* System awards a 'Fail' result
* Suggests review of weak topics
* Does NOT unlock the next level

**Priority:** High

---

### TC-PLP-UC12-023

**Title:** AI evaluation of open-ended speaking (Functional Correctness)

**Preconditions:**

* User reaches a speaking question in the assessment

**Steps:**

1. Record a grammatically correct spoken response
2. Submit the audio for evaluation

**Expected Result:**

* AI accurately analyzes the audio
* AI awards correct points based on CEFR rubrics for pronunciation and grammar

**Priority:** High

---

### TC-PLP-UC12-024

**Title:** AI handles off-topic spoken response

**Preconditions:**

* User reaches a speaking question

**Steps:**

1. Record a response that is fluent but completely off-topic
2. Submit for evaluation

**Expected Result:**

* AI flags the response as off-topic
* Awards 0 points for content relevance

**Priority:** Medium

---

### TC-PLP-UC12-025

**Title:** Save partial progress on test exit

**Preconditions:**

* User is midway through the assessment

**Steps:**

1. Answer 3 questions
2. Exit the test or close the tab

**Expected Result:**

* Test is marked incomplete
* Progress is saved OR user is explicitly warned before leaving that they will lose progress

**Priority:** Medium

---

### TC-PLP-UC12-026

**Title:** Timer behavior during Assessment

**Preconditions:**

* User is taking a timed assessment

**Steps:**

1. Start the test
2. Wait on one question without answering

**Expected Result:**

* Timer continuously counts down globally
* When timer hits 0, the test auto-submits current progress

**Priority:** Medium

---

### TC-PLP-UC12-027

**Title:** Network failure during AI evaluation

**Preconditions:**

* User is submitting the final assessment with AI components

**Steps:**

1. Disconnect internet
2. Click submit

**Expected Result:**

* System shows a loading state
* Displays message: 'Network error. Responses saved locally. Please retry.'

**Priority:** Medium

---

### TC-PLP-UC12-028

**Title:** AI Edge case: Strong regional accent in speaking

**Preconditions:**

* User is on a speaking question

**Steps:**

1. Record an answer with a heavy but intelligible regional accent

**Expected Result:**

* AI Speech Recognition correctly transcribes the words
* AI grades accurately without unfairly penalizing the accent

**Priority:** Medium

---

### TC-PLP-UC12-029

**Title:** Re-take cooldown period enforcement

**Preconditions:**

* User has just failed the assessment test

**Steps:**

1. Attempt to re-take the test immediately

**Expected Result:**

* System enforces a cooldown (e.g., 24h locked) OR requires the user to review X lessons before re-taking

**Priority:** High

---

### TC-PLP-UC12-030

**Title:** Detailed feedback report generation

**Preconditions:**

* User completes the assessment test

**Steps:**

1. View the results and feedback page

**Expected Result:**

* AI provides a detailed breakdown of strengths (e.g., Vocabulary) and weaknesses (e.g., Grammar)

**Priority:** Medium

---

### TC-PLP-UC13-031

**Title:** Set valid daily study hours

**Preconditions:**

* User is on the Study Settings page

**Steps:**

1. Set time to '1.5 hours/day'
2. Click Save

**Expected Result:**

* Settings update successfully
* Daily task schedule recalculates based on the new time

**Priority:** High

---

### TC-PLP-UC13-032

**Title:** Set extreme maximum hours

**Preconditions:**

* User is on the Study Settings page

**Steps:**

1. Set time to '24 hours/day'
2. Click Save

**Expected Result:**

* System shows validation error: 'Please enter a realistic study time (max 12h).'
* Value is not saved

**Priority:** Medium

---

### TC-PLP-UC13-033

**Title:** Set zero or negative hours

**Preconditions:**

* User is on the Study Settings page

**Steps:**

1. Set time to '0' or '-1'
2. Click Save

**Expected Result:**

* System prevents saving
* Shows error: 'Study time must be greater than 0.'

**Priority:** High

---

### TC-PLP-UC13-034

**Title:** Change commitment mid-day (Increase)

**Preconditions:**

* User has active tasks generated for a 1h commitment

**Steps:**

1. Change commitment from 1h to 3h at 2 PM
2. Save settings

**Expected Result:**

* System dynamically adds more tasks to today's schedule widget

**Priority:** High

---

### TC-PLP-UC13-035

**Title:** Change commitment mid-day (Decrease)

**Preconditions:**

* User has active tasks generated for a 3h commitment

**Steps:**

1. Change commitment from 3h to 1h at 2 PM
2. Save settings

**Expected Result:**

* System trims excess unstarted tasks from today's widget
* Completed progress for the day is not deleted

**Priority:** Medium

---

### TC-PLP-UC13-036

**Title:** Switch to 'Flexible' mode

**Preconditions:**

* User is on the Study Settings page

**Steps:**

1. Select the 'Flexible schedule' option
2. Save settings

**Expected Result:**

* Specific hour inputs are disabled
* System removes strict daily task limits and relies on manual initiation

**Priority:** Medium

---

### TC-PLP-UC13-037

**Title:** Input non-numeric characters in hours field

**Preconditions:**

* User is on the Study Settings page with a text input for hours

**Steps:**

1. Type 'abc' into the hours field

**Expected Result:**

* Field rejects input OR system shows error: 'Please enter numbers only.' upon save

**Priority:** Low

---

### TC-PLP-UC13-038

**Title:** Set different times for different days

**Preconditions:**

* User is on the Study Settings page with advanced scheduling enabled

**Steps:**

1. Set Mon-Fri to 1h
2. Set Sat-Sun to 3h
3. Save settings

**Expected Result:**

* System saves custom weekly schedule
* Updates daily tasks according to the current day of the week

**Priority:** Medium

---

### TC-PLP-UC13-039

**Title:** Cancel unsaved changes

**Preconditions:**

* User is on the Study Settings page

**Steps:**

1. Modify the study time
2. Click Cancel or navigate Back without saving

**Expected Result:**

* Previous study commitment is retained
* No recalculation of tasks occurs

**Priority:** Low

---

### TC-PLP-UC13-040

**Title:** UI reflection of saved commitment on Dashboard

**Preconditions:**

* User has saved a 2h commitment

**Steps:**

1. Navigate to the main Dashboard / Daily Widget

**Expected Result:**

* Widget shows daily progress out of 2 hours (e.g., '0/120 mins completed')

**Priority:** High

---

### TC-PLP-UC15-041

**Title:** Exact match calculation

**Preconditions:**

* User has a 1h (60m) commitment set

**Steps:**

1. Trigger daily calculation (by logging in for the first time today)

**Expected Result:**

* System schedules a combination of tasks totaling exactly or close to 60m

**Priority:** High

---

### TC-PLP-UC15-042

**Title:** Handling long tasks (overflow)

**Preconditions:**

* User has a 30m commitment set

**Steps:**

1. Trigger daily calculation where the next mandatory lesson takes 45m

**Expected Result:**

* System schedules the 45m lesson (allowing slight overflow rather than leaving the day empty)

**Priority:** Medium

---

### TC-PLP-UC15-043

**Title:** Mixed task types generation

**Preconditions:**

* User has flashcards due for review and new lessons available

**Steps:**

1. Trigger daily calculation

**Expected Result:**

* System includes both revision tasks and progression tasks

**Priority:** High

---

### TC-PLP-UC15-044

**Title:** All roadmap lessons completed

**Preconditions:**

* User has finished all lessons up to C2

**Steps:**

1. Trigger daily calculation

**Expected Result:**

* System schedules purely revision tasks (quizzes, flashcards)
* Notifies user they have completed the main roadmap

**Priority:** Medium

---

### TC-PLP-UC15-045

**Title:** Calculation after missed days

**Preconditions:**

* User missed 3 consecutive days of study

**Steps:**

1. Log in on the 4th day

**Expected Result:**

* System recalibrates schedule for today
* Does NOT stack 3 days of missed work into today's schedule

**Priority:** High

---

### TC-PLP-UC15-046

**Title:** Priority sorting of tasks (Failed Quiz)

**Preconditions:**

* User failed the last quiz taken yesterday

**Steps:**

1. Trigger daily calculation

**Expected Result:**

* System places a review of the failed quiz at the very top of today's schedule (highest priority)

**Priority:** Medium

---

### TC-PLP-UC15-047

**Title:** Mark daily tasks as done

**Preconditions:**

* User has generated tasks for the day

**Steps:**

1. Complete all tasks in the generated list

**Expected Result:**

* System displays a congratulatory message
* Updates the daily streak animation

**Priority:** High

---

### TC-PLP-UC15-048

**Title:** Requesting 'More Tasks' after completion

**Preconditions:**

* User finished daily tasks early

**Steps:**

1. Click 'Study More' or 'Add Tasks' button

**Expected Result:**

* System dynamically pulls the next lesson from the roadmap and appends it to today's schedule

**Priority:** Medium

---

### TC-PLP-UC15-049

**Title:** Streak freeze/pause interaction

**Preconditions:**

* User has an active 'Streak Freeze' or paused day

**Steps:**

1. Trigger daily calculation

**Expected Result:**

* System shows 'Rest Day' status
* Generates 0 mandatory tasks

**Priority:** Medium

---

### TC-PLP-UC15-050

**Title:** Performance/load test on schedule generation

**Preconditions:**

* User logs in exactly at 00:00 (start of new day)

**Steps:**

1. Measure the time taken to calculate and render the new daily schedule

**Expected Result:**

* Daily schedule is calculated and rendered on the dashboard in less than 2 seconds

**Priority:** Low

---

### Test Execution

| Test Case ID | Execution Date | Status | Actual Result   | Bug ID  |
| ------------ | -------------- | ------ | --------------- | ------- |
| TC-PLP-UC9-001 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-002 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-003 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-004 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-005 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-006 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-007 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-008 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-009 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC9-010 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-011 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-012 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-013 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-014 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-015 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-016 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-017 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-018 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-019 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC1-020 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-021 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-022 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-023 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-024 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-025 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-026 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-027 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-028 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-029 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC12-030 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-031 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-032 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-033 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-034 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-035 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-036 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-037 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-038 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-039 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC13-040 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-041 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-042 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-043 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-044 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-045 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-046 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-047 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-048 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-049 | [Date]         | Untested | [Actual result] | N/A     |
| TC-PLP-UC15-050 | [Date]         | Untested | [Actual result] | N/A     |