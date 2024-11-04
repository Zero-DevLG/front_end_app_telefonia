import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [],
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.scss'
})
export class DashbordComponent  implements OnInit {

  constructor(private socketService: SocketService){}

  ngOnInit(): void {

    //emmit event


    // Subscribe to specify event
    this.socketService.onEvent('connection').subscribe((data)=>{
    });


    this.socketService.emitEvent('ab', { msg: 'test' });


  }

}
