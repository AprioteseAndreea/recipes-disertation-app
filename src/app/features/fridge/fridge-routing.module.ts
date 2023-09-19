import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FridgeComponent } from './components/fridge/fridge.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: FridgeComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FridgeRoutingModule {}
