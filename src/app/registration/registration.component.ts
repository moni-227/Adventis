import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AllService } from '../all.service';
import { NgZone } from '@angular/core';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  // Inside your component class
showPassword: boolean = false;
image:string="https://img.icons8.com/color/96/visible--v2.png";
// selectedFile: File | null = null;
profilePicture:any
Registration!: any;
selectedFile!: File;
currentuserID:any;
response1:any;
EmployeeId:any;
Name:any;
Salary:any;
Emailaddress:any;
Password:any;
toggleDropdown = false;
imageUrl!: any;
// currentuserID:any;
isEditMode = false;
  constructor(private fb: FormBuilder,public rout:Router,public http: HttpClient,public service:AllService,private zone: NgZone) {

    // });
    const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
    this.imageUrl=image

   }
  ngOnInit(): void {
    this.getData1();
  };

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
  if(this.showPassword){
    this.image="https://img.icons8.com/color/96/000000/hide.png"
  }else{
    this.image="https://img.icons8.com/color/96/visible--v2.png"
  
  }
}
onFileChange(event: any) {
  if (event.target.files && event.target.files.length) {
    this.profilePicture = event.target.files[0];}
}

  validate(){
    if(this.Registration.valid){
      Swal.fire('Success');
      // console.log(this.Registration.value)
      
      this.rout.navigateByUrl('/Authendication');
    }else{
      Swal.fire('Error');
    }
};
async getData1(){
  this.http.get<any[]>('http://localhost:3000/api/user/Login').subscribe(
    async (response:any) => {
      console.log(response) 
      const detail = await response
      this.response1=detail
      
      if (response && response.message === 'Successfully Registered') {
        console.log('Registration successful');
        
      } else {
        console.error('Error in registration:', response.error || 'Unknown error');
        // }
      }
    },
    (error:any) => {
      console.error('Error fetching data:', error);
    });
}

// async registerform() {
//   try {
//     const formData = new FormData();
//     formData.append('EmployeeId', this.EmployeeId);
//     formData.append('Name', this.Name);
//     formData.append('Salary', this.Salary.toString());
//     formData.append('Emailaddress', this.Emailaddress);
//     formData.append('Password', this.Password);
//     formData.append('profilePicture', this.profilePicture, this.profilePicture.name);

//     console.log('Form Data:', formData);

//     // Call your service method to send data to the server
//     await this.service.registerform(formData);
//     // // Wait for getData1() to complete before proceeding
//     // 
//     // location.reload();
//     // // Reset form values after successful registration
  
//     await this.getData1();
//     // // Reload the page only if getData1() is successful
//     // if (getDataResult) {
//     //   this.zone.run(() => {
//         // location.reload();
//         // this.clearForm();
//     //   });
//     // } else {
//     //   console.error('Error in getData1');
//     //   // Handle the case where getData1() was not successful
//     // }
//     // if(Successfully Registered)
//   } catch (error) {
//     console.error('Error in registration', error);
//   }
// }
async registerform() {
  try {
    const formData = new FormData();
    formData.append('EmployeeId', this.EmployeeId);
    formData.append('Name', this.Name);
    formData.append('Salary', this.Salary.toString());
    formData.append('Emailaddress', this.Emailaddress);
    formData.append('Password', this.Password);
    formData.append('profilePicture', this.profilePicture, this.profilePicture.name);

    console.log('Form Data:', formData);

    // Call your service method to send data to the server
    await this.service.registerform(formData)
      .then((responseMessage: string) => {
        // Handle the response message here
        // alert(responseMessage);
        Swal.fire({
          icon: 'success',
          title: 'Successfully Registered',
        });

        // Proceed with additional logic if needed
        this.getData1();
        // location.reload();
      })
      .catch((error) => {
        console.error('Error in registration', error);
        // Handle the error case here
      });
  } catch (error) {
    console.error('Error in registration', error);
  }
}

private objectToFormData(obj: any): FormData {
  const formData = new FormData();

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      formData.append(key, obj[key]);
    }
  }

  return formData;
}

clearForm(): void {
  // Clear form fields after submission
  this.EmployeeId = '';
  this.Name = '';
  this.Salary = null;
  this.Emailaddress = '';
  this.Password = '';
  this.profilePicture = null; // Reset profilePicture

}

private createFormData(): FormData {
  const formData = new FormData();
  formData.append('EmployeeId', this.Registration.value.EmployeeId);
  formData.append('Name', this.Registration.value.Name);
  formData.append('Salary', this.Registration.value.Salary);
  formData.append('Emailaddress', this.Registration.value.Emailaddress);
  formData.append('Password', this.Registration.value.Password || ''); // Ensure 'Password' is not undefined

  const profilePicture1 = this.Registration.value.profilePicture;

  console.log('Profile Picture:', profilePicture1);

  if (profilePicture1 instanceof File) {
    formData.append('profilePicture', profilePicture1);
  }

  return formData;
}

async registerform1() {
  let formData = new FormData();
  formData.append('EmployeeId', this.EmployeeId);
  formData.append('Name', this.Name);
  formData.append('Salary', this.Salary);
  formData.append('Emailaddress', this.Emailaddress);
  formData.append('Password', this.Password);

  // Check if a new profilePicture is selected before appending
  if (this.profilePicture instanceof File) {
    formData.append('profilePicture', this.profilePicture);
  }

  try {
    await this.service.updatewuserdetails(this.currentuserID, formData);



    this.Password = '';
    this.clearForm();


  } catch (error) {
    console.error('Error in popupform', error);
  }
}

async handleFileInput(event: any) {
  const file =await event.target.files[0];
  this.selectedFile = file;
  // this.profilePicture=file

  // Update the 'profilePicture' control in the FormGroup with the selected file
  this.Registration.patchValue({
    profilePicture: file
  });

}

editRow(rowData: any) {
  // Set isEditMode to true when you click the "Edit" button
  this.isEditMode = true;


    this.isEditMode = true;
    this.EmployeeId=rowData.EmployeeId
    this.Name=rowData.Name
    this.Salary=rowData.Salary
    this.Emailaddress=rowData.Emailaddress
    // this.Password=rowData.Password
    this.Password = '';
    this.profilePicture=rowData.profilePicture
    this.currentuserID=rowData._id;
  };

  home(){
    this.rout.navigateByUrl('main');
  }
  project(){
    this.rout.navigateByUrl('Project');
  }
  report(){
    this.rout.navigateByUrl('Report');
  }
  
  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("username1");
    sessionStorage.clear();
    this.rout.navigateByUrl('Authendication');
  }


async deleteRow(data:any){
   let datas = data._id; 
            try {
            await this.service.deleteuserdetails(datas)
              this.getData1();
            } catch (error) {
            }
       }
      
}
