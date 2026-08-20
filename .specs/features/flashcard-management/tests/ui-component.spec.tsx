import React from 'react';
import { createRoot, Root } from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { FlashcardStudySession } from '../../../Frontend/src/features/flashcard/FlashcardStudySession';

describe('FlashcardStudySession', () => {
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

  it('renders the first flashcard and flips it on click', () => {
    act(() => {
      root.render(<FlashcardStudySession cards={[{ id: '1', term: 'Hello', explanation: 'Greeting' }]} />);
    });

    expect(container.textContent).toContain('Hello');

    const card = container.querySelector('[data-testid="flashcard-card"]');
    act(() => {
      card?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(container.textContent).toContain('Greeting');
  });
});
