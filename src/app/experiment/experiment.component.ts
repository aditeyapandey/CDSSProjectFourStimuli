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
import {ShapeService} from "../Services/shape.service"


import { Rectangle,Petals,Man,Face,Experiment } from '../models/index';
import {ignoreElements} from "rxjs/operator/ignoreElements";



@Component({
  selector: 'app-shape',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css'],
  providers: [HelperService,DataService,HostListener,Experiment,ShapeService]
})

export class ExperimentSetup {

  private key: any
  private experimentType:string
  private htmlToAddFirst:string
  private htmlToAddSecond:string

  constructor(private dataService: DataService, private helperService: HelperService, private handleKeyboarEvent: HostListener,private experiment:Experiment,private shapeService:ShapeService) {
  }



  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(this.key)
    if(this.key==1) {
      this.htmlToAddFirst = '1';
      setTimeout(() => {
        this.htmlToAddFirst = ""
      }, 500)
    }
    if(this.key==2) {
      this.htmlToAddSecond = '2';
      setTimeout(() => {
        this.htmlToAddSecond = ""
      }, 500)
    }

  }

  ngOnInit()
  {
    this.experimentType=this.experiment.getCurrentSelection();

    this.shapeService.drawPetals("svgContainer",80,80)
    this.shapeService.drawRectangles("svgContainer",80,80)

   this.shapeService.drawFace("svgContainer",80,80)

    this.shapeService.drawMan("svgContainer",80,80)


  }

  testExperiment()
  {

    let array1=[2,2,2,6,6,6,27];
    let array2=[13,13,13,3,3,3,1];

    this.helperService.randomOrderGenerator(array1,1,array2,0)


  }

}
