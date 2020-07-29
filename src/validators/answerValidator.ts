import { Answer } from '../utils/converter';

interface AnswerValidator {
  isMinOneCorrect: boolean | string
  isMinOneInCorrect: boolean | string
  isNotEmpty: boolean | string
}
interface AnswerErrors {
  isMinOneCorrect: string
  isMinOneInCorrect:  string
  isNotEmpty: string
  [key: string]: string;
}

export const validateAnswers = (answers: Answer[]): string | void => {

  const errors: AnswerErrors= {
    isMinOneCorrect: 'At least one answer must be correct',
    isMinOneInCorrect: 'At least one answer must be incorrect',
    isNotEmpty: 'Answers can\'t be an empty string'
  };

  const validator: AnswerValidator = answers.reduce<AnswerValidator>((accumulator: AnswerValidator, answer: Answer): AnswerValidator => {
    let {
      isMinOneCorrect,
      isMinOneInCorrect,
      isNotEmpty
    } = accumulator;

    isMinOneCorrect = isMinOneCorrect || answer.isCorrect;
    isMinOneInCorrect = isMinOneInCorrect || !answer.isCorrect;
    isNotEmpty = isNotEmpty && !!answer.answer.trim();
    return {
      isMinOneCorrect,
      isMinOneInCorrect,
      isNotEmpty
    };
  }, {
    isMinOneCorrect: false,
    isMinOneInCorrect: false,
    isNotEmpty: true
  });

  for (const [key, value] of Object.entries(validator)) {
    if(!value) {
      return errors[key];
    }
  }

};
