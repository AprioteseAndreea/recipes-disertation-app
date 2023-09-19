export interface ShoppingCart {
  UserID: number;
  Ingredient: Ingredient;
  Quantity: number;
  Unit: string;
}

export interface Ingredient {
  IngredientID: number;
  Name: string;
  ExpensiveIndex: number;
  PhotoUrl: string;
}
