import { Component, ViewChild } from '@angular/core';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { AddItemComponentComponent } from '../../modals/add-item-component/add-item-component.component';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ToastContainerDirective, ToastrService } from 'ngx-toastr';
import constants from 'src/app/core/constants/constants';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss'],
})
export class FridgeComponent {
  ingredients = constants.Ingredients;

  @ViewChild(ToastContainerDirective, { static: true })
  modalRef: MdbModalRef<AddItemComponentComponent> | null = null;

  constructor(
    private modalService: MdbModalService,
    private notificationService: NotificationService
  ) {}

  openDialog() {
    this.modalRef = this.modalService.open(AddItemComponentComponent, {
      modalClass: 'modal-dialog-centered',
    });
    this.modalRef.onClose.subscribe((message: any) => {
      this.refreshData();
    });
  }
  refreshData() {}
}
