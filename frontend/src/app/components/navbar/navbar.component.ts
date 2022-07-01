import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { HasRoleGuard } from 'src/app/has-role.guard';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  
  constructor(private viewportScroller: ViewportScroller, public _authService:AuthService) {}

  public onClick(elementId: string): void { 
    this.viewportScroller.scrollToAnchor(elementId);
  }

  ngOnInit(): void {
  }

  // loginPage(){
  //       this._router.navigate(['/login']);
  // }
}
