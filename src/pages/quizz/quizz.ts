import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuestionProvider} from "../../providers/question/question";

/**
 * Generated class for the QuizzPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-quizz',
  templateUrl: 'quizz.html',
})
export class QuizzPage {

  public questions:Array<Object>;
  public currentQuestion:Array<Object> = [];
  public index:number = 0;
  public endingMessage = null;
  public tip:string = "";
  public answerClicked:boolean;



  constructor(public navCtrl: NavController, public navParams: NavParams,public questionProvider: QuestionProvider) {
  }


  public getCurrentQuestion(i){
    this.currentQuestion = [];
    this.currentQuestion.push(this.questions[i]);
  }

  public getNextQuestion(){
    this.index++;

    if(this.index < this.questions.length){
      this.getCurrentQuestion(this.index);
    }
    else{
      this.endingMessage ="Félicitation, vous avez terminé le quizz !"
    }
  }

  public backToMainPage() {
    this.navCtrl.popToRoot();
  }

  public async getQuizz(amount, difficulty) {
    let result = await this.questionProvider.getQuizz(amount,difficulty);
    this.questions = result["results"];
    this.getCurrentQuestion(this.index);

  };

  public giveAnswer(response){
    this.tip = "";
    if(response === this.questions[this.index]["correct_answer"]){
      this.tip = "Réponse correcte.";
    }
    else{
      this.tip = "Réponse incorrect.";
    }
    this.answerClicked = true;
  }


  ionViewDidLoad() {
    let amount = this.navParams.get("amount");
    let difficulty = this.navParams.get("difficulty");
    this.getQuizz(amount, difficulty);
  }

}
