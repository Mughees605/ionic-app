import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuotesService } from '../../services/quote';
import { Quote } from '../../data/quote.interface'
@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private qtSer:QuotesService) {
  }

  quotes:Quote[]; 

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ionViewWilEnter(){
    this.quotes = this.qtSer.getFavoriteQuotes();
  }

}
