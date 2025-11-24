import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MultiplyPage } from './index';
import { SettingsProvider } from '@/context/SettingsContext';

jest.mock('@/helpers', () => {
  const actual = jest.requireActual('@/helpers');
  return {
    ...actual,
    generateQuestion: jest.fn(() => ({
      question: '2 x 3 = ?',
      correct: 6,
      answers: [4, 5, 6, 7],
      task: '2x3',
    })),
  };
});

const renderWithProvider = (component: React.ReactElement) => {
  return render(<SettingsProvider>{component}</SettingsProvider>);
};

describe('MultiplyPage', () => {
  it('renders the page title and question card', () => {
    renderWithProvider(<MultiplyPage />);

    expect(screen.getByText('Multiply')).toBeInTheDocument();
    expect(screen.getByText('2 x 3 = ?')).toBeInTheDocument();
  });

  it('handles correct answers', () => {
    renderWithProvider(<MultiplyPage />);

    fireEvent.click(screen.getByText('6'));
    expect(screen.getByText('Correct! 🎉')).toBeInTheDocument();
  });

  it('handles incorrect answers', () => {
    renderWithProvider(<MultiplyPage />);

    fireEvent.click(screen.getByText('4'));
    expect(screen.getByText('Try Again! ❌')).toBeInTheDocument();
  });
});
