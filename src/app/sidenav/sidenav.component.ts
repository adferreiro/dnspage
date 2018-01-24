import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  
    //In this scenario the opened variable is being set from the parent component - in this case AppComponent
   // @Input() opened: boolean;

  
  // properties of mat-sidenav
   opened : boolean = true;
   mode : string = 'side';
  
  constructor() { }

  ngOnInit() {
  }

  
  toggleSideNav(){

    if (this.opened){
      this.opened = false;
    }else{
      this.opened = true;
    }

  }
  //toggleSideNav


}
//SidenavComponent