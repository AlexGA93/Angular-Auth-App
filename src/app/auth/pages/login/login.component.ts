import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  myForm: FormGroup = this._fb.group({
    email   : ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]]
  });

  displayDebugging: boolean = false;

  constructor(
    private _fb: FormBuilder,
    private _as: AuthenticationService,
    private _router: Router
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
  login(){
    const { email, password } = this.myForm.value;
    // send payload to authentication server and wait to redirect
    this._as
        .login({ email, password })
        .subscribe(ok_status => {
          if(ok_status) {
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
