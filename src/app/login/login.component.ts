import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllService } from '../all.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showPassword: boolean = false;
image:string="https://img.icons8.com/color/96/visible--v2.png";
  public Login =new FormGroup({
    Emailaddress:new FormControl('',[Validators.required,Validators.email]),
    Password:new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(20), Validators.pattern("^[0-9A-Za-z]+$")]),
    // Emailaddress:new FormControl(''),
    // Password:new FormControl(''),
  });
  constructor(public rout:Router,public service:AllService) { }
  ngOnInit(): void {


  };
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.image="https://img.icons8.com/color/96/000000/hide.png"
    }else{
      this.image="https://img.icons8.com/color/96/visible--v2.png"
    
    }
  }

  validate(){
    // console.log(this.Login.value)
    if(this.Login.valid){
      Swal.fire('Success');
      // console.log(this.Login.value)
      
      this.rout.navigateByUrl('/main');
      // this.rout.navigateByUrl('/User');
    }else{
      Swal.fire('Error');
    }
};

async loginform() {
  const formData = {
    Emailaddress: this.Login.value.Emailaddress,
    Password: this.Login.value.Password
  };

  try {
    await this.service.loginform(formData);
    this.Login.reset();
    // this.getData();
  } catch (error) {
    // console.error('Error in loginform', error);
  }
}


  // Registration(){
  //   this.rout.navigateByUrl('/Registration');

  // }


}
