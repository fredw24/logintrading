import { Component } from '@angular/core';
import { HttpService } from './http.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  message: any = ""

  newUser: any = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",

  }

  getUser: any = {
    email: "",
    password: ""
  }

  currentUser: any = {
    userid: "",
    first_name: "",
    last_name: "",
    email: ""

  }
  errorMessage: any;


  constructor(private _httpService: HttpService){

  }

  resetUsers(){
    this.newUser = {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
  
    }
  
    this.getUser = {
      email: "",
      password: ""
    }

  }

  logout(){
    this.currentUser = {
      userid: "",
      first_name: "",
      last_name: "",
      email: ""
  
    }

  }

  CreateUser(){

    let observable = this._httpService.addUser(this.newUser)

    observable.subscribe(data =>{
      console.log("New User", data)
      if(data['errors']){
        this.errorMessage = data;
        console.log("Have error message", this.errorMessage)

      }
      if (data == "Email Already been used"){
        this.message = data;

      }
      else{
        this.message = "";
        this.currentUser = data
      }
    })
	 
  }


  LoginUser(){
    console.log(this.getUser)

    let observable = this._httpService.getUser(this.getUser)

    observable.subscribe(data =>{
      console.log("get user", data)
      this.resetUsers()
      if(data['errors']){
        this.errorMessage = data;
        console.log("Have error message", this.errorMessage)

      }
      else if (data == "Invalid Password" || data == "Invalid Email Address"){
        this.message = data
        console.log("Check invalid",this.message)

      }
      else{
        this.message = ""
        this.currentUser = data
      }
    })

  }



}
