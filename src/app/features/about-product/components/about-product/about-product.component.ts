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
  stars: number[] = [1, 2, 3, 4, 5];

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
    this.recipeService.getRecipeById(this.recipeID).subscribe(
      (recipe) => {
        this.recipe = recipe;
        if (
          this.recipe.recipeInstructions &&
          this.recipe.recipeInstructions.length > 0
        ) {
          this.recipe.recipeInstructions.sort((a, b) => a.step - b.step);
        }
      },
      (error) => {
        if (error.status === 404) {
          this.router.navigate(['/notfound']);
        } else {
          console.error('A apărut o eroare la obținerea retetei:', error);
        }
      }
    );
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

  goToRatingView(){
    this.router.navigate([`/recipe/${this.recipeID}/rating`]);
  }

  checkIngredientIfIsInTheFridge(ingrId: number) {
    return this.accountService.loggedUserValue.userIngredients.find(
      (ingre) => !ingre.isCartIngredient && ingre.ingredient.id == ingrId
    );
  }
}
