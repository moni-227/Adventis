import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllService } from '../all.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  name:any;
  toggleDropdown = false;
  imageUrl:any

  constructor(public rout:Router,public service:AllService) {
    // let image= sessionStorage.getItem('userimage');
    const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
    this.imageUrl=image
   }
  ngOnInit(): void {
      // this.service.username=this.name
      // console.log(this.name)


      // let name:any = sessionStorage.getItem('username');
      const name:any = atob(sessionStorage.getItem(btoa('username')) || '');
      this.name=name
  };

  register(){
    this.rout.navigateByUrl('/Registration');

  }
  project(){
    this.rout.navigateByUrl('/Project');
  }
  report(){
    this.rout.navigateByUrl('/Report');
  }
  registersedit(){
    this.rout.navigateByUrl('/RegistrationEdit');
  }
  projectsedit(){
    this.rout.navigateByUrl('/ProjectsEdit');
  }

  logout() {

      sessionStorage.removeItem("username");
      sessionStorage.removeItem("username1");
      sessionStorage.clear();
      this.rout.navigateByUrl('Authendication');

}
}