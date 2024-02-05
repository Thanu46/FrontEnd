import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Params } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { WebsocketService } from '../websocket.service';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  data: any;
  id!: number;
  updateForm!: FormGroup;
  firstname: any;
  dataid: any;
  employee: any;


  constructor( private http: HttpClient,
    private formbuilder: FormBuilder,
     private activatedRoute: ActivatedRoute, private router: Router,private websocketservice: WebsocketService) {

    this.updateForm = this.formbuilder.group({
      firstname: '',
      lastname: '',
      mobileNo: '',
      email: '',
      message: ''
      
    })
  }
  
  ngOnInit():void{
    this.activatedRoute.paramMap.subscribe((param:Params)=>{
       this.dataid=param['get']('id');
         console.log("data id is",this.dataid);
      })
      this.websocketservice.sendData({action:"read",id:this.dataid});
      this.websocketservice.handleMessage((data)=>{
        this.employee=data.data;
           console.log(this.employee);
           this.updateForm.setValue({
             firstname:this.employee.firstname,
             lastname:this.employee.lastname,
             mobileNo:this.employee.mobileNo,
             email:this.employee.email,
             message:this.employee.message
        
      })
    })
  }
update(){
  const employeedata=this.updateForm.value
  this.websocketservice.sendData({action:"update",newData:employeedata,id:this.dataid})
  this.websocketservice.handleMessage((data)=>{
    if(data.action==="updateresponse"){
      this.router.navigate(['/read']);
      alert("update successfully");

    }
 })
}
} 