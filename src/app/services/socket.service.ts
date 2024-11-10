import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;


  constructor() {

    // Create connection on port 9023
    this.socket = io('http://localhost:2020');

    // Listen events on client connection
    this.socket.on('connect', ()=>{
      console.log('Connect WebSocket Server');
    });

    // Listen any event
    this.socket.on('Nueva conexion', (data)=>{
      console.log('Listening event from WebSocketServer');
      console.log(data);

    });

    this.socket.on('data_user', (data)=>{
      console.log('Listening event from WebSocketServer');
      console.log(data);

    });




  }

  // Method to send message to the server
  emitEvent(eventName: string , data?:any){
    console.log(eventName, data);
    this.socket.emit(eventName, data);
  }

   //Method to subscribe on events from the server
   onEvent<T>(eventName: string):Observable<T>{
    return new Observable<T>(observer => {
      this.socket.on(eventName, (data : T) =>{
        observer.next(data);
      });

      return () => {
        this.socket.off(eventName);
      };

    })
   }


}
