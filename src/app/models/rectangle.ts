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
  // draw(): void{
  //   d3.select("svg").selectAll("*").remove()
  //   console.log("hello")
  //
  //   d3.select("svg").append("rect").attr("x", 0).attr("y", 0).attr("width", this.width).attr("height", this.height).attr("stroke","black").style("fill","white");
  // }
}
