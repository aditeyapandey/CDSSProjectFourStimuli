/**
 * Created by aditeyapandey on 5/11/17.
 */
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
  //
  // draw() : void
  // {
  //   d3.select("svg").selectAll("*").remove()
  //   this.drawCircle();
  //   this.drawTorso();
  //   this.drawArms();
  //   this.drawLegs()
  // }
  //
  // drawCircle() : void
  // {
  //   // let cx=this.width/2
  //   // let cy=this.height/6
  //   // let r=(1/4)*(this.height/4)
  //
  //   let cx=this.faceCenterX
  //   let cy=this.faceCenterY
  //   let r=this.radiusFace
  //   d3.select("svg").append("circle").attr("cx", cx).attr("cy", cy).attr("r",r).attr("stroke","black").style("fill","white");
  // }
  // drawTorso() : void
  // {
  //   let x=this.faceCenterX-this.torsoOffset
  //   let y=this.faceCenterY+this.radiusFace
  //   let bodyWidth= this.bodyWidth
  //   let bodyHeight= this.bodyHeight
  //   d3.select("svg").append("rect").attr("x", x).attr("y", y).attr("width", bodyWidth).attr("height", bodyHeight).attr("stroke","black").style("fill","white");;
  // }
  // drawArms() : void
  // {
  //   let x=this.faceCenterX-this.armOffset
  //   let y=this.faceCenterY+this.radiusFace
  //   let armWidth= (this.faceCenterX-this.torsoOffset)-(this.faceCenterX-this.armOffset);
  //   let armheight= 20
  //   let x1=this.faceCenterX-this.torsoOffset+this.bodyWidth
  //   d3.select("svg").append("rect").attr("x", x).attr("y", y).attr("width", armWidth).attr("height", armheight).attr("stroke","black").style("fill","white");;
  //   d3.select("svg").append("rect").attr("x", x1).attr("y", y).attr("width", armWidth).attr("height", armheight).attr("stroke","black").style("fill","white");;
  //   //
  //   // console.log((armWidth*2)+this.bodyWidth)
  //   // console.log(this.height)
  // }
  // drawLegs(): void
  // {
  //   let x=this.faceCenterX-this.torsoOffset
  //   let y=(3/2*(this.height/4))+(this.height/6+((1/4)*(this.height/4)))
  //   let legWidth=( this.bodyWidth)/2
  //   let legheight= this.height/2;
  //
  //   d3.select("svg").append("rect").attr("x", x).attr("y", y).attr("width", legWidth).attr("height", legheight).attr("stroke","black").style("fill","white");;
  //   d3.select("svg").append("rect").attr("x", x+(legWidth)).attr("y", y).attr("width", legWidth).attr("height", legheight).attr("stroke","black").style("fill","white");;
  // }

}
