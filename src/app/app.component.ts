import { Component,ElementRef,ViewChild } from '@angular/core';
// import * as d3 from "d3";
import { Rectangle,Man,Petals,Face } from './shape-detail';
import {ShapeCreator} from "./ShapeCreator/shapecreator"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}




//
// const shapes: Shape[] = [
//   { id: 11, name: 'Rectangle', figure:new Rectangle()},
//   { id: 12, name: 'Petals', figure: new Petals() },
//   { id: 13, name: 'TotemPole', figure: new Man() },
//   { id: 14, name: 'Face', figure : new Face() }
// ];
//
//
//
//
// export class Shape {
//   id: number;
//   name: string;
//   figure :any;
// }
//
//
// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls:['./app.component.style.css'],
//   providers: [Petals,Man,Rectangle]
// })
// export class AppComponent {
//
//
//   title = 'Create Shapes';
//   shapes = shapes;
//   selectedHero: Shape;
//   selectedImage : Shape;
//   private visWidth: number;
//   private visHeight: number;
//   innerHeight: any;
//   innerWidth: any;
//
//   @ViewChild('mainScreen') elementView: ElementRef;
//   private viewHeight: number
//
//   constructor(private petals:Petals,private man: Man, private rectangle:Rectangle) {
//     this.visWidth = (window.screen.width) ;
//     this.visHeight = (window.screen.height);
//     this.innerHeight = (window.screen.height) - (10/100)*(window.screen.height)
//     this.innerWidth =  (window.screen.width) - (10/100)*(window.screen.width)
//   }
//   onSelect(shape: Shape): void
//   {
//     // let svgContainer = d3.select("body").append("svg").attr("width", 200).attr("height", 200);
//     this.selectedHero = shape;
//   }
//   drawCanvas(shape: Shape) : void
//   {
//     this.viewHeight = this.elementView.nativeElement.offsetHeight;
//     this.selectedImage=shape
//     shape.figure.draw();
//     console.log(this.innerWidth)
//     console.log(this.visWidth)
//     console.log(this.visHeight)
//     console.log(this.viewHeight)
//     d3.select("svg").attr("width", this.visWidth/2).attr("height",2*(this.visHeight/3));
//
//   }
// }


