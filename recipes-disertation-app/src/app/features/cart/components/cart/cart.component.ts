import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../../models/cart.model';
import { CartService } from '../../services/cart.service';
import { LoadingService } from 'src/app/core/components/loading/loading.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  providers: [LoadingService],
})
export class CartComponent implements OnInit {
  cartData$: Observable<ShoppingCart[]>;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    const userId = 1;
    this.cartData$ = this.cartService.getUserCart(userId);
  }
}
