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
  private testExamples:any
  private visHeight:number
  private visWidth:number
  public category1:string
  public category2:string
  private beginExperiment:boolean
  private numberofTrials:number
  private checkKey:number
  private responseArray:number[]
  private doublePress:boolean
  private instructionPageNumber:number
  public key1:number
  public key2:number



  constructor(private route: ActivatedRoute,private dataService: DataService,private zone: NgZone, private helperService: HelperService, private handleKeyboarEvent: HostListener,private experiment:Experiment,private shapeService:ShapeService,private  firebaseService:FirebaseService,private param:Parameters) {
    this.zone.run(() => {
      this.helperService.getCurrentSearchTerm().subscribe(searchTerm => this.experimentType = searchTerm);
      console.log(this.experimentType)
      this.sampleNumber=0;
      this.experiment._workerid=jsPsych.turk.turkInfo().workerId
      console.log(this.experiment._workerid);
      this.numberofTrials=10
      console.log(this.numberofTrials)
      this.counterDisplay=this.sampleNumber+"/"+this.numberofTrials
      this.checkKey=-1
      this.responseArray=[]
      this.doublePress=false;
      this.instructionPageNumber=0;
      this.key=1;
      this.key=2;
    })

  }



  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    console.log(this.key)
    // if(this.doublePress) {
    //   if (this.key == 1) {
    //     this.key = -1
    //     alert("please wait for the next sample to load")
    //
    //   }
    //   if (this.key == 2)
    //   {
    //     this.key=-1
    //     alert("please wait for the next sample to load")
    //   }
    //
    // }

    if(this.key==1 ) {
      if(this.checkKey==1 || this.checkKey==2){
        alert("please wait for the next sample to load")
      }
      else {
        setTimeout(() => {
          this.category1 = "crimson";
          this.checkKey=1;
          this.responseArray.push(1)
          this.doublePress=true;
        }, )
        setTimeout(() => {
          console.log("calling first key")
          this.fetchNextTrainingSample()
        }, 1000)
      }
    }
    if(this.key==2 ) {

      if (this.checkKey == 2 || this.checkKey==1) {
        alert("please wait for the next sample to load")
      }
      else {
        setTimeout(() => {
          this.category2 = "crimson";
          this.checkKey = 2;
          this.responseArray.push(2)
          this.doublePress=true;
        }, )
        setTimeout(() => {
          this.fetchNextTrainingSample()
        }, 1000)
      }
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
      this.viewbox=x(Math.floor(this.innerHeight/100)*10)+5+" "+"0 "+"100 "+Math.floor(this.innerHeight/100)*10;
      this.loadInstructions();
      this.testExperiment()
    });

  }

  loadInstructions()
  {

    if(this.instructionPageNumber<9) {
      console.log("not here")
      d3.select("#expins"+this.instructionPageNumber).style("display","none")
      this.instructionPageNumber = this.instructionPageNumber + 1;
      d3.select("#expins" + this.instructionPageNumber).style("display", "")

      this.counterDisplay = ""
      d3.selectAll(".headerSpan").style("display", "none")
      let visHeigt = Math.floor(this.innerHeight / 100) * 10
      let visWidth = Math.floor(this.innerHeight / 100) * 10

      if (this.experimentType == "Rectangle") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, true, false])
        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, false, true])

        }
        else {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, true, true])
        }
      }
      if (this.experimentType == "Petals") {

        if (this.instructionPageNumber == 3) {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, false, true])

        }
        else {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, true, true])
        }
      }
      if (this.experimentType == "TotemPole") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, false, true])

        }
        else {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, true, true])
        }
      }
      if (this.experimentType == "Face") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [false, false, true])

        }
        else {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, visWidth, visHeigt, [true, true, true])
        }
      }
    }
    else{
      console.log("ok")
      d3.select("#expins"+this.instructionPageNumber).style("display","none")
      this.fetchNextTrainingSample();
    }

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
    let testSamples=this.helperService.generate_fixed_trails(params);
    this.trainingSample=trainingSamples;
    this.testExamples=testSamples;
    this.experiment._trueCategory=this.testExamples.true_category;

    let visHeigt=Math.floor(this.innerHeight/100)*10
    let visWidth=Math.floor(this.innerHeight/100)*10

    this.visHeight=visHeigt;
    this.visWidth=visWidth;

    console.log(visHeigt)

    // if(this.experimentType=="Face")
    // {
    //   this.shapeService.drawFace("svgContainer",visWidth,visHeigt,trainingSamples.features[0])
    //   this.shapeService.drawFace("instructionSVG",visWidth,visHeigt,[true,true,true])
    //
    // }
    // if(this.experimentType=="TotemPole")
    // {
    //   this.shapeService.drawMan("svgContainer",visWidth,visHeigt,trainingSamples.features[0])
    //   this.shapeService.drawMan("instructionSVG",visWidth,visHeigt,[true,true,true])
    //
    // }
    // if(this.experimentType=="Petals"){
    //   this.shapeService.drawPetals("svgContainer",visWidth,visHeigt,trainingSamples.features[0]);
    //   this.shapeService.drawPetals("instructionSVG",visWidth,visHeigt,[true,true,true])
    //
    // }
    // if(this.experimentType=="Rectangle")
    // {
    //   //this.parentRouter.navigateByUrl('/experiment');
    //   this.shapeService.drawRectangles("svgContainer",visWidth,visHeigt,trainingSamples.features[0])
    //   this.shapeService.drawRectangles("instructionSVG",visWidth,visHeigt,trainingSamples.features[0])
    // }
    // //Giving color to the span category
    // if(trainingSamples.true_category[this.sampleNumber-1]==1)
    // {
    //   this.category1="crimson"
    //   this.category2="gray"
    // }
    // else{
    //   this.category1="gray"
    //   this.category2="crimson"
    // }

  }

  fetchNextTrainingSample()
  {
    if(this.sampleNumber<=this.numberofTrials-1) {
      d3.select("#svgContainer").style("display", "")
      d3.selectAll(".headerSpan").style("display", "")
      //Displaying the next sample
      this.sampleNumber = this.sampleNumber + 1;
      this.counterDisplay = this.sampleNumber + "/"+this.numberofTrials

      if (this.experimentType == "Face") {
        this.shapeService.drawFace("svgContainer", this.visWidth, this.visHeight, this.trainingSample.features[this.sampleNumber - 1])

      }

      if (this.experimentType == "Rectangle") {
        this.shapeService.drawRectangles("svgContainer", this.visWidth, this.visHeight, this.trainingSample.features[this.sampleNumber - 1])

      }
      if (this.experimentType == "Petals")
      {
        this.shapeService.drawPetals("svgContainer", this.visWidth, this.visHeight, this.trainingSample.features[this.sampleNumber - 1])

      }
      if (this.experimentType == "TotemPole")
      {
        this.shapeService.drawMan("svgContainer", this.visWidth, this.visHeight, this.trainingSample.features[this.sampleNumber - 1])

      }


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
    }
    else if(this.sampleNumber >this.numberofTrials-1 && this.sampleNumber<this.numberofTrials+1){
      this.showExperimentInstruction()
      this.sampleNumber=this.sampleNumber+1;
    }
    else if(this.sampleNumber>=this.numberofTrials+1 && this.sampleNumber<2*this.numberofTrials+1){
      let tempSampleNumber=this.sampleNumber-this.numberofTrials;
      this.counterDisplay = (tempSampleNumber) + "/"+this.numberofTrials;
      this.category1="gray"
      this.category2="gray"
      this.checkKey=-1
      this.doublePress=false
      if(this.sampleNumber==this.numberofTrials+1)
      {
        d3.select("#svgContainer").style("display", "")
        d3.select("#expins10").style("display", "none")
        d3.selectAll(".headerSpan").style("display", "")
        d3.select(".nextButton").style("display","none")


      }
      if(this.experimentType=="Face")
      {
        this.shapeService.drawFace("svgContainer",this.visWidth,this.visHeight,this.testExamples.features[tempSampleNumber-1])

      }
      if(this.experimentType=="Rectangle"){
        this.shapeService.drawRectangles("svgContainer",this.visWidth,this.visHeight,this.testExamples.features[tempSampleNumber-1])

      }
      if(this.experimentType=="Petals"){
        this.shapeService.drawPetals("svgContainer",this.visWidth,this.visHeight,this.testExamples.features[tempSampleNumber-1])

      }
      if(this.experimentType=="TotemPole"){
        this.shapeService.drawMan("svgContainer",this.visWidth,this.visHeight,this.testExamples.features[tempSampleNumber-1])

      }

      this.sampleNumber=this.sampleNumber+1;
    }
    else{
      console.log("finished experiment")
      console.log(this.responseArray)
      this.experiment._responseArray=this.responseArray;
      let workerId=this.experiment._workerid;
      //Check at the time of
      if(workerId=="")
      {
        workerId="ABC"+Math.floor((Math.random() * 1000) + 1);
      }
      let data={
        workerid:workerId,
        response:this.responseArray,
        truelabels:this.experiment._trueCategory,
        experimentType:this.experimentType

      }

      this.firebaseService.setData(data,"Pandey").subscribe(user => {
        this.response= JSON.stringify(user)
        localStorage.setItem('data',JSON.stringify(data) );
        window.open("../exp.html","_self")
      })


    }


  }

  showExperimentInstruction() {
      d3.select("#svgContainer").style("display", "none")
      this.counterDisplay = ""
      d3.select("#expins10").style("display", "")
      d3.selectAll(".headerSpan").style("display", "none")

    if(this.experimentType=="Face")
    {
      this.shapeService.drawFace("instructionSVG10",this.visWidth,this.visHeight,[true,true,true])

    }
    if(this.experimentType=="TotemPole")
    {
      this.shapeService.drawMan("instructionSVG10",this.visWidth,this.visHeight,[true,true,true])

    }
    if(this.experimentType=="Petals"){
      this.shapeService.drawPetals("instructionSVG10",this.visWidth,this.visHeight,[true,true,true])

    }
    if(this.experimentType=="Rectangle")
    {
      //this.parentRouter.navigateByUrl('/experiment');
      this.shapeService.drawRectangles("instructionSVG10",this.visWidth,this.visHeight,[true,true,true])
    }
  }




}
