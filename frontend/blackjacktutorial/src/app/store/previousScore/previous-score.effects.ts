import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import { of, from } from 'rxjs';
import { PreviousScoreService } from '../../services/previous-scores.service';
import { 
  addPreviousScore, 
  addPreviousScoreSuccess, 
  addPreviousScoreFailure, 
  loadPreviousScores, 
  loadPreviousScoresSuccess, 
  loadPreviousScoresFailure, 
  getResultsByUserId,
  getResultsByUserIdSuccess,
  getResultsByUserIdFailure,
  deleteResult,
  deleteResultSuccess,
  deleteResultFailure } from './previous-score.actions';

@Injectable()
export class PreviousScoreEffects {
  saveResult$ = createEffect(() =>
  this.actions$.pipe(
    ofType(addPreviousScore),
    mergeMap((action) =>
      this.previousScoreService.saveResult(action.previousScore).pipe(
        map(() => addPreviousScoreSuccess()),
        catchError((error) => {
          console.error('Error saving result:', error);
          return of(addPreviousScoreFailure({ error }));
        })
      )
    )
  )
);

  loadPreviousScores$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPreviousScores),
      switchMap(() =>
        from(this.previousScoreService.getResults()).pipe(
          map((previousScores: any) => loadPreviousScoresSuccess({ previousScores })),
          catchError((error) => {
            console.error('Error fetching previous scores:', error);
            return of(loadPreviousScoresFailure({ error }));
          })
        )
      )
    )
  );
  
  getResultsByUserId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getResultsByUserId),
      switchMap((action) =>
        from(this.previousScoreService.getResultsByUserId(action.userId)).pipe(
          map((previousScores: any) => getResultsByUserIdSuccess({ previousScores })),
          catchError((error) => {
            console.error('Error fetching previous scores by user ID:', error);
            return of(getResultsByUserIdFailure({ error }));
          })
        )
      )
    )
  );
  
  deleteResult$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteResult),
      switchMap((action) =>
        from(this.previousScoreService.deleteResult(action.id)).pipe(
          map(() => deleteResultSuccess()),
          catchError((error) => {
            console.error('Error deleting result:', error);
            return of(deleteResultFailure({ error }));
          })
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private previousScoreService: PreviousScoreService
  ) {}
}