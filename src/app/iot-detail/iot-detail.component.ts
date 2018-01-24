import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

//to use a service, we must import it
import { DnsService } from '../dns.service';



@Component({
  selector: 'app-iot-detail',
  templateUrl: './iot-detail.component.html',
  styleUrls: ['./iot-detail.component.css']
})
export class IotDetailComponent implements OnInit {

    displayedColumns = ['dns_name', 'dvc_type_code', 'mdl_type_code', 'dvc_use_desc', 'dvc_loc_desc', 'dvc_loc_num', 'dvc_loc_type_code', 'actionsColumn'];
    dataSource = new ExampleDataSource();
  

    retData: string [];

  //dependency injection is done through the constructure                  
  constructor(private dnsService : DnsService){}

  ngOnInit() {
    this.getDNSData();
    
  }

  getDNSData(){
    
    this.dnsService.getDNSData()
                   .subscribe(
                      (data)=>{
                        this.retData = data['returnData']['searchResults'];
                        console.log(this.retData);
                      },
                      err => {
                        console.error(err);
                      }
                    )
  }
  //getDNSData

}
// IotDetailComponent

 export interface Element {
   dns_name:           string;
   dvc_type_code:      string;
   mdl_type_code:      string;
   dvc_use_desc:       string;
   dvc_loc_desc:       string;
   dvc_loc_num:        string;
   dvc_loc_type_code:  string;
 }
 //Element

 const data: Element[] = [
   {dns_name: 'STR101PI01', dvc_type_code: 'IOTD', mdl_type_code: 'RASPMB', dvc_use_desc: 'RX Temp Monitor', dvc_loc_desc: 'RX Fridge', dvc_loc_num: '101', dvc_loc_type_code: 'S'},
   {dns_name: 'sr0900pitempmon1', dvc_type_code: 'IOTD', mdl_type_code: 'RASPMB', dvc_use_desc: 'RX Temp Monitor', dvc_loc_desc: 'RX Fridge', dvc_loc_num: '900', dvc_loc_type_code: 'S'},
   {dns_name: 'STR101PI02', dvc_type_code: 'IOTD', mdl_type_code: 'RASPMB', dvc_use_desc: 'RX Temp Monitor', dvc_loc_desc: 'RX Fridge', dvc_loc_num: '101', dvc_loc_type_code: 'S'}

];


 /**
  * Data source to provide what data should be rendered in the table. The observable provided
  * in connect should emit exactly the data that should be rendered by the table. If the data is
  * altered, the observable should emit that new set of data on the stream. In our case here,
  * we return a stream that contains only one set of data that doesn't change.
 */
 export class ExampleDataSource extends DataSource<any> {
   /** Connect function called by the table to retrieve one stream containing the data to render. */
   connect(): Observable<any> {
     return Observable.of(data);
  }

   disconnect() {}
 }