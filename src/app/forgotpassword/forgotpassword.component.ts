import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AllService } from '../all.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  public Login =new FormGroup({
    Emailaddress:new FormControl('',[Validators.required,Validators.email]),
  });
  constructor(public rout:Router,public service:AllService) { }
  ngOnInit(): void {


  };

  async loginform() {
    const formData = {
      Emailaddress: this.Login.value.Emailaddress,

    };
    console.log(formData)
  
    try {
      await this.service.passwordloginform(formData);
      console.log('okk')
      // this.Login.reset();
      // this.getData();
    } catch (error) {
      console.error('Error in loginform', error);
    }
  }
}
