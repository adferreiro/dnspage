import { Component, ViewChild } from '@angular/core';

import {SidenavComponent} from './sidenav/sidenav.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'my-app';


  @ViewChild( SidenavComponent ) 
  private sidenav: SidenavComponent;
  
  menuButtonClicked(event: any){
    console.log("menuClicked");
    //console.log(event);
    console.log(this.sidenav);
    this.sidenav[event.methodName]();
  }
  //menuClicked

}
