/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Injectable,Component } from '@angular/core';
import { Http } from '@angular/http';
import { Observable,BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Subject } from 'rxjs/Subject';
import {Parameters} from "../models/index"


@Injectable()
export class HelperService {
  number_training_trials:number
  number_test_trials:number
  currentSelection:string
  private currentSearchTermSubject : BehaviorSubject<string> = new BehaviorSubject<string>('');
  private subject = new Subject<any>();



  constructor(private http: Http) { }

  generate_fixed_trails(params) : any
  {
    // create array with true categories for each trial
    var true_cat = [];
    for (var i = 0; i < params.keyChoices[0]; i++) {
      true_cat.push(1);
    }
    for (var i = 0; i < params.keyChoices[1]; i++) {
      true_cat.push(2);
    }

    // create array with stimulus indices
    let trial_stim = [];
    // category 1 trials
    for (let i = 0; i < params.Nstim_Cat1.length; i++) {
      for (let j = 0; j < params.Nstim_Cat1[i]; j++)   {
        trial_stim.push(i + 1);
      }
    }
    // category 2 trials
    for (let i = 0; i < params.Nstim_Cat2.length; i++) {
      for (let j = 0; j < params.Nstim_Cat2[i]; j++)   {
        trial_stim.push(i + 1);
      }
    }

    console.log(trial_stim)
    // permute the arrays, create feature array and comp choice array
    let true_category = [];
    let trial_stimuli = [];
    let features = [];
    let comp_category = [];
    let r = this.randperm(true_cat.length);
    let stim_ind;
    console.log(r)
    for (let i = 0; i < r.length; i++) {
      true_category.push(true_cat[r[i]]);
      trial_stimuli.push(trial_stim[r[i]]);
      stim_ind = trial_stim[r[i]] - 1;
      features.push(params.allFeatures[stim_ind]);
      //comp_category.push(this.getComChoice(params,stim_ind)); // comp_category array
    }

    let output = { true_category: true_category, features: features,comp_category:comp_category };

    return output;
  }

  // return a random permutation of a range (similar to randperm in Matlab)
  randperm(maxValue){
      // first generate number sequence
      let permArray = new Array(maxValue);
      for(let i = 0; i < maxValue; i++){
        permArray[i] = i;
      }
      // draw out of the number sequence
      for (let i = (maxValue - 1); i >= 0; --i){
        let randPos = Math.round(i * Math.random());
        let tmpStore = permArray[i];
        permArray[i] = permArray[randPos];
        permArray[randPos] = tmpStore;
      }
      return permArray;
    }

      // sum function for reduce operation
       add(a,b) {
      return a + b;
     }


//Assuming that we will have 100 trials for the time being
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
   let shuffledArray=this.shuffle(valuesObject)
   console.log(shuffledArray)
   let probabilityKey=this.assignProbablity(shuffledArray)
   let Category0=0
   let Category1=0
   let reconstructedValueArray=[0,0,0,0,0,0,0,0,0,0,0,0,0,0]

   for (var i=0;i<100;i++)
   {
     let returnedValue=this.pickRandom();
     console.log("Index "+probabilityKey[returnedValue-1].values.index+" Cateogry "+probabilityKey[returnedValue-1].values.category)

     reconstructedValueArray[(probabilityKey[returnedValue-1].values.category*7)+probabilityKey[returnedValue-1].values.index]=reconstructedValueArray[(probabilityKey[returnedValue-1].values.category*7)+probabilityKey[returnedValue-1].values.index]+1

     if(probabilityKey[returnedValue-1].values.category==0)
     {
       Category0++;
     }
     else{
       Category1++
     }
   }
   console.log(Category0)
   console.log(Category1)
   console.log(reconstructedValueArray)
 }
 assignProbablity(shuffledArray)
 {
   let probablityKey=[]
   //Here 100 are the total number of trials
   let totalNumber=1
   for(var i=0;i<14;i++)
   {

     let subIndex=shuffledArray[i].value
     for (var j=0;j<subIndex;j++)
     {
       probablityKey.push({key:totalNumber+j,values:shuffledArray[i]})
     }
     totalNumber=totalNumber+j

   }
    return probablityKey
 }
 pickRandom()
 {
   return Math.floor(Math.random() * 100) + 1

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




  getTrainingTrials()
  {
    return this.number_training_trials
  }
  getTestTrials()
  {
    return this.number_test_trials;
  }
  setTrainingTrials(value:number)
  {
    this.number_training_trials=value;
  }
  setTestTrials(value:number)
  {
    this.number_test_trials=value;
  }
  setCurrentSelection(selectedShape:string)
  {
    this.subject.next(selectedShape);
  }
  getCurrentSelection(): Observable<any> {
    return this.subject.asObservable();
  }
  getCurrentSearchTerm() : BehaviorSubject<string>
  {
    return this.currentSearchTermSubject;
  }
  setCurrentSearchTerm(searchTerm: string) : any
  {
    this.currentSearchTermSubject.next(searchTerm);
  }


}
