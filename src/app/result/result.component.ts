import { Component, OnInit } from '@angular/core';
import { QuizResultService } from '../service/quiz-result.service';
import { Answer, Quiz } from '../modal/IQuizMaker';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit {
  constructor(private result: QuizResultService) {}
  quizDetail: Quiz[] = [];
  correctAnsCount: number = 0;
  ngOnInit(): void {
    this.result.result$.subscribe((data: Quiz[]) => {
      this.quizDetail = data;
    });
  }
  getBtnClass(option: Answer, quiz: Quiz) {
    let btnClass: string = '';
    if (option?.selected) {
      if (option?.answer === quiz?.correctAnswer) {
        btnClass = 'btn-success';
        this.correctAnsCount++;
      } else {
        btnClass = 'btn-danger';
      }
    } else if (option?.answer === quiz?.correctAnswer) {
      btnClass = 'btn-success';
    } else {
      btnClass = 'btn-outline-success';
    }
    return btnClass;
  }

  getColorClass() {
    if (this.correctAnsCount < 2) {
      return 'red';
    } else if (this.correctAnsCount > 1 && this.correctAnsCount < 4) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
}
