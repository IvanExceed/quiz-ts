import { combineReducers } from 'redux';
import { quizReducer } from './questions';

export const rootReducer = combineReducers({
 quiz: quizReducer
});

export type RootState = ReturnType<typeof rootReducer>
