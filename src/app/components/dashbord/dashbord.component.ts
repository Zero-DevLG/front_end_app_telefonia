import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';
import { empresaDTO } from '../../models/empresa.dto';
import { WelcomeComponent } from "../welcome/welcome.component";

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [NavbarComponent, WelcomeComponent, CommonModule],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss'
})
export class DashbordComponent  implements OnInit {
  userData: any;
  public dataEmpresas: any = '';
  public newUser: boolean = true;

  constructor(private socketService: SocketService, private authService: AuthService){}

  ngOnInit(): void {

    this.authService.userData$.subscribe((data)=>{
      if(data){
        this.userData = data;
        console.log('ID USER:' + JSON.stringify(this.userData));
      }else{
        this.userData = localStorage.getItem('user');
      }
    })

    //emmit event


    // Subscribe to specify event
    this.socketService.onEvent<empresaDTO>('data_user').subscribe((data: empresaDTO)=>{
        console.log(data);
        if(data.id){
          this.newUser = true;
        }else{
          this.newUser = false;
        }
        const { msg, code } = data.response || { msg: '' , code: 0 } ;
        this.dataEmpresas = JSON.stringify(data);



    });


    this.socketService.emitEvent('ab', this.userData );


  }

}
