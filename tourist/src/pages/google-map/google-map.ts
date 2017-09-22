import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsProvider } from '../../providers/locations/locations';
import { Subscription } from 'rxjs/Subscription';
import { ModalAutocompletePage } from '../modal-autocomplete/modal-autocomplete';

declare var google;
@Component({
  selector: 'page-google-map',
  templateUrl: 'google-map.html',
})
export class GoogleMapPage {
  subscription: Subscription
  Destination: string = 'Frere Hall';
  MyLocation: any;
  map: any;
  latLng: any = { lat: "", lng: "" };
  constructor(public navCtrl: NavController, public navParams: NavParams, private geoLoc: Geolocation, private locService: LocationsProvider, public modCtrl: ModalController) {
  }
  ionViewDidLoad() {
    this.locService.currentPosition().subscribe((res) => {
      this.latLng.lat = res.coords.latitude;
      this.latLng.lng = res.coords.longitude;
      this.Destination = this.navParams.data;
      this.initMap();
    })

  }

  initMap() {
    console.log('hello')
    console.log(this.Destination)
    let mapOptions = {
      center: this.latLng,
      zoom: 15,
    }

    this.map = new google.maps.Map(document.getElementById('google-map'), mapOptions);
    if (this.Destination) {
      this.loadMap();
    }
  }

  loadMap() {
    let directionService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);

    directionService.route({
      origin: this.latLng,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, (res, status) => {
      if (status === 'OK') {
        directionsDisplay.setDirections(res);
      }
      else {
        window.alert(`Direction Failed ${status}`)
      }
    })
  }

}
