import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:2020/api/auth';


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    return this.http.post(this.apiUrl + '/login', { email, password }).subscribe((response: any )=>{
      if(response.token){
        console.log(response.token)
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      }
    }, (error)=>{
      console.error('Error en el inicio de sesión', error);
    })
  }



}
