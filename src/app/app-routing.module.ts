import { NgModule } from '@angular/core';
import { GolfPostsComponent } from './modules/golf-posts/golf-posts.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: GolfPostsComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
