import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
// import * as bootstrap from 'bootstrap';
import { Router, NavigationEnd } from '@angular/router';
import { AllService } from '../all.service';
declare var bootstrap: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public isVideoPaused = false;
  name:any;
  toggleDropdown = false;
  imageUrl!: any;
  @ViewChild('carousel') carousel!: ElementRef;

  constructor(public rout:Router,private elRef: ElementRef,private renderer: Renderer2,public service:AllService) { 
  //  let image= sessionStorage.getItem('userimage');
   const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
   this.imageUrl=image


  }
  ngOnInit(): void {
    // let name = sessionStorage.getItem('username')
    const name = atob(sessionStorage.getItem(btoa('username')) || '');
    this.name=name 
    // this.imageUrl = this.service.userimageurl
    this.rout.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.startCarousel();
      }
    });
 
  };
 

  private startCarousel() {
    const options = {
      interval: 4000,  // Set your desired interval here
    };

    new bootstrap.Carousel(this.elRef.nativeElement.querySelector('.carousel'), options);
  }
  register(){
    this.rout.navigateByUrl('/Registration');

  }
  project(){
    this.rout.navigateByUrl('/Userproject');
  }
  report(){
    this.rout.navigateByUrl('UserReport');
  }
  

  logout() {

    sessionStorage.removeItem("username");
    sessionStorage.removeItem("username1");
    sessionStorage.clear();
    this.rout.navigateByUrl('Authendication');
  }
  toggleVideo(): void {
    this.isVideoPaused = !this.isVideoPaused;
    // var videoContainer = document.querySelector('.video-container') as HTMLElement;
    // videoContainer.style.display = (videoContainer.style.display === 'none') ? '' : 'none';
  }


  


  
}


