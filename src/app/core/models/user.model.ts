import { CookingLevel, Gender, PhysicalEffort } from "../enums/enums";

// Interface for the User object
export interface UserDto {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  age?: number;
  height?: number;
  weight?: number;
  bmr?: number;
  gender?: string;
  cookingLevel?: string;
  physicalEffort?: string;
  wantToLearnNewSkills?: boolean;
  wantToTryNewCuisines?: boolean;
  wantToSaveMoney?: boolean;
  wantToSaveTime?: boolean;
  wantToEatHealthy?:boolean;
  userDiets?: UserDiet[];
  userCuisines?: UserCuisine[];
  userIngredients?: UserIngredient[];
  userDislikedIngredients?: UserDislikedIngredient[];
  userRecommendations?: UserRecommendation[];
}

// Interface for the UserDiet object
export interface UserDiet {
  id?: number;
  name?: string;
}

// Interface for the UserCuisine object
export interface UserCuisine {
  id?: number;
  name?: string;
}

// Interface for the UserIngredient object
export interface UserIngredient {
  id?: number;
  ingredient?: Ingredient;
  quantity?: number;
  unitOfMeasure?: string;
  isCartIngredient?: boolean;
  hasEditMode?: boolean;
}

// Interface for the Ingredient object
export interface Ingredient {
  id?: number;
  name?: string;
  pictureUrl?: string | null;
  expensiveIndex?: number;
  ingredientCategory?: string;
}

// Interface for the UserDislikedIngredient object
export interface UserDislikedIngredient {
  id?: number;
  name?: string;
  pictureUrl?: string | null;
  expensiveIndex?: number;
}

// Interface for the UserRecommendation object
export interface UserRecommendation {
  id?: number;
  breakfastRecipe?: Recipe;
  lunchRecipe?: Recipe;
  dinnerRecipe?: Recipe;
  dateTime?: string;
}

// Interface for the Recipe object
export interface Recipe {
  id?: number;
  name?: string;
  prepTime?: number;
  cookingLevel?: string;
  instructions?: string;
  description?: string;
  pictureUrl?: string;
  rating?: number;
  kcals?: number;
  favourites?: number;
  cuisineName?: string;
  ingredientDtoList?: RecipeIngredient[];
  recipeDiets?: UserDiet[];
  recipeInstructions?: RecipeInstruction[]
}

export interface RecipeFeedbacks {
  id: number;
  feedback: string;
  rating: number;
  userId: number;
  userFirstName: number;
  userLastName: number;
  userGender: string;
  recipeId: number;
  dateTime:string;
}

// Interface for the RecipeIngredient object
export interface RecipeIngredient {
  ingredient?: Ingredient;
  quantity?: number;
  unitOfMeasure?: string;
}

export interface RecipeInstruction {
  details?: string;
  step: number;
}
