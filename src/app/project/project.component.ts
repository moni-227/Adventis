import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from '../all.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  ProjectId:any;
  Title:any
  Client:any;
  ProjectValue!:number;
  ResourceBudjet!:number;
  ProjectDurationFrom:any;
  ProjectDurationTo:any;
  Description:any;
  filteredProject1: any[] = [];
  Projectvalue1!: any[] ;
  filteredProject2: any[] = [];
  Projectvalue2!: any[] ;
  isSubmitClicked = false;
  // TodayDate!: any;
  filteredProjectDates: any[] = [];
  projectDates: any[] = []; // Array to store all unique ProjectDurationFrom values
  response:any
  currentuserID:any;
  isEditMode = false;
  toggleDropdown = false;
imageUrl!: any;



  constructor(public rout:Router,public service:AllService,public http: HttpClient,private location: Location,private datePipe: DatePipe) { 
    
    const today = new Date();
    this.ProjectDurationFrom = this.datePipe.transform(today, 'dd-MM-yyyy');
    this.ProjectDurationTo = this.datePipe.transform(today, 'dd-MM-yyyy');
    const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
    this.imageUrl=image

  }
  ngOnInit(): void {
      this.getData();
   };
  async submit(){
    let formdata = {
      "ProjectId":this.ProjectId,
      "Title":this.Title,
      "Client":this.Client,
      "ProjectValue":this.ProjectValue,
      "ResourceBudjet":this.ResourceBudjet,
      "ProjectDurationFrom":this.ProjectDurationFrom,
      "ProjectDurationTo":this.ProjectDurationTo,
      "Description":this.Description,
    }
    // console.log(formdata)
      try {
        const response: any = await this.http.post('http://localhost:3000/api/user/Project', formdata).toPromise();

        if (response.message === 'Successfully submitted') {
    
          Swal.fire({
            icon: 'success',
            title: `Successfully Submitted`,
          });
          location.reload();
          // this.ProjectId='',
          // this.Title = '';
          // this.Client = '';
          // this.ProjectValue='',
          // this.ResourceBudjet='',
          // this.ProjectDuration=''
          // this.Description = '';
    
          // this.rout.navigateByUrl('/main');
        } else {
               Swal.fire({
            icon: 'error',
            title: `Invalid details`,
          });
          // this.ProjectId='',
          // this.Title = '';
          // this.Client = '';
          // this.ProjectValue='',
          // this.ResourceBudjet='',
          // this.ProjectDuration=''
          // this.Description = '';
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `Invalid details`,
        });
        // this.ProjectId='',
        // this.Title = '';
        // this.Client = '';
        // this.ProjectValue='',
        // this.ResourceBudjet='',
        // this.ProjectDuration=''
        // this.Description = '';
        // this.route.navigateByUrl('Home');
      }
    }
    async submit1(){
      let formData={
        "ProjectId" :this.ProjectId,
         "Title":this.Title,
         "Client":this.Client,
         "ProjectValue":this.ProjectValue,
         "ResourceBudjet":this.ResourceBudjet,
         "ProjectDurationFrom":this.ProjectDurationFrom,
         "ProjectDurationTo":this.ProjectDurationTo,
         "Description":this.Description
       }
         try {
           await this.service.updateprojectdetails(this.currentuserID, formData)
          
        this.getData();
        location.reload();
      
         } catch (error) {
           console.error('Error in popupform', error);
         }
  
  
  
     }
    
  // edit() {
  //   this.getData1();

  // }
  home(){
    this.rout.navigateByUrl('main');
  }
  register(){
    this.rout.navigateByUrl('Registration');
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
  onButtonClick() {
    if (!this.isSubmitClicked) {
      this.submit();
      this.isSubmitClicked = true;
    } else {
      // this.edit();
      this.isSubmitClicked = false;
    }
  }
    selectDepartment1(groupOption: string) {
      this.ProjectId = groupOption;
      this.filteredProject1 = []; 
      // console.log(this.Project)
  
     
    }
    filterDepartment1(event: any) {


      const inputValue = event.target.value;
      this.filteredProject1 = this.Projectvalue1.filter((groupOption) =>
        groupOption.toLowerCase().includes(inputValue.toLowerCase())
      );
  
    }

    selectDepartment2(groupOption: string) {
      this.ProjectDurationFrom= groupOption;
      this.filteredProject2 = []; 
      // console.log(this.Project)
  
     
    }
    filterDepartment2(event: any) {


      const inputValue = event.target.value;
      this.filteredProject2 = this.Projectvalue2.filter((groupOption) =>
        groupOption.toLowerCase().includes(inputValue.toLowerCase())
      );
  
    }

    getData(): void {
      this.http.get<any[]>('http://localhost:3000/api/user/Project').subscribe(
        (response) => {
      //  console.log(response);
      this.response=response
       const titles = response.map((item) => item.ProjectId);
      //  console.log()
  
  console.log(titles);
  this.Projectvalue1=titles
  const titles1 = response.map((item) => item.ProjectDurationFrom);
  //  console.log()

// console.log(titles1);
this.Projectvalue2 =titles1
// this.ProjectDurationFrom =titles1
  // console.log(this.Projectvalue2)
  // this.Projectvalue2=titles
  // this.Projectvalue3=titles


  // const projectDurations = response.map((project) => project.ProjectDurationFrom);
  // this.ProjectDurationFrom = projectDurations;


  
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
        
      );
  
    }
    // getData1(): void {
    //   this.http.get<any[]>('http://localhost:3000/api/user/Project').subscribe(
    //     (response) => {

    //       // "ProjectId":this.ProjectId,
    //       // "Title":this.Title,
    //       // "Client":this.Client,
    //       // "ProjectValue":this.ProjectValue,
    //       // "ResourceBudjet":this.ResourceBudjet,
    //       // "ProjectDurationFrom":this.ProjectDurationFrom,
    //       // "ProjectDurationTo":this.ProjectDurationTo,
    //       // "Description":this.Description,
    //    const titles1 = response.map((item) => item.ProjectId);
    //    this.ProjectId=titles1
    //    const titles2 = response.map((item) => item.Title);
    //    this.Title=titles2
    //    const titles3 = response.map((item) => item.Client);
    //    this.Client=titles3
    //    const titles4:any = response.map((item) => item.ProjectValue);
    //    this.ProjectValue=titles4
    //    const titles5:any = response.map((item) => item.ResourceBudjet);
    //    this.ResourceBudjet=titles5
    //    const titles6 = response.map((item) => item.ProjectDurationFrom,);
    //    this.ProjectDurationFrom=titles6
    //    const titles7 = response.map((item) => item.ProjectDurationTo);
    //    this.ProjectDurationTo=titles7
    //    const titles8 = response.map((item) => item.Description);
    //    this.Description=titles8

  
  
    //     },
    //     (error) => {
    //       console.error('Error fetching data:', error);
    //     }
        
    //   );
  
    // }

    editRow(rowData: any) {


      this.ProjectId=rowData.ProjectId
      this.Title=rowData.Title
      this.Client=rowData.Client
      this.ProjectValue=rowData.ProjectValue
      this.ResourceBudjet=rowData.ResourceBudjet
      this.ProjectDurationFrom=rowData.ProjectDurationFrom
      this.ProjectDurationTo=rowData.ProjectDurationTo
      this.Description=rowData.Description
      this.currentuserID=rowData._id;
      this.isEditMode = true;
      
    }
    async deleteRow(data:any){
  
       let datas = data._id;
       
                try {
       
                  await this.service.deleteprojectdetails(datas)
                  this.getData();
          
             
                } catch (error) {
                 //  console.error('Error in popupform', error);
                }
           }

           getTableColumns(): string[] {
            // Get unique column names from all objects in the response
            const columns = Array.from(new Set<string>(this.response.flatMap((raja: Record<string, unknown>) => Object.keys(raja))));
            
            // Exclude specific columns (_id and __v) and columns with all null or empty values
            const excludedColumns: string[] = ['_id', '__v'];
            const filteredColumns: string[] = columns.filter(column =>
              !excludedColumns.includes(column) &&
              this.response.some((raja: Record<string, unknown>) => raja[column] !== null && String(raja[column]).trim() !== '')
            );
          
            return filteredColumns;
          }
          
          
        
          // Other methods and logic for edit/delete
        
          hasDescriptionData(): boolean {
            return this.response.some((raja: { Description: any; }) => !!raja.Description);
          }
}
