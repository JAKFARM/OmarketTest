import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  private httpOptions = { 
    headers: new HttpHeaders( { 'Content-Type': 'application/json' }) 
 };

  constructor(private _http: HttpClient) { }

  getTask() {
    let url = `${environment.apiurl}tasks`;
    return this._http.get(url);
  }

  updateTask(data) {
    let url = `${environment.apiurl}tasks\/${data.id}`;
    return this._http.patch(url, data, this.httpOptions);
  }

  deleteTask(id) {
    let url = `${environment.apiurl}tasks\/${id}`;
    return this._http.delete(url);
  }

  postData(data) {
    let url = `${environment.apiurl}tasks`;
    return this._http.post(url, data);
  }
}
