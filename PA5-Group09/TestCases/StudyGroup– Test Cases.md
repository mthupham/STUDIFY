## Phân hệ 3: Không gian Học nhóm (Virtual Study Room)

### TC-STUDYGROUP-001

**Title:** Leader creates a new study group successfully

**Preconditions:**

* User is logged in.
* User is not currently creating another group.

**Steps:**

1. Navigate to **Study Groups**.
2. Select **Create Group**.
3. Enter a valid group name.
4. Confirm group creation.

**Expected Result:**

* A new study group is created successfully.
* The system automatically generates a unique group code.
* The creator is assigned the **Leader** role.
* The group is displayed in the user's Study Group list.

**Priority:** High

---

### TC-STUDYGROUP-002

**Title:** Member joins a study group using a valid group code

**Preconditions:**

* User is logged in.
* A valid study group exists.
* The group has fewer than 5 members.
* User is not already a member of the group.

**Steps:**

1. Navigate to **Study Groups**.
2. Select **Join Group**.
3. Enter a valid group code.
4. Confirm joining the group.

**Expected Result:**

* User joins the correct study group successfully.
* User is assigned the **Member** role.
* The member count is updated.
* The group appears in the user's Study Group list.

**Priority:** High

---

### TC-STUDYGROUP-003

**Title:** User attempts to join a group using an invalid group code

**Preconditions:**

* User is logged in.

**Steps:**

1. Navigate to **Join Group**.
2. Enter an invalid or nonexistent group code.
3. Submit the request.

**Expected Result:**

* User is not added to any group.
* The system displays an appropriate error message indicating that the group code is invalid or the group does not exist.

**Priority:** High

---

### TC-STUDYGROUP-004

**Title:** User attempts to join a study group that already has 5 members

**Preconditions:**

* User is logged in.
* A study group already contains 5 members.
* User is not currently a member of the group.

**Steps:**

1. Navigate to **Join Group**.
2. Enter the valid code of the full group.
3. Confirm joining.

**Expected Result:**

* User is not added to the group.
* Group membership remains limited to a maximum of 5 people.
* The system displays a message indicating that the group is full.

**Priority:** High

---

### TC-STUDYGROUP-005

**Title:** Leader accesses group management functions

**Preconditions:**

* User is logged in.
* User has the **Leader** role in the study group.

**Steps:**

1. Open the study group's Leader Workspace.
2. View the available management functions.

**Expected Result:**

* Leader can access group management functions.
* Leader can access **Schedule & Deadlines**.
* Leader can create and manage tasks.
* Leader can upload shared learning materials.

**Priority:** High

---

### TC-STUDYGROUP-006

**Title:** Member is prevented from performing Leader-only actions

**Preconditions:**

* User is logged in.
* User has the **Member** role.

**Steps:**

1. Open the study group workspace.
2. Attempt to access Leader-only functions such as creating tasks or editing group management information.

**Expected Result:**

* Member cannot perform Leader-only operations.
* Restricted controls are hidden or disabled.
* Direct unauthorized API requests are rejected by the system.

**Priority:** High

---

### TC-STUDYGROUP-007

**Title:** Leader creates and assigns a task to a group member

**Preconditions:**

* User is logged in as Leader.
* Study group exists.
* At least one Member exists in the group.

**Steps:**

1. Open **Schedule & Deadlines**.
2. Select **Create Task**.
3. Enter the task title and description.
4. Select a Member from the group.
5. Set the task category.
6. Set the deadline.
7. Save the task.

**Expected Result:**

* Task is created successfully.
* Task is linked to the correct study group.
* Task is assigned to the selected Member.
* The specified deadline is saved correctly.
* The new task appears in the Leader's task list.

**Priority:** High

---

### TC-STUDYGROUP-008

**Title:** Leader attempts to create a task with an invalid deadline

**Preconditions:**

* User is logged in as Leader.

**Steps:**

1. Open **Create Task**.
2. Enter valid task information.
3. Set a start date.
4. Set a deadline earlier than or equal to the start date.
5. Submit the task.

**Expected Result:**

* Task is not created.
* The system displays a validation message indicating that the deadline must be after the start date.

**Priority:** High

---

### TC-STUDYGROUP-009

**Title:** Member views tasks assigned specifically to them

**Preconditions:**

* User is logged in as Member.
* Leader has assigned one or more tasks to the Member.

**Steps:**

1. Open the Member Study Group workspace.
2. Navigate to the task section or task widget.

**Expected Result:**

* Member sees tasks assigned to their account.
* Task title, deadline and status are displayed correctly.
* Tasks assigned to other Members are not displayed.

**Priority:** High

---

### TC-STUDYGROUP-010

**Title:** Assigned task is displayed in the Member's personal Dashboard widget

**Preconditions:**

* User is logged in as Member.
* At least one active task has been assigned to the Member.

**Steps:**

1. Log in using the Member account.
2. Navigate to the personal Dashboard.
3. View the task notification widget.

**Expected Result:**

* The widget displays the Member's assigned tasks.
* Upcoming deadlines are visible.
* Tasks are ordered appropriately, such as by nearest deadline.
* Hidden tasks are not displayed.

**Priority:** High

---

### TC-STUDYGROUP-011

**Title:** Member updates the status of their assigned task

**Preconditions:**

* User is logged in as Member.
* A task is assigned to the current Member.

**Steps:**

1. Open the assigned task.
2. Change its status from **NOT_STARTED** to **IN_PROGRESS**.
3. Change the task status to **COMPLETED**.

**Expected Result:**

* Status updates are saved successfully.
* When status becomes `COMPLETED`, the system records `completedAt`.
* The updated status is reflected in the Member and Leader views.

**Priority:** High

---

### TC-STUDYGROUP-012

**Title:** Leader creates a study schedule successfully

**Preconditions:**

* User is logged in as Leader.
* Study group exists.

**Steps:**

1. Open **Schedule & Deadlines**.
2. Select the option to create a schedule.
3. Enter schedule title and optional description.
4. Set start date/time.
5. Set end date/time.
6. Add a location or meeting link if needed.
7. Save the schedule.

**Expected Result:**

* Schedule is created successfully.
* Schedule is linked to the correct study group.
* Start and end time are stored correctly.
* Schedule appears in the group's Schedule view.
* Group Members can view the created schedule.

**Priority:** High

---

### TC-STUDYGROUP-013

**Title:** Member uploads and another member downloads a shared learning file

**Preconditions:**

* Users are members of the same study group.
* User has a valid PDF or image file.

**Steps:**

1. Open **Shared File Repository**.
2. Upload a valid PDF or image.
3. Log in using another group member account.
4. Open the shared repository.
5. Select the uploaded file.
6. Download the file.

**Expected Result:**

* Valid file is uploaded successfully.
* File appears in the shared repository.
* Other group members can view the file.
* File can be downloaded successfully.

**Priority:** High

---

### TC-STUDYGROUP-014

**Title:** User attempts to upload an unsupported file type

**Preconditions:**

* User belongs to a study group.
* User has a file type that is not supported.

**Steps:**

1. Open **Shared File Repository**.
2. Select an unsupported file type.
3. Attempt to upload the file.

**Expected Result:**

* Unsupported file is rejected.
* The repository is not updated with the invalid file.
* The system displays an appropriate file-format validation message.

**Priority:** Medium

---

### TC-STUDYGROUP-015

**Title:** Group members exchange messages through real-time chat

**Preconditions:**

* Two users belong to the same study group.
* Both users are logged in and connected to the group chat.

**Steps:**

1. User A opens the Study Group chat.
2. User B opens the same Study Group chat.
3. User A sends a text message.
4. Observe User B's chat window.

**Expected Result:**

* User A's message is sent successfully.
* User B receives the message without manually refreshing the page.
* Message content is displayed correctly in the shared group chat.
* The message is associated with the correct sender and study group.

**Priority:** High

---

## Test Execution

| Test Case ID | Execution Date | Status | Actual Result | Bug ID |
| --- | --- | --- | --- | --- |
| TC-STUDYGROUP-001 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-002 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-003 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-004 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-005 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-006 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-007 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-008 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-009 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-010 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-011 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-012 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-013 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-014 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |
| TC-STUDYGROUP-015 | [Date] | [Pass/Fail] | [Actual result] | [Bug ID/N/A] |