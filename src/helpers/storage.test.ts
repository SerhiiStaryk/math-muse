import { loadResults, saveSettings, loadSettings, clearResults, type Settings } from './storage';

describe('storage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves and loads settings', () => {
    const settings = { useMultipleChoice: false, maxNumber: 15 };
    saveSettings(settings as Settings);

    expect(loadSettings()).toEqual(settings);
  });

  it('clears results', () => {
    localStorage.setItem('FunMathame_v1.multiply', JSON.stringify({ task: '2x3', correct: 1, attempts: 2 }));
    clearResults();

    expect(localStorage.getItem('FunMathame_v1.multiply')).toBeNull();
  });

  it('loads results', () => {
    const results = { task: '2x3', correct: 1, attempts: 2 };
    localStorage.setItem('FunMathame_v1.multiply', JSON.stringify(results));

    expect(loadResults('multiply')).toEqual(results);
  });
});
