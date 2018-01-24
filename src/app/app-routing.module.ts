import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// App Specific Components
import { DashboardComponent } from './dashboard/dashboard.component';
import { IotDetailComponent } from './iot-detail/iot-detail.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { PrinterDetailComponent } from './printer-detail/printer-detail.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component'; 

const routes: Routes = [
  // The 'path' property describes the url this route will handle
  // The 'component' property is the name of component we want to display when the url in the browser matches the path
  // The empty path represents the default path for the application, the place to go to when the path in the URL is empty, as it typically is at the start.
  // The ** path is a wildcard. The router will select this route if the requested URL doesn't match any paths for routes defined earlier in the configuration
  { path: 'dashboard', component: DashboardComponent },
  { path: 'iot-detail', component: IotDetailComponent },
  { path: 'mobile-detail', component: MobileDetailComponent },
  { path: 'printer-detail', component: PrinterDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch:'full' },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule { }
