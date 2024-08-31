import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import SuspenseFallback from '../SuspenseFallback';

describe('SuspenseFallback Component', () => {
  it('renders spinner with correct class', () => {
    render(<SuspenseFallback />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('spinner-border');
  });

  it('renders loading text with sr-only class', () => {
    render(<SuspenseFallback />);
    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
    expect(loadingText).toHaveClass('sr-only');
  });
});