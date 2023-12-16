import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';


// export const adminGuard: CanActivateFn = (route, state) => {

//   return true;
// };



@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // const usertype = sessionStorage.getItem('username');
    const usertype = atob(sessionStorage.getItem(btoa('username')) || '');
    if (usertype === 'admin') {
      return true;
    } else {
      Swal.fire('Entry Restricted, Please Log In');
      this.router.navigateByUrl('/Authendication');
      return false;
    }
  }
}


