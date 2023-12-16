import { CanActivateFn } from '@angular/router';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class userGuard implements CanActivate {
  public usertype1:any;
  public usertype2:any;
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    
    // const usertype = sessionStorage.getItem('username');
    // const usertype1 = sessionStorage.getItem('username1');


    const usertype  = atob(sessionStorage.getItem(btoa('username')) || '');
    // const usertype = sessionStorage.getItem('username');
    // const usertype1 = sessionStorage.getItem('username1');
    const usertype1  = atob(sessionStorage.getItem(btoa('username1')) || '');


    // if ( (this.usertype1 === 'admin') || (this.usertype2 === 'User')) {
      if ( (usertype === 'admin') || (usertype1 === 'User')) {
      return true;
    } else {
      Swal.fire('Entry Restricted, Please Log In');
      this.router.navigateByUrl('/Authendication');
      return false;
    }
  }
}


