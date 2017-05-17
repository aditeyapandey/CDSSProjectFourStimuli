/**
 * Created by aditeyapandey on 5/15/17.
 */
/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Component, OnInit,HostListener } from '@angular/core';
declare var d3: any;
declare var jsPsych:any

import {HelperService} from "../Services/helper.service"
import {DataService} from "../Services/data.service"

import { Rectangle,Petals,Man,Face,Experiment } from '../models/index';



@Component({
  selector: 'app-shape',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css'],
  providers: [HelperService,DataService,HostListener]
})

export class ExperimentSetup {

  private key: any

  constructor(private dataService: DataService, private helperService: HelperService, private handleKeyboarEvent: HostListener) {
    this.testExperiment()
  }



  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(this.key)
  }

  testExperiment()
  {

    let array1=[2,2,2,6,6,6,27];
    let array2=[13,13,13,3,3,3,1];

    this.helperService.randomOrderGenerator(array1,1,array2,0)






    //   let  welcome_block = {
    //        type: "text",
    //        text: "Welcome to the experiment. Press any key to begin."
    //    }
    //
    //
    //
    //
    // /* define instructions block */
    // let instructions_block = {
    //   type: "text",
    //   text: "<p>In this experiment, a circle will appear in the center " +
    //   "of the screen.</p><p>If the circle is <strong>blue</strong>, " +
    //   "press the letter F on the keyboard as fast as you can.</p>" +
    //   "<p>If the circle is <strong>orange</strong>, do not press " +
    //   "any key.</p>" +
    //   "<div class='left center-content'><img src='img/blue.png'></img>" +
    //   "<p class='small'><strong>Press the F key</strong></p></div>" +
    //   "<div class='right center-content'><img src='img/orange.png'></img>" +
    //   "<p class='small'><strong>Do not press a key</strong></p></div>" +
    //   "<p>Press any key to begin.</p>"
    // };
    //
    //   let timeline = [];
    //   timeline.push(welcome_block);
    //   timeline.push(instructions_block);
    //
    //
    // jsPsych.init({
    //     timeline: timeline
    //   });



  }

}
