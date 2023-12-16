import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AllService } from '../all.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { DatePipe, Location } from '@angular/common';


@Component({
  selector: 'app-projectedit',
  templateUrl: './projectedit.component.html',
  styleUrls: ['./projectedit.component.css']
})
export class ProjecteditComponent {
  ProjectId:any;
  Title:any
  Client:any;
  ProjectValue!:number;
  ResourceBudjet!:number;
  ProjectDurationFrom:any;
  ProjectDurationTo:any;
  Description:any;
  response:any;
  currentuserID:any;


  constructor(public rout:Router,public service:AllService,public http: HttpClient,private location: Location,private datePipe: DatePipe) { 


  }
  ngOnInit(): void {
      this.getData();
   };
  async submit(){
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

    getData(): void {
      this.http.get<any[]>('http://localhost:3000/api/user/Project').subscribe(
        (response) => {
          this.response=response
  
        },
        (error) => {
          console.error('Error fetching data:', error);
        }
        
      );
  
    }

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
}

