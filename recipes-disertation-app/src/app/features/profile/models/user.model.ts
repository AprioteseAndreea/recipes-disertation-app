import { CookingLevel, PhysicalEffort } from "src/app/core/enums/enums";

export interface User {
    Id?: number;
    FirstName: string;
    LastName: string;
    Email: string;
    Age?: number;
    Gender?: string;
    Height?: number;
    Weight?:number;
    BMR?:number;
    PhysicalEffort?: PhysicalEffort;
    CookingLevel?: CookingLevel;
    WantTryNewCuisines?: boolean;
    WantLearnNewCuisines?: boolean;
    WantToSaveMoney?: boolean;
    WantToSaveTime?: boolean;
  }