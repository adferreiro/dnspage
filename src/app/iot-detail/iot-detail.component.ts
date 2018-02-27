
import { DataSource } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

//to use a service, we must import it
import { DnsService } from '../dns.service';


import { EditDialogComponent } from './../edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './../delete-dialog/delete-dialog.component';



@Component({
  selector: 'app-iot-detail',
  templateUrl: './iot-detail.component.html',
  styleUrls: ['./iot-detail.component.css']
})
export class IotDetailComponent implements OnInit {

    displayedColumns = ['dns_name', 'dvc_type_code', 'mdl_type_code', 'dvc_use_desc', 'dvc_loc_desc', 'dvc_loc_num', 'dvc_loc_type_code', 'actionsColumn'];

    dataSource = new MatTableDataSource();

  //dependency injection is done through the constructure                  
  constructor(private dnsService : DnsService, public dialog: MatDialog){}


  ngOnInit() {
    this.getDNSData();
    
  }

  

  getDNSData(){
      
    this.dnsService.getDNSData()
                   .subscribe(
                      (data)=>{
                        console.log(data);
                        
                        this.dataSource.data = data['returnData']['searchResults'];
                       
                      },
                      err => {
                        console.error(err);
                      }
                    )
  }
  //getDNSData

  configOptions = {
    disableClose:false,
    hasBackdrop:true,
    height:'400px',
    width:'400px'
  };

  openDialog(): void{
    this.dialog.open(EditDialogComponent,this.configOptions)
   
  }

}
// IotDetailComponent