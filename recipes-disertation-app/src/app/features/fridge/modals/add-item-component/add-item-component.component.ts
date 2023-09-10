import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MdbDropdownDirective } from 'mdb-angular-ui-kit/dropdown';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { AlertService } from 'src/app/core/components/alert/alert.service';
import { ToastService } from 'src/app/core/components/alert/toast.service';

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
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  onDropdownShow(event: MdbDropdownDirective) {
    console.log('on dropdown show: ', event);
  }
  onSubmit(){
    console.log("In onSumbit")
    this.toastService.showSuccessToast('Success toast title', 'This is a success toast message.');
  }
}
