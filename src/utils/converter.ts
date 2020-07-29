
export interface Answer {
  answer: string
  isCorrect: boolean
}

export interface AnswerAPI {
  correct_answer: string
  incorrect_answers: string[]
}

export const convertToApiAnswers = (answers: Answer[]): AnswerAPI => {

  const correctAnswer: string = answers.find(answer => answer.isCorrect)!.answer;
  const inCorrectAnswer: string[] = answers.filter(answer => !answer.isCorrect).map(element => element.answer);

  return {
    correct_answer: correctAnswer,
    incorrect_answers: inCorrectAnswer
  };
};

export const convertToEditableAnswers = ({ correct_answer, incorrect_answers }: AnswerAPI): Answer[] => {

  let answers: Answer[] = [];
  answers = answers.concat(incorrect_answers.map<Answer>(answer => ({ answer, isCorrect: false })));
  answers.push({
    answer: correct_answer,
    isCorrect: true
  });
  return answers;
};

