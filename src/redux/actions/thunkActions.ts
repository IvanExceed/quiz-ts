import axios from 'axios';
import { Action } from 'redux';
import { RootState } from '../reducers';
import { ThunkAction } from 'redux-thunk';
import { fetchQuestions } from './questionsAction';
import { Question } from '../types';

const url: string = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple';

interface ServerResponse {
  data: ServerData
}

interface ServerData {
  results: Question[]
}

export const thunkFetchQuestions = (): ThunkAction<void, RootState, unknown, Action<string>> => async dispatch => {

  const response: ServerResponse = await axios.get<ServerData>(url);
  const questions = response.data.results;
  dispatch(
    fetchQuestions(questions)
  );
};
