import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AllService } from '../all.service';
import { PageEvent } from '@angular/material/paginator';
type DataItem = {
  [key: string]: any; 
};
@Component({
  selector: 'app-userproject',
  templateUrl: './userproject.component.html',
  styleUrls: ['./userproject.component.css']
})
export class UserprojectComponent {
  @ViewChild('picker') picker!: MatDatepicker<Date>;
  isInputDisabled:boolean=true;
  Name:any;
  name:any;
  toggleDropdown = false;
  imageUrl!: any;
  TodayDate: any;
  Project1!:any;
  Project2:any;
  Project3:any;
  Project4:any;
  Project5:any;
  TrainingLearing:any;
  currentStudentID:any;
  currentStudentID1:any;
  activity1:any;
  activity2:any;
  activity3:any;
  activity4:any;
  activity5:any;
  activity6:any;
  isEditMode = false; 
  Learning:any;
  Projecttimefrom1!:any;
  Projecttimeto1!:any;
  Projecttimefrom2:any;
  Projecttimeto2:any;
  Projecttimefrom3:any;
  Projecttimeto3:any;
  Projecttimefrom4:any;
  Projecttimeto4:any;
  Projecttimefrom5:any;
  Projecttimeto5:any;
  TrainingLearningtimefrom:any;
  TrainingLearningtimeto:any;
  pageSize: number = 10;
  currentPage: number = 0;
  filteredData: any[] = []; 
  alldata1:any;
  filteredData1: any[] = []; 
  pagedData: any[] = [];
  Learningtime:any;
  Date!: any;
  filteredProject1: any[] = [];
  filteredProject2: any[] = [];
  filteredProject3: any[] = [];
  filteredProject4: any[] = [];
  filteredProject5: any[] = [];
  Projectvalue1!: any[] ;
  Projectvalue2!: any[] ;
  Projectvalue3!: any[] ;
  Projectvalue4!: any[] ;
  Projectvalue5!: any[] ;
  totaltimeproject1:any;
  totaltimeproject2:any;
  totaltimeproject3:any;
  totaltimeproject4:any;
  totaltimeproject5:any;
  totalTrainingLearning:any;
  totaytotaltime:any;
  clickCounter: number = 0;
  isProject1Entered: boolean = false;
  isProjectTimeFrom1Entered: boolean = false;
  isProjectTimeTo1Entered: boolean = false;
  isActivity1Enabled: boolean = false;
  isProject2Entered: boolean = false;
  isProjectTimeFrom2Entered: boolean = false;
  isProjectTimeTo2Entered: boolean = false;
  isActivity2Enabled: boolean = false;
  isProject3Entered: boolean = false;
  isProjectTimeFrom3Entered: boolean = false;
  isProjectTimeTo3Entered: boolean = false;
  isActivity3Enabled: boolean = false;
  isProject4Entered: boolean = false;
  isProjectTimeFrom4Entered: boolean = false;
  isProjectTimeTo4Entered: boolean = false;
  isActivity4Enabled: boolean = false;
  isProject5Entered: boolean = false;
  isProjectTimeFrom5Entered: boolean = false;
  isProjectTimeTo5Entered: boolean = false;
  isActivity5Enabled: boolean = false;
  isProject6Entered: boolean = false;
  isProjectTimeFrom6Entered: boolean = false;
  isProjectTimeTo6Entered: boolean = false;
  isActivity6Enabled: boolean = false;
  formattedDate:any;
  displayHeaders: string[] = ['Project1', 'totaltimeproject1', 'activity1', 'Project2', 'totaltimeproject2', 'activity2', 'Project3', 'totaltimeproject3', 'activity3', 'Project4', 'totaltimeproject4', 'activity4', 'Project5', 'totaltimeproject5', 'activity5', 'TrainingLearing', 'totalTrainingLearning', 'activity6', 'totaytotaltime'];
  @ViewChild('tableData') tableData!: ElementRef;
  @ViewChild('tableData', { static: false }) tableDataRef!: ElementRef;
  constructor(public rout:Router,private datePipe: DatePipe,public http: HttpClient,public service:AllService) { 
    const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
    this.imageUrl=image
    this.setTodayDate();}
  ngOnInit(): void {
    this.getData();
    this.getData1()
    const name:any = atob(sessionStorage.getItem(btoa('username')) || '');
    this.Name=name
    const name1 = atob(sessionStorage.getItem(btoa('username')) || '');
    this.name=name1 
    this.displayHeaders = this.uniqueProperties(this.alldata1);
  };
  project(){
    this.rout.navigateByUrl('/Userproject');
  }
  report(){
    this.rout.navigateByUrl('UserReport');
  }
  home(){
    this.rout.navigateByUrl('User');
  }
  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("username1");
    sessionStorage.clear();
    this.rout.navigateByUrl('Authendication');
  }
  checkProject1() {
    this.isProject1Entered = !!this.Project1;
  }
  checkProject2() {
    this.isProject2Entered = !!this.Project2;
  }
  checkProject3() {
    this.isProject3Entered = !!this.Project3;
  }
  checkProject4() {
    this.isProject4Entered = !!this.Project4;
  }
  checkProject5() {
    this.isProject5Entered = !!this.Project5;
  }
  checkProject6() {
    this.isProject6Entered = !!this.TrainingLearing;
  }
  uniqueProperties(data: any[]): string[] {
    const properties: string[] = [];
    data.forEach(item => {
      Object.keys(item).forEach(property => {
        if (!properties.includes(property)) {
          properties.push(property);
        }
      });
    });
     const nonEmptyProperties = properties.filter(property => {
      return this.filteredData.some(item => item[property] !== null && item[property] !== undefined && item[property] !== '');
    });
      return nonEmptyProperties;
  }  
  checkColumnVisibility(item: any, propertyName: string): boolean {
    return this.filteredData.some(row => row.hasOwnProperty(propertyName) && row[propertyName] !== null && row[propertyName] !== undefined && row[propertyName] !== '');
  }
  private setTodayDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.TodayDate = `${year}-${month}-${day}`;
  }
  selectDepartment1(groupOption: string) {
    this.Project1 = groupOption;
    this.filteredProject1 = []; 
  }
  filterDepartment1(event: any) {
    const inputValue = event.target.value;
    this.filteredProject1 = this.Projectvalue1.filter((groupOption) =>
      groupOption.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  selectDepartment2(groupOption: string) {
    this.Project2 = groupOption;
    this.filteredProject2 = []; 
  }
  filterDepartment2(event: any) {
    const inputValue = event.target.value;
    this.filteredProject2 = this.Projectvalue2.filter((groupOption) =>
      groupOption.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  selectDepartment3(groupOption: string) {
    this.Project3 = groupOption;
    this.filteredProject3 = []; 
  }
  filterDepartment3(event: any) {
    const inputValue = event.target.value;
    this.filteredProject3 = this.Projectvalue3.filter((groupOption) =>
      groupOption.toLowerCase().includes(inputValue.toLowerCase())
    );
  }  
  selectDepartment4(groupOption: string) {
    this.Project4 = groupOption;
    this.filteredProject4 = []; 
  }
  filterDepartment4(event: any) {
    const inputValue = event.target.value;
    this.filteredProject4 = this.Projectvalue4.filter((groupOption) =>
      groupOption.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  selectDepartment5(groupOption: string) {
    this.Project5 = groupOption;
    this.filteredProject5 = [];  
  }
  filterDepartment5(event: any) {
    const inputValue = event.target.value;
    this.filteredProject5 = this.Projectvalue5.filter((groupOption) =>
      groupOption.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  onDateChanged(event: MatDatepickerInputEvent<Date>) {
    if (event.value) {
      const formattedDate = this.formatTodayDate(event.value);
      this.TodayDate = formattedDate;
    }
  } 
  openPicker() {
    this.picker.open();
  } 
  formatTodayDate(date: Date): string {
    const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
    return formattedDate || '';
  }
  async submit(){
    if (this.Projecttimefrom1 && this.Projecttimeto1) {
      this.calculateTimeDifference1();
    }
    if (this.Projecttimefrom2 && this.Projecttimeto2) {
      this.calculateTimeDifference2();
    }
    if (this.Projecttimefrom3 && this.Projecttimeto3) {
      this.calculateTimeDifference3();
    }
    if (this.Projecttimefrom4 && this.Projecttimeto4) {
      this.calculateTimeDifference4();
    }
    if (this.Projecttimefrom5 && this.Projecttimeto5) {
      this.calculateTimeDifference5();
    }
    if (this.TrainingLearningtimefrom && this.TrainingLearningtimeto) {
      this.calculateTimeDifference6();
    }
    const durations = [
      this.totaltimeproject1,
      this.totaltimeproject2,
      this.totaltimeproject3,
      this.totaltimeproject4,
      this.totaltimeproject5,
      this.totalTrainingLearning
    ];
    const validDurations = durations.filter(duration => !!duration);
    if (validDurations.length > 0) {
      const totalTime = this.calculateTotalTime(validDurations);
      this.totaytotaltime=totalTime
    }
    let formdata={
      "Name":this.Name,
      "Projecttimefrom1":this.Projecttimefrom1,
      "Projecttimeto1":this.Projecttimeto1,
      "Projecttimefrom2":this.Projecttimefrom2,
      "Projecttimeto2":this.Projecttimeto2 ,
      "Projecttimefrom3":this.Projecttimefrom3 ,
      "Projecttimeto3":this.Projecttimeto3 ,
      "Projecttimefrom4":this.Projecttimefrom4 ,
      "Projecttimeto4":this.Projecttimeto4 ,
      "Projecttimefrom5":this.Projecttimefrom5,
      "Projecttimeto5":this.Projecttimeto5 ,
      "TrainingLearing":this.TrainingLearing,
      "TrainingLearningtimefrom":this.TrainingLearningtimefrom ,
      "TrainingLearningtimeto":this.TrainingLearningtimeto ,
      "Project1":this.Project1,
      "Project2":this.Project2,
      "Project3":this.Project3,
      "Project4":this.Project4,
      "Project5":this.Project5,
      "activity1":this.activity1,
      "activity2":this.activity2,
      "activity3":this.activity3,
      "activity4":this.activity4,
      "activity5":this.activity5,
      "activity6":this.activity6,
      "TodayDate":this.TodayDate,
      "totaltimeproject1":this.totaltimeproject1,
      "totaltimeproject2":this.totaltimeproject2,
      "totaltimeproject3":this.totaltimeproject3,
      "totaltimeproject4":this.totaltimeproject4,
      "totaltimeproject5":this.totaltimeproject5,
      "totalTrainingLearning":this.totalTrainingLearning,
      "totaytotaltime":this.totaytotaltime
     }
     await this.service.userprojects(formdata);
  }
  // calculateTotalTime(durations: string[]): string {
  //   let totalHours = 0;
  //   let totalMinutes = 0;
  //   durations.forEach(duration => {
  //     const [hoursStr, minutesStr] = duration
  //       .replace('hours', '')
  //       .replace('hour', '')
  //       .replace('minutes', '')
  //       .replace('minute', '')
  //       .trim()
  //       .split(' ');
  //     totalHours += parseInt(hoursStr, 10) || 0;
  //     totalMinutes += parseInt(minutesStr, 10) || 0;
  //   });
  //   totalHours += Math.floor(totalMinutes / 60);
  //   totalMinutes %= 60;
  //   return `${totalHours} hours ${totalMinutes} minutes`;
  // }
  // calculateTotalTime(durations: string[]): string {
  //   let totalMinutes = 0;
  
  //   durations.forEach(duration => {
  //     const [, hoursStr, minutesStr] = duration.match(/(\d+)\s*hours?\s*(\d*)\s*minutes?/) || [];
  //     const hours = parseInt(hoursStr, 10) || 0;
  //     const minutes = parseInt(minutesStr, 10) || 0;
  
  //     totalMinutes += hours * 60 + minutes;
  //   });
  
  //   const totalHours = Math.floor(totalMinutes / 60);
  //   const remainingMinutes = totalMinutes % 60;
  
  //   // Formatting with leading zeros
  //   const formattedHours = totalHours < 10 ? `0${totalHours}` : `${totalHours}`;
  //   const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  
  //   return `${formattedHours} hours ${formattedMinutes} minutes`;
  // }


  calculateTotalTime(durations: string[]): string {
    let totalMinutes = 0;
  
    durations.forEach(duration => {
      const parts = duration.split(/\s+/);
  
      for (let i = 0; i < parts.length; i += 2) {
        const value = parseInt(parts[i], 10) || 0;
        const unit = parts[i + 1]?.toLowerCase();
  
        if (unit === 'hour' || unit === 'hours') {
          totalMinutes += value * 60;
        } else if (unit === 'minute' || unit === 'minutes') {
          totalMinutes += value;
        }
      }
    });
  
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
  
    // Formatting with leading zeros
    const formattedHours = totalHours < 10 ? `0${totalHours}` : `${totalHours}`;
    const formattedMinutes = remainingMinutes < 10 ? `0${remainingMinutes}` : `${remainingMinutes}`;
  
    return `${formattedHours} hours ${formattedMinutes} minutes`;
  }
  
  
  
  
  
  
  
  
  
  
  // calculateTimeDifference1(): string {
  //   const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom1);
  //   const toDate = this.convertTimeStringToDate1(this.Projecttimeto1);
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     return 'Invalid date format';
  //   }
  //     // Calculate the difference in milliseconds
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  //     // Calculate hours and minutes
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //   const result = `${hours} hours ${minutes} minutes`;
  //   this.totaltimeproject1=result
  //   return result;
  // }
  //   calculateTimeDifference2(): string {
  //   const fromDate = this.convertTimeStringToDate2(this.Projecttimefrom2);
  //   const toDate = this.convertTimeStringToDate2(this.Projecttimeto2);
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     console.error('Invalid date format');
  //     return 'Invalid date format';
  //   }
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //   const result = `${hours} hours ${minutes} minutes`;
  //   this.totaltimeproject2=result
  //   return result;
  // }
  //   calculateTimeDifference3(): string {
  //   const fromDate = this.convertTimeStringToDate3(this.Projecttimefrom3);
  //   const toDate = this.convertTimeStringToDate3(this.Projecttimeto3);
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     console.error('Invalid date format');
  //     return 'Invalid date format';
  //   }
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //     const result = `${hours} hours ${minutes} minutes`;
  //   this.totaltimeproject3=result
  //   return result;
  // }
  //   calculateTimeDifference4(): string {
  //   const fromDate = this.convertTimeStringToDate4(this.Projecttimefrom4);
  //   const toDate = this.convertTimeStringToDate4(this.Projecttimeto4);
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     console.error('Invalid date format');
  //     return 'Invalid date format';
  //   }
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //   const result = `${hours} hours ${minutes} minutes`;
  //   this.totaltimeproject4=result
  //   return result;
  // }
  //   calculateTimeDifference5(): string {
  //   const fromDate = this.convertTimeStringToDate5(this.Projecttimefrom5);
  //   const toDate = this.convertTimeStringToDate5(this.Projecttimeto5);
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     console.error('Invalid date format');
  //     return 'Invalid date format';
  //   }
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //   const result = `${hours} hours ${minutes} minutes`;
  //   this.totaltimeproject5=result
  //   return result;
  // }
  //   calculateTimeDifference6(): string {
  //   const fromDate = this.convertTimeStringToDate6(this.TrainingLearningtimefrom);
  //   const toDate = this.convertTimeStringToDate6(this.TrainingLearningtimeto);
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     console.error('Invalid date format');
  //     return 'Invalid date format';
  //   }
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  //   const result = `${hours} hours ${minutes} minutes`;
  //   this.totalTrainingLearning=result
  //   return result;
  // }
  calculateTimeDifference1(): string {
    const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom1);
    const toDate = this.convertTimeStringToDate1(this.Projecttimeto1);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 'Invalid date format';
    }
  
    // Calculate the difference in milliseconds
    const timeDiff = toDate.getTime() - fromDate.getTime();
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the result
    let result = `${hours} hours`;
    if (minutes > 0) {
      result += ` ${minutes} minutes`;
    }
  
    this.totaltimeproject1 = result;
    return result;
  }
//   calculateTimeDifference1(): any {
//     const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom1);
//     const toDate = this.convertTimeStringToDate1(this.Projecttimeto1);
  
//     if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
//       alert('Invalid time values');
//       return 'Invalid date format';
     
//     }
  
//     // // Calculate the difference in milliseconds
//     // const timeDiff = toDate.getTime() - fromDate.getTime();
  
//     // // Calculate hours and minutes
//     // const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     // const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
//     // // Format the result
//     // let result = `${hours} hours`;
//     // if (minutes > 0) {
//     //   result += ` ${minutes} minutes`;
//     // }
  
//     // this.totaltimeproject1 = result;
//     // return result;

//     // Assuming you have time strings like "9:00 AM" and "12:00 PM"
// const fromTime:any = new Date(`2000-01-01T${this.Projecttimefrom1}Z`);
// const toTime:any = new Date(`2000-01-01T${this.Projecttimeto1}Z`);

// const timeDifferenceInMilliseconds:any = toTime - fromTime;
// const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
// const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

// const formattedTime = `${hours} hours ${minutes} minutes`;

// this.totaltimeproject1 = formattedTime;

//   }
  // calculateTimeDifference2(): string {
  //   const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom2);
  //   const toDate = this.convertTimeStringToDate1(this.Projecttimeto2);
  
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     return 'Invalid date format';
  //   }
  
  //   // Calculate the difference in milliseconds
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  
  //   // Calculate hours and minutes
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  //   // Format the result
  //   let result = `${hours} hours`;
  //   if (minutes > 0) {
  //     result += ` ${minutes} minutes`;
  //   }
  
  //   this.totaltimeproject2 = result;
  //   return result;
  // }
  calculateTimeDifference2():any{
    const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom2);
    const toDate = this.convertTimeStringToDate1(this.Projecttimeto2);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 'Invalid date format';
    }
  
    // Calculate the difference in milliseconds
    const timeDiff = toDate.getTime() - fromDate.getTime();
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the result
    let result = `${hours} hours`;
    if (minutes > 0) {
      result += ` ${minutes} minutes`;
    }
  
    this.totaltimeproject2 = result;
    return result;

// Assuming you have time strings like "9:00 AM" and "12:00 PM"
// const fromTime:any = new Date(`2000-01-01T${this.Projecttimefrom2}Z`);
// const toTime:any = new Date(`2000-01-01T${this.Projecttimeto2}Z`);

// const timeDifferenceInMilliseconds:any = toTime - fromTime;
// const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
// const minutes = Math.floor((timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

// const formattedTime = `${hours} hours ${minutes} minutes`;

// this.totaltimeproject2 = formattedTime;


  }
  // calculateTimeDifference3(): string {
  //   const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom3);
  //   const toDate = this.convertTimeStringToDate1(this.Projecttimeto3);
  
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     return 'Invalid date format';
  //   }
  
  //   // Calculate the difference in milliseconds
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  
  //   // Calculate hours and minutes
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  //   // Format the result
  //   let result = `${hours} hours`;
  //   if (minutes > 0) {
  //     result += ` ${minutes} minutes`;
  //   }
  
  //   this.totaltimeproject3 = result;
  //   return result;
  // }
  calculateTimeDifference3(): string {
    const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom3);
    const toDate = this.convertTimeStringToDate1(this.Projecttimeto3);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 'Invalid date format';
    }
  
    // Calculate the difference in milliseconds
    const timeDiff = toDate.getTime() - fromDate.getTime();
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the result
    let result = `${hours} hours`;
    if (minutes > 0) {
      result += ` ${minutes} minutes`;
    }
  
    this.totaltimeproject3 = result;
    return result;
  }
  // calculateTimeDifference4(): string {
  //   const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom4);
  //   const toDate = this.convertTimeStringToDate1(this.Projecttimeto4);
  
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     return 'Invalid date format';
  //   }
  
  //   // Calculate the difference in milliseconds
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  
  //   // Calculate hours and minutes
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  //   // Format the result
  //   let result = `${hours} hours`;
  //   if (minutes > 0) {
  //     result += ` ${minutes} minutes`;
  //   }
  
  //   this.totaltimeproject4 = result;
  //   return result;
  // }
  calculateTimeDifference4(): string {
    const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom4);
    const toDate = this.convertTimeStringToDate1(this.Projecttimeto4);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 'Invalid date format';
    }
  
    // Calculate the difference in milliseconds
    const timeDiff = toDate.getTime() - fromDate.getTime();
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the result
    let result = `${hours} hours`;
    if (minutes > 0) {
      result += ` ${minutes} minutes`;
    }
  
    this.totaltimeproject4 = result;
    return result;
  }
  // calculateTimeDifference5(): string {
  //   const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom5);
  //   const toDate = this.convertTimeStringToDate1(this.Projecttimeto5);
  
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     return 'Invalid date format';
  //   }
  
  //   // Calculate the difference in milliseconds
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  
  //   // Calculate hours and minutes
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  //   // Format the result
  //   let result = `${hours} hours`;
  //   if (minutes > 0) {
  //     result += ` ${minutes} minutes`;
  //   }
  
  //   this.totaltimeproject5 = result;
  //   return result;
  // }
  calculateTimeDifference5(): string {
    const fromDate = this.convertTimeStringToDate1(this.Projecttimefrom5);
    const toDate = this.convertTimeStringToDate1(this.Projecttimeto5);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 'Invalid date format';
    }
  
    // Calculate the difference in milliseconds
    const timeDiff = toDate.getTime() - fromDate.getTime();
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the result
    let result = `${hours} hours`;
    if (minutes > 0) {
      result += ` ${minutes} minutes`;
    }
  
    this.totaltimeproject5 = result;
    return result;
  }
  // calculateTimeDifference6(): string {
  //   const fromDate = this.convertTimeStringToDate1(this.TrainingLearningtimefrom);
  //   const toDate = this.convertTimeStringToDate1(this.TrainingLearningtimeto);
  
  //   if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
  //     return 'Invalid date format';
  //   }
  
  //   // Calculate the difference in milliseconds
  //   const timeDiff = toDate.getTime() - fromDate.getTime();
  
  //   // Calculate hours and minutes
  //   const hours = Math.floor(timeDiff / (1000 * 60 * 60));
  //   const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
  //   // Format the result
  //   let result = `${hours} hours`;
  //   if (minutes > 0) {
  //     result += ` ${minutes} minutes`;
  //   }
  
  //   this.totalTrainingLearning = result;
  //   return result;
  // }
  calculateTimeDifference6(): string {
    const fromDate = this.convertTimeStringToDate1(this.TrainingLearningtimefrom);
    const toDate = this.convertTimeStringToDate1(this.TrainingLearningtimeto);
  
    if (isNaN(fromDate.getTime()) || isNaN(toDate.getTime())) {
      return 'Invalid date format';
    }
  
    // Calculate the difference in milliseconds
    const timeDiff = toDate.getTime() - fromDate.getTime();
  
    // Calculate hours and minutes
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  
    // Format the result
    let result = `${hours} hours`;
    if (minutes > 0) {
      result += ` ${minutes} minutes`;
    }
  
    this.totalTrainingLearning = result;
    return result;
  }

  convertTimeStringToDate1(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    if (period === 'PM' && hours < 12) {
      date.setHours(hours + 12);
    }
    date.setMinutes(minutes);
    return date;
  }
  convertTimeStringToDate2(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    if (period === 'PM' && hours < 12) {
      date.setHours(hours + 12);
    }
    date.setMinutes(minutes);
    return date;
  }
  convertTimeStringToDate3(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    if (period === 'PM' && hours < 12) {
      date.setHours(hours + 12);
    }
    date.setMinutes(minutes);
    return date;
  }
  convertTimeStringToDate4(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    if (period === 'PM' && hours < 12) {
      date.setHours(hours + 12);
    }
    date.setMinutes(minutes);
    return date;
  }
  convertTimeStringToDate5(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    if (period === 'PM' && hours < 12) {
      date.setHours(hours + 12);
    }
      date.setMinutes(minutes);
      return date;
  }
  convertTimeStringToDate6(timeString: string): Date {
    const [time, period] = timeString.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    let date = new Date();
    date.setHours(hours);
    if (period === 'PM' && hours < 12) {
      date.setHours(hours + 12);
    }
    date.setMinutes(minutes);
    return date;
  }
  getData(): void {
    this.http.get<any[]>('http://localhost:3000/api/user/Project').subscribe(
      (response) => {
     const titles = response.map((item) => item.Title);
this.Projectvalue1=titles
this.Projectvalue2=titles
this.Projectvalue3=titles
this.Projectvalue4=titles
this.Projectvalue5=titles
this.currentStudentID=titles},
      (error) => {
        console.error('Error fetching data:', error);
      });}
  private parseTimeStringToDate(timeString: string): Date | null {
    // Match hours, minutes, and meridiem (am/pm) in a case-insensitive way
    const match = timeString.match(/(\d+):(\d+)\s*([aApP][mM])?/);
      if (!match) {
      return null;
    }
    const [, hours, minutes, meridiem] = match;
    const isPM = /pm/i.test(meridiem);
    // Adjust hours for PM if needed
    const adjustedHours = isPM && hours !== '12' ? parseInt(hours, 10) + 12 : parseInt(hours, 10);
    const date = new Date();
    date.setHours(adjustedHours, parseInt(minutes, 10) || 0, 0, 0);
    return date;
  }
  checkTimeEquality1() {
    this.isProjectTimeFrom1Entered = !!this.Projecttimefrom1;
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom1);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto1);
    if (from1 === null || to1 === null) {
      return;
    }
    if (to1 <= from1) {
      alert('Invalid time range! "To" time should be later than "From" time.');
      this.Projecttimeto1 = '';
    }
    if (this.isProject1Entered && this.isProjectTimeFrom1Entered && this.isProjectTimeTo1Entered) {
      this.isActivity1Enabled = true;
    } else {
      this.isActivity1Enabled = false;
    }
    this.checkActivity1Enabled() 
    }
  checkActivity1Enabled() {
    this.isActivity1Enabled = !!this.Project1 && !!this.Projecttimefrom1 && !!this.Projecttimeto1;
  }
  checkActivity2Enabled() {
    this.isActivity2Enabled = !!this.Project2 && !!this.Projecttimefrom2 && !!this.Projecttimeto2;
  }
  checkActivity3Enabled() {
    this.isActivity3Enabled = !!this.Project3 && !!this.Projecttimefrom3 && !!this.Projecttimeto3;
  }  
  checkActivity4Enabled() {
    this.isActivity4Enabled = !!this.Project4 && !!this.Projecttimefrom4 && !!this.Projecttimeto4;
  }
  checkActivity5Enabled() {
    this.isActivity5Enabled = !!this.Project5 && !!this.Projecttimefrom5 && !!this.Projecttimeto5;
  }
  checkActivity6Enabled() {
    this.isActivity6Enabled = !!this.TrainingLearing && !!this.TrainingLearningtimefrom && !!this.TrainingLearningtimeto;
  }
  checkTimeEquality2() {
    this.isProjectTimeFrom2Entered = !!this.Projecttimefrom2;
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom2);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto2);
    if (from1 === null || to1 === null) {
      return;
    }
      if (to1 <= from1) {
      alert('Invalid time range! "To" time should be later than "From" time.');
      this.Projecttimeto2 = '';
    }
    this.checkActivity2Enabled() 
  }
  checkTimeEquality3() {
    this.isProjectTimeFrom3Entered = !!this.Projecttimefrom3;
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom3);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto3);
    if (from1 === null || to1 === null) {
      return;
    }
      if (to1 <= from1) {
      alert('Invalid time range! "To" time should be later than "From" time.');
      this.Projecttimeto3 = '';
    }
    this.checkActivity3Enabled() 
  }
  checkTimeEquality4() {
    this.isProjectTimeFrom4Entered = !!this.Projecttimefrom4;
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom4);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto4);
    if (from1 === null || to1 === null) {
      return;
    }
    if (to1 <= from1) {
      alert('Invalid time range! "To" time should be later than "From" time.');
      this.Projecttimeto4 = '';
    }
    this.checkActivity4Enabled() 
  }
  checkTimeEquality5() {
    this.isProjectTimeFrom5Entered = !!this.Projecttimefrom5;
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom5);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto5);
    if (from1 === null || to1 === null) {
      return;
    }
      if (to1 <= from1) {
      alert('Invalid time range! "To" time should be later than "From" time.');
      this.Projecttimeto5 = '';
    }
    this.checkActivity5Enabled() 
  }
  checkTimeEquality6() {
    this.isProjectTimeFrom6Entered = !!this.TrainingLearningtimefrom;
    const from1 = this.parseTimeStringToDate(this.TrainingLearningtimefrom);
    const to1 = this.parseTimeStringToDate(this.TrainingLearningtimeto);
    if (from1 === null || to1 === null) {
      return;
    }
      if (to1 <= from1) {
      alert('Invalid time range! "To" time should be later than "From" time.');
      this.TrainingLearningtimeto = '';
    }
    this.checkActivity6Enabled() 
  }
  checkTimeOverlap() {
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom1);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto1);
    const from2 = this.parseTimeStringToDate(this.Projecttimefrom2);
    if (from1 === null || to1 === null || from2 === null) {
      return;
    }
      if (from2 < to1) {
      alert('Overlap detected! Please choose a different start time for Project - 2.');
      this.Projecttimefrom2 = '';
    }
  }
  checkTimeOverlapForProject3() {
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom2);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto2);
    const from2 = this.parseTimeStringToDate(this.Projecttimefrom3);
      if (from1 === null || to1 === null || from2 === null) {
      return;
    }
    if (from2 < to1) {
      alert('Overlap detected! Please choose a different start time for Project - 3.');
      this.Projecttimefrom3 = '';
    }
  }
  checkTimeOverlapForProject4() {
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom3);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto3);
    const from2 = this.parseTimeStringToDate(this.Projecttimefrom4); 
    if (from1 === null || to1 === null || from2 === null) {
      return;
    }
    if (from2 < to1) {
      alert('Overlap detected! Please choose a different start time for Project - 4.');
      this.Projecttimefrom4 = '';
    }
  }
  checkTimeOverlapForProject5() {
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom4);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto4);
    const from2 = this.parseTimeStringToDate(this.Projecttimefrom5);
      if (from1 === null || to1 === null || from2 === null) {
      return;
    }
    if (from2 < to1) {
      alert('Overlap detected! Please choose a different start time for Project - 5.');
      this.Projecttimefrom5 = '';
    }
  }
  checkTimeOverlapForProject6() {
    const from1 = this.parseTimeStringToDate(this.Projecttimefrom5);
    const to1 = this.parseTimeStringToDate(this.Projecttimeto5);
    const from2 = this.parseTimeStringToDate(this.TrainingLearningtimefrom);
      if (from1 === null || to1 === null || from2 === null) {
      console.error('Invalid time format');
      return;
    }
    if (from2 < to1) {
      alert('Overlap detected! Please choose a different start time for Project - 6.');
      this.TrainingLearningtimefrom= '';
    }
  }
  getData1(): void {
    this.http.get<any[]>('http://localhost:3000/api/user/UserProject').subscribe(
      (response) => {
     this.alldata1 = response.filter(item => item.Name === this.Name);
     this.filterData1();},
      (error) => {
        console.error('Error fetching data:', error);
      });}
  filterData1(): void {
    this.pagedData = this.alldata1; 
  }
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
  filterData() {
    this.filteredData1 = this.alldata1.filter((item: any) => {
      return true;
    });
  }
  hasData(column: string): boolean {
    return this.pagedData.some(item => {
      const value = item[column];
      return value !== undefined && value !== null && value !== '';
    });
  }
  editRow(rowData: any) {
    this.isEditMode = true;
    if (this.Projecttimefrom1 && this.Projecttimeto1) {
      this.calculateTimeDifference1();
    }
    if (this.Projecttimefrom2 && this.Projecttimeto2) {
      this.calculateTimeDifference2();
    }
    if (this.Projecttimefrom3 && this.Projecttimeto3) {
      this.calculateTimeDifference3();
    }
    if (this.Projecttimefrom4 && this.Projecttimeto4) {
      this.calculateTimeDifference4();
    }
    if (this.Projecttimefrom5 && this.Projecttimeto5) {
      this.calculateTimeDifference5();
    }
    if (this.TrainingLearningtimefrom && this.TrainingLearningtimeto) {
      this.calculateTimeDifference6();
    }
    const durations = [
      this.totaltimeproject1,
      this.totaltimeproject2,
      this.totaltimeproject3,
      this.totaltimeproject4,
      this.totaltimeproject5,
      this.totalTrainingLearning
    ];
    const validDurations = durations.filter(duration => !!duration);
    if (validDurations.length > 0) {
      const totalTime = this.calculateTotalTime(validDurations);
      this.totaytotaltime=totalTime
    }
    this.currentStudentID1=rowData._id;
    this.Name=rowData.Name
    this.TodayDate=rowData.TodayDate
    this.Project1=rowData.Project1
    this.Projecttimefrom1=rowData.Projecttimefrom1
    this.Projecttimeto1=rowData.Projecttimeto1
    this.activity1=rowData.activity1
    this.Project2=rowData.Project2
    this.Projecttimefrom2=rowData.Projecttimefrom2
    this.Projecttimeto2=rowData.Projecttimeto2
    this.activity2=rowData.activity2
    this.Project3=rowData.Project3
    this.Projecttimefrom3=rowData.Projecttimefrom3
    this.Projecttimeto3=rowData.Projecttimeto3
    this.activity3=rowData.activity3
    this.Project4=rowData.Project4
    this.Projecttimefrom4=rowData.Projecttimefrom4
    this.Projecttimeto4=rowData.Projecttimeto4
    this.activity4=rowData.activity4
    this.Project5=rowData.Project5
    this.Projecttimefrom5=rowData.Projecttimefrom5
    this.Projecttimeto5=rowData.Projecttimeto5
    this.activity5=rowData.activity5
    this.TrainingLearing=rowData.TrainingLearing
    this.TrainingLearningtimefrom=rowData.TrainingLearningtimefrom
    this.TrainingLearningtimeto=rowData.TrainingLearningtimeto
    this.activity6=rowData.activity6
    this.totaytotaltime=rowData.this.totaytotaltime
    this.isEditMode = true;
  }
  async deleteRow(data:any){
     let datas = data._id;
    try {
        await this.service.deleteuserdetails1(datas)
        this.getData1();
        } catch (error) {}
    }
    async editform() {
          if (this.Projecttimefrom1 && this.Projecttimeto1) {
            this.calculateTimeDifference1();
          }
          if (this.Projecttimefrom2 && this.Projecttimeto2) {
            this.calculateTimeDifference2();
          }
          if (this.Projecttimefrom3 && this.Projecttimeto3) {
            this.calculateTimeDifference3();
          }
          if (this.Projecttimefrom4 && this.Projecttimeto4) {
            this.calculateTimeDifference4();
          }
          if (this.Projecttimefrom5 && this.Projecttimeto5) {
            this.calculateTimeDifference5();
          }
          if (this.TrainingLearningtimefrom && this.TrainingLearningtimeto) {
            this.calculateTimeDifference6();
          }
          const durations = [
            this.totaltimeproject1,
            this.totaltimeproject2,
            this.totaltimeproject3,
            this.totaltimeproject4,
            this.totaltimeproject5,
            this.totalTrainingLearning
          ];
         let totaytotaltime = await this.totaytotaltime
          const validDurations = durations.filter(duration => !!duration);
          if (validDurations.length > 0) {
            const totalTime1 = this.calculateTotalTime(validDurations);
           const totaytotaltime =  await totalTime1 
           let formdata={
            "Name":this.Name,
            "Projecttimefrom1":this.Projecttimefrom1,
            "Projecttimeto1":this.Projecttimeto1,
            "Projecttimefrom2":this.Projecttimefrom2,
            "Projecttimeto2":this.Projecttimeto2 ,
            "Projecttimefrom3":this.Projecttimefrom3 ,
            "Projecttimeto3":this.Projecttimeto3 ,
            "Projecttimefrom4":this.Projecttimefrom4 ,
            "Projecttimeto4":this.Projecttimeto4 ,
            "Projecttimefrom5":this.Projecttimefrom5,
            "Projecttimeto5":this.Projecttimeto5 ,
            "TrainingLearing":this.TrainingLearing,
            "TrainingLearningtimefrom":this.TrainingLearningtimefrom ,
            "TrainingLearningtimeto":this.TrainingLearningtimeto ,
            "Project1":this.Project1,
            "Project2":this.Project2,
            "Project3":this.Project3,
            "Project4":this.Project4,
            "Project5":this.Project5,
            "activity1":this.activity1,
            "activity2":this.activity2,
            "activity3":this.activity3,
            "activity4":this.activity4,
            "activity5":this.activity5,
            "activity6":this.activity6,
            "TodayDate":this.TodayDate,
            "totaltimeproject1":this.totaltimeproject1,
            "totaltimeproject2":this.totaltimeproject2,
            "totaltimeproject3":this.totaltimeproject3,
            "totaltimeproject4":this.totaltimeproject4,
            "totaltimeproject5":this.totaltimeproject5,
            "totalTrainingLearning":this.totalTrainingLearning,
            "totaytotaltime":totaytotaltime}
        try {
           await this.service.updatewuserdetails1(this.currentStudentID1, formdata);
           this.getData1()
           location.reload();
          this.isEditMode = false;
        } catch (error) {
          console.error('Error in popupform', error);
        }
}
}
}