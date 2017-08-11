import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ShapeCreator } from './ShapeCreator/shapecreator';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentSetup } from "./experiment/experiment.component"



const routing = RouterModule.forRoot([
  { path: 'Shape',      component: ShapeCreator },
  { path: '', component: ExperimentSetup }
]);



@NgModule({
  declarations: [
    AppComponent,
    ShapeCreator,
    ExperimentSetup
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
