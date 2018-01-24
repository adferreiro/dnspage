import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http/src/response';

import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from "rxjs";




// @Injectable() decorator tells TypeScript to emit metadata about the service. The metadata specifies that Angular may need to inject other dependencies into this service.
@Injectable()

export class DnsService {

  private baseUrl = "../assets/api/";

  constructor(private http: HttpClient) { }

  //results: string [];

  getDNSData(){

      // the get method returns an Observable
    return  this.http.get(this.baseUrl + "test.json");
                // .subscribe( 
                //             (data) => {//initial response 
                //               //console.log(data);
                //               this.results = data['returnData'].searchResults;
                //               console.log(this.results);
                        
                //               //the data['returnData'] is using bracket notation to access the returnData field 
                //               //If you tried to write data.returnData, TypeScript would correctly complain that the Object coming back from HTTP does not have a returnData property.
                //               //That's because while the HTTPClient parsed the JSON response into an Object, it doesn't know what shape the object is 
                //             },
                //             (err) => {//error
                //                 console.log('An Error has occured, see below output!')
                //                 console.log(err);
                //             },
                //             () => {//complete - Only hits this section of code if no errors occured
                //               //console.log('Only runs if there are no errors!')
                //                 console.log(this.results);     
                //             }
                          
                // );
                     
  }
  //getData

 
}
//DnsService