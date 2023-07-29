import { createAction, props } from '@ngrx/store';
import { PreviousScore } from '../../models/previousScore.model';

export const addPreviousScore = createAction(
  '[Previous Score] Add Previous Score',
  props<{ previousScore: PreviousScore }>()
);

export const addPreviousScoreSuccess = createAction(
  '[Previous Score] Add Previous Score Success'
);

export const addPreviousScoreFailure = createAction(
  '[Previous Score] Add Previous Score Failure',
  props<{ error: any }>()
);

export const loadPreviousScores = createAction('[Previous Score] Load Previous Scores');

export const loadPreviousScoresSuccess = createAction(
  '[Previous Score] Load Previous Scores Success',
  props<{ previousScores: PreviousScore[] }>()
);

export const loadPreviousScoresFailure = createAction(
  '[Previous Score] Load Previous Scores Failure',
  props<{ error: any }>()
);

export const getResultsByUserId = createAction(
  '[Previous Score] Get Results By User ID',
  props<{ userId: string }>()
);

export const getResultsByUserIdSuccess = createAction(
  '[Previous Score] Get Results By User ID Success',
  props<{ previousScores: PreviousScore[] }>()
);

export const getResultsByUserIdFailure = createAction(
  '[Previous Score] Get Results By User ID Failure',
  props<{ error: any }>()
);

export const deleteResult = createAction(
  '[Previous Score] Delete Result',
  props<{ id: string }>()
);

export const deleteResultSuccess = createAction(
  '[Previous Score] Delete Result Success'
);

export const deleteResultFailure = createAction(
  '[Previous Score] Delete Result Failure',
  props<{ error: any }>()
);