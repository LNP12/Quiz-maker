import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { QuizResponse, TriviaCategory, TriviaCategoryResponse } from '../category/category.component';

@Injectable({
  providedIn: 'root'
})
export class TriviaCategoryService {

  private url = 'https://opentdb.com/api_category.php';

  constructor(private _http: HttpClient) { }

  getTriviaCategory(): Observable<TriviaCategoryResponse>{
    return this._http.get<TriviaCategoryResponse>(this.url).pipe(map((data)=>{
      return getCategory(data)
    }));
  }

 getQuestions(categoryId: string, difficulty: string){
  const params = new HttpParams()
  .set('amount', 5)
  .set('category', categoryId)
  .set('difficulty', difficulty)
  .set('type', 'multiple');
  return this._http.get<QuizResponse>("https://opentdb.com/api.php",{params});
 }

}
function getCategory(data: TriviaCategoryResponse): TriviaCategoryResponse {
  const response: TriviaCategoryResponse = {
    trivia_categories: [
    ],
  };
  for(let category of data?.trivia_categories){
    const triviaCategory: TriviaCategory = {
      id: category.id,
      name: category.name,
    };
    response.trivia_categories.push(triviaCategory)
  }
  return response;
}

