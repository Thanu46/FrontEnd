import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent {
  datas:any;
  constructor(private http:HttpClient,private router:Router, private websocketservice:WebsocketService){
  
  }
  ngOnInit(){
    
    this.getData();
  }
  
  getData(){
   
    this.websocketservice.sendData({action:"read"});
    this.websocketservice.handleMessage((data)=>{
      console.log(data);
      this.datas=data.data

    })
  }
  deleteMessage(id:any){
    this.websocketservice.sendData({action:"delete",id:id});
    this.websocketservice.handleMessage((data)=>{
      console.log(data)
      if(data.action==="deleteresponse"){
        alert("Deleted successfully");
        this.getData();
        
      }
   })

  }
  

}
