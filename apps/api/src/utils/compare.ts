// utils/compare.ts
export const compareText = (original: string, transcribed: string) => {
  const originalWords = original.toLowerCase().split(/\s+/);
  const transcribedWords = transcribed.toLowerCase().split(/\s+/);

  let correct = 0;
  const incorrectWords: string[] = [];

  for (let i = 0; i < originalWords.length; i++) {
    if (originalWords[i] === transcribedWords[i]) {
      correct++;
    } else {
      incorrectWords.push(originalWords[i]);
    }
  }

  const accuracy = (correct / originalWords.length) * 100;

  return {
    score: Math.round(accuracy),
    mistakes: incorrectWords,
    feedback: !incorrectWords.length
      ? 'Great job! You pronounced all words correctly.'
      : `You mispronounced ${incorrectWords.join(', ')}. Try again!`,
  };
};
