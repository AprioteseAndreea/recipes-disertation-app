import { CookingLevel, Gender, PhysicalEffort } from "src/app/core/enums/enums";

export interface User {
    Id?: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Age?: number;
    Gender?: Gender;
    Height?: number;
    Weight?:number;
    BMR?:number;
    PhysicalEffort?: PhysicalEffort;
    CookingLevel?: CookingLevel;
    Goals?:string[];
    FavouriteCuisines? : string[]
    FollowedDiets? : string[];
    DislikedIngredients? : string[];
  }