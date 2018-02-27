import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Component({
  selector: 'app-dashboard-dns-detail',
  templateUrl: './dashboard-dns-detail.component.html',
  styleUrls: ['./dashboard-dns-detail.component.css']
})

export class DashboardDnsDetailComponent implements OnInit {

  displayedColumns = ['dns_name', 'dvc_type_code', 'mdl_type_code', 'dvc_use_desc', 'dvc_loc_desc', 'dvc_loc_num', 'dvc_loc_type_code'];



  constructor() { }

  ngOnInit() {
  }

}


