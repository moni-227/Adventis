import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatNativeDateModule} from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatPaginatorModule } from '@angular/material/paginator';
import { Location } from '@angular/common';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { ProjectComponent } from './project/project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UserComponent } from './user/user.component';
import { UserprojectComponent } from './userproject/userproject.component';
import { AllService } from './all.service';
import { UserreportComponent } from './userreport/userreport.component';
import { RegistereditComponent } from './registeredit/registeredit.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ProjecteditComponent } from './projectedit/projectedit.component';


@NgModule({
  
  declarations: [
    AppComponent,
    RegistrationComponent,
    MainComponent,
    LoginComponent,
    ReportComponent,
    ProjectComponent,
    UserComponent,
    UserprojectComponent,
    UserreportComponent,
    RegistereditComponent,
    ForgotpasswordComponent,
    ProjecteditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    HttpClientModule,
    NgxPaginationModule,
    MatPaginatorModule,


 

  ],

  providers: [DatePipe,AllService,AdminGuard,userGuard,Location], // Add DatePipe to the providers array
  bootstrap: [AppComponent]
})
export class AppModule { }
