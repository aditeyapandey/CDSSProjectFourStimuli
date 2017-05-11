/**
 * Created by aditeyapandey on 5/11/17.
 */
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

  // draw() : void
  // {
  //   d3.select("svg").selectAll("*").remove()
  //   let cx=this.width/2;
  //   let cy=this.height/2;
  //   let r=this.width/4
  //   //faceoutline
  //   d3.select("svg").append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
  //   // d3.select("svg").append("circle").attr("cx", 80).attr("cy", 100).attr("r",70).attr("stroke","black").style("fill","white");
  //   //eyes
  //   d3.select("svg").append("circle").attr("cx", cx-cx/10).attr("cy", cy-cy/3).attr("r",r/5).attr("stroke","black").style("fill","white");
  //   d3.select("svg").append("circle").attr("cx", cx+cx/10).attr("cy", cy-cy/3).attr("r",r/5).attr("stroke","black").style("fill","white");
  //   //nose
  //   d3.select("svg").append("line").attr("x1",cx).attr("y1",cy-cy/7).attr("x2",cx).attr("y2",cy+cy/4).attr("stroke","black");
  //   //mouth
  //   let arcPath="M"+(cx-cx/5)+","+(cy+cy/4)+" a1,1 0 0,0 "+(r-r/6)+",0";
  //   console.log(arcPath);
  //   d3.select("svg").append("line").attr("x1",cx-cx/5).attr("y1",cy+cy/3).attr("x2",cx+cx/5).attr("y2",cy+cy/3).attr("stroke","black");
  //   //d3.select("svg").append("path").attr("d",arcPath).attr("stroke","black").style("fill","white")
  //
  // }

}
