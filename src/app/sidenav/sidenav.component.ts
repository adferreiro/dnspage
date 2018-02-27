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
   @Input() 
    opened : boolean = true;
   @Input() 
    mode : string = 'side';

   // properties of mat-nav-list
   @Input()
    disableRipple: boolean =  false;
  
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