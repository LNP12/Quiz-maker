import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TriviaCategoryService {

  private url = 'https://opentdb.com/api_category.php';

  constructor(private _http: HttpClient) { }

  getTriviaCategory(){
    return this._http.get(this.url);
  }

 getQuestions(categoryId: number, difficulty: string){
  const params = new HttpParams()
  .set('amount', 5)
  .set('category', categoryId)
  .set('difficulty', difficulty)
  .set('type', 'multiple');
  return this._http.get("https://opentdb.com/api.php",{params});
 }

}
