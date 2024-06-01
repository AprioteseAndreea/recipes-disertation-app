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
  groupedCartData: Map<string, UserIngredient[]>;

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

      this.groupedCartData = new Map<string, UserIngredient[]>();
      this.fridgeData.forEach((ingredient) => {
        const category = ingredient.ingredient.ingredientCategory;
        if (!this.groupedCartData.has(category)) {
          this.groupedCartData.set(category, []);
        }
        const ingredientsInCategory = this.groupedCartData.get(category)!;
        ingredientsInCategory.push(ingredient);
      });
  
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

  modifyFridgeIngredient(category: string, id: number) {
    const ingredient = this.groupedCartData.get(category)?.find(ing => ing.ingredient.id === id);
    
    this.modalRef = this.modalService.open(AddItemComponentComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        isAddModal: false,
        selectedIngredient: ingredient,
        modalTitle: 'Modify an ingredient from your fridge'
      },
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.getFridgeIngredients();
    });
  }
}
