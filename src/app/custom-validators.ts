import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value != null && typeof value === 'string' && value.indexOf(' ') >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
}  
