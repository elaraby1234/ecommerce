import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { threadId } from 'node:worker_threads';
import { AuthService } from '../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly _AuthService=inject(AuthService);
  private readonly _FormBuilder=inject(FormBuilder);
  private readonly _Router=inject(Router);

  
  msgError:string="";
  isloading:boolean=false;


  // crate group

  loginform:FormGroup=this._FormBuilder.group({
    
    email:[null,[Validators.required,Validators.email]],
    password:[null,[Validators.required,Validators.pattern(  /^\w{6,}$/ )]],
   

  })


  // loginform:FormGroup=new FormGroup({
  //   // controls
  //   name:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
  //   email:new FormControl(null,[Validators.required,Validators.email]),
  //   password:new FormControl(null,[Validators.required,Validators.pattern(  /^\w{6,}$/ )]),
  //   rePassword:new FormControl(null),
  //   phone:new FormControl(null,[Validators.required,Validators.pattern(  /^01[0125][0-9]{8}$/)])
  // },this.confirmPassword)

  


  loginSubmit():void{

     if(this.loginform.valid){

      this.isloading=true;
      this._AuthService.setloginform(this.loginform.value).subscribe({
        next:(res)=>{
          console.log(res);
          if(res.message=='success'){
            // 1- save Token
            localStorage.setItem('userToken',res.token)
            // 2- Decode Token
             this._AuthService.SaveUserData()
             // 3- Navigate To Home
            this._Router.navigate(['/home'])

          }
          this.isloading=false;
          
        },
        error:(err:HttpErrorResponse)=>{ 
          
         this.msgError=err.error.message
          console.log(err);
          this.isloading=false;
        }
      })
      
     } 

     else{
      this.loginform.setErrors({mismatch:true})
      this.loginform.markAllAsTouched()
     }
   
    
   }



}
