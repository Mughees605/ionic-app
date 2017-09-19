import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  photos = [];
  constructor(public viewCtrl: ViewController, public navParams: NavParams) {
    this.photos = this.navParams.get('photos')
  }

  ionViewDidLoad() {
   this.photos.map((val)=>{
     console.log(val.getUrl({ 'maxWidth': 350, 'maxHeight': 350 }))
   })
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
