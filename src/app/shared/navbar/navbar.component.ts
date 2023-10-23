import { Component } from '@angular/core';
import { ApiDbService } from 'src/app/services/api-db.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  isLoggedIn: boolean = false;

  constructor(
    private apiDbService: ApiDbService,
  ){
    this.isLoggedInF();
  }

  //subscribes to api JWT validation response
  isLoggedInF(): void{
   this.apiDbService.validateToken()
   .subscribe((resp)=> this.isLoggedIn = resp.status.valueOf());
  }
 

  logOut(): void{
    localStorage.removeItem('token');
    this.isLoggedInF()
  }
}
