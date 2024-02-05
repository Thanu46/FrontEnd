import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,FormControl,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { WebsocketService } from '../websocket.service';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  createForm:FormGroup;
  data:any;
  
  constructor (private fb:FormBuilder,private http: HttpClient,private router:Router, private websocketservice: WebsocketService) {
    this.createForm = this.fb.group ({
      firstname: ['',[Validators.required]],
      lastname: ['',[Validators.required]],
      mobileNo: ['',[Validators.required]],
      email: ['',[Validators.required]],
      message: ['',[Validators.required]],
     
    })
   }
   ngOnInit(): void {
     
   }
   postdata(){
    const createObj ={
      action:"create",newData:this.createForm.value
    }
    console.log(createObj)
    this.websocketservice.sendData(createObj);
    this.websocketservice.handleMessage((data)=>{
      if(data.action==="createresponse"){
        this.router.navigate(['/read']);
        alert("submit successfully");
  
      }
   })
   }

}



