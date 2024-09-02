// isMobile.test.js
import { isMobile } from '../ScreenUtils'; // Adjust the import path

describe('isMobile function', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 1024,
    });
  });

  it('returns true when window width is 767px or less', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767,
    });

    expect(isMobile()).toBe(true);
  });

  it('returns false when window width is greater than 768px', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 800,
    });

    expect(isMobile()).toBe(false);
  });

  it('updates result when window size changes', () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      value: 767,
    });

    expect(isMobile()).toBe(true);

    window.innerWidth = 800;
    expect(isMobile()).toBe(false);
  });
});
