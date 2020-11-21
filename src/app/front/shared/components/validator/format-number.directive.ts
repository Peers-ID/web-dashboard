import { Directive, ElementRef, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[FormatNumber]'
})

export class FormatNumberDirective implements OnInit {
  private inputElement: any;
  @Output() rawValue: EventEmitter<number>;

  constructor(
    private elementRef: ElementRef,
    private decimalPipe: DecimalPipe
  ) {
    this.inputElement = this.elementRef.nativeElement;
    this.rawValue = new EventEmitter();
  }

  ngOnInit(): void {
    // this.inputElement.value = 'yow';
  }

  @HostListener('keyup')
  onChange() {
    const numberValue = this.inputElement.value.replace(/\D/g, '');
    this.rawValue.emit(+numberValue);  
    // this.inputElement.value = this.decimalPipe.transform(numberValue);
    this.inputElement.value = numberValue.replace(/\d(?=(?:\d{3})+$)/g, '$&.')
  }
}
