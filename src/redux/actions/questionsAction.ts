import {
  CREATE_QUESTION,
  DELETE_QUESTION,
  EDIT_QUESTION,
  FETCH_QUESTIONS,
  SELECT_QUESTION,
  Question,
  QuestionActionTypes,
} from '../types';

export function fetchQuestions(questions: Question[]): QuestionActionTypes {
  return {
    type: FETCH_QUESTIONS,
    payload: questions
  };
}

export function editQuestion(question: Question): QuestionActionTypes {
  return {
    type: EDIT_QUESTION,
    payload: question
  };
}

export function createQuestion(question: Question): QuestionActionTypes {
  return {
    type: CREATE_QUESTION,
    payload: question
  };
}

export function selectQuestion(id: number): QuestionActionTypes {
  return {
    type: SELECT_QUESTION,
    payload: {
      id
    }
  };
}

export function deleteQuestion(id: number): QuestionActionTypes {
  return {
    type: DELETE_QUESTION,
    payload: {
      id
    }
  };
}
