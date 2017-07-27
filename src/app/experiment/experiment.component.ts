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
  public title:string
  public startTime:Date
  public endTime:Date
  public viewBoxInstruction:string



  constructor(private route: ActivatedRoute,private dataService: DataService,private zone: NgZone, private helperService: HelperService, private handleKeyboarEvent: HostListener,private experiment:Experiment,private shapeService:ShapeService,private  firebaseService:FirebaseService,private param:Parameters) {
    this.zone.run(() => {
      this.helperService.getCurrentSearchTerm().subscribe(searchTerm => this.experimentType = searchTerm);
      console.log(this.experimentType)
      this.title="Experiment"
      console.log(this.title)
      this.sampleNumber=0;
      this.experiment._workerid=jsPsych.turk.turkInfo().workerId
      console.log(this.experiment._workerid);
      this.numberofTrials=10;
      console.log(this.numberofTrials)
      this.counterDisplay=this.sampleNumber+"/"+this.numberofTrials
      this.checkKey=-1
      this.responseArray=[]
      this.doublePress=false;
      this.instructionPageNumber=0;
      this.key=1;
      this.key=2;
      this.startTime = new Date();
    })

  }



  @HostListener('document:keypress', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    //Checking if the experiment is in the testing phase
    if(this.sampleNumber>=this.numberofTrials+1 && this.sampleNumber<2*this.numberofTrials+2) {
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

      if (this.key == 1) {
        if (this.checkKey == 1 || this.checkKey == 2) {
          alert("Please wait for the next sample to load.")
        }
        else {
          setTimeout(() => {
            this.category1 = "#32CD32";
            this.checkKey = 1;
            this.responseArray.push(1)
            this.doublePress = true;
          },)
          setTimeout(() => {
            console.log("calling first key")
            this.fetchNextTrainingSample()
          }, 1000)
        }
      }
      if (this.key == 2) {

        if (this.checkKey == 2 || this.checkKey == 1) {
          alert("Please wait for the next sample to load.")
        }
        else {
          setTimeout(() => {
            this.category2 = "#32CD32";
            this.checkKey = 2;
            this.responseArray.push(2)
            this.doublePress = true;
          },)
          setTimeout(() => {
            this.fetchNextTrainingSample()
          }, 1000)
        }
      }

    }
  }

  ngOnInit()
  {
      this.sub = this.route.params.subscribe(params => {
      this.experimentType = params['id']; // (+) converts string 'id' to a number
      console.log(this.experimentType)
      this.title="Experiment"
      // In a real app: dispatch action to load the details here.
      var x = d3.scaleOrdinal()
        .domain([100, 90, 80, 70,60, 50,40,30,20])
        .range([-5, -10, -15, -20, -25, -30, -35, -40, -45]);
      this.innerWidth = (window.innerWidth) ;
      this.innerHeight = (window.innerHeight)-(window.innerHeight/6);
      //console.log("height of screen is",this.innerHeight)
      this.viewbox=x(Math.floor(this.innerHeight/100)*10)+5+" "+"0 "+"100 "+Math.floor(this.innerHeight/100)*10;
      if(this.experimentType=="TotemPole"||this.experimentType=="Face")
      {
        this.viewBoxInstruction="-60 -10 165 120"
      }
      else{
        this.viewBoxInstruction="-30 -10 165 120"
      }
      this.loadInstructions();
      this.testExperiment()
    });

    // let temp= window.location.href.split("/")
    // console.log(temp)
    // let shape=temp[temp.length-3]
    // console.log(shape)
    // this.experimentType = shape // (+) converts string 'id' to a number
    // console.log(this.experimentType)
    // this.title="Experiment"
    // // In a real app: dispatch action to load the details here.
    // var x = d3.scaleOrdinal()
    //   .domain([100, 90, 80, 70,60, 50,40,30,20])
    //   .range([-5, -10, -15, -20, -25, -30, -35, -40, -45]);
    // this.innerWidth = (window.innerWidth) ;
    // this.innerHeight = (window.innerHeight)-(window.innerHeight/5);
    // console.log("height of screen is",this.innerHeight)
    // this.viewbox=x(Math.floor(this.innerHeight/100)*10)+5+" "+"0 "+"100 "+Math.floor(this.innerHeight/100)*10;
    // this.loadInstructions();
    // this.testExperiment()
    // if(this.experimentType=="TotemPole"||this.experimentType=="Face")
    // {
    //   this.viewBoxInstruction="-60 -10 165 120"
    // }
    // else{
    //   this.viewBoxInstruction="-30 -10 165 120"
    // }

  }

  loadInstructions()
  {

    if(this.instructionPageNumber<10) {
      d3.select("#expins"+this.instructionPageNumber).style("display","none")
      this.instructionPageNumber = this.instructionPageNumber + 1;
      d3.select("#expins" + this.instructionPageNumber).style("display", "")

      this.counterDisplay = ""
      d3.selectAll(".headerSpan").style("display", "none")
      let visHeigt = Math.floor(this.innerHeight / 100) * 10
      let visWidth = Math.floor(this.innerHeight / 100) * 10

      if (this.experimentType == "Rectangle") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, 100, 100, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, 100, 100, [false, true, false])
        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, 100, 100, [false, false, true])

        }
        else {
          this.shapeService.drawRectangles("instructionSVG" + this.instructionPageNumber, 100, 100, [true, true, true])
        }
      }
      if (this.experimentType == "Petals") {

        if (this.instructionPageNumber == 3) {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, 100, 100, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, 100, 100, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, 100, 100, [false, false, true])

        }
        else {
          this.shapeService.drawPetals("instructionSVG" + this.instructionPageNumber, 100, 100, [true, true, true])
        }
      }
      if (this.experimentType == "TotemPole") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, 100, 100, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, 100, 100, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, 100, 100, [false, false, true])

        }
        else {
          this.shapeService.drawMan("instructionSVG" + this.instructionPageNumber, 100, 100, [true, true, true])
        }
      }
      if (this.experimentType == "Face") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, 100, 100, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, 100, 100, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, 100, 100, [false, false, true])

        }
        else {
          this.shapeService.drawFace("instructionSVG" + this.instructionPageNumber, 100, 100, [true, true, true])
        }
      }
      if (this.experimentType == "FaceScrambled") {
        if (this.instructionPageNumber == 3) {
          this.shapeService.drawFaceScrambled("instructionSVG" + this.instructionPageNumber, 100, 100, [true, false, false])

        }
        else if (this.instructionPageNumber == 4) {
          this.shapeService.drawFaceScrambled("instructionSVG" + this.instructionPageNumber, 100, 100, [false, true, false])

        }
        else if (this.instructionPageNumber == 5) {
          this.shapeService.drawFaceScrambled("instructionSVG" + this.instructionPageNumber, 100, 100, [false, false, true])

        }
        else {
          this.shapeService.drawFaceScrambled("instructionSVG" + this.instructionPageNumber, 100, 100, [true, true, true])
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
    console.log(trainingSamples)
    this.trainingSample=trainingSamples;
    this.testExamples=testSamples;
    this.experiment._trueCategory=this.testExamples.true_category;
    this.experiment._trainingTrueCategory=this.trainingSample.true_category;

    let stimuliArray=[];



    this.experiment._stimuliTraining=this.stringyfyStimuli(this.trainingSample.features);
    this.experiment._stimuliTest=this.stringyfyStimuli(this.testExamples.features);

    let visHeigt=Math.floor(this.innerHeight/100)*10
    let visWidth=Math.floor(this.innerHeight/100)*10

    this.visHeight=visHeigt;
    this.visWidth=visWidth;

  }

  stringyfyStimuli(stimuliVals):string[]
  {
    let stimuli=stimuliVals
    let stimuliArray=[];

    for(let i=0;i<stimuli.length;i++)
    {
      let featurestemp=stimuli[i];
      let stimuliarrayvalues=featurestemp[0]+"-"+featurestemp[1]+"-"+featurestemp[2];
      stimuliArray.push(stimuliarrayvalues);
    }
    return stimuliArray

  }
  fetchNextTrainingSample()
  {
    if(this.sampleNumber<=this.numberofTrials-1) {
      this.title="Family"
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
      this.category1="#32CD32"
      this.category2="#eceeef"
    }
    else{
      this.category1="#eceeef"
      this.category2="#32CD32"
    }
    }
    else if(this.sampleNumber >this.numberofTrials-1 && this.sampleNumber<this.numberofTrials+1){
      this.showExperimentInstruction()
      this.sampleNumber=this.sampleNumber+1;
    }
    else if(this.sampleNumber>=this.numberofTrials+1 && this.sampleNumber<2*this.numberofTrials+1){
      let tempSampleNumber=this.sampleNumber-this.numberofTrials;
      this.counterDisplay = (tempSampleNumber) + "/"+this.numberofTrials;
      this.category1="#eceeef"
      this.category2="#eceeef"
      this.checkKey=-1
      this.doublePress=false
      this.title="Family"
      if(this.sampleNumber==this.numberofTrials+1)
      {
        d3.select("#svgContainer").style("display", "")
        d3.select("#expins11").style("display", "none")
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
      //Calculating the total time elapsed
      this.endTime=new Date()
      let secondsEnd=this.endTime.getTime()/ 1000;
      let secondsStart=this.startTime.getTime()/ 1000;
      let timeDiff=secondsEnd-secondsStart
      console.log(secondsEnd)
      console.log(secondsStart)
      console.log(timeDiff)

      let data={
        workerid:workerId,
        response:this.responseArray,
        truelabels:this.experiment._trueCategory,
        experimentType:this.experimentType,
        stimuliTraining:this.experiment._stimuliTraining,
        stimuliTest:this.experiment._stimuliTest,
        truelabelsTraining:this.experiment._trainingTrueCategory,
        hitId:jsPsych.turk.turkInfo().hitId,
        timeInSeconds:timeDiff
      }

      localStorage.setItem('data',JSON.stringify(data) );
      window.open("../../exp.html","_self")

      // this.firebaseService.setData(data,"Pandey").subscribe(user => {
      //
      //
      //   this.response= JSON.stringify(user)
      //   localStorage.setItem('data',JSON.stringify(data) );
      //   window.open("../../exp.html","_self")
      // })


    }


  }

  showExperimentInstruction() {
      d3.select("#svgContainer").style("display", "none")
      this.counterDisplay = ""
      d3.select("#expins11").style("display", "")
      d3.selectAll(".headerSpan").style("display", "none")
      this.title="Experiment"


    if(this.experimentType=="Face")
    {
      this.shapeService.drawFace("instructionSVG11",100,100,[true,true,true])

    }
    if(this.experimentType=="TotemPole")
    {
      this.shapeService.drawMan("instructionSVG11",100,100,[true,true,true])

    }
    if(this.experimentType=="Petals"){
      this.shapeService.drawPetals("instructionSVG11",100,100,[true,true,true])

    }
    if(this.experimentType=="Rectangle")
    {
      this.shapeService.drawRectangles("instructionSVG11",100,100,[true,true,true])
    }
  }




}
