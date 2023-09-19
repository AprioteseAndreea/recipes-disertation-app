import {
    Directive,
    Input,
    Output,
    EventEmitter,
    OnInit,
    OnDestroy,
  } from '@angular/core';
  import { interval, Subject, takeUntil } from 'rxjs';
  
  @Directive({
    selector: '[appTimeout]',
  })
  export class TimeoutDirective implements OnInit, OnDestroy {
    private untilDestroy$: Subject<void> = new Subject<void>();
  
    @Input('appTimeout') timeout: number | undefined;
    @Output() onTimeout: EventEmitter<void> = new EventEmitter<void>();
  
    ngOnInit(): void {
      if (this.timeout) {
        interval(this.timeout)
          .pipe(takeUntil(this.untilDestroy$))
          .subscribe((_) => {
            this.onTimeout.emit();
          });
      }
    }
  
    ngOnDestroy(): void {
      this.untilDestroy$.next();
      this.untilDestroy$.complete();
    }
  }
  