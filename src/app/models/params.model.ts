/**
 * Created by aditeyapandey on 5/26/17.
 */

export class Parameters{
  public  n_trials_train:number
  public n_trials_Test:number
  public keyChoices:number[]
  public Nstim_Cat1:number[]
  public Nstim_Cat2:number[]

  public allFeatures:boolean[][]


  constructor()
  {
    this.n_trials_train=100;
    this.n_trials_Test=100;
    this.keyChoices=[50,50];
    this.Nstim_Cat1=[2,2,2,6,6,6,27];
    this.Nstim_Cat2=[13,13,13,3,3,3,1];
    this.allFeatures=[[true,false,false],  // all possible feature configurations
      [false,true,false],
      [false,false,true],
      [true,true,false],
      [false,true,true],
      [true,false,true],
      [true,true,true]]

  }

}
