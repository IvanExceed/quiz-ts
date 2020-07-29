import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  FETCH_QUESTIONS,
  Question,
  QuestionActionTypes,
  QuizState,
  SELECT_QUESTION
} from '../types';

const initialState: QuizState = {
  questions: [],
  currentQuestion: null
};

export function quizReducer(
  state = initialState,
  action: QuestionActionTypes
): QuizState {
  switch (action.type) {
    case FETCH_QUESTIONS: {
      return {
        ...state,
        questions: [ ...action.payload, ...state.questions]
      };
    }
    case EDIT_QUESTION: {
      const { questions }: { questions: Question[] } = state;
      const question = action.payload;
      questions[question.id] = question;
      return {
        ...state,
        questions
      };
    }
    case CREATE_QUESTION: {
      const { questions }: { questions: Question[] } = state;
      return {
        ...state,
        questions: [action.payload, ...questions]
      };
    }
    case DELETE_QUESTION: {
      const { questions }: { questions: Question[] } = state;
      questions.splice(action.payload.id, 1);
      const isCurrentEdit: boolean = !!(state.currentQuestion && (action.payload.id === state.currentQuestion!.id));
      const currentQuestion = isCurrentEdit ? null : state.currentQuestion;
      return {
        ...state,
        questions: questions,
        currentQuestion
      };
    }
    case SELECT_QUESTION: {
      const { id }: { id: number } = action.payload;
      const currentQuestion: Question = state.questions[id];
      currentQuestion.id = id;
      return {
        ...state,
        currentQuestion
      };
    }
    default:
      return state;
  }
}
