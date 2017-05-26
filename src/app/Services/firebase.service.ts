/**
 * Created by aditeyapandey on 5/24/17.
 */
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";


@Injectable()
export class FirebaseService{

  constructor(private http:Http){}
  setData(firstName:string,lastName: string)
  {
    const body= JSON.stringify({firstName: firstName,lastName:lastName})
    return this.http.put("https://testproject-b9025.firebaseio.com//userNew.json", body).map(response => response.json())
  }
  getUser()
  {

  }
}
