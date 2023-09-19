import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar.component';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [AvatarComponent],
  exports: [AvatarComponent],
  imports: [CommonModule, PipesModule],
})
export class AvatarModule {}
