import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as CryptoJS from 'crypto-js';
import { MatDialog } from '@angular/material/dialog';


@Injectable({
  providedIn: 'root',

})
export class AllService {
  public username:any;
  public username1:any;
  public profilePicturePath:any
  public userimageurl:any;

  constructor(public rout:Router,public http: HttpClient) {



   }

  // showSuccessNotification(message: string) {
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Success',
  //     text: message,
  //     customClass: {
  //       popup: 'your-custom-popup-class',
  //     },
  //   });
  // }

//   async registerform(formData: any){
//     console.log(formData)
//     this.http.post('http://localhost:3000/api/user/Register', formData).subscribe(
//      (response:any) => {
       
//       //  console.log(response.message)
//       //  if(response.message === 'Successfully Registered'){
//       //     //  this.getData1()
//       //      const getDataResult:any =  this.getData1();
//       //      if (getDataResult) {
//             // location.reload();
//       //       console.log('ok')
//       //     } else {
//       //       console.error('Error in getData1');
//       //       // Handle the case where getData1() was not successful
//       //     }
      
//       //  }else{
//       //   console.error('Error in getData2');
//       //  }

//        if (response && response.message === 'Successfully Registered') {
//         alert('Successfully Registered')
//         console.log('Registration successful');
//         // Handle the success message here
//       } else {
//         console.error('Error in registration:', response.error || 'Unknown error');
//         // Handle the error case here
//       }

//       //  this.rout.navigateByUrl('/Authendication')
//       //  location.reload();
//      },
//      (error: HttpErrorResponse) => {
//       alert('Duplicate Values')

//      }
           
//    );

// }
async registerform(formData: any): Promise<string> {
  return new Promise((resolve, reject) => {
    this.http.post('http://localhost:3000/api/user/Register', formData).subscribe(
      (response: any) => {
        if (response && response.message === 'Successfully Registered') {
          console.log('Registration successful');
          // Resolve the promise with the success message
          resolve(response.message);
        } else {
          console.error('Error in registration:', response.error || 'Unknown error');
          // Reject the promise with the error message
          reject('Registration failed');
        }
      },
      (error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        // Reject the promise with the error message
        reject('Duplicate Values');
      }
    );
  });
}


async getData1(){
  this.http.get<any[]>('http://localhost:3000/api/user/Login').subscribe(
    async (response:any) => {
      console.log(response) 
      // const detail = await response
      // this.response1=detail
      
    },
    (error:any) => {
      console.error('Error fetching data:', error);
    });
}

async loginform(formData: any) {
  try {
    const response: any = await this.http.post('http://localhost:3000/api/user/Login', formData).toPromise();
    console.log(response);

    this.username = response.user.Name;
    // sessionStorage.setItem('username', this.username);
    // sessionStorage.setItem('username1', 'User');

    sessionStorage.setItem(btoa('username'), btoa(this.username));
    sessionStorage.setItem(btoa('username1'), btoa('User'));
    // sessionStorage.setItem('username', this.username);
    // sessionStorage.setItem('username1', 'User');

    // Construct the full image URL
    const imageUrl = response.user.profilePicture
      ? `http://localhost:3000/${response.user.profilePicture.replace(/\\/g, '/')}`
      : null;

    // Preload the image before displaying the Swal modal
    const image: any = new Image();
    image.src = imageUrl;
    console.log('Constructed Image URL:', imageUrl);
    this.userimageurl= imageUrl
    // sessionStorage.setItem('userimage', '${ this.userimageurl}');




    // sessionStorage.setItem('userimage', `${this.userimageurl}`);
    sessionStorage.setItem(btoa('userimage'), btoa(`${this.userimageurl}`));

 

    image.onload = () => {
      Swal.fire({
        icon: 'success',
        title: ` Welcome, ${this.username}!`,
        html: `<img class="img-fluid rounded-circle center-img" src="${imageUrl}" alt="Profile Picture" style="max-width: 50%; max-height:50%; margin-top: 10%; margin-bottom: -0%; " >`,
        customClass: {
          popup: 'custom-popup-class',
          // height:
        },
      });

      if (this.username === 'admin') {
        this.rout.navigateByUrl('/main');
      } else {
        this.rout.navigateByUrl('/User');
      }
    };

    image.onerror = () => {
      console.error('Error loading profile picture');
      // Display Swal modal with welcome message even if the image fails to load
      Swal.fire({
        icon: 'success',
        title: ` Welcome, ${this.username}!`,
      });

      if (this.username === 'admin') {
        this.rout.navigateByUrl('/main');
      } else {
        this.rout.navigateByUrl('/User');
      }
    };
  } catch (error) {
    console.error('Error during login:', error);
    Swal.fire({
      icon: 'error',
      title: 'Try again',
    });
  }
}









async passwordloginform(formData: any) {
  try {
    const response: any = await this.http.post('http://localhost:3000/api/user/Forgotpassword', formData).toPromise();
    // console.log(response)
    // console.log(this.username)
    if (response.message === 'OTP sent to your email') {

      Swal.fire({
        icon: 'success',
        title: ` OTP sent to your email`,
      });

      // sessionStorage.setItem("user", "admin");
      // localStorage.setItem('username', this.username);
      if(this.username=== 'admin'){
        this.rout.navigateByUrl('/main');

      }else{
        this.rout.navigateByUrl('/User');

      }


    } else {
           Swal.fire({
        icon: 'error',
        title: `User not found`,
      });
    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: `Try again`,
    });
    // this.route.navigateByUrl('Home');
  }
}
async userprojects(formdata:any){
  try {
    const response: any = await this.http.post('http://localhost:3000/api/user/UserProject', formdata).toPromise();
        //  console.log(response.message)
    if (response.message === 'Successfully submitted') {

      await Swal.fire({
        icon: 'success',
        title: `Successfully Submitted`,
      });
      // alert('Successfully submitted')
 location.reload();

      // this.rout.navigateByUrl('/main');
    } else {
           Swal.fire({
        icon: 'error',
        title: `Invalid details`,
      });

    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: `Invalid details`,
    });

    // this.route.navigateByUrl('Home');
  }
}

// async updatewuserdetails(id:any, formData: any) {

//   const url = `http://localhost:3000/api/user/userupdate/${id}`; 
//   try {
//     const response: any = await this.http.put(url, formData).toPromise();
//     if (response && response.message === 'Workorder details updated successfully') {
//              Swal.fire({
//         icon: 'success',
//         title: `Work order details updated successfully`,
//       });
//     } else {

//       const errorMessage = response.error.message || 'Internal server error';

//     }
//   } catch (error) {
//     Swal.fire({
//       icon: 'error',
//       title: 'Internal server error',
//     });
//   }
  
// }
// async updatewuserdetails(id: any, formData: any) {
//   const url = `http://localhost:3000/api/user/userupdate/${id}`;
//   console.log(id)
//   console.log(formData)
//   try {
//     const response: any = await this.http.put(url, formData).toPromise();
    
//     if (response && response.message === 'User details updated successfully') {
//      await Swal.fire({
//         icon: 'success',
//         title: 'User details updated successfully',
//       });
//       location.reload();
//     } else {
//       // Handle other response cases
//       console.error('Error updating user details:', response.error || 'Unknown error');
//     }
//   } catch (error) {
//     console.error('Internal server error:', error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Internal server error',
//     });
//   }
// }
async updatewuserdetails(id: any, formData: any) {
  const url = `http://localhost:3000/api/user/userupdate/${id}`;
  console.log(id)
  console.log(formData)
  try {
    const response: any = await this.http.put(url, formData).toPromise();
    
    if (response && response.message === 'User details updated successfully') {
      // const updatedUser = await response.profilePicture;
      // const image = await sessionStorage.setItem(btoa('userimage'), btoa(`${updatedUser}`));

      await Swal.fire({
        icon: 'success',
        title: 'User details updated successfully',
      });
      // location.reload();
      // this.rout.navigate(['/main']);
    } else {
      // Handle other response cases
      console.error('Error updating user details:', response.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Internal server error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Internal server error',
    });
  }
}

// async updatewuserdetails(id: any, formData: FormData, upsert: boolean = false) {
//   const url = `http://localhost:3000/api/user/userupdate/${id}`;
//   try {
//     // Include the upsert flag in the request body
//     formData.append('upsert', upsert.toString());

//     const response: any = await this.http.put(url, formData).toPromise();

//     if (response && response.message === 'User details updated successfully') {
//       Swal.fire({
//         icon: 'success',
//         title: 'User details updated successfully',
//       });
//     } else {
//       // Handle other response cases
//       console.error('Error updating user details:', response.error || 'Unknown error');
//     }
//   } catch (error) {
//     console.error('Internal server error:', error);
//     Swal.fire({
//       icon: 'error',
//       title: 'Internal server error',
//     });
//   }
// }

async updatewuserdetails1(id: any, formData: any) {
  console.log(id)
  console.log(formData)
  const url = `http://localhost:3000/api/user/UserProjectupdate/${id}`;
  try {
    const response: any = await this.http.put(url, formData).toPromise();
    if (response && response.message === 'User details updated successfully') {
      await Swal.fire({
        icon: 'success',
        title: 'User details updated successfully',
      });
      // location.reload();
    } else {
      // Handle other response cases
      console.error('Error updating user details:', response.error || 'Unknown error');
    }
  } catch (error) {
    console.error('Internal server error:', error);
    Swal.fire({
      icon: 'error',
      title: 'Internal server error',
    });
  }
}


async deleteuserdetails(id:any) {

  const url = `http://localhost:3000/api/user/userdelete/${id}`; 
  try {
    const response: any = await this.http.delete(url).toPromise();

    if (response && response.message === 'Workorder details deleted successfully') {
             Swal.fire({
        icon: 'success',
        title: `Work order deleted updated successfully`,
      });
    } else {

      const errorMessage = response.error.message || 'Internal server error';

    }
  } catch (error) {

    Swal.fire({
      icon: 'error',
      title: 'Internal server error',
    });
  }
  
}
async deleteuserdetails1(id:any) {

  const url = `http://localhost:3000/api/user/UserProjectdelete/${id}`; 
  try {
    const response: any = await this.http.delete(url).toPromise();

    if (response && response.message === 'Workorder details deleted successfully') {
             Swal.fire({
        icon: 'success',
        title: `Work order deleted updated successfully`,
      });
    } else {

      const errorMessage = response.error.message || 'Internal server error';

    }
  } catch (error) {

    Swal.fire({
      icon: 'error',
      title: 'Internal server error',
    });
  }
  
}
async updateprojectdetails(id:any, formData: any) {

  const url = `http://localhost:3000/api/user/Projectupdate/${id}`; 
  try {
    const response: any = await this.http.put(url, formData).toPromise();
    if (response && response.message === 'Workorder details updated successfully') {
             Swal.fire({
        icon: 'success',
        title: `Work order details updated successfully`,
      });
    } else {

      const errorMessage = response.error.message || 'Internal server error';

    }
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Internal server error',
    });
  }
  
}
async deleteprojectdetails(id:any) {

  const url = `http://localhost:3000/api/user/Projectdelete/${id}`; 
  try {
    const response: any = await this.http.delete(url).toPromise();

    if (response && response.message === 'Workorder details deleted successfully') {
             Swal.fire({
        icon: 'success',
        title: `Work order deleted updated successfully`,
      });
    } else {

      const errorMessage = response.error.message || 'Internal server error';

    }
  } catch (error) {

    Swal.fire({
      icon: 'error',
      title: 'Internal server error',
    });
  }
  
}
}

