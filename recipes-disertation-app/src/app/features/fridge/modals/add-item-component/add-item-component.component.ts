import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NotificationService } from 'src/app/core/services/notification.service';

@Component({
  selector: 'app-add-item-component',
  templateUrl: './add-item-component.component.html',
  styleUrls: ['./add-item-component.component.scss'],
})
export class AddItemComponentComponent implements OnInit {
  ingredients = ['Bananas'];
  units = ['g', 'Kg', 'L', 'ml', 'piece'];

  newFridgeItemForm = this.fb.group({
    ingredient: ['', Validators.required],
    unit: ['', Validators.required],
    quantity: ['', Validators.required],
  });
  constructor(
    public modalRef: MdbModalRef<AddItemComponentComponent>,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}

  onDropdownShow(event: MdbDropdownDirective) {
    console.log('on dropdown show: ', event);
  }
  onSubmit(){
    this.notificationService.showSuccess('Success!', 'A new item was added in your fridge.');
    this.modalRef.close()
  }
}
