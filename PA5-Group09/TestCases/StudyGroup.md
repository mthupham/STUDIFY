### TC-SG-GROUP-001

**Title:** Create a valid study group

**Steps:**

1. Log in and navigate to the Study Group Hub.
2. Select **Create New Group**.
3. Enter a valid group name, description, and icon.
4. Click the button to create the group.

**Expected Result:**

* The study group is created successfully.
* The creator is assigned the **LEADER** role.
* The system automatically generates a group access code.
* The new group appears in the creator's group list.

**Priority:** High

---

### TC-SG-GROUP-002

**Title:** Verify that the generated group code is automatic and unique

**Steps:**

1. Log in with multiple valid user accounts.
2. Create several different study groups.
3. Record the access code generated for each group.
4. Compare the generated group codes.

**Expected Result:**

* Each group receives a 6-character access code.
* The code contains only uppercase letters and numbers.
* No two groups have the same access code.

**Priority:** High

---

### TC-SG-GROUP-003

**Title:** Validate group information length limits

**Steps:**

1. Log in and open the group creation or group update form.
2. Enter a group name longer than 100 characters.
3. Enter a description longer than 250 characters or an icon value longer than 50 characters.
4. Submit the create or update request.

**Expected Result:**

* The system rejects input that exceeds the allowed length limits.
* An appropriate validation message is displayed.
* The group information is not created or updated with invalid data.

**Priority:** Medium

---

### TC-SG-GROUP-004

**Title:** Join a study group using a nonexistent access code

**Steps:**

1. Log in and open the **Join Group** function.
2. Enter a nonexistent 6-character group access code.
3. Click **Join Group**.

**Expected Result:**

* The user is not added to any group.
* The system displays the message **Invalid group access code** or an equivalent error message.

**Priority:** High

---

### TC-SG-GROUP-005

**Title:** Prevent a user from joining the same group twice

**Steps:**

1. Log in with an account that is already a member of a study group.
2. Open the **Join Group** function.
3. Enter the access code of the group the user has already joined.
4. Click **Join Group**.

**Expected Result:**

* No duplicate group membership record is created.
* The system informs the user that they are already a member of the group.

**Priority:** High

---

### TC-SG-ROLE-006

**Title:** Leader updates study group information

**Steps:**

1. Log in as the Leader of the study group.
2. Open the group editing page.
3. Change the group name, description, or icon.
4. Save the changes.

**Expected Result:**

* The group information is updated successfully.
* The updated information is displayed correctly in both the Study Group Workspace and Study Group Hub.

**Priority:** High

---

### TC-SG-ROLE-007

**Title:** Member is not allowed to update study group information

**Steps:**

1. Log in as a Member of the study group.
2. Attempt to access the group update function directly through the interface or API.
3. Submit updated group information.

**Expected Result:**

* The request is rejected because the Member does not have permission to update the group.
* The study group information remains unchanged.

**Priority:** High

---

### TC-SG-ROLE-008

**Title:** Group member views group information and member list

**Steps:**

1. Log in as either the Leader or a Member of the study group.
2. Open the Study Group Workspace.
3. View the group information and member list.

**Expected Result:**

* The correct group name, group code, and member count are displayed.
* Each member's name, avatar, role, and join date are displayed correctly.

**Priority:** Medium

---

### TC-SG-ROLE-009

**Title:** Leader cannot remove themselves from the study group

**Steps:**

1. Log in as the Leader of the study group.
2. Attempt to remove the Leader's own account from the group.
3. Observe the system response.

**Expected Result:**

* The system rejects the request.
* The Leader remains a member of the study group.
* The system informs the Leader that leadership must be transferred before leaving or removing themselves from the group.

**Priority:** High

---

### TC-SG-ROLE-010

**Title:** Leader removes a Member from the study group

**Preconditions:**

* The study group has one Leader and at least one Member.

**Steps:**

1. The Leader selects a Member from the group member list.
2. Select **Remove Member** and confirm the action.
3. The removed Member attempts to access the Study Group Workspace again.

**Expected Result:**

* The Member is removed from the study group member list.
* The total number of group members decreases by one.
* The removed Member can no longer access the study group's resources or workspace.

**Priority:** High
---

### Test Execution

| Test Case ID | Execution Date | Status | Actual Result | Bug ID |
| ------------ | -------------- | ------ | ------------- | ------ |
| TC-SG-GROUP-001 | 20/08/2026 | Pass | Group was created successfully, the creator was assigned the Leader role, and a unique group code was generated. | N/A |
| TC-SG-GROUP-002 | 20/08/2026 | Pass | Each created group received a unique 6-character access code containing uppercase letters and numbers. | N/A |
| TC-SG-GROUP-003 | 20/08/2026 | Pass | The system correctly rejected group information that exceeded the allowed length limits and displayed validation messages. | N/A |
| TC-SG-GROUP-004 | 20/08/2026 | Pass | The system rejected the nonexistent group access code and did not add the user to any group. | N/A |
| TC-SG-GROUP-005 | 20/08/2026 | Pass | The system prevented duplicate membership and informed the user that they were already a member of the group. | N/A |
| TC-SG-ROLE-006 | 20/08/2026 | Pass | The Leader successfully updated the group information, and the new data was displayed correctly in the workspace and Study Group Hub. | N/A |
| TC-SG-ROLE-007 | 20/08/2026 | Pass | The Member was denied permission to update group information, and the existing group data remained unchanged. | N/A |
| TC-SG-ROLE-008 | 20/08/2026 | Pass | The group information and member list were displayed correctly, including member name, avatar, role, and join date. | N/A |
| TC-SG-ROLE-009 | 20/08/2026 | Pass | The system prevented the Leader from removing themselves from the group and kept the Leader membership unchanged. | N/A |
| TC-SG-ROLE-010 | 20/08/2026 | Pass | The Leader successfully removed the selected Member, the member count decreased by one, and the removed Member could no longer access group resources. | N/A |