import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { ReportComponent } from './report/report.component';
import { ProjectComponent } from './project/project.component';
import { UserComponent } from './user/user.component';
import { UserprojectComponent } from './userproject/userproject.component';
import { UserreportComponent } from './userreport/userreport.component';
import { AdminGuard } from './admin.guard';
import { userGuard } from './user.guard';
import { RegistereditComponent } from './registeredit/registeredit.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ProjecteditComponent } from './projectedit/projectedit.component';

const routes: Routes = [

  {path:'main',component:MainComponent ,canActivate: [AdminGuard]}, //main
  {path:'Registration',component:RegistrationComponent ,canActivate: [AdminGuard]}, //Registration
  // {path:'Registration',component:RegistrationComponent }, //Registration
  {path:'RegistrationEdit',component:RegistereditComponent ,canActivate: [AdminGuard]}, //RegistrationEdit
  {path:'ProjectsEdit',component:ProjecteditComponent  ,canActivate: [AdminGuard]}, //RegistrationEdit
  {path:'Authendication',component: LoginComponent }, //Authendication
  {path:'Forgotpassword',component:ForgotpasswordComponent}, //Forgotpassword
  {path:'Report',component: ReportComponent,canActivate: [AdminGuard]}, //Report
  {path:'UserReport',component: UserreportComponent,canActivate: [userGuard ] }, //Report
  {path:'Project',component: ProjectComponent,canActivate: [AdminGuard] }, //Project
  {path:'User',component: UserComponent,canActivate: [userGuard ]  }, //Usermainpage
  {path:'Userproject',component: UserprojectComponent ,canActivate: [userGuard ]  }, //Userproject
  {
    path: '**',
    redirectTo: 'Authendication',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
