import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../modal/IQuizMaker';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  constructor() { }

  private _QuizResult: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
  result$ = this._QuizResult.asObservable();

  sendQuizResult(result: Quiz[]) {
    this._QuizResult.next(result);
    }
}
