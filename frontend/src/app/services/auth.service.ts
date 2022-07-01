import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { UserModel } from '../components/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private _signupUrl ="http://localhost:3000/api/signup"
  // private _loginUrl ="http://localhost:3000/api/login"
  private _signupUrl ="api/signup"
  private _loginUrl ="api/login"
  constructor(private http:HttpClient,
    private _router:Router) { 
    }
  

  registeringUser(user:any){
    return this.http.post<any>(this._signupUrl, user)
  }

  loggingUser(user:any){
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  loggedOutUser(){
    window.localStorage.clear()
    this._router.navigate(['/home']);
  }
  getToken(){
    console.log('Hi GetToken');
    return localStorage.getItem('token');
  }

  userRoleAccess(){
    var token=localStorage.getItem('token')||"";
    var parse = atob(token.split('.')[1])
   var _roleAccess= JSON.parse(parse);
   if((_roleAccess.subject.role ==="Admin")||(_roleAccess.subject.email=='admin@domain.com'&&_roleAccess.subject.password =="admin1234")){
     console.log('Hello Admin')
     console.log(_roleAccess.subject.role)
     return true
   }
   console.log(_roleAccess.subject.role)
  //  alert('No access')
   return false
  }

}
