import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { LoadingService } from 'src/app/core/components/loading/loading.service';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { UserIngredient } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { ConfmodalComponent } from './modals/confmodal/confmodal.component';
import { AuthService } from 'src/app/features/auth/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [LoadingService],
})
export class CartComponent implements OnInit {
  cartData: UserIngredient[];
  groupedCartData: Map<string, UserIngredient[]> = new Map<string, UserIngredient[]>();
  modalRef: MdbModalRef<ConfmodalComponent>;

  constructor(
    public accountService: AccountService,
    public cartService: CartService,
    public authService: AuthService,
    private notificationService: NotificationService,
    private modalService: MdbModalService
  ) {}

  ngOnInit(): void {
    this.cartData = this.accountService.loggedUserValue.userIngredients.filter(
      (ingredient) => ingredient.isCartIngredient === true
    );

    this.cartData.forEach((ingredient) => {
      const category = ingredient.ingredient.ingredientCategory;
      if (!this.groupedCartData.has(category)) {
        this.groupedCartData.set(category, []);
      }
      const ingredientsInCategory = this.groupedCartData.get(category)!;
      ingredientsInCategory.push(ingredient);
    });

    this.cartData.forEach((ingredient) => {
      ingredient.hasEditMode = false;
    });
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }

  toggleEditMode(index: number) {
    this.cartData[index].hasEditMode = !this.cartData[index].hasEditMode;
  }

  decrementQuantity(index: number) {
    if (this.cartData[index].quantity > 0) {
      this.cartData[index].quantity--;
    }
  }

  incrementQuantity(index: number) {
    this.cartData[index].quantity++;
  }

  deleteUserIngredient(index: number) {
    this.modalRef = this.modalService.open(ConfmodalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        modalBlock: this.cartData[index].ingredient.name,
        ingredientId: this.cartData[index].id,
      },
    });

    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {
        this.cartData.splice(index, 1);
        this.authService.fetchUserData(false);
      }
    });
  }

  updateCartIngredient(index: number) {
    this.cartService.updateUserIngredient(this.cartData[index]).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Success!',
          'The item was successfully updated!'
        );
        this.toggleEditMode(index);
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
