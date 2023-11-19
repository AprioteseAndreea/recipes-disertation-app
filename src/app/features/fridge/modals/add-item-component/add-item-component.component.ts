import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { Ingredient } from 'src/app/core/models/user.model';
import { NotificationService } from 'src/app/core/services/notification.service';
import { FridgeService } from './fridge.service';
import { environment } from 'src/app/core/environments/environment';

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
    private fridgeService: FridgeService
  ) {}

  ngOnInit(): void {
    this.fridgeService
      .getAllIngredients()
      .subscribe((res) => {
        console.log(res)
        this.ingredients = res});
  }

  onDropdownShow(event: MdbDropdownDirective) {
    console.log('on dropdown show: ', event);
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }
  
  onSubmit() {
    this.notificationService.showSuccess(
      'Success!',
      'A new item was added in your fridge.'
    );
    this.modalRef.close();
  }
}
