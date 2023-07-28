import {
  Component,
  OnInit
} from '@angular/core';
import { TriviaCategoryService } from '../service/trivia-category.service';
import { Router } from '@angular/router';
import { QuizResultService } from '../service/quiz-result.service';
import { Answer, Quiz, TriviaCategory, TriviaCategoryResponse } from '../modal/IQuizMaker';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {

  constructor(
    private _trivia: TriviaCategoryService,
    private router: Router,
    private result: QuizResultService
  ) {}
  quizDetail:Quiz[] = [];
  
  selectedAnswer: number = 0;
  trivia!: TriviaCategoryResponse;
  selectedCategory: TriviaCategory = {id:'Select a category',name:'Select a category'};
  selectedDifficulty: string = 'Select difficulty';
  ngOnInit(): void {
    this._trivia.getTriviaCategory().subscribe((data:TriviaCategoryResponse) => {
      this.trivia = data;
    });
  }

  displayQuestion() {
    this._trivia
      .getQuestions(
        this.selectedCategory.id,
        this.selectedDifficulty.toLowerCase()
      )
      .subscribe((data: Quiz[]) => {
        this.quizDetail = data;
      });
  }

  selecteAnswer(option: Answer, questionIndex: number) {
    let availableOptions = this.quizDetail[questionIndex].answers;
    for (let index in availableOptions) {
      if (availableOptions[index].answer === option.answer) {
        availableOptions[index].selected = !availableOptions[index].selected;
        if(availableOptions[index].selected){
          this.selectedAnswer++;
        } else{
          this.selectedAnswer--;
        }
        
      } else  if(availableOptions[index].selected){
        availableOptions[index].selected = false;
        this.selectedAnswer--;
      }
    }
  }
  submit(){
    this.result.sendQuizResult(this.quizDetail);
    this.router.navigate(['/submit']);
  }
}
