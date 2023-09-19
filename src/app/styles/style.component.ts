
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SortEvent } from '../core/components/sort';
import { NotificationService } from '../core/services/notification.service';


@Component({
  selector: 'app-style',
  templateUrl: './style.component.html',
  styleUrls: ['./style.component.scss'],
})
export class StyleComponent implements OnInit {
  years = [...Array(10).keys()].map((i) => i + 2000);
  year!: number;

  startDate: string = new Date().toISOString();

  dummyMultiValues = ['Login', 'State Management', 'Unit Tests'];
  multiValue!: number[];

  sortEvent: SortEvent = {
    column: 'first',
    direction: 'asc',
  };

  tableData = [
    { first: 'Mark', last: 'Otto', handle: '@mdo' },
    { first: 'Jacob', last: 'Thornton', handle: '@fat' },
    { first: 'Larry the Bird', last: '	Rumpelstiltskin', handle: '@twitter' },
    { first: '	Joe', last: 'Otto', handle: '@hell' },
  ];

  currentPage: number = 3;
  pageSize: number = 5;
  totalRecords: number = 15;

  //alertType: typeof AlertType = AlertType;

  constructor(private alertService: NotificationService) {}

  ngOnInit(): void {}

  onSort(sortEvent: SortEvent) {
    this.sortEvent = sortEvent;
  }

  // showAlert(alertType: AlertType) {
  //   // preferaby, use verbose methods like

  //   // this.alertService.error(message);
  //   // this.alertService.info(message);
  //   // this.alertService.success(message);
  //   // this.alertService.warning(message);

  //   // sample for guidelines
  //   this.alertService.show(
  //     alertType,
  //     'This is just a sample text. Are you still reading?'
  //   );
  // }
}
