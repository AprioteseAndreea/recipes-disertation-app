import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Ingredient, UserIngredient } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FridgeService } from './fridge.service';
import { environment } from 'src/app/core/environments/environment';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { CartService } from 'src/app/features/cart/services/cart.service';

@Component({
  selector: 'app-add-item-component',
  templateUrl: './add-item-component.component.html',
  styleUrls: ['./add-item-component.component.scss'],
})
export class AddItemComponentComponent implements OnInit {
  ingredients: Ingredient[];
  units = ['g', 'ml', 'piece'];
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
    private accountService: AccountService,
    public authService: AuthService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fridgeService.getAllIngredients().subscribe((res) => {
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
    return ingr1 && ingr2 ? ingr1.id === ingr2.id : ingr1 === ingr2;
  }
  deleteItem(){
    this.cartService
    .deleteUserIngredient(this.selectedIngredient.id)
    .subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Success!',
          'The item was successfully deleted!'
        );
        this.authService.fetchUserData(false);
        this.modalRef.close(true)
      },
      error: (e) => {
        console.log(e);
        this.notificationService.showError(
          'Error!',
          'The item cannot be deleted!'
        );
      },
    });
  }

  onSubmit() {
      const newFridgeItem: UserIngredient = {
      ingredient: this.newFridgeItemForm.controls.ingredient.value,
      quantity: Number(this.newFridgeItemForm.controls.quantity.value),
      unitOfMeasure: this.newFridgeItemForm.controls.unit.value.toUpperCase(),
      isCartIngredient: false,
    };

    const userId = this.accountService.loggedUserValue.id;

    if(this.isAddModal) {
      this.fridgeService.addIngredient(newFridgeItem, userId).subscribe({
        next: (v) => {
          this.notificationService.showSuccess(
            'Success!',
            'A new item was added in your fridge.'
          );
          
          this.authService.fetchUserData(false);
          this.modalRef.close();
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
    } else {
      newFridgeItem.id = this.selectedIngredient.id;
      this.cartService
      .updateUserIngredient(newFridgeItem)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Success!',
            'The item was successfully updated!'
          );
          this.authService.fetchUserData(false);
          this.modalRef.close();
        },
        error: (e) => {
          console.log(e);
          this.notificationService.showError(
            'Error!',
            'The item cannot be updated!'
          );
        },
      });
    }
    
  }
}
