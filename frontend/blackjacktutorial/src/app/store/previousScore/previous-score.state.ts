import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PreviousScoreState } from './previous-score.reducer';

const getPreviousScoreState = createFeatureSelector<PreviousScoreState>('previousScore');

export const getPreviousScores = createSelector(
  getPreviousScoreState,
  (state) => state.previousScores
);

export const getPreviousScoresLoading = createSelector(
  getPreviousScoreState,
  (state) => state.loading
);

export const getUserId = createSelector(
  getPreviousScoreState,
  (state) => state.userId
);

export const getPreviousScoreById = createSelector(
  getPreviousScoreState,
  (state) => state.previousScores
);

export const getDeleteResultLoading = createSelector(
  getPreviousScoreState,
  (state) => state.deleteResultState.loading
);

export const getDeleteResultError = createSelector(
  getPreviousScoreState,
  (state) => state.deleteResultState.error
);