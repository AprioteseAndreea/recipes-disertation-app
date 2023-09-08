import { Component } from '@angular/core';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent {

   ingredients =  [
    {
      IngredientID:1,
      Name: "Banana",
      Quantity: 2,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-banana-96.png"

    },
    {
      IngredientID:2,
      Name: "Eggs",
      Quantity: 4,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-eggs-64.png"

    },
    {
      IngredientID:3,
      Name: "Milk",
      Quantity: 1,
      Unit: "L",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-milk-96.png"

    },
    {
      IngredientID:3,
      Name: "Kiwi",
      Quantity: 3,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-kiwi-64.png"

    },
    {
      IngredientID:4,
      Name: "Carrots",
      Quantity: 1,
      Unit: "Kg",
      PhotoURL: "../../../../../assets/fridge-icons/carrots.png"

    },
    {
      IngredientID:4,
      Name: "Cheese",
      Quantity: 200,
      Unit: "g",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-cheese-64.png"

    },
    {
      IngredientID:4,
      Name: "Tomato",
      Quantity: 1,
      Unit: "Kg",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-tomato-64.png"

    },
    
    {
      IngredientID:4,
      Name: "Cabbage",
      Quantity: 1,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-cabbage-64.png"

    },
    {
      IngredientID:4,
      Name: "Watermelon",
      Quantity: 1,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-watermelon-96.png"

    },
    {
      IngredientID:4,
      Name: "Meat",
      Quantity: 2,
      Unit: "Kg",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-meat-80.png"

    },
    {
      IngredientID:4,
      Name: "Chicken",
      Quantity: 2,
      Unit: "Kg",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-chicken-64.png"

    },
    {
      IngredientID:4,
      Name: "Grapes",
      Quantity: 1,
      Unit: "Kg",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-grapes-64.png"

    },
    {
      IngredientID:4,
      Name: "Fish",
      Quantity: 2,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-fish-96.png"

    },
    {
      IngredientID:4,
      Name: "Shrimp",
      Quantity: 2,
      Unit: "pcs",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-shrimp-96.png"

    },
    {
      IngredientID:4,
      Name: "Bacon",
      Quantity: 200,
      Unit: "g",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-bacon-58.png"

    },
    {
      IngredientID:4,
      Name: "Bread",
      Quantity: 500,
      Unit: "g",
      PhotoURL: "../../../../../assets/fridge-icons/icons8-bread-64.png"

    },
  ]
}
