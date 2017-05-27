/**
 * Created by aditeyapandey on 5/15/17.
 */
/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Component, OnInit,HostListener,NgZone } from '@angular/core';
declare var d3: any;
declare var jsPsych:any

import {HelperService} from "../Services/helper.service"
import {DataService} from "../Services/data.service"
import {ShapeService} from "../Services/shape.service"


import { Rectangle,Petals,Man,Face,Experiment,Parameters } from '../models/index';
import {ignoreElements} from "rxjs/operator/ignoreElements";
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import {FirebaseService} from"../Services/firebase.service"





@Component({
  selector: 'app-shape',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.css'],
  providers: [HelperService,DataService,HostListener,Experiment,ShapeService,FirebaseService,Parameters]
})

export class ExperimentSetup {

  private key: any
  experimentType:string
  htmlToAddFirst:string
  htmlToAddSecond:string
  subscription: Subscription;
  private sub:any
  private innerWidth: number;
  private innerHeight: number;
  public counterDisplay:string;

  viewbox:string
  private response:string
  private sampleNumber:number
  private trainingSample:any
  private visHeight:number
  private visWidth:number
  public category1:string
  public category2:string


  constructor(private route: ActivatedRoute,private dataService: DataService,private zone: NgZone, private helperService: HelperService, private handleKeyboarEvent: HostListener,private experiment:Experiment,private shapeService:ShapeService,private  firebaseService:FirebaseService,private param:Parameters) {
    this.zone.run(() => {
      this.helperService.getCurrentSearchTerm().subscribe(searchTerm => this.experimentType = searchTerm);
      console.log(this.experimentType)
      console.log(jsPsych.turk.turkInfo())
      this.sampleNumber=1;
      this.counterDisplay=this.sampleNumber+"/100"
    })

  }



  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(this.key)

    this.firebaseService.setData("Amriteya","Pandey").subscribe(user => this.response= JSON.stringify(user))

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

      this.sub = this.route.params.subscribe(params => {
      this.experimentType = params['id']; // (+) converts string 'id' to a number
      console.log(this.experimentType)
      // In a real app: dispatch action to load the details here.
      var x = d3.scaleOrdinal()
        .domain([100, 90, 80, 70,60, 50,40,30,20])
        .range([-5, -10, -15, -20, -25, -30, -35, -40, -45]);
      this.innerWidth = (window.innerWidth) ;
      this.innerHeight = (window.innerHeight);
      console.log("height of screen is",this.innerHeight)
      this.viewbox=x(Math.floor(this.innerHeight/100)*10)+5+" "+"0 "+"100 "+Math.floor(this.innerHeight/100)*10
      this.testExperiment()
    });

  }

  testExperiment()
  {
    //Importing the params as defined in the parameters model
    let params = {
      n_trials_train:this.param.n_trials_train,
      n_trials_Test:this.param.n_trials_Test,
      keyChoices:this.param.keyChoices,
      Nstim_Cat1:this.param.Nstim_Cat1,
      Nstim_Cat2:this.param.Nstim_Cat2,
      allFeatures:this.param.allFeatures
    }

    //Generating the training samples
    let trainingSamples=this.helperService.generate_fixed_trails(params);
    this.trainingSample=trainingSamples;

    let visHeigt=Math.floor(this.innerHeight/100)*10
    let visWidth=Math.floor(this.innerHeight/100)*10

    this.visHeight=visHeigt;
    this.visWidth=visWidth;

    console.log(visHeigt)

    if(this.experimentType=="Face")
    {
      this.shapeService.drawFace("svgContainer",visWidth,visHeigt)

    }
    if(this.experimentType=="TotemPole")
    {
      this.shapeService.drawMan("svgContainer",visWidth,visHeigt)
    }
    if(this.experimentType=="Petals"){
      this.shapeService.drawPetals("svgContainer",visWidth,visHeigt);
    }
    if(this.experimentType=="Rectangle")
    {
      //this.parentRouter.navigateByUrl('/experiment');
      this.shapeService.drawRectangles("svgContainer",visWidth,visHeigt,trainingSamples.features[0])
      this.shapeService.drawRectangles("instructionSVG",visWidth,visHeigt,trainingSamples.features[0])


    }

    //Giving color to the span category
    if(trainingSamples.true_category[this.sampleNumber-1]==1)
    {
      this.category1="crimson"
      this.category2="gray"
    }
    else{
      this.category1="gray"
      this.category2="crimson"
    }


  }

  fetchNextTrainingSample()
  {
    //Displaying the next sample
    this.sampleNumber=this.sampleNumber+1;
    this.counterDisplay=this.sampleNumber+"/100"

    this.shapeService.drawRectangles("svgContainer",this.visWidth,this.visHeight,this.trainingSample.features[this.sampleNumber-1])

    //Giving color to the span category
    if(this.trainingSample.true_category[this.sampleNumber-1]==1)
    {
      this.category1="crimson"
      this.category2="gray"
    }
    else{
      this.category1="gray"
      this.category2="crimson"
    }

    if(this.sampleNumber==2)
    {
        this.showExperimentInstruction()
    }

  }

  showExperimentInstruction()
  {
    d3.select("#svgContainer").remove()
    d3.select("#expins").style("display","")
    d3.select("#expins1").style("display","")

  }


}
