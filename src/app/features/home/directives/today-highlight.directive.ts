import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTodayHighlight]'
})
export class TodayHighlightDirective implements OnInit {
  @Input('appTodayHighlight') date: Date;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.isToday(this.date)) {
      let div = this.el.nativeElement.querySelector('div');
      let par = this.el.nativeElement.querySelector('p');

      this.renderer.setStyle(div, 'background-color', 'var(--bs-yellow'); // Change this color to your desired color
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', '600'); // Change this color to your desired color

      this.renderer.addClass(par, "fw-bold")
    }
  }

  
  private isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
}
