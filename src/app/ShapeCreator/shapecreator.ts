/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Component, OnInit } from '@angular/core';
declare var d3: any;

import {DataService} from "../Services/data.service"
import { Rectangle,Petals,Man,Face,Experiment } from '../models/index';
import {Router} from '@angular/router'




@Component({
  selector: 'app-shape',
  templateUrl: './shapecreator.html',
  styleUrls: ['./shapecreator.css'],
  providers: [DataService,Experiment]
})

export class ShapeCreator {
  petals: Petals= new Petals();
  man: Man= new Man();
  face: Face= new Face();
  shapes:any[];
  training_trials:number
  testing_trails:number

  constructor(private dataService: DataService,private experiment:Experiment) {
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
    if(shape=="Face")
    {
      this.drawFace(shape)

    }
    if(shape=="TotemPole")
    {
      this.drawMan(shape)
    }
    if(shape=="Petals"){
      this.drawPetals(shape);
    }
    if(shape=="Rectangle")
    {
      //this.parentRouter.navigateByUrl('/experiment');
      this.drawRectangles(shape)

    }
  }
  drawFace(shape:string)
  {
    let cx=100/2;
    let cy=100/2;
    let r=100/4
    //faceoutline
    d3.select("#"+shape).append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
    // d3.select("svg").append("circle").attr("cx", 80).attr("cy", 100).attr("r",70).attr("stroke","black").style("fill","white");
    //eyes
    d3.select("#"+shape).append("circle").attr("cx", cx-cx/10).attr("cy", cy-cy/3).attr("r",r/5).attr("stroke","black").style("fill","white");
    d3.select("#"+shape).append("circle").attr("cx", cx+cx/10).attr("cy", cy-cy/3).attr("r",r/5).attr("stroke","black").style("fill","white");
    //nose
    d3.select("#"+shape).append("line").attr("x1",cx).attr("y1",cy-cy/7).attr("x2",cx).attr("y2",cy+cy/4).attr("stroke","black");
    //mouth
    let arcPath="M"+(cx-cx/5)+","+(cy+cy/4)+" a1,1 0 0,0 "+(r-r/6)+",0";
    console.log(arcPath);
    d3.select("#"+shape).append("line").attr("x1",cx-cx/5).attr("y1",cy+cy/3).attr("x2",cx+cx/5).attr("y2",cy+cy/3).attr("stroke","black");
    //d3.select("svg").append("path").attr("d",arcPath).attr("stroke","black").style("fill","white")
  }
  setInstruction()
  {

  }
  drawMan(shape:String)
  {
    let height=100;
    let width=100;
    let faceCenterX=width/2;
    let faceCenterY=(height/20)+0.5;
    let radiusFace=height/20;
    let torsoOffset=width/15;
    let bodyHeight=(9/20)*height
    let bodyWidth=width/7.5;
    let armOffset=width/2;

    //Face of the totempole
    let cx=faceCenterX
    let cy=faceCenterY
    let r=radiusFace
    d3.select("#"+shape).append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");

    //Torso drawing
    let x=faceCenterX-torsoOffset
    let y=faceCenterY+radiusFace
    let bodyWidthTorso= bodyWidth
    let bodyHeightTorso= bodyHeight
    d3.select("#"+shape).append("rect").attr("x", x).attr("y", y).attr("width", bodyWidthTorso).attr("height", bodyHeightTorso).attr("stroke","black").style("fill","white");

    //Arms
    let xArm=faceCenterX-armOffset;
    let yArm=faceCenterY+radiusFace;
    let armWidth= (faceCenterX-torsoOffset)-(faceCenterX-armOffset);
    let armheight= 5;
    let x1=faceCenterX-torsoOffset+bodyWidth;
    d3.select("#"+shape).append("rect").attr("x", xArm).attr("y", yArm).attr("width", armWidth).attr("height", armheight).attr("stroke","black").style("fill","white");
    d3.select("#"+shape).append("rect").attr("x", x1).attr("y", yArm).attr("width", armWidth).attr("height", armheight).attr("stroke","black").style("fill","white");

    //Legs
    let xLeg=faceCenterX-torsoOffset
    let yLeg=(3/2*(height/4))+(faceCenterY+((1/4)*(height/4)))
    let legWidth=( bodyWidth)/2
    let legheight= height/2;

    d3.select("#"+shape).append("rect").attr("x", xLeg).attr("y", yLeg).attr("width", legWidth).attr("height", legheight).attr("stroke","black").style("fill","white");;
    d3.select("#"+shape).append("rect").attr("x", xLeg+(legWidth)).attr("y", yLeg).attr("width", legWidth).attr("height", legheight).attr("stroke","black").style("fill","white");;
  }

  drawPetals(shape:string){
    let cx=100/2
    let cy= 100/2
    let r= 100/10
    d3.select("#"+shape).append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");

    let wedges= this.drawWedges(cx,cy,r);
    console.log(wedges)

    let wedgesKeys=['firstWedge','secondWedge',"thirdWedge"];

    for (let i=0;i<3;i++)
    {
      this.drawLines(wedges[wedgesKeys[i]],shape)
    }
  }

  drawLines(wedges:any,shape:string)

  {
    d3.select("#"+shape).append("line").attr("x1",wedges.first.x).attr("y1",wedges.first.y).attr("x2",wedges.second.x).attr("y2",wedges.second.y).attr("stroke","black")
    d3.select("#"+shape).append("line").attr("x1",wedges.third.x).attr("y1",wedges.third.y).attr("x2",wedges.fourth.x).attr("y2",wedges.fourth.y).attr("stroke","black")
    d3.select("#"+shape).append("line").attr("x1",wedges.second.x).attr("y1",wedges.second.y).attr("x2",wedges.fourth.x).attr("y2",wedges.fourth.y).attr("stroke","black")

  }

  drawWedges(cx:number,cy:number,r:number) : any
  {
    //  let thetaArray = [Math.floor(Math.PI*(2/3))-5,Math.floor(Math.PI*(4/3))-5,Math.floor(Math.PI*(2))-5];

    let thetaArray = [1.195551,3.2899456,5.3843407];
    let firstWedge = this.getCoordinates(cx,cy,r,thetaArray[0])
    let secondWedge =  this.getCoordinates(cx,cy,r,thetaArray[1])
    let thirdWedge= this.getCoordinates(cx,cy,r,thetaArray[2])

    return {firstWedge:firstWedge, secondWedge:secondWedge, thirdWedge: thirdWedge}
  }

  getCoordinates(cx:number,cy:number,r:number,theta:number) : any
  {
    let first =  this.findCoordinates(cx,cy,r,theta);
    let second = this.findCoordinates(cx,cy,r+cx/2,theta)
    let third =  this.findCoordinates(cx,cy,r,theta+0.785398)
    let fourth = this.findCoordinates(cx,cy,r+cx/2,theta+0.785398)

    return {first: first, second : second, third: third, fourth: fourth}
  }

  findCoordinates(cx:number,cy:number,r:number,theta:number) : any
  {
    let x= cx + (r* Math.cos(theta))
    let y= cy + (r * Math.sin(theta))

    return {x:x,y:y}
  }

  drawRectangles(shape:string)
  {
    let width=100;
    let height = 100;
    d3.select("#"+shape).append("rect").attr("x", 0).attr("y", 3.5*(height/10)).attr("width", 3*(width/10)).attr("height", 3*(height/10)).attr("stroke","black").style("fill","white");
    d3.select("#"+shape).append("rect").attr("x", (3*(width/10))+5).attr("y", 3.5*(height/10)).attr("width", 3*(width/10)).attr("height", 3*(height/10)).attr("stroke","black").style("fill","white");
    d3.select("#"+shape).append("rect").attr("x", (6*(width/10))+10).attr("y", 3.5*(height/10)).attr("width", 3*(width/10)).attr("height", 3*(height/10)).attr("stroke","black").style("fill","white");


  }


}
