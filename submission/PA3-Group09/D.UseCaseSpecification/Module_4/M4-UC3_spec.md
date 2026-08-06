# STUDIFY
## Use-Case Specification: M4-UC3 Use Pomodoro Timer

**Version:** 2.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| `06/08/2026` | `2.0` | Renamed ID to M4-UC3 | `Thiên Phước` |

---

## 1. Use-Case Name

### 1.1 Brief Description

This use case describes how a User utilizes the Pomodoro Timer built into the STUDIFY application to manage their study sessions. It includes starting focus sessions, taking short or long breaks, and customizing timer intervals.

---

## 2. Flow of Events

### 2.1 Basic Flow

This use case starts when the User opens the Pomodoro Timer widget.

1. The system displays the Pomodoro Timer interface with the default Focus duration (e.g., 25:00) and a Start button.
2. The User clicks **Start**.
3. The system begins the countdown.
4. When the Focus countdown reaches 00:00, the system plays an alert and automatically transitions to the **Short Break** phase (e.g., 5:00).
5. The system begins the Short Break countdown.
6. When the Short Break countdown reaches 00:00, the system transitions back to the Focus phase.
7. After the configured number of Pomodoros (e.g., 4), the system transitions to a **Long Break** phase (e.g., 15:00) instead of a Short Break.
8. The use case ends when the User closes the timer.

### 2.2 Alternative Flows

#### 2.2.1 User Pauses the Timer
1. While running, the User clicks **Pause**.
2. The system halts the countdown.
3. The User clicks **Resume** to restart.

#### 2.2.2 User Resets the Timer
1. The User clicks the **Reset** button.
2. A confirmation dialog appears.
3. If confirmed, the timer resets to its full duration for the current phase.

#### 2.2.3 User Customizes Timer Settings
1. The User clicks the **Settings** icon.
2. The system displays a panel where the User adjusts Focus Duration, Break Duration, etc.
3. The User clicks **Save**, and the new settings take effect immediately for the next phase.

#### 2.2.4 User Skips a Break
1. During a Break phase, the User clicks **Skip Break**.
2. The system immediately ends the break and transitions to the next Focus phase.

---

## 7. UI Prototype

### 7.1 Basic Flow - Focus Running
![Pomodoro - Focus Running](../../Images/module_4/UC10_focus_running.png)

### 7.2 Basic Flow - Short Break
![Pomodoro - Short Break](../../Images/module_4/UC10_short_break.png)

### 7.3 Basic Flow - Long Break
![Pomodoro - Long Break](../../Images/module_4/UC10_long_break.png)

### 7.4 Alternative Flow 2.2.1 - Paused
![Pomodoro - Paused](../../Images/module_4/UC10_paused.png)

### 7.5 Alternative Flow 2.2.2 - Reset Dialog
![Pomodoro - Reset Dialog](../../Images/module_4/UC10_reset_dialog.png)

### 7.6 Alternative Flow 2.2.3 - Settings Panel
![Pomodoro - Settings Panel](../../Images/module_4/UC10_settings_panel.png)

### 7.7 Alternative Flow 2.2.4 - Skip Break
![Pomodoro - Skip Break](../../Images/module_4/UC10_skip_break.png)


