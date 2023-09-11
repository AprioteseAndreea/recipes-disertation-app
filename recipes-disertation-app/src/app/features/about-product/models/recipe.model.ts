import { SafeUrl } from '@angular/platform-browser';
import { CookingLevel } from '../../../core/enums/enums';

export class Recipe {
  RecipeID?: number;
  Name: string;
  PrepTime: number;
  CookingLevel: CookingLevel;
  Intructions: string;
  CuisineID: number;
  CuisineName: string;
  PhotoURL: SafeUrl;
  Kcals: number;
  Favourites: number;
}
