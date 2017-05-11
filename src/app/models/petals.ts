/**
 * Created by aditeyapandey on 5/11/17.
 */
export class Petals{
  private no_of_Petal : number
  private height: number;
  private width:number;

  constructor()
  {
    this.no_of_Petal=3;
    this.height=(window.screen.height)/2;
    this.width=(window.screen.width)/2;

  }
  // draw():void{
  //   d3.select("svg").selectAll("*").remove()
  //   let cx=this.width/2
  //   let cy= this.height/2
  //   let r= this.width/10
  //   d3.select("svg").append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
  //
  //   let wedges= this.drawWedges(cx,cy,r);
  //   console.log(wedges)
  //
  //   let wedgesKeys=['firstWedge','secondWedge',"thirdWedge"];
  //
  //   for (let i=0;i<3;i++)
  //   {
  //     this.drawLines(wedges[wedgesKeys[i]])
  //   }
  // }
  //
  // drawLines(wedges:any)
  //
  // {
  //   d3.select("svg").append("line").attr("x1",wedges.first.x).attr("y1",wedges.first.y).attr("x2",wedges.second.x).attr("y2",wedges.second.y).attr("stroke-width",2).attr("stroke","black")
  //   d3.select("svg").append("line").attr("x1",wedges.third.x).attr("y1",wedges.third.y).attr("x2",wedges.fourth.x).attr("y2",wedges.fourth.y).attr("stroke-width",2).attr("stroke","black")
  //   d3.select("svg").append("line").attr("x1",wedges.second.x).attr("y1",wedges.second.y).attr("x2",wedges.fourth.x).attr("y2",wedges.fourth.y).attr("stroke-width",2).attr("stroke","black")
  //
  // }
  //
  // drawWedges(cx:number,cy:number,r:number) : any
  // {
  //   //  let thetaArray = [Math.floor(Math.PI*(2/3))-5,Math.floor(Math.PI*(4/3))-5,Math.floor(Math.PI*(2))-5];
  //
  //   let thetaArray = [1.195551,3.2899456,5.3843407];
  //   let firstWedge = this.getCoordinates(cx,cy,r,thetaArray[0])
  //   let secondWedge =  this.getCoordinates(cx,cy,r,thetaArray[1])
  //   let thirdWedge= this.getCoordinates(cx,cy,r,thetaArray[2])
  //
  //   return {firstWedge:firstWedge, secondWedge:secondWedge, thirdWedge: thirdWedge}
  // }
  //
  // getCoordinates(cx:number,cy:number,r:number,theta:number) : any
  // {
  //   let first =  this.findCoordinates(cx,cy,r,theta);
  //   let second = this.findCoordinates(cx,cy,r+120,theta)
  //   let third =  this.findCoordinates(cx,cy,r,theta+0.785398)
  //   let fourth = this.findCoordinates(cx,cy,r+120,theta+0.785398)
  //
  //   return {first: first, second : second, third: third, fourth: fourth}
  // }
  //
  // findCoordinates(cx:number,cy:number,r:number,theta:number) : any
  // {
  //   let x= cx + (r* Math.cos(theta))
  //   let y= cy + (r * Math.sin(theta))
  //
  //   return {x:x,y:y}
  // }

}
