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
  units = ['g', 'kg', 'l', 'ml', 'piece'];
  isAddModal: boolean;
  selectedIngredient: UserIngredient;
  modalTitle: string;

  newFridgeItemForm = this.fb.group({
    ingredient: [{} as Ingredient, Validators.required],
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

    if(!this.isAddModal && this.selectedIngredient){
      this.newFridgeItemForm.controls['ingredient'].patchValue(this.selectedIngredient.ingredient);
      this.newFridgeItemForm.controls['unit'].patchValue(this.selectedIngredient.unitOfMeasure.toLocaleLowerCase());
      this.newFridgeItemForm.controls['quantity'].patchValue(this.selectedIngredient.quantity.toString());
    }
}

  onDropdownShow(event: MdbDropdownDirective) {
    console.log('on dropdown show: ', event);
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  selectedVal(ingr1: any, ingr2:any) : boolean {
    console.log(ingr1);
    console.log(ingr2);

    return ingr1 && ingr2 ? ingr1.id === ingr2.id : ingr1 === ingr2;
  }

  onSubmit() {
    console.log(this.newFridgeItemForm.controls.ingredient.value);
    console.log(this.newFridgeItemForm.controls.quantity.value);
    console.log(this.newFridgeItemForm.controls.unit.value);

    const newFridgeItem: UserIngredient = {
      ingredient: this.newFridgeItemForm.controls.ingredient.value,
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
        
        this.accountService
          .updateUserIngredientCollection()
          .subscribe(
            (res) => {
              this.accountService.loggedUserValue.userIngredients = res;
              this.modalRef.close();
            });
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
