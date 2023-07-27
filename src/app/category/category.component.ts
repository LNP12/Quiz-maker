import {
  Component,
  OnInit
} from '@angular/core';
import { TriviaCategoryService } from '../service/trivia-category.service';
import { Router } from '@angular/router';
import { QuizResultService } from '../service/quiz-result.service';

export interface Answer {
  answer: string;
  selected: boolean;
}
export interface Quiz {
  Question: string;
  answers: Answer[];
  correctAnswer: string
}

 export interface QuizResponse {
  response_code: number;
  results: Question[];
}
export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface TriviaCategoryResponse {
  trivia_categories: TriviaCategory[];
}
export interface TriviaCategory{
  id: string,
  name: string
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
  shuffledAnswer!: Answer[];
  selectedAnswer: number = 0;
  trivia!: TriviaCategoryResponse;
  questions: any;
  selectedCategory: TriviaCategory = {id:'Select a category',name:'Select a category'};
  selectedDifficulty: string = 'Select difficulty';
  //trivia?.trivia_categories
  ngOnInit(): void {
    this._trivia.getTriviaCategory().subscribe((data:TriviaCategoryResponse) => {
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
      .subscribe((data: QuizResponse) => {
        this.questions = data;
        this.getQuestions(this.questions?.results)
      });

  }

  getQuestions(results: Question[]) {
    for(let result of results){
      let question = result?.question;
      let quiz!: Quiz;
      let answer: Answer[] = this.displayAnswer(result?.correct_answer, result?.incorrect_answers);;
      quiz={
        Question:question,
        correctAnswer:result?.correct_answer,
        answers:answer
      }
      this.quizz.push(quiz)
    }
    

  }

  displayAnswer(correctAns: string, incorrectAns: string[]) {
      let allAnswer: string[] = [];
      allAnswer.push(correctAns);
      allAnswer = [...allAnswer, ...incorrectAns];
      
      allAnswer = allAnswer
        .map((value) => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);
      this.shuffledAnswer = allAnswer.map((answer: any) => ({
        answer:answer,
        selected: false,
      }));


    return this.shuffledAnswer;
  }

  selecteAnswer(option: Answer, questionIndex: number) {
    let availableOptions = this.quizz[questionIndex].answers;
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
