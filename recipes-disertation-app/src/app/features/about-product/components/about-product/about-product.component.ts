import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../../models/recipe.model';
import constants from 'src/app/core/constants/constants';
import { CookingLevel } from 'src/app/core/enums/enums';
declare function favoriteAnimation($event: any): void;

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent implements OnInit {
  private recipeID: number;
  public recipe: Recipe;

  constructor(private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.recipeID = +params.get('recipeID');
      this.getProduct();
    });
  }

  getProduct() {
    this.recipe = constants.Recipes.find(
      (recipe) => recipe.RecipeID === this.recipeID
    );
    console.log(this.recipe);
  }

  favoriteAnimation($event: any) {
    favoriteAnimation($event);
  }

  goBack() {
    window.history.back();
  }
}
