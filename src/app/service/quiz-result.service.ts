import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Quiz } from '../category/category.component';

@Injectable({
  providedIn: 'root'
})
export class QuizResultService {

  constructor() { }

  private _QuizResult: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);
  result$ = this._QuizResult.asObservable();

  sendQuizResult(result: Quiz[]) {
    console.log(result);
    this._QuizResult.next(result);
    }
}
