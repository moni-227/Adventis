import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AllService } from '../all.service';
import { DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import 'pdfmake/build/vfs_fonts';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
type DataItem = {
  [key: string]: any; 
};
@Component({
  selector: 'app-userreport',
  templateUrl: './userreport.component.html',
  styleUrls: ['./userreport.component.css']
})
export class UserreportComponent {
  isDisabled: boolean = true;
  Name:any;
  placeholderText:any;
  public alldata:any;
  name:any;
  toggleDropdown = false;
  imageUrl!: any;
  selectedUsername: any = '';
  selectedProject1: any = '';
  selectedProject2: any = '';
  selectedProject3: any = '';
  selectedProject4: any = '';
  selectedProject5: any = ''; 
  selectedProject6: any = '';
  dateFrom: any= '';
  dateTo: any = '';
  pageSize: number = 10;
  currentPage: number = 0;
  dataSource!: MatTableDataSource<any>;
  displayHeaders: string[] = [
    'Project1', 'totaltimeproject1', 'activity1',
    'Project2', 'totaltimeproject2', 'activity2',
    'Project3', 'totaltimeproject3', 'activity3',
    'Project4', 'totaltimeproject4', 'activity4',
    'Project5', 'totaltimeproject5', 'activity5',
    'TrainingLearing', 'totalTrainingLearning', 'activity6', 'totaytotaltime'
  ];
  filteredData: any[] = []; 
  @ViewChild('tableData') tableData!: ElementRef;
  @ViewChild('tableData', { static: false }) tableDataRef!: ElementRef;

  constructor(public rout:Router,public http: HttpClient,public service:AllService, private datePipe: DatePipe) { 
    const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
    this.imageUrl=image
  }
  ngOnInit(): void {
    this.getData();
    const name:any = atob(sessionStorage.getItem(btoa('username')) || '');
    this.selectedUsername=name
    this.placeholderText=this.Name

    
    console.log('Before uniqueProperties:', this.alldata);

    if (this.alldata && this.alldata.length > 0) {
      this.displayHeaders = this.uniqueProperties(this.alldata);
    }
    
    console.log('After uniqueProperties:', this.alldata);
    

    
  }
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
  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }
  get pagedData(): any[] {
    const startIndex = this.currentPage * this.pageSize;
    return this.filteredData.slice(startIndex, startIndex + this.pageSize);
  }
  getData(): void {
    this.http.get<any[]>('http://localhost:3000/api/user/UserProject').subscribe(
      (response) => {
     this.alldata= response.filter(item => item.Name === this.selectedUsername);
    this.filterData()},
      (error) => {
        console.error('Error fetching data:', error);
      });
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
  filterData() {
    this.getData();
    this.filteredData = this.alldata.filter((item: any) => {
      if (this.selectedUsername && item.Name !== this.selectedUsername) {
        return false;
      }
        if (this.selectedProject1 &&
        (item.Project1 !== this.selectedProject1 &&
          item.Project2 !== this.selectedProject1 &&
          item.Project3 !== this.selectedProject1 &&
          item.Project4 !== this.selectedProject1 &&
          item.Project5 !== this.selectedProject1 &&
          item.TrainingLearing !== this.selectedProject1
        )) {
        return false;
      }
        if (this.dateFrom && this.dateTo) {
        const fromDate = new Date(this.dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        const toDate = new Date(this.dateTo);
        toDate.setHours(23, 59, 59, 999);
          const dateParts = item.TodayDate.split('-');
        const itemDate = dateParts.length === 3
          ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]) 
          : null;
        if (itemDate && itemDate >= fromDate && itemDate <= toDate) {
          return true;
        } else {
          return false;
        }
      }
      if (this.dateFrom) {
        const fromDate = new Date(this.dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        const dateParts = item.TodayDate.split('-');
        const itemDate = dateParts.length === 3
          ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]) 
          : null;
  
        if (itemDate && itemDate.toDateString() === fromDate.toDateString()) {
          return true;
        } else {
          return false;
        }
      }
        if (this.dateTo) {
        const toDate = new Date(this.dateTo);
        toDate.setHours(23, 59, 59, 999);
        const dateParts = item.TodayDate.split('-');
        const itemDate = dateParts.length === 3
          ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2])
          : null;
  
        if (itemDate && itemDate.toDateString() === toDate.toDateString()) {
          return true;
        } else {
          return false;
        }
      }
        return true;
    });
  }
  hasData(column: string): boolean {
    return this.pagedData.some(item => {
      const value = item[column];
      return value !== undefined && value !== null && value !== '';
    });
  }
  isToday(date: Date | null): boolean {
    if (!date) {
      return false;
    }
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  }
  parseDate(dateString: string | null): Date | null {
    if (dateString) {
      const dateParts = dateString.split('-');
      if (dateParts.length === 3) {
        const year = parseInt(dateParts[2], 10);
        const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
        const day = parseInt(dateParts[0], 10);
        const parsedDate = new Date(year, month, day);
        if (!isNaN(parsedDate.getTime())) {
          return parsedDate;
        }
      }
    }
    return null;
  }
  transformDate(date: string | null): string {
    if (date) {
      return this.datePipe.transform(date, 'dd-MM-yyyy') || '';
    }
    return '';
  }
  convertDateFormat(date: string): string {
    if (date) {
      const parts = date.split('-');
      if (parts.length === 3) {
        return parts[2] + '-' + parts[1] + '-' + parts[0];
      }
    }
    return '';
  }
  dateInRange(date: string) {
    if (!this.dateFrom && !this.dateTo) {
      return true; 
    }
    if (this.dateFrom && this.dateTo) {
      const fromDate = new Date(this.dateFrom);
      const toDate = new Date(this.dateTo);
      const itemDate = new Date(date);
      return itemDate >= fromDate && itemDate <= toDate;
    }
    if (this.dateFrom) {
      const fromDate = new Date(this.dateFrom);
      const itemDate = new Date(date);
      return itemDate >= fromDate;
    }
    if (this.dateTo) {
      const toDate = new Date(this.dateTo);
      const itemDate = new Date(date);
      return itemDate <= toDate;
    }
    return false;
  }
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableDataRef.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'report.xlsx');
  }
  exportToPDF() {
    html2canvas(this.tableData.nativeElement).then((canvas:any) => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF.jsPDF();
      const imgProps = doc.getImageProperties(imgData);
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      doc.save('table.pdf');
    });
  }
// ... (existing code)

formatHeader(header: string): string {
  // Customize the formatting of the header as needed
  switch (header) {
    case 'Project1':
      return 'Project - 1';
    case 'Project2':
      return 'Project - 2';
      case 'Project3':
        return 'Project - 3';
        case 'Project4':
          return 'Project - 4';
          case 'Project5':
            return 'Project - 5';
            case 'TrainingLearing':
              return 'Training & Learing';
              case 'totaltimeproject1':
                return 'Time';
                case 'totaltimeproject2':
                  return 'Time';
                  case 'totaltimeproject3':
                    return 'Time';
                    case 'totaltimeproject4':
                      return 'Time';
                      case 'totaltimeproject5':
                        return 'Time';
                        case 'totalTrainingLearning':
                          return 'Time';
                          case 'activity1':
                            return 'Activity';
                            case 'activity2':
                              return 'Activity';
                              case 'activity3':
                                return 'Activity';
                                case 'activity4':
                                  return 'Activity';
                                  case 'activity5':
                                    return 'Activity';
                                    case 'activity6':
                                      return 'Activity';
                                      case 'totaytotaltime':
                                        return 'Activity';
    default:
      return header.toUpperCase();
  }
}

// formatCell(value: any, header: string): any {
//   // Customize the formatting of the cell based on the header as needed
//   switch (header) {
//     case 'Project1':
//     case 'Project2':
//       return value.toUpperCase();
//     case 'totaltimeproject1':
//     case 'totaltimeproject2':
//       // Format time differently, e.g., convert seconds to hours:minutes:seconds
//       const seconds = parseInt(value, 10);
//       const hours = Math.floor(seconds / 3600);
//       const minutes = Math.floor((seconds % 3600) / 60);
//       const remainingSeconds = seconds % 60;
//       return `${hours}:${minutes}:${remainingSeconds}`;
//     // Add more cases for other headers as needed
//     default:
//       return value;
//   }
// }

}
// 'Project1', 'totaltimeproject1', 'activity1',
// 'Project2', 'totaltimeproject2', 'activity2',
// 'Project3', 'totaltimeproject3', 'activity3',
// 'Project4', 'totaltimeproject4', 'activity4',
// 'Project5', 'totaltimeproject5', 'activity5',
// 'TrainingLearing', 'totalTrainingLearning', 'activity6', 'totaytotaltime'