import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {

  apiUrl ="http://localhost:3000"

constructor(private http:HttpClient){}

auth(data:any):Observable<any>{
  return this.http.post(this.apiUrl+"/login",data);

}


getUser(){
  return this.http.get(this.apiUrl+"/get");
}

createUser(info:any):Observable<any>{
  return this.http.post(this.apiUrl+"/create",info);

}

deleteUser(dataId:number){
return this.http.delete(this.apiUrl+"/delete/"+dataId);

}

getRecords(){

  return this.http.get(this.apiUrl + "/userRec");

}





}
