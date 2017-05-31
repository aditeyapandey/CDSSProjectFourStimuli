/**
 * Created by aditeyapandey on 5/24/17.
 */
import { Injectable } from '@angular/core';
import {Http} from "@angular/http";


@Injectable()
export class FirebaseService{

  constructor(private http:Http){}
  setData(data:any,lastName: string)
  {
    const body= JSON.stringify({data: data,lastName:lastName})

    return this.http.put("https://testproject-b9025.firebaseio.com/"+data.workerid+".json", body).map(response => response.json())
  }
  getUser()
  {

  }
}
