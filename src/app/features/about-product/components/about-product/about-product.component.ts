import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';
import { AccountService } from 'src/app/features/auth/services/account.service';
declare function favoriteAnimation($event: any): void;

@Component({
  selector: 'app-about-product',
  templateUrl: './about-product.component.html',
  styleUrls: ['./about-product.component.scss'],
})
export class AboutProductComponent implements OnInit {
  private recipeID: number;
  public recipe: Recipe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.recipeID = +params.get('recipeID');
      this.getProduct();
    });
  }

  getProduct() {
    this.recipeService.getRecipeById(this.recipeID).subscribe((recipe) => {
      this.recipe = recipe;
    });
    // this.recipe = constants.Recipes.find(
    //   (recipe) => recipe.RecipeID === this.recipeID
    // );
    // console.log(this.recipe);
  }

  favoriteAnimation($event: any) {
    favoriteAnimation($event);
  }

  getImageUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  goBack() {
    window.history.back();
  }

  checkIngredientIfIsInTheFridge(ingrId: number) {
    return this.accountService.loggedUserValue.userIngredients.find(
      (ingre) => !ingre.isCartIngredient && ingre.ingredient.id == ingrId
    );
  }
}
