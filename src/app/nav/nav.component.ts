import { Component, OnInit, Output, EventEmitter } from '@angular/core';


/* metadata tells Angular how to process a class - you must add metadata to your code so that Angular knows what to do*/
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  nav_app_title = 'DNS Maintenance';

@Output() menuClick = new EventEmitter<any>();

localMethod(action: any){
  console.log('localMethod has been triggered');
  this.menuClick.emit(action);
}
// localMethod

  constructor() { }

  ngOnInit() {
  }

}
