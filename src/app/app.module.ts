import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoryComponent } from './category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ResultComponent } from './result/result.component';
import { QuizResultService } from './service/quiz-result.service';

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [QuizResultService],
  bootstrap: [AppComponent]
})
export class AppModule { }
