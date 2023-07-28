import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Answer, Question, Quiz, QuizResponse, TriviaCategory, TriviaCategoryResponse } from '../modal/IQuizMaker';


@Injectable({
  providedIn: 'root',
})
export class TriviaCategoryService {
  private url = 'https://opentdb.com/api_category.php';

  constructor(private _http: HttpClient) {}

  getTriviaCategory(): Observable<TriviaCategoryResponse> {
    return this._http.get<TriviaCategoryResponse>(this.url).pipe(
      map((data) => {
        return getCategory(data);
      })
    );
  }

  getQuestions(categoryId: string, difficulty: string): Observable<Quiz[]> {
    const params = new HttpParams()
      .set('amount', 5)
      .set('category', categoryId)
      .set('difficulty', difficulty)
      .set('type', 'multiple');
    return this._http
      .get<QuizResponse>('https://opentdb.com/api.php', { params })
      .pipe(
        map((data) => {
          return getQuestions(data?.results);
        })
      );
  }
}

function getQuestions(results: Question[]): Quiz[] {
  let quizDetail: Quiz[] = [];
  for (let result of results) {
    let question = result?.question;
    let quiz!: Quiz;
    let answer: Answer[] = displayAnswer(
      result?.correct_answer,
      result?.incorrect_answers
    );
    quiz = {
      Question: question,
      correctAnswer: result?.correct_answer,
      answers: answer,
    };
    quizDetail.push(quiz);
  }
  return quizDetail;
}

function displayAnswer(correctAns: string, incorrectAns: string[]): Answer[] {
  let shuffledAnswer!: Answer[];
  let allAnswer: string[] = [];
  allAnswer.push(correctAns);
  allAnswer = [...allAnswer, ...incorrectAns];

  allAnswer = allAnswer
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  shuffledAnswer = allAnswer.map((answer: string) => ({
    answer: answer,
    selected: false,
  }));

  return shuffledAnswer;
}
function getCategory(data: TriviaCategoryResponse): TriviaCategoryResponse {
  const response: TriviaCategoryResponse = {
    trivia_categories: [],
  };
  for (let category of data?.trivia_categories) {
    const triviaCategory: TriviaCategory = {
      id: category.id,
      name: category.name,
    };
    response.trivia_categories.push(triviaCategory);
  }
  return response;
}