import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  constructor() { }

  private _QuizResult: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  result$ = this._QuizResult.asObservable();

  sendQuizResult(result: any[]) {
    console.log(result);
    this._QuizResult.next(result);
    }
}
