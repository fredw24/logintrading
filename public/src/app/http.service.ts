import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  addUser(newUser){
    return this._http.post('api/users', newUser)

  }

  getUser(user){
    return this._http.post('/api/users/one', user)

  }
}
