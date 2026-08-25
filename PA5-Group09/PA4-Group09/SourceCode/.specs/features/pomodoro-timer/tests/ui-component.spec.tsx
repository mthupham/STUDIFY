import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import PomodoroTimerCoreSection from '../../../Frontend/src/features/pomodoro/PomodoroTimer';

describe('PomodoroTimerCoreSection', () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('renders the timer and starts the countdown when Start is clicked', () => {
    act(() => {
      root.render(<PomodoroTimerCoreSection />);
    });

    const button = Array.from(container.querySelectorAll('button')).find((node) => node.textContent?.includes('Start'));
    expect(button).toBeTruthy();

    act(() => {
      button?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Pause');
  });
});
