import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Ingredient, UserIngredient } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FridgeService } from './fridge.service';
import { environment } from 'src/app/core/environments/environment';
import { AccountService } from 'src/app/features/auth/services/account.service';

@Component({
  selector: 'app-add-item-component',
  templateUrl: './add-item-component.component.html',
  styleUrls: ['./add-item-component.component.scss'],
})
export class AddItemComponentComponent implements OnInit {
  ingredients: Ingredient[];
  units = ['g', 'Kg', 'L', 'ml', 'piece'];

  newFridgeItemForm = this.fb.group({
    ingredient: ['', Validators.required],
    unit: ['', Validators.required],
    quantity: ['', Validators.required],
  });
  constructor(
    public modalRef: MdbModalRef<AddItemComponentComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private fridgeService: FridgeService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.fridgeService.getAllIngredients().subscribe((res) => {
      console.log(res);
      this.ingredients = res;
    });
  }

  onDropdownShow(event: MdbDropdownDirective) {
    console.log('on dropdown show: ', event);
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  onSubmit() {
    console.log(this.newFridgeItemForm.controls.ingredient.value);
    console.log(this.newFridgeItemForm.controls.quantity.value);
    console.log(this.newFridgeItemForm.controls.unit.value);

    const newFridgeItem: UserIngredient = {
      ingredient: this.ingredients.find(
        (ingr) =>
          ingr.id == Number(this.newFridgeItemForm.controls.ingredient.value)
      ),
      quantity: Number(this.newFridgeItemForm.controls.quantity.value),
      unitOfMeasure: this.newFridgeItemForm.controls.unit.value.toUpperCase(),
      isCartIngredient: false,
    };

    const userId = this.accountService.loggedUserValue.id;

    this.fridgeService.addIngredient(newFridgeItem, userId).subscribe({
      next: (v) => {
        this.notificationService.showSuccess(
          'Success!',
          'A new item was added in your fridge.'
        );
        this.modalRef.close();
        this.accountService.updateUserIngredientCollection();
      },
      error: (e) => {
        console.log(e);
        this.notificationService.showError(
          'Error!',
          'The item cannot be added!'
        );
        this.modalRef.close();
      },
    });
  }
}
