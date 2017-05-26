/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Component, OnInit } from '@angular/core';
declare var d3: any;

import {DataService} from "../Services/data.service"
import {ShapeService} from "../Services/shape.service"
import {HelperService} from "../Services/helper.service"
import { Rectangle,Petals,Man,Face,Experiment } from '../models/index';
import {Router} from '@angular/router'

@Component({
  selector: 'app-shape',
  templateUrl: './shapecreator.html',
  styleUrls: ['./shapecreator.css'],
  providers: [DataService,Experiment,ShapeService,HelperService]
})

export class ShapeCreator {
  petals: Petals= new Petals();
  man: Man= new Man();
  face: Face= new Face();
  shapes:any[];
  training_trials:number
  testing_trails:number
  activeShape:string

  constructor(private dataService: DataService,private experiment:Experiment,private shapeService: ShapeService,private helperService:HelperService) {
    this.testing_trails=experiment.getTestTrials();
    this.training_trials=experiment.getTrainingTrials();
  }

  ngOnInit()
  {
    this.shapes=this.dataService.getAll();

  }
  initialize(shape:string)
  {
    console.log(shape)
     this.activeShape=shape;
    if(shape=="Face")
    {
      this.shapeService.drawFace(shape,100,100)

    }
    if(shape=="TotemPole")
    {
      this.shapeService.drawMan(shape,100,100)
    }
    if(shape=="Petals"){
      this.shapeService.drawPetals(shape,100,100);
    }
    if(shape=="Rectangle")
    {
      //this.parentRouter.navigateByUrl('/experiment');
      this.shapeService.drawRectangles(shape,100,100,[true,true,true])

    }

  }

  setActiveShape()
  {
    console.log(this.activeShape)
    this.helperService.setCurrentSelection(this.activeShape)
    this.helperService.setCurrentSearchTerm(this.activeShape)
  }


}
