import { AbstractControl, ValidatorFn } from '@angular/forms';

export function phoneNumberValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const phoneNumber = control.value ? control.value.toString() : '';
    const regex: RegExp = /^(08|[+]628)[0-9]+$/;
    const minLength = 9;
    let result;

    if (phoneNumber === '') return undefined;
    else {
      if (phoneNumber.length < minLength) result = { custom: `Minimal ${minLength} karakter`};
      if (phoneNumber.length > 3 && !regex.test(phoneNumber)) result = { custom: 'Nomor HP harus diawali dengan 08 atau +628' };
      return result;
    }
  };
}
