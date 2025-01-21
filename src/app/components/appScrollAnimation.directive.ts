import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
})
export class AppScrollAnimationDirective
  implements AfterViewInit, OnDestroy, OnChanges
{
  @Input('appScrollAnimation') animationClass: string = '';

  private resizeObserver: ResizeObserver | null = null;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    const element = this.el.nativeElement;
    const parent = element.parentElement;

    if (!element || !parent) {
      console.error('Element or parent not found');
      return;
    }

    const checkAnimation = () => {
      if (element.scrollWidth > parent.offsetWidth) {
        this.renderer.addClass(element, this.animationClass);
      } else {
        this.renderer.removeClass(element, this.animationClass);
      }
    };

    this.resizeObserver = new ResizeObserver(() => {
      checkAnimation();
    });

    this.resizeObserver.observe(element);
    this.resizeObserver.observe(parent);

    checkAnimation();
  }

  ngOnDestroy() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
