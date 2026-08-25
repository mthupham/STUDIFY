# AI Speaking Assistant
## Use-Case Specification: UC5.1 Speech Recognition

**Version:** 1.0

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial RUP specification draft for UC5.1 | Gia Phúc |

---

### Table of Contents

- [1. Use-Case Name](#1-use-case-name)
  - [1.1 Brief Description](#11-brief-description)
- [2. Flow of Events](#2-flow-of-events)
  - [2.1 Basic Flow](#21-basic-flow)
  - [2.2 Alternative Flows](#22-alternative-flows)
    - [2.2.1 Audio Unclear or Low Volume](#221-audio-unclear-or-low-volume)
    - [2.2.2 Silence Timeout](#222-silence-timeout)
    - [2.2.3 Audio Hardware Disconnected](#223-audio-hardware-disconnected)
    - [2.2.4 User Manually Cancels Recording](#224-user-manually-cancels-recording)
- [3. Special Requirements](#3-special-requirements)
  - [3.1 Real-Time Processing Latency](#31-real-time-processing-latency)
  - [3.2 Multi-Language Accent Robustness](#32-multi-language-accent-robustness)
  - [3.3 Audio Stream Data Encryption](#33-audio-stream-data-encryption)
- [4. Preconditions](#4-preconditions)
  - [4.1 Active Session State](#41-active-session-state)
  - [4.2 Microphone Permission Granted](#42-microphone-permission-granted)
  - [4.3 Audio Input Device Detected](#43-audio-input-device-detected)
- [5. Postconditions](#5-postconditions)
  - [5.1 Audio Transcribed & Stored](#51-audio-transcribed--stored)
  - [5.2 Session Metrics Updated](#52-session-metrics-updated)
  - [5.3 Audio Stream Closed](#53-audio-stream-closed)
- [6. Extension Points](#6-extension-points)
  - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC5.1: Speech recognition**

### 1.1 Brief Description
This use case describes how the system captures real-time spoken audio input from the Learner and processes it through the AI Engine to generate an accurate text transcription. It serves as an essential foundational service included by downstream conversation and evaluation modules.

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The Learner begins speaking into their device microphone during an active practice turn.
2. The system streams the live audio input stream to the AI Engine's Speech-to-Text (STT) processing module.
3. The AI Engine processes the audio signal and converts it into a structured text transcript.
4. The system validates the transcribed text and returns it to the calling use case for downstream dialogue processing and evaluation.
![](../../Images/Module_5/1a.png)
### 2.2 Alternative Flows

#### 2.2.1 Audio Unclear or Low Volume
1. In step 3 of the Basic Flow, the AI Engine determines that the signal-to-noise ratio is too low or background noise obscures speech clarity.
2. The system prompts the Learner with an on-screen warning: *"Speech unreadable. Please check your microphone and speak clearly."*
3. The Learner re-speaks their input, and the execution returns to step 2 of the Basic Flow.
![](../../Images/Module_5/1b.png)
#### 2.2.2 Silence Timeout
1. In step 1 of the Basic Flow, the system detects continuous silence exceeding 10 seconds.
2. The system automatically pauses active audio recording and displays a prompt asking if the user is ready.
3. Once the Learner clicks "Resume", the flow restarts at step 1 of the Basic Flow.
![](../../Images/Module_5/1c.png)
#### 2.2.3 Audio Hardware Disconnected
1. During step 1 or step 2 of the Basic Flow, the active input microphone is unplugged or disconnected.
2. The system detects hardware loss, pauses processing, and displays an alert: *"Microphone disconnected. Please reconnect your input device."*
3. Once the system detects hardware restoration, the Learner clicks "Try Again", restarting the flow at step 1.
![](../../Images/Module_5/1d.png)
#### 2.2.4 User Manually Cancels Recording
1. At any point during step 1 or step 2, the Learner clicks the "Cancel" button on the UI.
2. The system terminates audio streaming, purges temporary audio buffers, and resets the interface state back to the prompt start.
![](../../Images/Module_5/1e.png)
---

## 3. Special Requirements

### 3.1 Real-Time Processing Latency
The speech-to-text recognition pipeline must complete and return the final text transcript within 2 seconds (< 2.0s) following the end of user speech detection.

### 3.2 Multi-Language Accent Robustness
The STT model must maintain a minimum Word Error Rate (WER) accuracy of 85% or higher across varied non-native English accents.

### 3.3 Audio Stream Data Encryption
All live audio streamed from the client interface to the AI Engine must be encrypted in transit using TLS 1.3 / WebRTC Secure Real-Time Transport Protocol (SRTP).

---

## 4. Preconditions

### 4.1 Active Session State
The Learner must be authenticated and engaged in an active speaking practice session.

### 4.2 Microphone Permission Granted
The web browser or application permissions must explicitly allow microphone access.

### 4.3 Audio Input Device Detected
At least one functional audio input capture device must be active and registered by the operating system.

---

## 5. Postconditions

### 5.1 Audio Transcribed & Stored
The user's spoken audio is successfully transcribed into plain text and stored in the active session buffer for turn processing.

### 5.2 Session Metrics Updated
System logs record audio capture metadata (duration, noise level, token length) for performance analytics.

### 5.3 Audio Stream Closed
The active microphone capture stream is cleanly closed or set back to standby mode to save client resources.

---

## 6. Extension Points

### 6.1 None
This use case contains no extension points.

---

## Use-Case Specification: UC5.2 Generate Appropriate Reply

**Version:** 1.1

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial RUP specification draft for UC5.2 | Gia Phúc |
| 6/Aug/26 | 1.1 |  Updated UC5.2 to fit with the new model | Gia Phúc |

---

### Table of Contents

- [1. Use-Case Name](#1-use-case-name)
  - [1.1 Brief Description](#11-brief-description)
- [2. Flow of Events](#2-flow-of-events)
  - [2.1 Basic Flow](#21-basic-flow)
  - [2.2 Alternative Flows](#22-alternative-flows)
    - [2.2.1 Off-Topic Input Handling](#221-off-topic-input-handling)
    - [2.2.2 AI Service Timeout](#222-ai-service-timeout)
    - [2.2.3 Inappropriate or Flagged Content](#223-inappropriate-or-flagged-content)
    - [2.2.4 Text-to-Speech (TTS) Synthesis Failure](#224-text-to-speech-tts-synthesis-failure)
- [3. Special Requirements](#3-special-requirements)
  - [3.1 Conversational Latency](#31-conversational-latency)
  - [3.2 Natural Voice Synthesis Quality](#32-natural-voice-synthesis-quality)
  - [3.3 Conversation Context Length](#33-conversation-context-length)
- [4. Preconditions](#4-preconditions)
  - [4.1 Active Scenario Context](#41-active-scenario-context)
  - [4.2 Transcribed Text Input Received](#42-transcribed-text-input-received)
  - [4.3 AI Engine Service Availability](#43-ai-engine-service-availability)
- [5. Postconditions](#5-postconditions)
  - [5.1 Dialogue State Updated](#51-dialogue-state-updated)
  - [5.2 Audio Response Cached](#52-audio-response-cached)
  - [5.3 History Stack Updated](#53-history-stack-updated)
- [6. Extension Points](#6-extension-points)
  - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC5.2: Generate appropriate reply**

### 1.1 Brief Description
This use case captures the end-to-end process in which the AI Speaking Assistant receives the Learner's transcribed input, evaluates the context of the active practice scenario (e.g., Business, Casual, Interview), and uses the AI Engine to construct a natural, contextually relevant response in both text and synthesized audio forms.

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The Learner speaks their turn into the interface.
2. The system receives the verified text transcript output from UC5.1.
3. The system bundles the transcript, active scenario metadata, and prior conversation turns, submitting the payload to the AI Engine.
4. The AI Engine processes the request and generates an in-context conversational reply.
5. The system synthesizes the text response into natural-sounding voice audio.
6. The system displays the conversation text in the chat panel and plays the audio reply to the Learner.
![](../../Images/Module_5/2a.png)
### 2.2 Alternative Flows

#### 2.2.1 Off-Topic Input Handling
1. In step 4 of the Basic Flow, the AI Engine detects that the user's input strays significantly from the scenario prompt.
2. The AI Engine generates a polite redirection response acknowledging the input while prompting the Learner back to the scenario core topic.
3. The execution resumes at step 5 of the Basic Flow.
![](../../Images/Module_5/2b.png)
#### 2.2.2 AI Service Timeout
1. In step 4 of the Basic Flow, the connection to the AI Engine service times out (exceeds 5 seconds).
2. The system presents an error alert: *"Response generation timed out. Click to retry."*
3. The Learner clicks retry, and execution restarts at step 3 of the Basic Flow.
![](../../Images/Module_5/2c.png)
#### 2.2.3 Inappropriate or Flagged Content
1. In step 4 of the Basic Flow, safety filters flag user input containing abusive, hateful, or explicit language.
2. The system bypasses normal conversation generation and responds with a standard safety prompt: *"Let's keep our conversation respectful and focused on the practice topic."*
3. The execution resumes at step 5 of the Basic Flow.
![](../../Images/Module_5/2d.png)
#### 2.2.4 Text-to-Speech (TTS) Synthesis Failure
1. In step 5 of the Basic Flow, the TTS engine fails to synthesize audio.
2. The system displays the text reply in the chat interface and displays a non-intrusive notification: *"Audio playback unavailable."*
3. The flow completes without audio playback.
![](../../Images/Module_5/2e.png)
---

## 3. Special Requirements

### 3.1 Conversational Latency
The total latency for reply text generation and Text-To-Speech (TTS) rendering combined must not exceed 3 to 5 seconds to maintain natural conversation dynamics.

### 3.2 Natural Voice Synthesis Quality
Audio output must utilize neural TTS voices sampled at a minimum of 24kHz to ensure realistic human cadence, tone, and inflection.

### 3.3 Conversation Context Length
The AI Engine must maintain and process a context history window of at least 10 prior dialogue turns to ensure coherent multi-turn conversations.

---

## 4. Preconditions

### 4.1 Active Scenario Context
A practice scenario must be initialized, and the dialogue state must be active.

### 4.2 Transcribed Text Input Received
Valid text output from **UC5.1** must be passed into the dialogue handler.

### 4.3 AI Engine Service Availability
The system's backend AI model API must be online and responsive.

---

## 5. Postconditions

### 5.1 Dialogue State Updated
The newly generated AI turn (text and audio) is saved into the session history, and the state advances to wait for the user's next turn.

### 5.2 Audio Response Cached
Synthesized voice audio files are temporarily cached on the client to allow instant replay by the user.

### 5.3 History Stack Updated
The full transcript exchange is appended to the user's session history record.

---

## 6. Extension Points

### 6.1 None
This use case contains no extension points.

---

## Use-Case Specification: UC5.3 Evaluate Performance on Specific Criteria

**Version:** 1.1

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial RUP specification draft for UC5.3 | Gia Phúc |
| 6/Aug/26 | 1.1 |  Updated UC5.3 to fit with the new model | Gia Phúc |

---

### Table of Contents

- [AI Speaking Assistant](#ai-speaking-assistant)
  - [Use-Case Specification: UC5.3 Evaluate Performance on Specific Criteria](#use-case-specification-uc53-evaluate-performance-on-specific-criteria)
    - [Revision History](#revision-history)
    - [Table of Contents](#table-of-contents)
  - [1. Use-Case Name](#1-use-case-name)
    - [1.1 Brief Description](#11-brief-description)
  - [2. Flow of Events](#2-flow-of-events)
    - [2.1 Basic Flow](#21-basic-flow)
    - [2.2 Alternative Flows](#22-alternative-flows)
      - [2.2.1 Brief Input Evaluation](#221-brief-input-evaluation)
      - [2.2.2 Non-English Speech Input Detected](#222-non-english-speech-input-detected)
      - [2.2.3 Rubric Configuration Missing](#223-rubric-configuration-missing)
  - [](#)
  - [3. Special Requirements](#3-special-requirements)
    - [3.1 Multi-Criteria Scoring Consistency](#31-multi-criteria-scoring-consistency)
    - [3.2 Evaluation Latency](#32-evaluation-latency)
    - [3.3 Deterministic Scoring Standards](#33-deterministic-scoring-standards)
  - [4. Preconditions](#4-preconditions)
    - [4.1 Transcribed Input Available](#41-transcribed-input-available)
    - [4.2 Evaluation Rubric Loaded](#42-evaluation-rubric-loaded)
    - [4.3 Scenario Context Set](#43-scenario-context-set)
  - [5. Postconditions](#5-postconditions)
    - [5.1 Metrics Logged](#51-metrics-logged)
    - [5.2 UI Performance Panel Updated](#52-ui-performance-panel-updated)
    - [5.3 Analytics Trend Updated](#53-analytics-trend-updated)
  - [6. Extension Points](#6-extension-points)
    - [6.1 Performance Weakness Detected](#61-performance-weakness-detected)

---

## 1. Use-Case Name
**UC5.3: Evaluate performance on specific criteria**

### 1.1 Brief Description
This use case details how the system analyzes the Learner's transcribed spoken speech against specific core linguistic criteria (Grammar, Vocabulary & Word Choice, and Context Relevance) to produce structured analytical scores and diagnostic feedback.

---

## 2. Flow of Events

### 2.1 Basic Flow
1. The system initiates a performance evaluation routine upon turn completion.
2. The system ingests the text transcript generated by UC5.1.
3. The system submits the transcript and active target evaluation rubric to the AI Engine.
4. The AI Engine evaluates performance across three strict criteria:
   - **Grammar & Syntax:** Identifies structural, tense, and agreement errors.
   - **Vocabulary & Word Choice:** Assesses lexical variety, appropriateness, and sophistication.
   - **Context Relevance:** Evaluates how accurately the utterance addresses the scenario prompt.
5. The system records numerical scores and qualitative diagnostic notes.
6. The system presents the detailed breakdown on the interface evaluation panel.
![](../../Images/Module_5/3a.png)
### 2.2 Alternative Flows

#### 2.2.1 Brief Input Evaluation
1. In step 4 of the Basic Flow, the AI Engine determines that the user utterance is too brief (e.g., single-word responses like "Yes" or "Okay") to perform full grammatical analysis.
2. The AI Engine assigns neutral baseline scores and notes: *"Utterance too brief for detailed grammatical breakdown."*
3. The execution resumes at step 5 of the Basic Flow.
![](../../Images/Module_5/3b.png)
#### 2.2.2 Non-English Speech Input Detected
1. In step 4 of the Basic Flow, the AI Engine detects that the transcribed text is in a language other than English.
2. The system assigns a score of 0 for Vocabulary and Grammar, flagging the turn with: *"Foreign language detected. Please practice in English."*
3. The execution resumes at step 5 of the Basic Flow.
![](../../Images/Module_5/3c.png)
#### 2.2.3 Rubric Configuration Missing
1. In step 3 of the Basic Flow, the system fails to load target scenario rubric configuration parameters.
2. The system falls back to a standardized default evaluation rubric and logs a system warning.
3. The execution resumes at step 4 of the Basic Flow.
![](../../Images/Module_5/3d.png)
---

## 3. Special Requirements

### 3.1 Multi-Criteria Scoring Consistency
The evaluation module must generate standardized scores (0–100 scale) along with human-readable diagnostic rationales for Grammar, Vocabulary, and Context Relevance.

### 3.2 Evaluation Latency
Evaluation calculations and metric scoring must be completed within 1.5 seconds following text input ingestion.

### 3.3 Deterministic Scoring Standards
Scoring guidelines must adhere to standardized CEFR (Common European Framework of Reference for Languages) proficiency benchmarks.

---

## 4. Preconditions

### 4.1 Transcribed Input Available
The Learner's spoken input must be successfully processed into text format.

### 4.2 Evaluation Rubric Loaded
Target scenario rubric criteria must be active in session memory.

### 4.3 Scenario Context Set
The specific practice domain (e.g., Job Interview, Restaurant Order) must be active to measure contextual relevance accurately.

---

## 5. Postconditions

### 5.1 Metrics Logged
Detailed evaluation scores and criterion breakdowns are logged in the active session report.

### 5.2 UI Performance Panel Updated
Visual score cards and radar charts on the learner's screen are updated with new metrics.

### 5.3 Analytics Trend Updated
Scores are appended to the learner's long-term progress profile database.

---

## 6. Extension Points

### 6.1 Performance Weakness Detected
- **Location:** Step 5 of UC5.3 Basic Flow.
- **Condition:** If performance scores fall below preset thresholds or grammatical/vocabulary errors are flagged.
- **Extended Use case:** UC5.4: Provide guidance on how to improve

---

## Use-Case Specification: UC5.4 Provide Guidance on How to Improve

**Version:** 1.1

---

### Revision History

| Date | Version | Description | Author |
| :--- | :--- | :--- | :--- |
| 23/Jul/26 | 1.0 | Initial RUP specification draft for UC5.4 | Gia Phúc |
| 6/Aug/26 | 1.1 |  Updated UC5.4 to fit with the new model | Gia Phúc |

---

### Table of Contents

- [1. Use-Case Name](#1-use-case-name)
  - [1.1 Brief Description](#11-brief-description)
- [2. Flow of Events](#2-flow-of-events)
  - [2.1 Basic Flow](#21-basic-flow)
  - [2.2 Alternative Flows](#22-alternative-flows)
    - [2.2.1 Exceptional Performance Guidance](#221-exceptional-performance-guidance)
    - [2.2.2 Repetitive Error Detected](#222-repetitive-error-detected)
    - [2.2.3 Learner Dismisses Guidance Cards](#223-learner-dismisses-guidance-cards)
- [3. Special Requirements](#3-special-requirements)
  - [3.1 Actionable Feedback Formatting](#31-actionable-feedback-formatting)
  - [3.2 Pedagogical Tone](#32-pedagogical-tone)
  - [3.3 Visual Contrast and Readability](#33-visual-contrast-and-readability)
- [4. Preconditions](#4-preconditions)
  - [4.1 Evaluation Completed](#41-evaluation-completed)
  - [4.2 Weakness or Error Flagged](#42-weakness-or-error-flagged)
  - [4.3 Learner Profile History Loaded](#43-learner-profile-history-loaded)
- [5. Postconditions](#5-postconditions)
  - [5.1 Recommendations Saved](#51-recommendations-saved)
  - [5.2 Practice Deck Updated](#52-practice-deck-updated)
  - [5.3 Feedback Display Rendered](#53-feedback-display-rendered)
- [6. Extension Points](#6-extension-points)
  - [6.1 None](#61-none)

---

## 1. Use-Case Name
**UC5.4: Provide guidance on how to improve**

### 1.1 Brief Description
This use case extends **UC5.3: Evaluate performance on specific criteria** by analyzing flagged performance errors and generating personalized, actionable guidance—including corrected rephrasings and advanced vocabulary alternatives—to help the Learner rapidly improve their speaking skills.

---

## 2. Flow of Events

### 2.1 Basic Flow
1. Confirm that UC5.4 is triggered via the Performance Weakness Detected extension point in UC5.3 rather than executing automatically.
2. The AI Engine receives the specific error logs and lower-scoring metrics flagged during evaluation.
3. The AI Engine constructs tailored improvement guidance, including:
   - Specific sentence corrections with highlighted revisions.
   - Alternative vocabulary recommendations tailored to the context.
   - Actionable tips for improving fluency, tone, and sentence structure.
4. The system displays the personalized guidance recommendations on the feedback panel alongside the evaluation metrics.
![](../../Images/Module_5/4a.png)
### 2.2 Alternative Flows

#### 2.2.1 Exceptional Performance Guidance
1. In step 2, if no grammatical or contextual errors were detected by **UC5.3** (flawless response):
2. The AI Engine skips corrective suggestions and instead generates high-level native speaker variations and idiomatic expressions to further elevate the user's proficiency.
3. The system displays these enhancement tips, and the flow completes.
![](../../Images/Module_5/4b.png)
#### 2.2.2 Repetitive Error Detected
1. In step 2, the AI Engine compares flagged errors against the user's session history and identifies a recurring error pattern (e.g., repeating past tense errors 3 times in one session).
2. The AI Engine prioritizes this specific error type and attaches a dedicated mini-grammar explanation card.
3. The execution resumes at step 4 of the Basic Flow.
![](../../Images/Module_5/4c.png)
#### 2.2.3 Learner Dismisses Guidance Cards
1. During step 4 of the Basic Flow, the Learner clicks "Hide Feedback" or "Skip Guidance".
2. The system minimizes the feedback panel, keeping only the high-level numerical score visible, and logs the user preference.
![](../../Images/Module_5/4d.png)
---

## 3. Special Requirements

### 3.1 Actionable Feedback Formatting
Guidance output must strictly provide clear "Before / After" rephrasing examples (e.g., *"Instead of: 'I go yesterday', try: 'I went yesterday'"*).

### 3.2 Pedagogical Tone
All corrective feedback must maintain an encouraging, constructive, and supportive tone.

### 3.3 Visual Contrast and Readability
Grammar corrections and vocabulary replacements must be highlighted using clear, high-contrast color coding (e.g., red strike-throughs for errors, green text for corrections).

---

## 4. Preconditions

### 4.1 Evaluation Completed
**UC5.3: Evaluate performance on specific criteria** must have executed and generated diagnostic outputs.

### 4.2 Weakness or Error Flagged
Specific areas for improvement or errors must be identified in the step outputs of **UC5.3**.

### 4.3 Learner Profile History Loaded
Prior session performance logs must be accessible to detect repeated mistake patterns.

---

## 5. Postconditions

### 5.1 Recommendations Saved
Personalized learning suggestions and rephrasing cards are appended to the user's history profile for future review.

### 5.2 Practice Deck Updated
Flagged grammar points and vocabulary items are automatically saved to the user's personal review list.

### 5.3 Feedback Display Rendered
The guidance cards are rendered on the user interface feedback panel.

---

## 6. Extension Points

### 6.1 None
This use case contains no extension points.