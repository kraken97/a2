import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { AlertService } from './alert-service.service';
import { Variables } from '../constants';

@Injectable()
export class ApiService {

  rootPath = Variables.baseApiPath;
  mainPath: string;

  constructor(private http: Http, private alertService: AlertService) { }

  get path() {
    return 'http://' + this.rootPath + '/api/' + this.mainPath;
  }
  get authHeader() {
    let jwt = localStorage.getItem('access_token');
    let authHeader = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: authHeader });
    return options;
  }

  public getClear(query: string) {
    return this.http.get(Variables.baseApiPath + '/' + query);
  }


  public get(query: any): Observable<Response> {
    return this.http.get(this.path + query.toString(), this.authHeader);
  }

  public post(data: any): Observable<Response> {
    let body = JSON.stringify(data);
    return this.http.post(this.path, body, this.authHeader);
  }

  public put(id, data): Observable<Response> {
    let body = JSON.stringify(data);
    let route = this.path + '/' + id;
    return this.http.put(route, body, this.authHeader);
  }

  public delete(id): Observable<Response> {
    let route = this.path + '/' + id;
    return this.http.delete(route, this.authHeader);
  }


}
