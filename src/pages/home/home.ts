import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { QuizzPage } from "../quizz/quizz";
import {QuestionProvider} from "../../providers/question/question";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public amount:number = 5;
  public difficulty:string;
  public errorMessage:string = "";

  constructor(public navCtrl: NavController, public questionProvider: QuestionProvider) {
    }

public getQuestions(){
    this.errorMessage = "";
  if(this.amount && this.difficulty != null){
    this.goToQuizzPage();
  }
  else {
    this.errorMessage = "Veuillez remplir les champs.";
  }
}

  public async goToQuizzPage(){
    this.navCtrl.push(QuizzPage, {
      amount: this.amount,
      difficulty: this.difficulty,
    });
  }
}
