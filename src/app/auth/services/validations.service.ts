import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationsService {

  constructor() { }

  passMatches(passField1: string, passField2: string){
    return (formGroup: AbstractControl) => {

      // extract passwords from FormGroup
      const pass1 = formGroup.get(passField1)?.value;
      const pass2 = formGroup.get(passField2)?.value;
      
      if (pass1 !== pass2) {
        //set error as not equals
        formGroup.get(passField2)?.setErrors({ notEquals: true });
        return { notEquals: true };
      }
      //set error as null if success
      formGroup.get(passField2)?.setErrors(null);
      return null;
    };
  }
}
