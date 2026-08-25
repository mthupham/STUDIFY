# Studify - System Use-Case Specifications

## Module: Virtual Study Room

**Version:** 1.0  
**Date:** 23/Jul/26  
**Author:** Minh Thư  

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `23/Jul/26` | `1.0` | Initial unified version of all Virtual Study Room use-case specifications (UC1 to UC7) | `Minh Thư` |

---

### Table of Contents

- [1. Create New Study Group](#1-create-new-study-group)
  - [1.1 Use-Case Name & Description](#11-use-case-name--description)
  - [1.2 Flow of Events](#12-flow-of-events)
  - [1.3 Special Requirements](#13-special-requirements)
  - [1.4 Preconditions](#14-preconditions)
  - [1.5 Postconditions](#15-postconditions)
  - [1.6 Extension Points](#16-extension-points)
- [2. Join Group via Code](#2-join-group-via-code)
  - [2.1 Use-Case Name & Description](#21-use-case-name--description)
  - [2.2 Flow of Events](#22-flow-of-events)
  - [2.3 Special Requirements](#23-special-requirements)
  - [2.4 Preconditions](#24-preconditions)
  - [2.5 Postconditions](#25-postconditions)
  - [2.6 Extension Points](#26-extension-points)
- [3. Manage & Assign Tasks](#3-manage--assign-tasks)
  - [3.1 Use-Case Name & Description](#31-use-case-name--description)
  - [3.2 Flow of Events](#32-flow-of-events)
  - [3.3 Special Requirements](#33-special-requirements)
  - [3.4 Preconditions](#34-preconditions)
  - [3.5 Postconditions](#35-postconditions)
  - [3.6 Extension Points](#36-extension-points)
- [4. View Assigned Tasks](#4-view-assigned-tasks)
  - [4.1 Use-Case Name & Description](#41-use-case-name--description)
  - [4.2 Flow of Events](#42-flow-of-events)
  - [4.3 Special Requirements](#43-special-requirements)
  - [4.4 Preconditions](#44-preconditions)
  - [4.5 Postconditions](#45-postconditions)
  - [4.6 Extension Points](#46-extension-points)
- [5. Manage Study Schedule](#5-manage-study-schedule)
  - [5.1 Use-Case Name & Description](#51-use-case-name--description)
  - [5.2 Flow of Events](#52-flow-of-events)
  - [5.3 Special Requirements](#53-special-requirements)
  - [5.4 Preconditions](#54-preconditions)
  - [5.5 Postconditions](#55-postconditions)
  - [5.6 Extension Points](#56-extension-points)
- [6. Manage Study Material](#6-manage-study-material)
  - [6.1 Use-Case Name & Description](#61-use-case-name--description)
  - [6.2 Flow of Events](#62-flow-of-events)
  - [6.3 Special Requirements](#63-special-requirements)
  - [6.4 Preconditions](#64-preconditions)
  - [6.5 Postconditions](#65-postconditions)
  - [6.6 Extension Points](#66-extension-points)
- [7. Discuss via Group Chat (Real-time)](#7-discuss-via-group-chat-real-time)
  - [7.1 Use-Case Name & Description](#71-use-case-name--description)
  - [7.2 Flow of Events](#72-flow-of-events)
  - [7.3 Special Requirements](#73-special-requirements)
  - [7.4 Preconditions](#74-preconditions)
  - [7.5 Postconditions](#75-postconditions)
  - [7.6 Extension Points](#76-extension-points)

---

## 1. Create New Study Group

### 1.1 Use-Case Name & Description

**Use-Case Name:** Create New Study Group

**Brief Description:**  
This use case allows an authenticated System User to create a new Virtual Study Room for collaborative learning. The user provides the required group information, such as the study group name and optional description. The system validates the provided information, creates the study group, assigns the creating user as the group Leader, and automatically generates a unique group code that can be used by other users to join the study group. The newly created group is then displayed to the user.

---

### 1.2 Flow of Events

#### 1.2.1 Basic Flow

1. The use case begins when the **System User** selects the **Create New Study Group** function from the Virtual Study Room interface.  
![alt text](../../Images/Module_3/1a.png)

2. The system displays the study group creation form.  
![alt text](../../Images/Module_3/1b.png)

3. The System User enters the required study group information:
   * Group name.
   * Group description (optional)

4. The System User submits the group creation form.

5. The system validates the provided group information.

6. The system creates a new study group with the provided information.

7. The system assigns the System User who created the group as the **Leader** of the newly created study group.

8. The system automatically generates a unique group code for the newly created study group. This step invokes the **Auto-generate Group Code** included use case.

9. The system stores the study group information and the generated group code.

10. The system displays a success notification and the newly created study group's information to the System User.

11. The System User can view the group name, group description, generated group code, and their role as **Leader**.

12. The use case ends successfully.  
![alt text](../../Images/Module_3/1c.png)

---

#### 1.2.2 Alternative Flows

##### Group Creation Cancelled
1. At any point before submitting the group creation form, the System User selects the **Cancel** option.
2. The system cancels the group creation process.
3. The system returns the System User to the Virtual Study Room page.
4. No new study group is created.
5. The use case ends.

##### Invalid Group Information
![alt text](../../Images/Module_3/1d.png)
1. At Step 5 of the Basic Flow, the system detects that the provided group information is invalid.
2. The system displays an appropriate validation message indicating the invalid or missing information.
3. The System User corrects the provided information.
4. The System User resubmits the group creation form.
5. The system validates the updated information again.
6. If the information is valid, the system resumes the Basic Flow at Step 6.

##### Group Creation Failed
![alt text](../../Images/Module_3/1e.png)
1. At Step 6 or Step 9 of the Basic Flow, the system fails to create or save the study group due to a system or database error.
2. The system displays an error message informing the System User that the study group could not be created.
3. The system does not create a partially completed study group.
4. The System User may retry the creation process.
5. The use case ends.

---

### 1.3 Special Requirements

#### 1.3.1 Security
* Only authenticated System Users can create a new study group.
* The system must associate the newly created study group with the authenticated user's account.
* The system must assign the creator the **Leader** role automatically.
* The generated group code must be unique and difficult to guess to prevent unauthorized access to private study groups.

#### 1.3.2 Performance
* The system should complete the group creation process and display the result within **2 seconds** under normal operating conditions.
* The system must generate the group code without requiring additional input from the user.

#### 1.3.3 Usability
* The group creation form must clearly identify required and optional fields.
* The system must provide clear validation messages when the entered information is invalid.
* The generated group code must be clearly displayed after successful group creation so that the Leader can share it with other users.

---

### 1.4 Preconditions

#### 1.4.1 User Authentication
* The System User must have a valid registered account.
* The System User must be successfully authenticated and logged into the system.
* The System User must have access to the **Virtual Study Room** subsystem.
* The system must be available and able to access the database.

---

### 1.5 Postconditions

#### 1.5.1 Study Group Successfully Created
If the use case completes successfully:
* A new study group is created and stored in the system.
* The provided group name and description are associated with the study group.
* A unique group code is generated and associated with the study group.
* The System User who created the group is assigned the **Leader** role.
* The newly created study group is available in the user's study group list.
* The generated group code can be shared with other users so they can join the study group.

If the use case is cancelled or fails:
* No new study group is created.
* No incomplete study group record is stored in the system.

---

### 1.6 Extension Points

#### 1.6.1 Auto-generate Group Code
The extension point occurs after the system has validated the provided group information and before the newly created study group is presented to the System User.

The system automatically generates a unique group code for the newly created study group. The generated code is stored with the study group and is subsequently displayed to the group Leader. The group code is used by other System Users to join the study group through the **Join Group via Code** use case.

---

## 2. Join Group via Code

### 2.1 Use-Case Name & Description

**Use-Case Name:** Join Group via Code

**Brief Description:**  
This use case allows an authenticated System User to join an existing Virtual Study Room by entering a valid group code provided by the group's Leader or another group member. The system verifies the entered group code, checks the availability and capacity of the study group, and adds the System User as a Member if all conditions are satisfied. The System User can then access the group's shared resources and collaborative study features.

---

### 2.2 Flow of Events

#### 2.2.1 Basic Flow

1. The use case begins when the **System User** selects the **Join Group via Code** function from the Virtual Study Room interface.  
![alt text](../../Images/Module_3/2a.png)

2. The system displays a form requesting the group code.  
![alt text](../../Images/Module_3/2b.png)

3. The System User enters the group code received from the Leader or another member of the study group.  
![alt text](../../Images/Module_3/2c.png)

4. The System User submits the group code.

5. The system validates the entered group code.

6. The system identifies the study group associated with the provided group code.

7. The system checks whether the study group is available for new members and whether the current number of members is below the maximum capacity of **5 members**.

8. The system checks whether the System User is already a member of the identified study group.

9. If all validation conditions are satisfied, the system adds the System User to the study group and assigns the **Member** role.

10. The system updates the study group's member list.

11. The system displays a success notification to the System User.  
![alt text](../../Images/Module_3/2d.png)

12. The system displays the study group's information and makes the group's available features accessible to the newly joined Member.

13. The use case ends successfully.

---

#### 2.2.2 Alternative Flows

##### Invalid or Non-existent Group Code
![alt text](../../Images/Module_3/2e.png)
1. At Step 5 of the Basic Flow, the system determines that the entered group code is invalid or does not correspond to any existing study group.
2. The system displays an error message indicating that the group code is invalid or does not exist.
3. The System User enters a valid group code.
4. The System User submits the group code again.
5. The system validates the new group code.
6. If the group code is valid, the system resumes the Basic Flow at Step 6.

##### Group Has Reached Maximum Capacity
![alt text](../../Images/Module_3/2f.png)
1. At Step 7 of the Basic Flow, the system determines that the study group already has **5 members**.
2. The system does not add the System User to the study group.
3. The system displays a notification informing the System User that the study group has reached its maximum capacity.
4. The System User may enter another group code to join a different study group.
5. The use case ends.

##### User Already Belongs to the Group
![alt text](../../Images/Module_3/2g.png)
1. At Step 8 of the Basic Flow, the system determines that the System User is already a member of the selected study group.
2. The system does not create a duplicate membership record.
3. The system displays a notification informing the System User that they have already joined the study group.
4. The system provides an option for the System User to access the existing study group.
5. If the System User chooses to access the group, the system displays the study group's main page.
6. The use case ends.

##### Join Operation Failed
![alt text](../../Images/Module_3/2h.png)
1. At Step 9 or Step 10 of the Basic Flow, the system fails to add the System User to the study group due to a system or database error.
2. The system displays an error message informing the System User that the join operation could not be completed.
3. The system does not create an incomplete or duplicate membership record.
4. The System User may retry the join operation.
5. The use case ends.

---

### 2.3 Special Requirements

#### 2.3.1 Security
* Only authenticated System Users can join a study group.
* The system must validate the group code before granting access to the study group.
* The system must not expose sensitive information about a study group when an invalid group code is provided.
* The system must prevent duplicate membership records for the same user and study group.
* The system must assign the **Member** role to a user who successfully joins an existing study group through a group code.

#### 2.3.2 Performance
* The system should validate the group code and complete the join operation within **2 seconds** under normal operating conditions.
* The system should immediately update the study group's member list after a successful join operation.

#### 2.3.3 Usability
* The group code input field must be clearly visible and easy to use.
* The system must provide clear error messages for invalid codes, full groups, and duplicate membership.
* The system must clearly notify the System User when they have successfully joined a study group.
* After successfully joining the group, the system should provide direct access to the study group's main page.

---

### 2.4 Preconditions

#### 2.4.1 User Authentication and Group Availability
* The System User must have a valid registered account.
* The System User must be successfully authenticated and logged into the system.
* The System User must have access to the **Virtual Study Room** subsystem.
* The study group that the System User wants to join must already exist.
* The study group must have a valid group code generated by the system.
* The system must be available and able to access the database.

---

### 2.5 Postconditions

#### 2.5.1 User Successfully Joins the Study Group
If the use case completes successfully:
* The System User is added to the selected study group.
* The System User is assigned the **Member** role.
* The study group's member list is updated.
* The System User can access the study group's available features and resources.
* The System User can participate in group activities, such as viewing assigned tasks, accessing shared study materials, and participating in the group chat.

If the use case fails or is terminated due to an alternative flow:
* The System User is not added to the study group.
* No duplicate or incomplete membership record is created.
* The existing study group data remains unchanged.

---

### 2.6 Extension Points

#### 2.6.1 Validate Group Code
The extension point occurs after the System User submits the group code and before the system adds the System User to the study group.

The system validates the provided group code and identifies the corresponding study group. The system also verifies that the group exists, is available for new members, has not reached the maximum capacity of **5 members**, and that the System User is not already a member of the group. If all conditions are satisfied, the Basic Flow continues. Otherwise, the appropriate Alternative Flow is triggered.

---

## 3. Manage & Assign Tasks

### 3.1 Use-Case Name & Description

**Use-Case Name:** Manage & Assign Tasks

**Brief Description:**  
This use case allows the **Leader** of a Virtual Study Room to manage study tasks and assign them to group Members. The Leader can create a new task, define its details and deadline, and assign the task to one or more eligible Members of the study group. The system validates the task information and assignee, stores the task, and updates the assigned Member's task list. The task creation and deadline configuration process is handled through the included **Create Task & Set Deadline** use case.

---

### 3.2 Flow of Events

#### 3.2.1 Basic Flow

1. The use case begins when the **Leader** selects the **Manage & Assign Tasks** function from the study group's interface.  
![alt text](../../Images/Module_3/3a.png)

2. The system displays the task management interface, including the existing tasks of the study group and available task management actions.

3. The Leader selects the option to create and assign a new task.

4. The system displays the task creation form.

5. The Leader initiates the **Create Task & Set Deadline** included use case.

6. The Leader provides the required task information, including:
   * Task title.
   * Task description.
   * Deadline.
   * Assigned Member or Members.  
![alt text](../../Images/Module_3/3b.png)

7. The system validates the provided task information and verifies that the selected assignee(s) belong to the current study group.  
![alt text](../../Images/Module_3/3c.png)

8. The system creates the task with the provided information and deadline.

9. The system assigns the task to the selected Member or Members.

10. The system stores the task and assignment information.

11. The system updates the assigned Member's task list.

12. The system displays a success notification to the Leader.  
![alt text](../../Images/Module_3/3d.png)

13. The assigned Member or Members can view the newly assigned task through the **View Assigned Tasks** use case.

14. The use case ends successfully.

---

#### 3.2.2 Alternative Flows

##### Invalid Task Information
![alt text](../../Images/Module_3/3e.png)
1. At Step 7 of the Basic Flow, the system determines that one or more required task fields are missing or invalid.
2. The system displays an appropriate validation message identifying the invalid information.
3. The Leader corrects the task information.
4. The Leader submits the task information again.
5. The system validates the updated information.
6. If all information is valid, the system resumes the Basic Flow at Step 8.

##### Invalid Task Assignee
![alt text](../../Images/Module_3/3f.png)
1. At Step 7 of the Basic Flow, the system determines that the selected assignee is not a Member of the current study group or is no longer an active Member.
2. The system displays an error message informing the Leader that the selected user cannot be assigned the task.
3. The Leader selects another eligible Member of the study group.
4. The system validates the new assignee.
5. If the selected Member is valid, the system resumes the Basic Flow at Step 8.

##### Task Assignment Cancelled
1. Before the task is successfully created, the Leader selects the **Cancel** option.
2. The system cancels the task creation and assignment operation.
3. The system does not create or assign the task.
4. The system returns the Leader to the task management interface.  
![alt text](../../Images/Module_3/3g.png)
5. The use case ends.

##### Task Management Operation Failed
![alt text](../../Images/Module_3/3h.png)
1. At Step 8, Step 9, or Step 10 of the Basic Flow, the system encounters an error while creating, assigning, or storing the task.
2. The system displays an error message informing the Leader that the task management operation could not be completed.
3. The system ensures that no incomplete or duplicate task assignment is stored.
4. The Leader may retry the task creation and assignment operation.
5. The use case ends.

---

### 3.3 Special Requirements

#### 3.3.1 Security and Access Control
* Only the **Leader** of the study group can create and assign tasks through this use case.
* The system must verify the Leader's membership and role before allowing task management operations.
* The Leader can only assign tasks to Members who belong to the same study group.
* A Member must not be able to assign tasks to themselves or other Members through this use case unless explicitly authorized by the system's role permissions.

#### 3.3.2 Performance
* The system should complete task creation and assignment within **2 seconds** under normal operating conditions.
* The updated task information should be immediately available to the assigned Member or Members after successful creation.

#### 3.3.3 Usability
* The task creation form must clearly identify required and optional fields.
* The system must provide clear validation messages when task information is invalid.
* The system must provide a list of eligible Members when the Leader selects task assignees.
* The system must clearly display the task title, description, deadline, and assignee information.
* The Leader must receive clear confirmation after the task has been successfully created and assigned.

---

### 3.4 Preconditions

#### 3.4.1 Leader Authentication and Group Membership
* The Leader must have a valid registered account.
* The Leader must be successfully authenticated and logged into the system.
* The Leader must belong to an existing Virtual Study Room.
* The authenticated user must have the **Leader** role in the selected study group.
* The study group must contain at least one eligible Member who can be assigned a task.
* The system must be available and able to access the database.

---

### 3.5 Postconditions

#### 3.5.1 Task Successfully Created and Assigned
If the use case completes successfully:
* A new study task is created and stored in the system.
* The task contains the provided title and description.
* The task has a defined deadline.
* The task is assigned to the selected Member or Members.
* The task appears in the assigned Member's task list.
* The assigned Member or Members can view the task through the **View Assigned Tasks** use case.
* The Leader can view the created task in the study group's task management interface.

If the use case is cancelled or fails:
* No incomplete task is created.
* No invalid task assignment is stored.
* Existing tasks and task assignments remain unchanged.

---

### 3.6 Extension Points

#### 3.6.1 Create Task & Set Deadline
The extension point occurs when the Leader chooses to create a new task during the task management process.

The system invokes the **Create Task & Set Deadline** use case to collect and validate the task's title, description, and deadline. After the task information is successfully created and validated, the **Manage & Assign Tasks** use case continues by assigning the task to the selected Member or Members and storing the assignment information.

---

## 4. View Assigned Tasks

### 4.1 Use-Case Name & Description

**Use-Case Name:** View Assigned Tasks

**Brief Description:**  
This use case allows a **Member** of a Virtual Study Room to view the study tasks assigned to them by the group's Leader. The system retrieves the Member's assigned tasks and displays relevant task information, including the task title, description, deadline, and current status. The Member can use this information to understand their assigned study responsibilities and track the tasks that need to be completed.

---

### 4.2 Flow of Events

#### 4.2.1 Basic Flow

1. The use case begins when the **Member** selects the **View Assigned Tasks** function from the Virtual Study Room interface.  
![alt text](../../Images/Module_3/4a.png)

2. The system verifies the authenticated user's membership in the selected study group.

3. The system retrieves the tasks assigned to the current Member within the selected study group.

4. The system retrieves the relevant information for each assigned task, including:
   * Task title.
   * Task description.
   * Deadline.
   * Current task status.
   * Assignment information.

5. The system displays the list of assigned tasks to the Member.  
![alt text](../../Images/Module_3/4b.png)

6. The Member selects an assigned task to view its details.  
![alt text](../../Images/Module_3/4c.png)

7. The system displays the selected task's detailed information.

8. If applicable, the system displays the **Dashboard Notification Widget** to notify the Member about relevant task information, such as upcoming or overdue deadlines. This behavior is handled through the **Display Dashboard Notification Widget** extension point.

9. The Member reviews the assigned task information.

10. The use case ends successfully.

---

#### 4.2.2 Alternative Flows

##### No Assigned Tasks
![alt text](../../Images/Module_3/4e.png)
1. At Step 3 of the Basic Flow, the system determines that the Member has no tasks currently assigned to them.
2. The system displays a message informing the Member that there are currently no assigned tasks.
3. The system may provide an option for the Member to return to the Virtual Study Room main page.
4. The use case ends.

##### Task Information Unavailable
![alt text](../../Images/Module_3/4d.png)
1. At Step 4 of the Basic Flow, the system determines that some task information is unavailable or incomplete.
2. The system displays the available task information.
3. The system indicates that the unavailable information cannot currently be displayed.
4. The Member may refresh the task list to retrieve the latest information.
5. If the information becomes available, the system updates the displayed task information.
6. The use case continues or ends depending on the Member's action.

##### Task Retrieval Failed
![alt text](../../Images/Module_3/4f.png)
1. At Step 3 of the Basic Flow, the system fails to retrieve the Member's assigned tasks due to a system or database error.
2. The system displays an error message informing the Member that the assigned tasks could not be loaded.
3. The system does not display outdated or incomplete task information as current data.
4. The Member may retry the operation.
5. If the retry is successful, the system resumes the Basic Flow at Step 3.
6. Otherwise, the use case ends.

---

### 4.3 Special Requirements

#### 4.3.1 Security and Access Control
* Only authenticated users who are Members or Leaders of the selected study group can access task information belonging to that group.
* A Member can only view tasks assigned to them through this use case.
* The system must prevent a Member from accessing private task information belonging to another study group.
* The system must ensure that task information displayed to the Member reflects the latest available data.

#### 4.3.2 Performance
* The system should retrieve and display the assigned task list within **2 seconds** under normal operating conditions.
* Task information should be updated promptly when the Member refreshes the task list.

#### 4.3.3 Usability
* The assigned task list must clearly display essential information such as task title, deadline, and status.
* Tasks should be presented in a clear and organized manner.
* The system should clearly indicate tasks that are approaching their deadlines or are overdue.
* The Member should be able to select a task to view its complete details.
* The system should provide a clear message when no tasks are assigned.

---

### 4.4 Preconditions

#### 4.4.1 User Authentication and Group Membership
* The Member must have a valid registered account.
* The Member must be successfully authenticated and logged into the system.
* The Member must belong to an existing Virtual Study Room.
* The selected study group must contain task information accessible to the current Member.
* The system must be available and able to access the database.

---

### 4.5 Postconditions

#### 4.5.1 Assigned Tasks Successfully Displayed
If the use case completes successfully:
* The Member can view the list of tasks assigned to them.
* The Member can view the details of an assigned task.
* The displayed task information includes the available task title, description, deadline, and status.
* The Member is informed about relevant upcoming or overdue task deadlines when applicable.
* No task data is modified by this use case.

If no tasks are assigned:
* The system informs the Member that no tasks are currently assigned.
* No task data is modified.

If the use case fails:
* No task data is modified.
* The system informs the Member that the task information could not be retrieved.

---

### 4.6 Extension Points

#### 4.6.1 Display Dashboard Notification Widget
The extension point occurs after the system displays the assigned task list and when relevant task-related notifications are available.

The system may extend the **View Assigned Tasks** use case by displaying the **Dashboard Notification Widget** to notify the Member about important task information, such as newly assigned tasks, upcoming deadlines, or overdue tasks. The notification widget does not prevent the Member from viewing their assigned tasks and is only displayed when relevant notification conditions are met.

---

## 5. Manage Study Schedule

### 5.1 Use-Case Name & Description

**Use-Case Name:** Manage Study Schedule

**Brief Description:**  
This use case allows the **Leader** of a Virtual Study Room to create and manage a shared study schedule for the group. The Leader can create a study session by specifying relevant information such as the session title, date, start time, end time, and optional description. The system validates the schedule information, checks for scheduling conflicts, stores the study schedule, and makes the updated schedule available to the group's Members.

---

### 5.2 Flow of Events

#### 5.2.1 Basic Flow

1. The use case begins when the **Leader** selects the **Manage Study Schedule** function from the Virtual Study Room interface.  
![alt text](../../Images/Module_3/5a.png)

2. The system verifies that the authenticated user has the **Leader** role in the selected study group.

3. The system displays the study schedule management interface, including existing study sessions and available schedule management actions.

4. The Leader selects the option to create a new study session.

5. The system displays the study schedule creation form.

6. The Leader enters the study session information, including:
   * Session title.
   * Session description (optional).
   * Study date.
   * Start time.
   * End time.  
![alt text](../../Images/Module_3/5b.png)

7. The Leader submits the study schedule information.

8. The system validates the provided schedule information.

9. The system checks whether the specified study date and time are valid and whether the new study session conflicts with an existing scheduled session in the same study group.

10. If the schedule information is valid and no conflict exists, the system creates and stores the new study session.

11. The system updates the shared study schedule of the study group.

12. The system displays a success notification to the Leader.  
![alt text](../../Images/Module_3/5c.png)

13. The updated study schedule becomes available for the group's Members to view.

14. The system may notify the group Members about the newly created study session.  
![alt text](../../Images/Module_3/5d.png)

15. The use case ends successfully.

---

#### 5.2.2 Alternative Flows

##### Invalid Schedule Information
![alt text](../../Images/Module_3/5e.png)
1. At Step 8 of the Basic Flow, the system determines that one or more required schedule fields are missing or invalid.
2. The system displays an appropriate validation message identifying the invalid information.
3. The Leader corrects the schedule information.
4. The Leader submits the schedule information again.
5. The system validates the updated information.
6. If all information is valid, the system resumes the Basic Flow at Step 9.

##### Schedule Conflict
![alt text](../../Images/Module_3/5f.png)
1. At Step 9 of the Basic Flow, the system determines that the new study session overlaps with an existing study session in the same study group.
2. The system displays a notification informing the Leader about the scheduling conflict.
3. The Leader modifies the study date or time.
4. The Leader submits the updated schedule information.
5. The system checks the updated schedule for conflicts again.
6. If no conflict exists, the system resumes the Basic Flow at Step 10.

##### Schedule Management Cancelled
![alt text](../../Images/Module_3/5g.png)
1. Before the new study session is successfully created, the Leader selects the **Cancel** option.
2. The system cancels the schedule creation operation.
3. The system does not create or store the new study session.
4. The system returns the Leader to the study schedule management interface.
5. The use case ends.

##### Schedule Management Operation Failed
![alt text](../../Images/Module_3/5h.png)
1. At Step 10 or Step 11 of the Basic Flow, the system encounters an error while creating, storing, or updating the study schedule.
2. The system displays an error message informing the Leader that the schedule management operation could not be completed.
3. The system ensures that no incomplete or duplicate study session is stored.
4. The Leader may retry the schedule creation operation.
5. If the retry is successful, the system resumes the Basic Flow at Step 10.
6. Otherwise, the use case ends.

---

### 5.3 Special Requirements

#### 5.3.1 Security and Access Control
* Only the **Leader** of the study group can create or modify the shared study schedule through this use case.
* The system must verify the Leader's role before allowing schedule management operations.
* The schedule must only be associated with the study group selected by the Leader.
* Members can view the shared study schedule but cannot modify it through this use case.

#### 5.3.2 Performance
* The system should complete the creation or update of a study schedule within **2 seconds** under normal operating conditions.
* The updated study schedule should be immediately available to group Members after successful creation.

#### 5.3.3 Usability
* The schedule creation form must clearly identify required and optional fields.
* The system must provide clear validation messages for invalid dates or times.
* The system must clearly indicate scheduling conflicts.
* The study schedule should be presented in an organized format that allows group Members to easily understand upcoming study sessions.
* Date and time information should be displayed consistently using the system's configured time zone and date format.

---

### 5.4 Preconditions

#### 5.4.1 Leader Authentication and Group Membership
* The Leader must have a valid registered account.
* The Leader must be successfully authenticated and logged into the system.
* The Leader must belong to an existing Virtual Study Room.
* The authenticated user must have the **Leader** role in the selected study group.
* The system must be available and able to access the database.

---

### 5.5 Postconditions

#### 5.5.1 Study Schedule Successfully Created
If the use case completes successfully:
* A new study session is created and stored in the system.
* The study session is associated with the selected study group.
* The study session contains the specified title, description, date, start time, and end time.
* The shared study schedule is updated.
* The group's Members can view the newly created study session.
* The group Members may be notified about the newly created study session.

If the use case is cancelled or fails:
* No incomplete or duplicate study session is stored.
* The existing study schedule remains unchanged.
* No notification is sent for an unsuccessful schedule creation operation.

---

### 5.6 Extension Points

#### 5.6.1 Notify Group Members of Schedule Changes
The extension point occurs after a new study session has been successfully created or an existing study schedule has been modified.

The system may extend the **Manage Study Schedule** use case by notifying the group's Members about the newly created or updated study session. The notification may contain relevant information such as the session title, study date, start time, and end time. The notification behavior does not prevent the Leader from completing the schedule management operation.

---

## 6. Manage Study Material

### 6.1 Use-Case Name & Description

**Use-Case Name:** Manage Study Material

**Brief Description:**  
This use case allows the **Leader** of a Virtual Study Room to manage shared study materials for the group. The Leader can upload study materials in supported formats, such as PDF and image files, to the group's shared repository. The system validates the uploaded file, stores the material, and makes it available to the group's Members for viewing and downloading. The file validation process is handled through the included **Validate File Format** use case.

---

### 6.2 Flow of Events

#### 6.2.1 Basic Flow

1. The use case begins when the **Leader** selects the **Manage Study Material** function from the Virtual Study Room interface.  
![alt text](../../Images/Module_3/6a.png)

2. The system verifies that the authenticated user has the **Leader** role in the selected study group.

3. The system displays the shared study material repository and available material management actions.  
![alt text](../../Images/Module_3/6b.png)

4. The Leader selects the option to upload a new study material.

5. The system displays the file upload interface.  
![alt text](../../Images/Module_3/6c.png)

6. The Leader selects a study material file from their device.

7. The Leader submits the selected file for upload.

8. The system invokes the **Validate File Format** included use case.

9. The system validates that the uploaded file is in a supported format, such as **PDF or image**.

10. The system validates the uploaded file's basic properties, such as file integrity and file size.  
![alt text](../../Images/Module_3/6d.png)

11. If the file passes validation, the system uploads and stores the study material in the selected study group's shared repository.

12. The system associates the uploaded material with the current study group and the Leader who uploaded it.

13. The system updates the shared study material repository.

14. The system displays a success notification to the Leader.  
![alt text](../../Images/Module_3/6e.png)

15. The uploaded study material becomes available to authorized group users through the **View & Download Materials** use case.

16. The use case ends successfully.

---

#### 6.2.2 Alternative Flows

##### Invalid File Format
![alt text](../../Images/Module_3/6f.png)
1. At Step 9 of the Basic Flow, the system determines that the uploaded file format is not supported.
2. The system rejects the uploaded file.
3. The system displays an error message informing the Leader that only supported file formats, such as PDF or image files, can be uploaded.
4. The Leader selects another file.
5. The system validates the newly selected file.
6. If the file format is valid, the system resumes the Basic Flow at Step 11.

##### Invalid File or File Size Exceeded
![alt text](../../Images/Module_3/6g.png)
1. At Step 10 of the Basic Flow, the system determines that the uploaded file is corrupted, invalid, or exceeds the maximum allowed file size.
2. The system rejects the uploaded file.
3. The system displays an appropriate error message informing the Leader about the upload problem.
4. The Leader selects another valid file or chooses to cancel the upload operation.
5. If the Leader selects another file, the system resumes the Basic Flow at Step 8.
6. If the Leader cancels the operation, the use case ends.

##### Upload Cancelled
1. Before the file is successfully uploaded, the Leader selects the **Cancel** option.
2. The system cancels the upload operation.
3. The system does not store the selected file in the study group's repository.
4. The system returns the Leader to the shared study material repository.  
![alt text](../../Images/Module_3/6h.png)
5. The use case ends.

##### Material Management Operation Failed
![alt text](../../Images/Module_3/6i.png)
1. At Step 11 or Step 13 of the Basic Flow, the system encounters an error while uploading, storing, or updating the study material repository.
2. The system displays an error message informing the Leader that the study material could not be uploaded.
3. The system ensures that no incomplete or corrupted material record is stored in the repository.
4. The Leader may retry the upload operation.
5. If the retry is successful, the system resumes the Basic Flow at Step 11.
6. Otherwise, the use case ends.

---

### 6.3 Special Requirements

#### 6.3.1 Security and Access Control
* Only the **Leader** of the study group can upload or manage study materials through this use case.
* The system must verify the Leader's role before allowing material management operations.
* Uploaded study materials must only be associated with the study group selected by the Leader.
* Only authorized users who belong to the study group can access shared study materials.
* The system must validate uploaded files before storing them in the repository.
* The system should prevent potentially unsafe or unsupported file types from being uploaded.

#### 6.3.2 Performance
* The system should begin processing the uploaded file immediately after submission.
* The system should provide clear upload status feedback to the Leader.
* After a successful upload, the new material should become available in the shared repository without unnecessary delay.

#### 6.3.3 Usability
* The file upload interface must clearly indicate supported file formats.
* The system must clearly display file validation and upload errors.
* The system should display the uploaded material's filename and upload status.
* The shared material repository should present uploaded materials in an organized and easily accessible manner.
* The Leader should receive clear confirmation after a material is successfully uploaded.

---

### 6.4 Preconditions

#### 6.4.1 Leader Authentication and Group Membership
* The Leader must have a valid registered account.
* The Leader must be successfully authenticated and logged into the system.
* The Leader must belong to an existing Virtual Study Room.
* The authenticated user must have the **Leader** role in the selected study group.
* The shared study material repository must be available.
* The system must be available and able to access the file storage system and database.

---

### 6.5 Postconditions

#### 6.5.1 Study Material Successfully Uploaded
If the use case completes successfully:
* A new study material is uploaded and stored in the shared repository.
* The uploaded material is associated with the selected study group.
* The uploaded material is associated with the Leader who uploaded it.
* The material appears in the group's shared study material repository.
* Authorized group users can view and download the material through the **View & Download Materials** use case.

If the use case is cancelled or fails:
* The invalid or cancelled file is not stored in the study material repository.
* No incomplete or corrupted material record is created.
* Existing study materials remain unchanged.

---

### 6.6 Extension Points

#### 6.6.1 Validate File Format
The extension point occurs after the Leader submits a study material file for upload and before the system stores the file in the shared study material repository.

The system invokes the **Validate File Format** included use case to verify that the uploaded file uses a supported format, such as PDF or image. The system also verifies basic file properties before allowing the upload to proceed. If the file is valid, the **Manage Study Material** use case continues with storing the material. If the file is invalid, the system triggers the appropriate Alternative Flow and rejects the upload.

---

## 7. Discuss via Group Chat (Real-time)

### 7.1 Use-Case Name & Description

**Use-Case Name:** Discuss via Group Chat (Real-time)

**Brief Description:**  
This use case allows authenticated members of a Virtual Study Room, including the **Leader** and **Members**, to communicate and discuss study-related topics through a real-time group chat. Users can send text messages to the group, and the system delivers newly sent messages to other active group members in real time. The system also stores chat messages so that authorized group members can access the conversation history.

---

### 7.2 Flow of Events

#### 7.2.1 Basic Flow

1. The use case begins when the **System User** selects the **Group Chat** function from the Virtual Study Room interface.

2. The system verifies that the authenticated user belongs to the selected study group.

3. The system establishes a real-time connection between the System User and the group chat service.

4. The system retrieves and displays the available group chat interface and recent chat messages.  
![alt text](../../Images/Module_3/7a.png)

5. The System User enters a text message into the message input field.  
![alt text](../../Images/Module_3/7c.png)

6. The System User submits the message.

7. The system validates the message content.

8. The system associates the message with:
   * The authenticated user who sent the message.
   * The selected study group.
   * The message timestamp.

9. The system stores the message in the group's chat history.

10. The system delivers the new message to the active members of the study group through the real-time communication channel.

11. The system displays the newly sent message in the sender's chat interface.  
![alt text](../../Images/Module_3/7b.png)

12. Other active group members receive and see the new message in their group chat interface in real time.  
![alt text](../../Images/Module_3/7e.png)

13. The System User can continue sending additional messages or viewing messages received from other group members.

14. The use case continues until the System User leaves the group chat or closes the group chat interface.

15. The use case ends.

---

#### 7.2.2 Alternative Flows

##### Empty or Invalid Message
![alt text](../../Images/Module_3/7f.png)
1. At Step 7 of the Basic Flow, the system determines that the message is empty or does not satisfy the system's message validation rules.
2. The system does not send or store the invalid message.
3. The system displays an appropriate validation message to the System User.
4. The System User modifies the message content.
5. The System User submits the message again.
6. If the message is valid, the system resumes the Basic Flow at Step 8.

##### Message Delivery Failed
![alt text](../../Images/Module_3/7d.png)
1. At Step 10 of the Basic Flow, the system fails to deliver the message to one or more active group members.
2. The system retains the message in the chat history if it has been successfully stored.
3. The system attempts to deliver the message again when the recipient's real-time connection becomes available.
4. The System User is informed if the message cannot be delivered immediately.
5. The use case continues.

##### Real-time Connection Lost
![alt text](../../Images/Module_3/7g.png)
1. During the group chat session, the system detects that the System User's real-time connection has been interrupted.
2. The system displays a notification indicating that the real-time connection has been lost.
3. The system attempts to reconnect the System User to the group chat service automatically.
4. If the connection is successfully restored, the system synchronizes any messages that were sent during the interruption.  
![alt text](../../Images/Module_3/7h.png)
5. The system resumes real-time communication.
6. If the connection cannot be restored, the System User may retry the connection or leave the group chat.
7. The use case ends if the System User leaves the group chat.

##### User Leaves the Group Chat
![alt text](../../Images/Module_3/7i.png)
1. The System User selects the option to leave or close the group chat interface.
2. The system closes the user's active real-time chat connection.
3. The System User can no longer receive new messages in real time until they reopen the group chat.
4. Previously stored chat messages remain available to authorized group members.
5. The use case ends.

---

### 7.3 Special Requirements

#### 7.3.1 Security and Access Control
* Only authenticated users who belong to the selected study group can access the group's chat.
* The system must prevent users who are not members of the study group from viewing or sending messages in the group's chat.
* Each message must be associated with the authenticated user who sent it.
* Chat messages must only be accessible to authorized members of the corresponding study group.
* The system should protect chat communication and stored messages from unauthorized access.

#### 7.3.2 Performance
* New messages should be delivered to active group members with minimal delay.
* The system should support real-time communication for study groups containing **2–5 members**.
* The chat interface should remain responsive while messages are being sent and received.

#### 7.3.3 Usability
* The group chat interface must clearly display the sender, message content, and timestamp.
* The message input field must be easily accessible.
* The system should provide clear feedback when a message is successfully sent.
* The system should clearly notify users when the real-time connection is lost.
* The system should automatically attempt to reconnect after a temporary connection failure.

#### 7.3.4 Real-time Communication
* The system must support real-time message delivery between active members of the same study group.
* Newly received messages should appear in the chat interface without requiring the user to manually refresh the page.
* The system should maintain message ordering based on the server-side message timestamp.
* Messages sent while a user is temporarily disconnected should be synchronized when the connection is successfully restored, where applicable.

---

### 7.4 Preconditions

#### 7.4.1 User Authentication and Group Membership
* The System User must have a valid registered account.
* The System User must be successfully authenticated and logged into the system.
* The System User must belong to an existing Virtual Study Room.
* The System User must have permission to access the selected study group's chat.
* The system must be available and able to access the chat service and database.
* The real-time communication service must be available for establishing a chat connection.

---

### 7.5 Postconditions

#### 7.5.1 Message Successfully Sent and Received
If the use case completes successfully:
* The System User can access the group chat.
* A valid message sent by the System User is stored in the group's chat history.
* The message is associated with the correct sender and study group.
* Active members of the study group receive the message in real time.
* The message remains available in the group's chat history for authorized members.

If the use case is terminated due to a connection failure or the System User leaving the chat:
* Previously stored messages remain unchanged.
* The System User's real-time chat connection is closed.
* The System User can reconnect to the group chat later.

---

### 7.6 Extension Points

#### 7.6.1 Receive Real-time Message
The extension point occurs when another active member of the study group sends a new message while the System User is connected to the group chat.

The system extends the **Discuss via Group Chat (Real-time)** use case by receiving the new message from the real-time communication service and displaying it in the System User's chat interface without requiring a manual page refresh. The received message is also stored in the group's chat history and remains available to authorized group members.