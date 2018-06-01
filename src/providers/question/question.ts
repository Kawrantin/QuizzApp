import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

/*
  Generated class for the QuestionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuestionProvider {

  constructor(public http: Http) {
  }

  public getQuizz(amount, difficulty): Promise<Object>{
    return new Promise((resolve, reject) => {
      this.http.get("https://opentdb.com/api.php?amount="+amount+"&difficulty="+difficulty)
        .toPromise()
        .then((response) => {
          let data = response.json();
          if(data) {
            resolve(data);
          }
          else {
            reject("Impossible d'interpréter la réponse du serveur");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }

}
