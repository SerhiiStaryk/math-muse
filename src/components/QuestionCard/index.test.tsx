import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QuestionCard } from './index';

describe('QuestionCard', () => {
  const mockOnAnswer = jest.fn();

  beforeEach(() => {
    mockOnAnswer.mockClear();
  });

  it('renders the question and multiple-choice answers', () => {
    render(
      <QuestionCard
        question="What is 2 + 2?"
        answers={[2, 3, 4, 5]}
        onAnswer={mockOnAnswer}
        isCorrect={null}
        useMultipleChoice
      />
    );

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(4);
  });

  it('calls onAnswer with the correct value when an answer is clicked', () => {
    render(
      <QuestionCard
        question="What is 2 + 2?"
        answers={[2, 3, 4, 5]}
        onAnswer={mockOnAnswer}
        isCorrect={null}
        useMultipleChoice
      />
    );

    fireEvent.click(screen.getByText('4'));
    expect(mockOnAnswer).toHaveBeenCalledWith(4);
  });

  it('renders input field when useMultipleChoice is false', () => {
    render(
      <QuestionCard
        question="What is 2 + 2?"
        onAnswer={mockOnAnswer}
        isCorrect={null}
        useMultipleChoice={false}
      />
    );

    expect(
      screen.getByPlaceholderText('Enter your answer')
    ).toBeInTheDocument();
  });

  it('calls onAnswer with the correct value when the input is submitted', () => {
    render(
      <QuestionCard
        question="What is 2 + 2?"
        onAnswer={mockOnAnswer}
        isCorrect={null}
        useMultipleChoice={false}
      />
    );

    const input = screen.getByPlaceholderText('Enter your answer');
    fireEvent.change(input, { target: { value: '4' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });

    expect(mockOnAnswer).toHaveBeenCalledWith(4);
  });
});
