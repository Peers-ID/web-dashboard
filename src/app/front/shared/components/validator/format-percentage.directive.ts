import { Directive, ElementRef, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Directive({
  selector: '[FormatPercentage]'
})

export class FormatPercentageDirective implements OnInit {
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
    if (numberValue === '100'){
      this.inputElement.value = numberValue
    }else{
      this.inputElement.value = numberValue.replace(/\d(?=(?:\d{2})+$)/g, '$&,')
    }
    
  }
}
