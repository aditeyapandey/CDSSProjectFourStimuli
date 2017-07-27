/**
 * Created by aditeyapandey on 5/18/17.
 */

/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
declare var d3: any;


@Injectable()
export class ShapeService {

  constructor(private http: Http) { }

  drawRectangles(shape:string,widthRect:number,heightRect:number,featureArray:any)
  {
    if(shape!="instructionSVG2"){  d3.select("#"+shape).html("")}
    console.log("reaching here")
    console.log(widthRect)
    console.log(heightRect)
    let width=widthRect;
    let height = heightRect;

    let rectCoordinates=this.generateRectangleCoordinates(3,width,height,10);

    let firstRect= rectCoordinates.padding;
    let secondRect=(2*rectCoordinates.padding)+rectCoordinates.rect
    let thirdRect=(3*rectCoordinates.padding)+(2*rectCoordinates.rect)
    let sizeofpixel=7


    d3.select("#"+shape).append("rect").attr("x", 0).attr("y", 3.5*(height/10)-((5/100)*3.5*(height/10))).attr("width",width).attr("height",  rectCoordinates.rect+((10/100)*3.5*(height/10))).attr("stroke","black").style("fill","white")

    d3.select("#svgContainer")
    //d3.select("#"+shape).append("rect").attr("x", firstRect).attr("y", 3.5*(height/10)).attr("width", rectCoordinates.rect).attr("height", rectCoordinates.rect ).attr("stroke","black").style("fill",this.rectFill(featureArray[0]));
    //d3.select("#"+shape).append("rect").attr("x",secondRect).attr("y", 3.5*(height/10)).attr("width", rectCoordinates.rect).attr("height", rectCoordinates.rect).attr("stroke","black").style("fill",this.rectFill(featureArray[1]));
    //d3.select("#"+shape).append("rect").attr("x", thirdRect).attr("y", 3.5*(height/10)).attr("width", rectCoordinates.rect).attr("height", rectCoordinates.rect).attr("stroke","black").style("fill",this.rectFill(featureArray[2]));
    d3.select("#"+shape).append("circle").attr("cx",firstRect+(rectCoordinates.rect/2)).attr("cy",3.5*(height/10)+(rectCoordinates.rect/2)).attr("r",(rectCoordinates.rect/2)).attr("stroke","black").style("fill","white").style("opacity",this.rectFill(featureArray[0]));
    d3.select("#"+shape).append("circle").attr("cx",secondRect+(rectCoordinates.rect/2)).attr("cy",3.5*(height/10)+(rectCoordinates.rect/2)).attr("r",(rectCoordinates.rect/2)).attr("stroke","black").style("fill","white").style("opacity",this.rectFill(featureArray[1]));
    d3.select("#"+shape).append("circle").attr("cx",thirdRect+(rectCoordinates.rect/2)).attr("cy",3.5*(height/10)+(rectCoordinates.rect/2)).attr("r",(rectCoordinates.rect/2)).attr("stroke","black").style("fill","white").style("opacity",this.rectFill(featureArray[2]));


    if(shape=="instructionSVG2") {
      //Drawing the annotation lines
      d3.select("#" + shape).append("line").attr("x1", firstRect+(rectCoordinates.rect/2)).attr("x2", firstRect+(rectCoordinates.rect/2)).attr("y1", 3.5*(height/10)+rectCoordinates.rect ).attr("y2", 3.5*(height/10)+(2*rectCoordinates.rect)).attr("stroke", "red").style("stroke-width", 1)
      d3.select("#" + shape).append("line").attr("x1", secondRect+(rectCoordinates.rect/2)).attr("x2", secondRect+(rectCoordinates.rect/2)).attr("y1", 3.5*(height/10) ).attr("y2", 3.5*(height/10)-(1*rectCoordinates.rect)).attr("stroke", "red").style("stroke-width", 1)
      d3.select("#" + shape).append("line").attr("x1", thirdRect+(rectCoordinates.rect/2)).attr("x2", thirdRect+(rectCoordinates.rect/2)).attr("y1", 3.5*(height/10)+rectCoordinates.rect ).attr("y2", 3.5*(height/10)+(2*rectCoordinates.rect)).attr("stroke", "red").style("stroke-width", 1)

      //Feature Names
      d3.select("#" + shape).append("text").attr("x", firstRect).attr("y",3.5*(height/10)+(2*rectCoordinates.rect)+sizeofpixel).text("Feature 1").attr("fill", "red").style("font-size", sizeofpixel+"px")
      d3.select("#" + shape).append("text").attr("x", secondRect).attr("y", 3.5*(height/10)-(1*rectCoordinates.rect)-sizeofpixel/2).text("Feature 2").attr("fill", "red").style("font-size", sizeofpixel+"px")
      d3.select("#" + shape).append("text").attr("x", thirdRect).attr("y", 3.5*(height/10)+(2*rectCoordinates.rect)+sizeofpixel).text("Feature 3").attr("fill", "red").style("font-size", sizeofpixel+"px")
    }
  }

  generateRectangleCoordinates(rect:number,width:number,height:number,padding:number)
  {
      let totalPaddingpercent=rect*padding
      let totalRectpercent=100-totalPaddingpercent

      let totalWidthRect=(totalRectpercent/100)*width;
      let totalPaddingWidth=(totalPaddingpercent/100)*width;

      return {rect:totalWidthRect/rect,padding:totalPaddingWidth/(rect+1)};

  }

  rectFill(feature):number
  {
    if(feature)
    {
      return 1
    }
    else{
      return 0
    }

  }



  drawFace(shape:string,widthFace:number,heightFace:number,featureArray:any)
  {
    if(shape!="instructionSVG2"){  d3.select("#"+shape).html("")}

    let cx=widthFace/2;
    let cy=(heightFace/2);
    let r=widthFace/2.5
    let sizeOfPixel=7;


    //faceoutline

      d3.select("#"+shape).append("circle").attr("fill-opacity",0).attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
      // d3.select("svg").append("circle").attr("cx", 80).attr("cy", 100).attr("r",70).attr("stroke","black").style("fill","white");

    if(featureArray[0]) {
      //eyes
      d3.select("#" + shape).append("circle").attr("cx", cx - cx / 5).attr("cy", cy - cy / 3).attr("r", cx / 5).attr("stroke", "black").style("fill", "white");
      d3.select("#" + shape).append("circle").attr("cx", cx + cx / 5).attr("cy", cy - cy / 3).attr("r", cx / 5).attr("stroke", "black").style("fill", "white");
    }
    if(featureArray[1]) {
      //nose
      d3.select("#" + shape).append("line").attr("x1", cx).attr("y1", cy - cy / 7).attr("x2", cx).attr("y2", cy + cy / 4).attr("stroke", "black");
    }
    if(featureArray[2]) {
      //mouth
      let arcPath = "M" + (cx - cx / 5) + "," + (cy + cy / 4) + " a1,1 0 0,0 " + (r - r / 6) + ",0";
      console.log(arcPath);
      d3.select("#" + shape).append("line").attr("x1", cx - cx / 5).attr("y1", cy + cy / 3).attr("x2", cx + cx / 5).attr("y2", cy + cy / 3).attr("stroke", "black");
      //d3.select("svg").append("path").attr("d",arcPath).attr("stroke","black").style("fill","white")
    }
    if(shape=="instructionSVG2") {
      d3.select("#" + shape).append("line").attr("x1", cx - cx / 5).attr("x2", cx - cx / 2).attr("y1",cy - cy / 3).attr("y2",cy - cy+8 ).attr("stroke", "red").style("stroke-width", 1)
      d3.select("#" + shape).append("line").attr("x1", 0 ).attr("y1", cy + cy / 6).attr("x2", cx ).attr("y2", cy + cy / 6).attr("stroke", "red").style("stroke-width", 1)
      d3.select("#" + shape).append("line").attr("x1", cx).attr("y1", cy + cy / 3).attr("x2", cx-(cx/2)).attr("y2", cy+cy ).attr("stroke", "red").style("stroke-width", 1);
      // d3.select("#" + shape).append("line").attr("x1", ((6 * (width / 10)) + 10) + ((3 * (width / 10)) / 2)).attr("x2", ((6 * (width / 10)) + 10) + ((3 * (width / 10)) / 2)).attr("y1", (3.5 * (height / 10)) + (3 * (height / 10))).attr("y2", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10)))).attr("stroke", "red").style("stroke-width", 1)
      //
      // //Feature Names
      // d3.select("#" + shape).append("text").attr("x", ((3.5 * (height / 10)) / 2.2) - 6).attr("y", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10))) + 5).text("Feature 1").attr("fill", "red").style("font-size", "4px")
      // d3.select("#" + shape).append("text").attr("x", ((3 * (width / 10)) + 5) + ((3 * (width / 10)) / 2) - 6).attr("y", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10))) + 5).text("Feature 2").attr("fill", "red").style("font-size", "4px")
      // d3.select("#" + shape).append("text").attr("x", ((6 * (width / 10)) + 10) + ((3 * (width / 10)) / 2) - 6).attr("y", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10))) + 5).text("Feature 3").attr("fill", "red").style("font-size", "4px")

      d3.select("#" + shape).append("text").attr("x",cx - cx / 1.2 ).attr("y",cy - cy+7).text("Feature 1").attr("fill", "red").style("font-size", sizeOfPixel+"px")
      d3.select("#" + shape).append("text").attr("x",(-cx/1.5) ).attr("y", cy + cy / 5).text("Feature 2").attr("fill", "red").style("font-size", sizeOfPixel+"px")
      d3.select("#" + shape).append("text").attr("x",cx-(cx/1.2)).attr("y",cy+cy+5).text("Feature 3").attr("fill", "red").style("font-size", sizeOfPixel+"px")
    }

    }

    drawFaceScrambled(shape:string,widthFace:number,heightFace:number,featureArray:any)
    {
      if(shape!="instructionSVG2"){  d3.select("#"+shape).html("")}

      let cx=widthFace/2;
      let cy=(heightFace/2);
      let r=widthFace/2.5
      let sizeOfPixel=7;
      let cxeyes=widthFace/3


      //faceoutline

      d3.select("#"+shape).append("circle").attr("fill-opacity",0).attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
      // d3.select("svg").append("circle").attr("cx", 80).attr("cy", 100).attr("r",70).attr("stroke","black").style("fill","white");

      if(featureArray[2]) {
        //eyes
        d3.select("#" + shape).append("circle").attr("cx", cx - cx / 5-(cx/4)).attr("cy", cy + cy / 3).attr("r", cx / 5).attr("stroke", "black").style("fill", "white");
        d3.select("#" + shape).append("circle").attr("cx", cx + cx / 5-(cx/4)).attr("cy", cy + cy / 3).attr("r", cx / 5).attr("stroke", "black").style("fill", "white");
      }
      if(featureArray[0]) {
        //nose
        d3.select("#" + shape).append("line").attr("x1", cx+cx/2).attr("y1", cy + cy / 7).attr("x2", cx+cx/2).attr("y2", cy + cy / 4 +cy/3.5).attr("stroke", "black");
      }
      if(featureArray[1]) {
        //mouth
        let arcPath = "M" + (cx - cx / 5) + "," + (cy + cy / 4) + " a1,1 0 0,0 " + (r - r / 6) + ",0";
        console.log(arcPath);
        d3.select("#" + shape).append("line").attr("x1", cx - cx / 5).attr("y1", cy - cy / 3).attr("x2", cx + cx / 5).attr("y2", cy - cy / 3).attr("stroke", "black");
        //d3.select("svg").append("path").attr("d",arcPath).attr("stroke","black").style("fill","white")
      }
      if(shape=="instructionSVG2") {
        d3.select("#" + shape).append("line").attr("x1", cx - cx / 6).attr("x2", cx - cx / 2).attr("y1",cy - cy / 3).attr("y2",cy - cy+8 ).attr("stroke", "red").style("stroke-width", 1)
        d3.select("#" + shape).append("line").attr("x1", cx+cx/2 ).attr("y1", cy + cy / 3).attr("x2", cx+cx/2+cx/2 ).attr("y2", cy + cy / 3).attr("stroke", "red").style("stroke-width", 1)
        d3.select("#" + shape).append("line").attr("x1", cx-(cx/2)).attr("y1", cy + cy / 3).attr("x2", cx-(cx/2)).attr("y2", cy+cy ).attr("stroke", "red").style("stroke-width", 1);
        // d3.select("#" + shape).append("line").attr("x1", ((6 * (width / 10)) + 10) + ((3 * (width / 10)) / 2)).attr("x2", ((6 * (width / 10)) + 10) + ((3 * (width / 10)) / 2)).attr("y1", (3.5 * (height / 10)) + (3 * (height / 10))).attr("y2", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10)))).attr("stroke", "red").style("stroke-width", 1)
        //
        // //Feature Names
        // d3.select("#" + shape).append("text").attr("x", ((3.5 * (height / 10)) / 2.2) - 6).attr("y", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10))) + 5).text("Feature 1").attr("fill", "red").style("font-size", "4px")
        // d3.select("#" + shape).append("text").attr("x", ((3 * (width / 10)) + 5) + ((3 * (width / 10)) / 2) - 6).attr("y", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10))) + 5).text("Feature 2").attr("fill", "red").style("font-size", "4px")
        // d3.select("#" + shape).append("text").attr("x", ((6 * (width / 10)) + 10) + ((3 * (width / 10)) / 2) - 6).attr("y", (3.5 * (height / 10)) + (3 * (height / 10)) + ((50 / 100) * (3 * (height / 10))) + 5).text("Feature 3").attr("fill", "red").style("font-size", "4px")

        d3.select("#" + shape).append("text").attr("x",cx - cx / 1.2 ).attr("y",cy - cy+7).text("Feature 2").attr("fill", "red").style("font-size", sizeOfPixel+"px")
        d3.select("#" + shape).append("text").attr("x",(2*cx) ).attr("y", cy + cy / 2.5).text("Feature 1").attr("fill", "red").style("font-size", sizeOfPixel+"px")
        d3.select("#" + shape).append("text").attr("x",cx-(cx/1.2)).attr("y",cy+cy+5).text("Feature 3").attr("fill", "red").style("font-size", sizeOfPixel+"px")
      }

    }


  drawMan(shape:String,heightMan:number,widthMan:number,featureArray:any)
  {
    if(shape!="instructionSVG2"){  d3.select("#"+shape).html("")}

    let height=heightMan;
    let width=widthMan;
    let faceCenterX=width/2;
    let faceCenterY=(height/20)+0.5;
    let radiusFace=height/20;
    let torsoOffset=width/15;
    let bodyHeight=(7.7/20)*height
    let bodyWidth=width/7.5;
    let armOffset=width/2;
    let sizeofpixel=7;

    if(featureArray[0]) {
      //Face of the totempole
      let cx = faceCenterX
      let cy = faceCenterY
      let r = radiusFace
      d3.select("#" + shape).append("circle").attr("cx", cx).attr("cy", cy).attr("r", r).attr("stroke", "black").style("fill", "white");
    }
    //Torso drawing
    let x=faceCenterX-torsoOffset
    let y=faceCenterY+radiusFace
    let bodyWidthTorso= bodyWidth
    let bodyHeightTorso= bodyHeight
    d3.select("#"+shape).append("rect").attr("x", x).attr("y", y).attr("width", bodyWidthTorso).attr("height", bodyHeightTorso).attr("stroke","black").style("fill","white");

    //Arms
    if(featureArray[1]) {
      let xArm = faceCenterX - armOffset;
      let yArm = faceCenterY + radiusFace;
      let armWidth = (faceCenterX - torsoOffset) - (faceCenterX - armOffset);
      let armheight = height / 20;
      let x1 = faceCenterX - torsoOffset + bodyWidth;
      d3.select("#" + shape).append("rect").attr("x", xArm).attr("y", yArm).attr("width", armWidth).attr("height", armheight).attr("stroke", "black").style("fill", "white");
      d3.select("#" + shape).append("rect").attr("x", x1).attr("y", yArm).attr("width", armWidth).attr("height", armheight).attr("stroke", "black").style("fill", "white");
    }
    //Legs
    if(featureArray[2]) {
      let xLeg = faceCenterX - torsoOffset
      let yLeg = (3 / 2 * (height / 4)) + (faceCenterY + ((1 / 4) * (height / 4)))
      let legWidth = ( bodyWidth) / 2
      let legheight = height / 2;

      d3.select("#" + shape).append("rect").attr("x", xLeg).attr("y", yLeg).attr("width", legWidth).attr("height", legheight).attr("stroke", "black").style("fill", "white");
      ;
      d3.select("#" + shape).append("rect").attr("x", xLeg + (legWidth)).attr("y", yLeg).attr("width", legWidth).attr("height", legheight).attr("stroke", "black").style("fill", "white");
      ;
    }
    if(shape=="instructionSVG2")
    {



      d3.select("#" + shape).append("line").attr("x1", faceCenterX-radiusFace).attr("x2", faceCenterX-(4*radiusFace)).attr("y1",faceCenterY).attr("y2",faceCenterY-sizeofpixel).attr("stroke", "red").style("stroke-width", 1)
      d3.select("#" + shape).append("line").attr("x1", faceCenterX - torsoOffset).attr("x2", faceCenterX - (4*torsoOffset)).attr("y1",12*faceCenterY).attr("y2",12*faceCenterY).attr("stroke", "red").style("stroke-width", 1)
      d3.select("#" + shape).append("line").attr("x1", faceCenterX - armOffset).attr("x2",faceCenterX - armOffset-(armOffset/4)).attr("y1",faceCenterY + radiusFace+height / 40).attr("y2",faceCenterY + radiusFace+height / 40).attr("stroke", "red").style("stroke-width", 1)
      //d3.select("#" + shape).append("line").attr("x1", faceCenterX - armOffset+(6*bodyWidth)).attr("x2",faceCenterX - armOffset+(6*bodyWidth)).attr("y1",faceCenterY + radiusFace).attr("y2",faceCenterY + radiusFace+(bodyHeight/2)).attr("stroke", "red").style("stroke-width", 1)

      d3.select("#" + shape).append("text").attr("x",faceCenterX-(9*radiusFace)).attr("y",faceCenterY-(1.1*sizeofpixel)).text("Feature 1").attr("fill", "red").style("font-size", sizeofpixel+"px")
      d3.select("#" + shape).append("text").attr("x",faceCenterX - (9*torsoOffset)).attr("y",12.5*faceCenterY).text("Feature 3").attr("fill", "red").style("font-size", sizeofpixel+"px")
      d3.select("#" + shape).append("text").attr("x",faceCenterX - armOffset-(armOffset/4)-(6.5*radiusFace)).attr("y",faceCenterY+(2*radiusFace)).text("Feature 2").attr("fill", "red").style("font-size", sizeofpixel+"px")
      //d3.select("#" + shape).append("text").attr("x",faceCenterX - armOffset+(6*bodyWidth)-sizeofpixel).attr("y",faceCenterY + radiusFace+(bodyHeight/2)+10).text("Feature 2").attr("fill", "red").style("font-size", sizeofpixel+"px")

      // d3.select("#" + shape).append("line").attr("x1", faceCenterX).attr("x2", faceCenterX+faceCenterX/4).attr("y1",faceCenterY).attr("y2",faceCenterY).attr("stroke", "red").style("stroke-width", 1)
      // d3.select("#" + shape).append("line").attr("x1", faceCenterX).attr("x2", faceCenterX+faceCenterX/2).attr("y1",12*faceCenterY).attr("y2",12*faceCenterY).attr("stroke", "red").style("stroke-width", 1)
      // d3.select("#" + shape).append("line").attr("x1", faceCenterX - armOffset+10).attr("x2",faceCenterX - armOffset+10).attr("y1",faceCenterY + radiusFace).attr("y2",faceCenterY + radiusFace+(bodyHeight/2)).attr("stroke", "red").style("stroke-width", 1)
      // //d3.select("#" + shape).append("line").attr("x1", faceCenterX - armOffset+(6*bodyWidth)).attr("x2",faceCenterX - armOffset+(6*bodyWidth)).attr("y1",faceCenterY + radiusFace).attr("y2",faceCenterY + radiusFace+(bodyHeight/2)).attr("stroke", "red").style("stroke-width", 1)
      //
      // d3.select("#" + shape).append("text").attr("x",faceCenterX+faceCenterX/3- sizeofpixel).attr("y",faceCenterY).text("Feature 1").attr("fill", "red").style("font-size", sizeofpixel+"px")
      // d3.select("#" + shape).append("text").attr("x",faceCenterX+faceCenterX/2-sizeofpixel).attr("y",13*faceCenterY-sizeofpixel).text("Feature 3").attr("fill", "red").style("font-size", sizeofpixel+"px")
      // d3.select("#" + shape).append("text").attr("x",faceCenterX - armOffset).attr("y",faceCenterY + radiusFace+(bodyHeight/2)+sizeofpixel).text("Feature 2").attr("fill", "red").style("font-size", sizeofpixel+"px")
      // //d3.select("#" + shape).append("text").attr("x",faceCenterX - armOffset+(6*bodyWidth)-sizeofpixel).attr("y",faceCenterY + radiusFace+(bodyHeight/2)+10).text("Feature 2").attr("fill", "red").style("font-size", sizeofpixel+"px")


    }

  }


  drawPetals(shape:string,height:number,width:number,featureArray:any)
  {
    if(shape!="instructionSVG2")
    d3.select("#"+shape).html("")
    let cx=width/2
    let cy= height/2
    let r= width/6
    let sizeOfPixel=7;
    d3.select("#"+shape).append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");

    let wedges= this.drawWedges(cx,cy,r);
    let wedgesKeys =[];

    if(featureArray[0])
    {
      wedgesKeys.push("thirdWedge")
    }
    if(featureArray[1])
    {
      wedgesKeys.push("firstWedge")
    }
    if(featureArray[2])
    {
      wedgesKeys.push("secondWedge")
    }

    console.log(featureArray);

    //let wedgesKeys=['firstWedge','secondWedge','thirdWedge'];

    for (let i=0;i<wedgesKeys.length;i++)
    {
      this.drawLines(wedges[wedgesKeys[i]],shape)
    }
    if(shape=="instructionSVG2") {
      let wedges1=wedges.firstWedge;
      let wedges3=wedges.thirdWedge;
      let wedges2=wedges.secondWedge;

       d3.select("#"+shape).append("line").attr("x1",wedges3.fourth.x).attr("x2",wedges3.fourth.x).attr("y1",wedges3.fourth.y-(sizeOfPixel)).attr("y2",wedges3.fourth.y+(2*sizeOfPixel)).attr("stroke", "red").style("stroke-width", 1)
       d3.select("#" +shape).append("text").attr("x",wedges3.fourth.x/2).attr("y", wedges3.fourth.y-(1.2*sizeOfPixel) ).text("Feature 1").attr("fill", "red").style("font-size", sizeOfPixel+"px")
       d3.select("#"+shape).append("line").attr("x1",wedges1.second.x).attr("x2",wedges1.second.x).attr("y1",wedges1.second.y-sizeOfPixel).attr("y2",wedges1.second.y+(2*sizeOfPixel)).attr("stroke", "red").style("stroke-width", 1)
       d3.select("#" + shape).append("text").attr("x",wedges1.third.x).attr("y", wedges1.second.y-(1.2*sizeOfPixel) ).text("Feature 2").attr("fill", "red").style("font-size", sizeOfPixel+"px")
       d3.select("#"+shape).append("line").attr("x1",(3/4)*wedges2.second.x).attr("x2",(3/4)*wedges2.second.x).attr("y1",wedges2.fourth.y-(2*sizeOfPixel)).attr("y2",wedges2.fourth.y+(sizeOfPixel)).attr("stroke", "red").style("stroke-width", 1)
       d3.select("#" + shape).append("text").attr("x",(3/4)*wedges2.second.x-((3/16)*wedges2.second.x)).attr("y",wedges2.fourth.y+(1.8*sizeOfPixel)).text("Feature 3").attr("fill", "red").style("font-size", sizeOfPixel+"px")


      // d3.select("#"+shape).append("line").attr("x1",wedges1.second.x).attr("x2",wedges1.second.x).attr("y1",3*wedges1.second.y).attr("y2",5.5*wedges1.second.y).attr("stroke", "red").style("stroke-width", 1)
      // d3.select("#"+shape).append("line").attr("x1",wedges3.fourth.x).attr("x2",wedges3.fourth.x).attr("y1",3*wedges3.fourth.y).attr("y2",6*wedges3.fourth.y).attr("stroke", "red").style("stroke-width", 1)
      // d3.select("#"+shape).append("line").attr("x1",(5/6)*wedges2.second.x).attr("x2",(1)*wedges2.second.x).attr("y1",(5/6)*wedges2.second.y).attr("y2",(5/6)*wedges2.second.y).attr("stroke", "red").style("stroke-width", 1)
      //
      //
      // d3.select("#" + shape).append("text").attr("x",wedges1.third.x).attr("y", 5.5*wedges1.second.y+sizeOfPixel ).text("Feature 1").attr("fill", "red").style("font-size", sizeOfPixel+"px")
      // d3.select("#" + shape).append("text").attr("x",wedges3.second.x).attr("y", 6*wedges3.fourth.y+sizeOfPixel ).text("Feature 3").attr("fill", "red").style("font-size", sizeOfPixel+"px")
      // d3.select("#" + shape).append("text").attr("x",wedges2.second.x+(sizeOfPixel/2)).attr("y",(7/8)*wedges2.second.y).text("Feature 2").attr("fill", "red").style("font-size", sizeOfPixel+"px")
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
    let firstWedge=this.getCoordinates(cx,cy,r,thetaArray[2])
    let secondWedge = this.getCoordinates(cx,cy,r,thetaArray[0])
    let thirdWedge =  this.getCoordinates(cx,cy,r,thetaArray[1])


    return {firstWedge:firstWedge, secondWedge:secondWedge, thirdWedge: thirdWedge}
  }

  getCoordinates(cx:number,cy:number,r:number,theta:number) : any
  {
    let first =  this.findCoordinates(cx,cy,r,theta);
    let second = this.findCoordinates(cx,cy,r+2*(cx/3),theta)
    let third =  this.findCoordinates(cx,cy,r,theta+0.785398)
    let fourth = this.findCoordinates(cx,cy,r+2*(cx/3),theta+0.75)

    return {first: first, second : second, third: third, fourth: fourth}
  }

  findCoordinates(cx:number,cy:number,r:number,theta:number) : any
  {
    let x= cx + (r* Math.cos(theta))
    let y= cy + (r * Math.sin(theta))

    return {x:x,y:y}
  }



}
