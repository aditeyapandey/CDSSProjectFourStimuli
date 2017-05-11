/**
 * Created by aditeyapandey on 5/2/17.
 */
import { Component } from '@angular/core';
import {  NgZone } from '@angular/core';

import {stringify} from "@angular/core/src/util";

declare var d3: any;


export class Rectangle{
  private height: number;
  private width:number;
  private binary:boolean;


  constructor()
  {
    this.height=(window.screen.height)/2;
    this.width=(window.screen.width)/2;
    this.binary=true;
  }
  draw(): void{
    d3.select("svg").selectAll("*").remove()
    console.log("hello")

    d3.select("svg").append("rect").attr("x", 0).attr("y", 0).attr("width", this.width).attr("height", this.height).attr("stroke","black").style("fill","white");;
  }
}

export class Petals{
  private no_of_Petal : number
  private zone:NgZone
  private height: number;
  private width:number;

  constructor()
  {
    this.no_of_Petal=3;
    this.height=(window.screen.height)/2;
    this.width=(window.screen.width)/2;

  }
  draw():void{
    d3.select("svg").selectAll("*").remove()
    let cx=this.width/2
      let cy= this.height/2
      let r= this.width/10
      d3.select("svg").append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");

      let wedges= this.drawWedges(cx,cy,r);
      console.log(wedges)

      let wedgesKeys=['firstWedge','secondWedge',"thirdWedge"];

      for (let i=0;i<3;i++)
      {
        this.drawLines(wedges[wedgesKeys[i]])
      }
  }

  drawLines(wedges:any)

  {
    d3.select("svg").append("line").attr("x1",wedges.first.x).attr("y1",wedges.first.y).attr("x2",wedges.second.x).attr("y2",wedges.second.y).attr("stroke-width",2).attr("stroke","black")
    d3.select("svg").append("line").attr("x1",wedges.third.x).attr("y1",wedges.third.y).attr("x2",wedges.fourth.x).attr("y2",wedges.fourth.y).attr("stroke-width",2).attr("stroke","black")
    d3.select("svg").append("line").attr("x1",wedges.second.x).attr("y1",wedges.second.y).attr("x2",wedges.fourth.x).attr("y2",wedges.fourth.y).attr("stroke-width",2).attr("stroke","black")

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
    let second = this.findCoordinates(cx,cy,r+120,theta)
    let third =  this.findCoordinates(cx,cy,r,theta+0.785398)
    let fourth = this.findCoordinates(cx,cy,r+120,theta+0.785398)

    return {first: first, second : second, third: third, fourth: fourth}
  }

  findCoordinates(cx:number,cy:number,r:number,theta:number) : any
  {
    let x= cx + (r* Math.cos(theta))
    let y= cy + (r * Math.sin(theta))

    return {x:x,y:y}
  }

}

export class Man{

  private head:boolean
  private arm:boolean
  private leg:boolean
  private height:number
  private width:number
  private faceCenterX:number
  private faceCenterY:number
  private radiusFace:number
  private torsoOffset:number
  private bodyHeight:number
  private bodyWidth:number
  private armOffset:number

  constructor()
  {
    this.head=true
    this.arm=true
    this.leg=true
    this.height=(window.screen.height)/2;
    this.width=(window.screen.width)/2
    this.faceCenterX=this.width/2
    this.faceCenterY=this.height/6;
    this.radiusFace=(1/4)*(this.height/4)
    this.torsoOffset=this.width/15
    this.bodyHeight=3/2*(this.height/4)
    this.bodyWidth=this.width/7.5
    this.armOffset=this.width/3.2
  }

  draw() : void
  {
    d3.select("svg").selectAll("*").remove()
    this.drawCircle();
    this.drawTorso();
    this.drawArms();
    this.drawLegs()
  }

  drawCircle() : void
  {
    // let cx=this.width/2
    // let cy=this.height/6
    // let r=(1/4)*(this.height/4)

    let cx=this.faceCenterX
    let cy=this.faceCenterY
    let r=this.radiusFace
    d3.select("svg").append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
  }
  drawTorso() : void
  {
    let x=this.faceCenterX-this.torsoOffset
    let y=this.faceCenterY+this.radiusFace
    let bodyWidth= this.bodyWidth
    let bodyHeight= this.bodyHeight
    d3.select("svg").append("rect").attr("x", x).attr("y", y).attr("width", bodyWidth).attr("height", bodyHeight).attr("stroke","black").style("fill","white");;
  }
  drawArms() : void
  {
    let x=this.faceCenterX-this.armOffset
    let y=this.faceCenterY+this.radiusFace
    let armWidth= (this.faceCenterX-this.torsoOffset)-(this.faceCenterX-this.armOffset);
    let armheight= 20
    let x1=this.faceCenterX-this.torsoOffset+this.bodyWidth
    d3.select("svg").append("rect").attr("x", x).attr("y", y).attr("width", armWidth).attr("height", armheight).attr("stroke","black").style("fill","white");;
    d3.select("svg").append("rect").attr("x", x1).attr("y", y).attr("width", armWidth).attr("height", armheight).attr("stroke","black").style("fill","white");;
    //
    // console.log((armWidth*2)+this.bodyWidth)
    // console.log(this.height)
  }
  drawLegs(): void
  {
    let x=this.faceCenterX-this.torsoOffset
    let y=(3/2*(this.height/4))+(this.height/6+((1/4)*(this.height/4)))
    let legWidth=( this.bodyWidth)/2
    let legheight= this.height/2;

    d3.select("svg").append("rect").attr("x", x).attr("y", y).attr("width", legWidth).attr("height", legheight).attr("stroke","black").style("fill","white");;
    d3.select("svg").append("rect").attr("x", x+(legWidth)).attr("y", y).attr("width", legWidth).attr("height", legheight).attr("stroke","black").style("fill","white");;
  }

}

export class Face
{
  private eyes:boolean
  private nose:boolean
  private mouth:boolean
  private width:number
  private height:number

  constructor()
  {
    this.width= (window.screen.width)/2;
    this.height= (window.screen.height)/2;;
  }

  draw() : void
  {
    d3.select("svg").selectAll("*").remove()
    let cx=this.width/2;
    let cy=this.height/2;
    let r=this.width/4
    //faceoutline
    d3.select("svg").append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
   // d3.select("svg").append("circle").attr("cx", 80).attr("cy", 100).attr("r",70).attr("stroke","black").style("fill","white");
    //eyes
    d3.select("svg").append("circle").attr("cx", cx-cx/10).attr("cy", cy-cy/3).attr("r",r/5).attr("stroke","black").style("fill","white");
    d3.select("svg").append("circle").attr("cx", cx+cx/10).attr("cy", cy-cy/3).attr("r",r/5).attr("stroke","black").style("fill","white");
    //nose
    d3.select("svg").append("line").attr("x1",cx).attr("y1",cy-cy/7).attr("x2",cx).attr("y2",cy+cy/4).attr("stroke","black");
    //mouth
    let arcPath="M"+(cx-cx/5)+","+(cy+cy/4)+" a1,1 0 0,0 "+(r-r/6)+",0";
    console.log(arcPath);
    d3.select("svg").append("line").attr("x1",cx-cx/5).attr("y1",cy+cy/3).attr("x2",cx+cx/5).attr("y2",cy+cy/3).attr("stroke","black");
    //d3.select("svg").append("path").attr("d",arcPath).attr("stroke","black").style("fill","white")

  }

}
