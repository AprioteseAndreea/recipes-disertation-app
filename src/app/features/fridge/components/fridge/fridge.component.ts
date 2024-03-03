import { Component, OnInit, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddItemComponentComponent } from '../../modals/add-item-component/add-item-component.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import constants from 'src/app/core/constants/constants';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { UserIngredient } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
})
export class FridgeComponent implements OnInit {
  ingredients = constants.Ingredients;

  @ViewChild(ToastContainerDirective, { static: true })
  modalRef: MdbModalRef<AddItemComponentComponent> | null = null;
  fridgeData: UserIngredient[];

  constructor(
    private modalService: MdbModalService,
    private notificationService: NotificationService,
    public accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.getFridgeIngredients();
  }

  getFridgeIngredients() {
    this.fridgeData =
      this.accountService.loggedUserValue.userIngredients.filter(
        (ingredient) => !ingredient.isCartIngredient
      );
  }
  openDialog() {
    this.modalRef = this.modalService.open(AddItemComponentComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        isAddModal: true,
        modalTitle: 'Add a new item in your fridge'
      },
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.getFridgeIngredients();
    });
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  modifyFridgeIngredient(id: number) {
    console.log(this.fridgeData[id]);
    this.modalRef = this.modalService.open(AddItemComponentComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        isAddModal: false,
        selectedIngredient: this.fridgeData[id],
        modalTitle: 'Modify an ingredient from your fridge'
      },
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.getFridgeIngredients();
    });
  }
}
