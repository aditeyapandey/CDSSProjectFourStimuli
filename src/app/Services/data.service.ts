/**
 * Created by aditeyapandey on 5/11/17.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  constructor(private http: Http) { }

  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: "#collapseOne", name: 'Rectangle',instruction:"This stimuli will test categorization efficiency of a rectangular shape."},
      { id: "#collapseTwo", name: 'Petals',instruction:"This stimuli will test categorization efficiency of petals as glyph." },
      { id: "#collapseThree", name: 'TotemPole',instruction:"This stimuli will test categorization efficiency of a Totempole ."},
      { id: "#collapseFour", name: 'Face',instruction:"This stimuli will test categorization efficiency of a Face."}
    ];
  }

}
