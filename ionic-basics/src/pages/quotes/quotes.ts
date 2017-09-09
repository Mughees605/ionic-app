import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Quote } from '../../data/quote.interface';

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit{
  quoteGroup:{ category: string, quotes: Quote[], icon: string }
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
  }
  
  ngOnInit(){
    this.quoteGroup = this.navParams.data;
  }
  
  onAddToFavorite(selectedQuote:Quote){
     const alert = this.alertCtrl.create({
       title:"Add quote",
       subTitle:"Are you sure?",
       message:"Are you sure you want to add quote?",
       buttons:[{
         text:"yes go ahead",
         handler: ()=>{
           console.log('ok')
         }
       },
       {
         text:"No",
         role:"cancel",
         handler:()=>{
           console.log('No')
         }
       }

      ]
     })
     alert.present();
  }
}
