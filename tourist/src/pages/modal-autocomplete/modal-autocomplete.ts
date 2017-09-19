import { Component, OnInit } from '@angular/core';
import { IonicPage, ViewController } from 'ionic-angular';
declare var google: any;
@IonicPage()
@Component({
  selector: 'page-modal-autocomplete',
  templateUrl: 'modal-autocomplete.html',
})
export class ModalAutocompletePage implements OnInit {
  autoService: any;
  autocompleteItems: any;
  autocomplete: any;
  placesService: any;
  
  constructor(public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalAutocompletePage');
  }

  ngOnInit() {
    this.autoService = new google.maps.places.AutocompleteService();
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    }
  }
  
  dismiss(){
    this.viewCtrl.dismiss();
  }
   
  updateSearch(){

    if(this.autocomplete.query == ''){
       this.autocompleteItems = [];
       return;
    }
    let config = {
      input: this.autocomplete.query,
      componentRestrictions:{ country: 'PK'}
    }
    this.autoService.getPlacePredictions(config, (predictions,status)=>{
      this.autocompleteItems = [];
      if(predictions.length > 0){
        predictions.forEach((prediction)=>{
        this.autocompleteItems.push(prediction)
      })
      }
    })

  }

  chooseItem(item:any){
    this.viewCtrl.dismiss(item);
  }
}
