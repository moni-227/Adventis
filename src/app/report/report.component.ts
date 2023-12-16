
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

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})

export class ReportComponent {
  public alldata:any;
  selectedUsername: any = '';
  selectedProject: any = '';
  dateFrom: any= '';
  dateTo: any = '';
  pageSize: number = 10;
  currentPage: number = 0;
  filteredData: any[] = []; 
 dataSource!: MatTableDataSource<any>;
 toggleDropdown = false;
imageUrl!: any;

 tableColumns: string[] = [
  'Project1', 'Project2', 'Project3', 'Project4', 'Project5', 'TrainingLearing'
];
  @ViewChild('tableData') tableData!: ElementRef;
  @ViewChild('tableData', { static: false }) tableDataRef!: ElementRef;
  
   constructor(public rout:Router,public http: HttpClient,public service:AllService, private datePipe: DatePipe) { 
    const image = atob(sessionStorage.getItem(btoa('userimage')) || '');
    this.imageUrl=image
  }
  ngOnInit(): void {
    this.getData();
  }
  // ngAfterViewInit() {
  //   // After the view has been initialized, you can safely set tableDataRef
  //   this.tableDataRef = this.tableDataRef || new ElementRef(null);
  // }
// Method to handle page change
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
    //  console.log(response);
     this.alldata=response
    //  console.log(this.alldata)
    //  const titles = response.map((item) => item.Date);
    //  console.log(titles);
    //  this.Time=titles
    this.filterData()

  
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
      
    );

  }
  hasData(column: string): boolean {
    return this.pagedData.some(item => item[column] !== undefined && item[column] !== null);
  }

  // filterData() {
  //   this.getData();
  
  //   this.filteredData = this.alldata.filter((item: any) => {
  //     if (this.selectedUsername && item.Name !== this.selectedUsername) {
  //       return false;
  //     }
  //     if (this.selectedProject && item.Project1 !== this.selectedProject) {
  //       return false;
  //     }
  
  //     if (this.dateFrom && this.dateTo) {
  //       const fromDate = new Date(this.dateFrom);
  //       fromDate.setHours(0, 0, 0, 0); // Set the time to the start of the day
  //       const toDate = new Date(this.dateTo);
  //       const dateParts = item.Date.split('-');
  //       const itemDate = dateParts.length === 3
  //         ? new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
  //         : null;
  
  //       if (itemDate && itemDate >= fromDate && itemDate <= toDate) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  
  //     if (this.dateFrom) {
  //       // Filter for the selected "from" date
  //       const fromDate = new Date(this.dateFrom);
  //       fromDate.setHours(0, 0, 0, 0); // Set the time to the start of the day
  //       const dateParts = item.Date.split('-');
  //       const itemDate = dateParts.length === 3
  //         ? new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
  //         : null;
  
  //       if (itemDate && itemDate.toDateString() === fromDate.toDateString()) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  
  //     if (this.dateTo) {
  //       // Filter for the selected "to" date
  //       const toDate = new Date(this.dateTo);
  //       const dateParts = item.Date.split('-');
  //       const itemDate = dateParts.length === 3
  //         ? new Date(+dateParts[2], +dateParts[1] - 1, +dateParts[0])
  //         : null;
  
  //       if (itemDate && itemDate.toDateString() === toDate.toDateString()) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  
  //     return true;
  //   });
  // }
  home(){
    this.rout.navigateByUrl('main');
  }
  project(){
    this.rout.navigateByUrl('Project');
  }
  register(){
    this.rout.navigateByUrl('Registration');
  }
  logout() {
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("username1");
    sessionStorage.clear();
    this.rout.navigateByUrl('Authendication');
  }
  filterData() {
    this.getData();
  
    this.filteredData = this.alldata.filter((item: any) => {
      if (this.selectedUsername && item.Name !== this.selectedUsername) {
        return false;
      }
  
      if (this.selectedProject &&
        (item.Project1 !== this.selectedProject &&
          item.Project2 !== this.selectedProject &&
          item.Project3 !== this.selectedProject &&
          item.Project4 !== this.selectedProject &&
          item.Project5 !== this.selectedProject &&
          item.TrainingLearing !== this.selectedProject
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
          ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]) // Adjust the order of the date parts
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
          ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]) // Adjust the order of the date parts
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
          ? new Date(+dateParts[0], +dateParts[1] - 1, +dateParts[2]) // Adjust the order of the date parts
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
      return true; // No date range specified
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
  getTableData() {
    // Define and return your table data here, for example:
    return [
      ['Header 1', 'Header 2', 'Header 3'],
      ['Row 1 Data 1', 'Row 1 Data 2', 'Row 1 Data 3'],
      // Add more rows as needed
    ];
  }
  exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.tableDataRef.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Report');
    XLSX.writeFile(wb, 'report.xlsx');
  }
  exportToPDF() {
    // Use html2canvas to capture the HTML content as an image
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
}
