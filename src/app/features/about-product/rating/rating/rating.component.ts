import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { Recipe, RecipeFeedbacks } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit{
  private recipeID: number;
  public recipe: Recipe;
  public recipeFeedbacks: RecipeFeedbacks[];
  stars: number[] = [1, 2, 3, 4, 5];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.recipeID = +params.get('id');
      this.getProduct();
      this.getFeedbacks();
    });
  }

  getProduct() {
    this.recipeService.getRecipeById(this.recipeID).subscribe(
      (recipe) => {
        this.recipe = recipe;
      
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

  getFeedbacks(){
    this.recipeService.getRecipeFeedbacksByRecipeId(this.recipeID).subscribe(
      (feedbacks) => {
        this.recipeFeedbacks = feedbacks;
      
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

  getImageUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  goBack() {
    window.history.back();
  }
}
