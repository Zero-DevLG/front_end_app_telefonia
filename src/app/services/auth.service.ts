import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:2020/api/auth';
  private userDataSubject = new BehaviorSubject<any>(null); // Se inicializa con el valor null los datos a enviar
  public userData$ = this.userDataSubject.asObservable(); // Observable para los datos de usuario


  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string){
    return this.http.post(this.apiUrl + '/login', { email, password }).subscribe((response: any )=>{
      if(response.token){
        const usr_id = response.usr_id;
        this.userDataSubject.next({ usr_id: response.usr_id });
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', usr_id);

        this.router.navigate(['/dashboard']);
      }
    }, (error)=>{
      console.error('Error en el inicio de sesión', error);
    })
  }



}
