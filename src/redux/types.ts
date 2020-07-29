export interface Question {
  category?: string
  correct_answer: string
  difficulty?: string
  incorrect_answers: string[]
  question: string
  type?: string
  id: number;
}

export interface QuizState {
  questions: Question[],
  currentQuestion: Question | null
}

export const FETCH_QUESTIONS = 'FETCH_QUESTIONS';
export const EDIT_QUESTION = 'EDIT_QUESTION';
export const DELETE_QUESTION = 'DELETE_QUESTION';
export const CREATE_QUESTION = 'CREATE_QUESTION';
export const SELECT_QUESTION = 'SELECT_QUESTION';


interface FetchQuestionsAction {
  type: typeof FETCH_QUESTIONS
  payload: Question[]
}

interface CreateQuestionAction {
  type: typeof CREATE_QUESTION
  payload: Question
}

interface EditQuestionAction {
  type: typeof EDIT_QUESTION
  payload: Question
}

interface DeleteQuestionAction {
  type: typeof DELETE_QUESTION
  payload: {
    id: number
  }
}

interface SelectQuestionAction {
  type: typeof SELECT_QUESTION
  payload: {
    id: number
  }
}

export type QuestionActionTypes =
  FetchQuestionsAction
  | CreateQuestionAction
  | DeleteQuestionAction
  | EditQuestionAction
  | SelectQuestionAction
