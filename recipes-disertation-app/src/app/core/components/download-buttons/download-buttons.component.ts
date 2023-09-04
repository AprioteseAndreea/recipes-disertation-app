import { Component, Input, OnInit } from '@angular/core';
import { debounceTime, Subject, switchMap, takeUntil } from 'rxjs';
// import { ProfileGeneratorService } from 'src/app/api/services';
// import { AlertService } from 'src/app/core/alert/alert.service';
// import { DownloadService } from 'src/app/core/services/download.service';

@Component({
  selector: 'app-download-buttons',
  templateUrl: './download-buttons.component.html',
  styleUrls: ['./download-buttons.component.scss'],
})
export class DownloadButtonsComponent implements OnInit {
  @Input() userId: string;

  downloadProfileAsPdf$: Subject<string> = new Subject<string>();
  downloadProfileAsDocx$: Subject<string> = new Subject<string>();
  destroy$: Subject<void> = new Subject<void>();

  constructor(
    // private alertService: AlertService,
    // private profileGenerator: ProfileGeneratorService,
    // private downloadService: DownloadService
  ) {
    // this.downloadProfileAsPdf$
    //   .pipe(
    //     debounceTime(300),
    //     switchMap((id: string) =>
    //       this.profileGenerator.apiUsersUserIdProfileGeneratorPdfGet$Json$Response(
    //         { userId: id }
    //       )
    //     ),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.downloadService.saveFile(response);
    //     },
    //     error: (error) => {
    //       this.alertService.error(error);
    //     },
    //   });

    // this.downloadProfileAsDocx$
    //   .pipe(
    //     debounceTime(300),
    //     switchMap((id: string) =>
    //       this.profileGenerator.apiUsersUserIdProfileGeneratorDocxGet$Json$Response(
    //         { userId: id }
    //       )
    //     ),
    //     takeUntil(this.destroy$)
    //   )
    //   .subscribe({
    //     next: (response) => {
    //       this.downloadService.saveFile(response);
    //     },
    //     error: (error) => {
    //       this.alertService.error(error);
    //     },
    //   });
  }

  ngOnInit(): void {}

  downloadPdf(id: string): void {
    this.downloadProfileAsPdf$.next(id);
  }

  downloadDocx(id: string): void {
    this.downloadProfileAsDocx$.next(id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
