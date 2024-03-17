import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { NotificationService } from 'src/app/core/services/notification.service';
import { CartService } from 'src/app/features/cart/services/cart.service';

@Component({
  selector: 'app-confmodal',
  templateUrl: './confmodal.component.html',
  styleUrls: ['./confmodal.component.scss'],
})
export class ConfmodalComponent implements OnInit {
  modalBlock: string;
  ingredientId: number;

  constructor(
    public modalRef: MdbModalRef<ConfmodalComponent>,
    public cartService: CartService,
    private notificationService: NotificationService,
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.cartService
      .deleteUserIngredient(this.ingredientId)
      .subscribe({
        next: () => {
          this.notificationService.showSuccess(
            'Success!',
            'The item was successfully deleted!'
          );
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
}
