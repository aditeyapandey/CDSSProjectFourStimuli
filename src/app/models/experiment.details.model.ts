/**
 * Created by aditeyapandey on 5/12/17.
 */

export class Experiment {
  get workerid(): string {
    return this._workerid;
  }

  get responseArray(): number[] {
    return this._responseArray;
  }

  get trueCategory(): number[] {
    return this._trueCategory;
  }
  id: number
  number_training_trials:number
  number_test_trials:number
  currentSelection:string
  _workerid:string
  _responseArray:number[]
  _trueCategory:number[]
  _stimuliTraining:string[]
  _stimuliTest:string[]
  _trainingTrueCategory:number[]

  constructor()
  {
    this.number_training_trials=100;
    this.number_test_trials=100
  }

  getTrainingTrials()
  {
    return this.number_training_trials
  }
  getTestTrials()
  {
    return this.number_test_trials;
  }
  setTrainingTrials(value:number)
  {
    this.number_training_trials=value;
  }
  setTestTrials(value:number)
  {
    this.number_test_trials=value;
  }
  setCurrentSelection(selectedShape:string)
  {
    this.currentSelection=selectedShape;
  }
  getCurrentSelection()
  {
    return this.currentSelection;
  }



}
