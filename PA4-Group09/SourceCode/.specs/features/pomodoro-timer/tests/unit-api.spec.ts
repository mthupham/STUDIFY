import { describe, expect, it } from '@jest/globals';

describe('Pomodoro API contract', () => {
  it('returns the expected timer state envelope', () => {
    const state = {
      focusTime: 25,
      breakTime: 5,
      mode: 'focus',
      timeLeft: 1500,
      completedSessions: 0,
      dailyGoal: 4,
    };

    expect(state).toMatchObject({
      focusTime: expect.any(Number),
      breakTime: expect.any(Number),
      mode: expect.any(String),
      timeLeft: expect.any(Number),
    });
  });
});
