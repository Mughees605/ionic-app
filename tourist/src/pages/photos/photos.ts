import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  photos = [];
  urls = [];
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.photos = this.navParams.get('photos')
  }

  ionViewDidLoad() {
   this.photos.map((val)=>{
     this.urls.push(val.getUrl({ 'maxWidth': 500, 'maxHeight':500  }))
   })
   
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
