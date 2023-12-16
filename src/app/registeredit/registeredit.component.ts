import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from '../all.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registeredit',
  templateUrl: './registeredit.component.html',
  styleUrls: ['./registeredit.component.css']
})
export class RegistereditComponent {

  showPassword: boolean = false;
  image:string="https://img.icons8.com/color/96/visible--v2.png";
  response:any
  profilePicture: File | null = null;
Registration!: FormGroup;
selectedFile!: File;
isEditMode = false;
    constructor(public rout:Router,public http: HttpClient,public service:AllService) { }
    ngOnInit(): void {
          this.getData();
    };
      EmployeeId:any;
      Name:any;
      Salary:any;
      Emailaddress:any;
      Password:any;
      currentuserID:any;
      onFileChange(event: any) {
        if (event.target.files && event.target.files.length) {
          this.profilePicture = event.target.files[0];}
      }
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      this.image="https://img.icons8.com/color/96/000000/hide.png"
    }else{
      this.image="https://img.icons8.com/color/96/visible--v2.png"}
  }
  async registerform1() {
    let formData = new FormData();
    formData.append('EmployeeId', this.EmployeeId);
    formData.append('Name', this.Name);
    formData.append('Salary', this.Salary);
    formData.append('Emailaddress', this.Emailaddress);
    formData.append('Password', this.Password);

    const profilePicture = this.Registration.value.profilePicture;
  
    if (profilePicture instanceof File) {
      formData.append('profilePicture', profilePicture);
    }
    try {
      await this.service.updatewuserdetails(this.currentuserID, formData);
      this.profilePicture = null;
      this.getData();
    } catch (error) {
      console.error('Error in popupform', error);
    }
  }
  // async registerform1() {
  //   let formData = new FormData();
  //   formData.append('EmployeeId', this.EmployeeId);
  //   formData.append('Name', this.Name);
  //   formData.append('Salary', this.Salary);
  //   formData.append('Emailaddress', this.Emailaddress);
  //   formData.append('Password', this.Password);
  
  //   const profilePicture = this.Registration.value.profilePicture;
  
  //   if (profilePicture instanceof File) {
  //     formData.append('profilePicture', profilePicture);
  //   }
  
  //   try {
  //     // Construct an update query for upsert
  //     const updateQuery = {
  //       $set: {
  //         // Fields to update
  //         // Add more fields as needed
  //         Name: this.Name,
  //         Salary: this.Salary,
  //         Emailaddress: this.Emailaddress,
  //         Password: this.Password,
  //       },
  //       $setOnInsert: {
  //         // Fields to set only during insertion
  //         // Add more fields as needed
  //         EmployeeId: this.EmployeeId,
  //         profilePicture: profilePicture instanceof File ? profilePicture : null,
  //       },
  //     };
  
  //     await this.service.updatewuserdetails(this.currentuserID, updateQuery, { upsert: true });
  //     this.profilePicture = null;
  //     this.getData();
  //   } catch (error) {
  //     console.error('Error in popupform', error);
  //   }
  // }
  
  
  
  
  editRow(rowData: any) {
    this.isEditMode = true;
    this.EmployeeId=rowData.EmployeeId
    this.Name=rowData.Name
    this.Salary=rowData.Salary
    this.Emailaddress=rowData.Emailaddress
    this.Password=rowData.Password
    this.profilePicture=rowData.profilePicture
    this.currentuserID=rowData._id;
  }
  async deleteRow(data:any){
     let datas = data._id; 
              try {
              await this.service.deleteuserdetails(datas)
                this.getData();
              } catch (error) {
              }
         }
    getData(): void {
    this.http.get<any[]>('http://localhost:3000/api/user/Login').subscribe(
      (response:any) => {
        console.log(response)
        this.response=response
      },
      (error:any) => {
        console.error('Error fetching data:', error);
      });
  }
  async registerform() {
    const formData = new FormData();
    formData.append('EmployeeId', this.Registration.value.EmployeeId);
    formData.append('Name', this.Registration.value.Name);
    formData.append('Salary', this.Registration.value.Salary);
    formData.append('Emailaddress', this.Registration.value.Emailaddress);
    formData.append('Password', this.Registration.value.Password || ''); 
    formData.append('profilePicture', this.selectedFile);
    const profilePicture = this.Registration.value.profilePicture;
    if (profilePicture instanceof File) {
      formData.append('profilePicture', profilePicture);
    }
    try {
      await this.service.registerform(formData);
      this.Registration.reset();
     } catch (error) {
      console.error('Error in registration', error);
    }
  }
}
