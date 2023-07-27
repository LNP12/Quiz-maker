import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ResultComponent } from './result/result.component';

const routes: Routes = [
  {
    path:'',
    component: CategoryComponent
  },
  {
    path:'submit',
    component:ResultComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
