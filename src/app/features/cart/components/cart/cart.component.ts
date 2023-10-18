import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { LoadingService } from 'src/app/core/components/loading/loading.service';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { AccountService } from 'src/app/features/auth/services/account.service';
import { UserIngredient } from 'src/app/core/models/user.model';
import { environment } from 'src/app/core/environments/environment';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [LoadingService],
})
export class CartComponent implements OnInit {
  cartData: UserIngredient[];

  constructor(public accountService: AccountService) {}

  ngOnInit(): void {
    const userId = 1;
    this.cartData = this.accountService.loggedUserValue.userIngredients.filter(
      (ingredient) => ingredient.isCartIngredient === true
    );
  }

  getIngredientUrl(id: string) {
    return `${environment.apiUrl}/images/${id}`;
  }
 
}
