import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms'; //ngModel "lives" in here


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//charts
import { ChartsModule } from 'ng2-charts';

// Material Design 
import { 
         MatIconModule, 
         MatToolbarModule,
         MatSidenavModule,
         MatListModule,
         MatCardModule,
         MatButtonModule,
         MatCheckboxModule,
         MatTableModule,
         MatMenuModule,
         MatRadioModule
      } from '@angular/material';


// App Specific Components 
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardDnsDetailComponent } from './dashboard-dns-detail/dashboard-dns-detail.component';
import { IotDetailComponent } from './iot-detail/iot-detail.component';
import { MobileDetailComponent } from './mobile-detail/mobile-detail.component';
import { PrinterDetailComponent } from './printer-detail/printer-detail.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { PageNotFoundComponent } from './pagenotfound/pagenotfound.component';

/* App Specific Services */
import { DnsService } from './dns.service';



@NgModule({
  //declarations - the "view classes" that belong to this module. Angular has three kinds of view classes: components, directives, and pipes
  declarations: [
    AppComponent,
    DashboardComponent,
    DashboardDnsDetailComponent,
    NavComponent,
    IotDetailComponent,
    MobileDetailComponent,
    PrinterDetailComponent,
    SidenavComponent,
    PageNotFoundComponent,
  ],
  //imports - other modules whose exported classes are needed by component templates declared in this module
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, //HttpClientModule
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatTableModule,
    MatMenuModule,
    MatRadioModule,
    ChartsModule
  ],
  providers: [DnsService],
  bootstrap: [AppComponent] //The bootstrap array: You launch your application by bootstrapping the root AppModule. Among other things, the bootstrapping process creates the components listed in the bootstrap array and inserts each one into the browser DOM 
})

//A root module has no reason to export anything, because other components don't need to import the root module
export class AppModule { }
