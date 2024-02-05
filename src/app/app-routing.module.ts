import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { ReadComponent } from './read/read.component';
import { UpdateComponent } from './update/update.component';
const routes: Routes = [
  {path:"create",component:CreateComponent} ,
 {path:"read",component:ReadComponent},
 {path:"update/:id",component:UpdateComponent},
 {path:'',redirectTo:'create',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
