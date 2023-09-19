import { CharactersRemainingPipe } from './characters-remaining.pipe';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InitialsPipe } from './initials.pipe';

@NgModule({
  declarations: [
    CharactersRemainingPipe,
    InitialsPipe,
  ],
  imports: [CommonModule],
  exports: [
    CharactersRemainingPipe,
    InitialsPipe,
  ],
})
export class PipesModule {}
