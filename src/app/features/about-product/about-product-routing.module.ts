import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutProductComponent } from './components/about-product/about-product.component';

const routes: Routes = [
  {
    path: ':recipeID',
    pathMatch: 'full',
    component: AboutProductComponent,
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutRecipeRoutingModule {}
