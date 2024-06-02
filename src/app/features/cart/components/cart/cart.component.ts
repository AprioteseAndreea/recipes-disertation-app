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

  toggleEditMode(category: string, id: number) {
    const ingredient = this.getIngredientByCategoryAndId(category, id);
    ingredient.hasEditMode = !ingredient.hasEditMode;
  }

  decrementQuantity(category: string, index: number) {
    const ingredient = this.getIngredientByCategoryAndId(category, index);

    if (ingredient.quantity > 0) {
      ingredient.quantity--;
    }
  }

  incrementQuantity(category: string, index: number) {
    const ingredient = this.getIngredientByCategoryAndId(category, index);

    ingredient.quantity++;
  }

  deleteUserIngredient(category: string, index: number) {
    const ingredient = this.getIngredientByCategoryAndId(category, index);

    this.modalRef = this.modalService.open(ConfmodalComponent, {
      modalClass: 'modal-dialog-centered',
      data: {
        modalBlock: ingredient.ingredient.name,
        ingredientId: ingredient.id,
      },
    });

    this.modalRef.onClose.subscribe((message: any) => {
      if (message) {

        this.cartData.splice(index, 1);
        
        const categoryData = this.groupedCartData.get(category);

        if (categoryData) {
          // Găsește indexul ingredientului după ID și șterge-l din lista de categorie
          const ingredientIndex = categoryData.findIndex(ing => ing.ingredient.id === index);
  
          if (ingredientIndex !== -1) {
            categoryData.splice(ingredientIndex, 1);
  
            // Dacă lista de ingrediente pentru categoria specificată este goală, șterge categoria din map
            if (categoryData.length === 0) {
              this.groupedCartData.delete(category);
            } else {
              // Altfel, actualizează lista de ingrediente pentru categoria respectivă în map
              this.groupedCartData.set(category, categoryData);
            }
          }
        }    
        this.authService.fetchUserData(false);
      }
    });
  }

  updateCartIngredient(category: string, index: number) {
    const ingredient = this.getIngredientByCategoryAndId(category, index);

    this.cartService.updateUserIngredient(ingredient).subscribe({
      next: () => {
        this.notificationService.showSuccess(
          'Success!',
          'The item was successfully updated!'
        );
        this.toggleEditMode(category, index);
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

  getIngredientByCategoryAndId(category: string, id: number){
    return this.groupedCartData.get(category)?.find(ing => ing.ingredient.id === id);

  }
}
