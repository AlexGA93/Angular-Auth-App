import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/auth/services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private _as: AuthenticationService,
    private router: Router
  ){}

   // get user informacion from service and store in a local getter
   get user(){
    return this._as.user;
  }

  logout(){
    // redirect to a url route
    this.router.navigateByUrl('/auth');
    // clear local storage
    this._as.logout();
  }

}
