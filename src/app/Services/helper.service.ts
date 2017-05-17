/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class HelperService {

  constructor(private http: Http) { }


 randomOrderGenerator(array1:any[],cat1:number,array2:any[],cat2:number)
 {
   let valuesObject= [];
   let index=0
   for(let entry of array1)
   {
     valuesObject.push({value:entry,category:cat1,index:index})
     index++;
   }
   index=0;
   for(let entry of array2)
   {
     valuesObject.push({value:entry,category:cat2,index:index})
      index++;
   }
   console.log(valuesObject)
   let shuffledArray=this.shuffle(valuesObject)
   console.log(shuffledArray)
 }

  shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


}
