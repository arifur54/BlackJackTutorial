import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getResultsByUserId} from 'src/app/store/previousScore/previous-score.actions';
import { getPreviousScoreById } from 'src/app/store/previousScore/previous-score.state';
import { PreviousScoreService } from '../../services/previous-scores.service';
import { AuthService } from 'src/app/services/auth.service';
import { PreviousScore } from 'src/app/models/previousScore.model';

@Component({
  selector: 'app-past-score',
  templateUrl: './past-score.component.html',
  styleUrls: ['./past-score.component.css']
})
export class PastScoreComponent implements OnInit {

  previousScores: PreviousScore[] = [];
  userId: string = ''; 
    
  constructor(private store: Store, private previousScoreService: PreviousScoreService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUserId();
    
    this.store.dispatch(getResultsByUserId({ userId: this.userId }));
    this.store.select(getPreviousScoreById).subscribe((previousScores) => {
      console.log(previousScores)
      this.previousScores = previousScores;
    });
  }

  deleteResult(resultId: string): void {
    let conf = confirm("Are you sure you want to delete this data?");
    if(conf){
      this.previousScoreService.deleteResult(resultId);
      this.store.dispatch(getResultsByUserId({ userId: this.userId }));
    }else{
      window.alert("Data not deleted!");
    }
   
  }
}
