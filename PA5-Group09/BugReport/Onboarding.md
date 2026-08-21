
**Performed by:** Lê Kim Hằng
**Reviewed by:** Lê Kim Hằng
**Edited by:** Lê Kim Hằng

## BUG-004

**Related Test Case:** TC-SURV-004

**Title:** "Yes, I know my level" incorrectly redirects back to Step 1 (Pace Selection)

**Description:**
When the user clicks the "Yes, I know my level" card in Step 2 of Onboarding, a routing or state management error occurs, sending the user back to Step 1 ("Set Your Pace") instead of advancing them to the CEFR level selection screen. This creates a loop, preventing the user from completing the manual level selection onboarding path.

**Steps to Reproduce:**
1. Log in to a newly created account and navigate to the `/onboarding` page.
2. Complete Step 1 (Set Your Pace).
3. On Step 2, click the "Yes, I know my level" card.

**Expected Result:**
The system navigates to a level selection screen where the user can manually choose a specific CEFR level (A1-C2).

**Actual Result:**
The system resets the onboarding state and redirects the user back to Step 1 (Set Your Pace). The onboarding status cannot be completed via this path.

**Severity:** High

**Status:** Open

**Fix Description:**
[To be determined - Fix the state management or routing logic inside `OnboardingApp.tsx` attached to the `onClick` event of the "Yes, I know my level" card, ensuring it transitions to the level selection UI rather than resetting the step counter.]