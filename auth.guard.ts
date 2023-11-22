import { Injectable } from '@angular/core';

import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from '../_service/auth.service';
import { UserService } from '../_service/user.service';
import { TokenStorageService } from '../_service/token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class authGuard implements CanActivate {
  constructor(
    private authservice: AuthService,
    private router: Router,
    private userService: UserService,
    private tokenStorage: TokenStorageService
  ) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.tokenStorage.getToken() !== null) {
      const userRole = this.tokenStorage.getUser().roles[0];
      const requiredRoles = route.data['roles'] as Array<string>;
      console.log(userRole);
      console.log(requiredRoles);
      if (userRole === 'ROLE_ADMIN') {
        return true;
      } else {
        this.router.navigate(['/forbidden']);
        return false;
      }
    }
    this.router.navigate(['/login']);
    return false;
  }
}
