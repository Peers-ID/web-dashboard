import { AbstractControl, ValidatorFn } from '@angular/forms';

export function postalCodeValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const postalCode: string = control.value ? control.value.toString() : '';
    const regex: RegExp = /^[0-9]+$/;
    if (postalCode.length !== 5) return { custom: 'Harus terdiri dari 5 karakter' };
    else return regex.test(postalCode) ? undefined : { custom: 'Kode pos harus terdiri dari angka' };
  };
}
