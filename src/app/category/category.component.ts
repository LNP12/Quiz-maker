import {
  Component,
  OnInit
} from '@angular/core';
import { TriviaCategoryService } from '../service/trivia-category.service';
import { Router } from '@angular/router';
import { QuizResultService } from '../service/quiz-result.service';

interface Answer {
  Ans: string;
  selected: boolean;
}
interface Quiz {
  Question: string;
  Answer: Answer[];
  correctAnswer: string
}

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
  quizz:any[] = [];
  shuffledAnswer!: any[];
  selectedAnswer: number = 0;
  trivia: any;
  questions: any;
  selectedCategory: any = 'Select a category';
  selectedDifficulty: any = 'Select difficulty';

  ngOnInit(): void {
    this._trivia.getTriviaCategory().subscribe((data) => {
      this.trivia = data;
    });
  }

  displayQuestion() {
    console.log(this.selectedCategory.id)
    console.log(this.selectedDifficulty)
    this._trivia
      .getQuestions(
        this.selectedCategory.id,
        this.selectedDifficulty.toLowerCase()
      )
      .subscribe((data: any) => {
        this.questions = data;
        this.getQuestions(this.questions?.results)
      });

  }

  getQuestions(results: any) {
    for(let result of results){
      let question = result?.question;
      let quiz!: Quiz;
      let answer: Answer[] = this.displayAnswer(result?.correct_answer, result?.incorrect_answers);;
      quiz={
        Question:question,
        correctAnswer:result?.correct_answer,
        Answer:answer
      }
      this.quizz.push(quiz)
    }
    

  }

  displayAnswer(correctAns: string, incorrectAns: string[]) {
      let allAnswer: string[] = [];
      allAnswer.push(correctAns);
      allAnswer = [...allAnswer, ...incorrectAns];
      
      this.shuffledAnswer = allAnswer
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      this.shuffledAnswer = this.shuffledAnswer.map((answer: any) => ({
        answer,
        selected: false,
      }));


    return this.shuffledAnswer;
  }

  selecteAnswer(option: any, questionIndex: number, answerIndex: number) {
    let availableOptions = this.quizz[questionIndex].Answer;
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
    this.result.sendQuizResult(this.quizz);
    this.router.navigate(['/submit']);
  }
}
