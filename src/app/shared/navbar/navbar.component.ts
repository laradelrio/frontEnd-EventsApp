import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiDbService } from 'src/app/services/user-db-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(
    private userApiDbService: UserApiDbService,
    private router: Router,
  ){
    this.isLoggedInF();
  }

  //subscribes to api JWT validation response
  isLoggedInF(): void{
   this.userApiDbService.validateToken()
   .subscribe((resp)=> this.isLoggedIn = resp.status.valueOf());
  }
 

  logOut(): void{
    localStorage.removeItem('token');
    this.isLoggedInF()
    this.router.navigate(['/home']);
  }
}
