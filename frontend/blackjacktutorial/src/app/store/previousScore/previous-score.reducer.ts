import { createReducer, on } from '@ngrx/store';
import { 
  addPreviousScore, 
  loadPreviousScoresSuccess, 
  getResultsByUserIdSuccess,
  getResultsByUserIdFailure,
  deleteResultSuccess,
  deleteResultFailure 
} from './previous-score.actions';
import { PreviousScore } from '../../models/previousScore.model';

export interface PreviousScoreState {
  previousScores: PreviousScore[];
  loading: boolean;
  error: any;
  userId: string | null;
  previousScoreById: PreviousScore[];
  deleteResultState: {
    loading: boolean;
    error: any;
  };
}

const initialState: PreviousScoreState = {
  previousScores: [],
  loading: false,
  error: null,
  userId: null,
  previousScoreById: [],
  deleteResultState: {
    loading: false,
    error: null,
  },
};

export const previousScoreReducer = createReducer(
  initialState,
  on(addPreviousScore, (state, { previousScore }) => ({
    ...state,
    previousScores: [...state.previousScores, previousScore],
  })),
  on(loadPreviousScoresSuccess, (state, { previousScores }) => ({
    ...state,
    previousScores: previousScores,
  })),
  on(getResultsByUserIdSuccess, (state, { previousScores }) => ({
    ...state,
    previousScores: previousScores,
  })),
  on(getResultsByUserIdFailure, (state, { error }) => {
    console.error('Error fetching previous scores by user ID:', error);
    return { ...state };
  }),
  on(deleteResultSuccess, (state) => ({
    ...state,
  })),
  on(deleteResultFailure, (state, { error }) => {
    console.error('Error deleting result:', error);
    return { ...state };
  })
);