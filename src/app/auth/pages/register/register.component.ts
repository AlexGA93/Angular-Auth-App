import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidationsService } from '../../services/validations.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  myForm: FormGroup = this._fb.group({
    name      : ['', [Validators.required]],
    email     : ['',[Validators.required, Validators.email]],
    password  : ['',[Validators.required, Validators.minLength(6)]],
    password2 : ['',[Validators.required, Validators.minLength(6)]]
  },
  {
    validators: [this._validations.passMatches('password', 'password2')],
  });

  displayDebugging: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _as: AuthenticationService,
    private _router: Router,
    private _validations: ValidationsService
  ){}

  ngOnInit(): void {
    
  }

  // return an error message by the error type
  get emailErrorMessage(): string {
    const error = this.myForm.get('email')?.errors;

    if (error?.['required']) {
      return 'Email is required';
    } else if (error?.['pattern']) {
      return 'Email format invalid';
    } else if (error?.['usedEmail']) {
      return 'Email is in use';
    }

    return '';
  }

  // conditional method to show error messages
  fieldValidation(fieldName: string): boolean | undefined{
    // return true or false if form has been touched and the form field is invalid
    return this.myForm.get(fieldName)?.touched && this.myForm.get(fieldName)?.invalid;
  }

  // methods
  register(){
    const { name, email, password, password2 } = this.myForm.value;
    // send payload to authentication server and wait to redirect
    this._as
        .register({ name, email, password, password2 })
        .subscribe(ok_status => {
          if(ok_status){
            // redirect to dashboard
            this._router.navigateByUrl('/dashboard');
          }else{
            // reset form and alert
            this.myForm.reset();

            alert('Incorrect credentials!');
          }
        })
    
  }

  showDebugging(){
    this.displayDebugging = !this.displayDebugging;
  }
  
}
