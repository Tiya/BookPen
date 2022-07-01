import { Injectable } from '@angular/core';
import {  ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private jwtAuth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.jwtAuth.loggedIn()) {
      return true;
    } else {
      alert('Please login to access the pages')
      this.router.navigate(["/dashboard"], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
  }
