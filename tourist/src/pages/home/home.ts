import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AuthData } from '../../providers/auth-data';
import { LocationsProvider } from '../../providers/locations/locations'
import { Login } from '../login/login';
import { ModalAutocompletePage } from '../modal-autocomplete/modal-autocomplete';
import { PhotosPage } from '../photos/photos';
declare var google;
@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {
    latLng: any = { lat: 24.8614622, lng: 67.0099388 };
    address: any = {
        place: '',
        set: false
    }
    map: any;
    placeService: any;
    Destination: string = '';
    placedetails: any;
    photos = [];
    constructor(public navCtrl: NavController, public modCtrl: ModalController, public authData: AuthData, private locService: LocationsProvider) {

    }

    ngOnInit() {

    }

    ionViewDidLoad() {
        this.locService.currentPosition().subscribe((res) => {
            this.latLng.lat = res.coords.latitude;
            this.latLng.lng = res.coords.longitude;
            console.log(this.latLng)
            this.initMap();
            this.initPlacedetails();
        })

    }

    private initMap() {
        var point = this.latLng;
        let divMap = (<HTMLInputElement>document.getElementById('map'));
        this.map = new google.maps.Map(divMap, {
            center: point,
            zoom: 15,
            draggable: true,
            zoomControl: true
        });

        let marker = new google.maps.Marker({
            position:this.latLng,
            map: this.map,
            animation: google.maps.Animation.DROP,
            label:'A'
        })
        marker.setMap(this.map);

        if (this.Destination.length > 0) {
            this.loadMap();
        }
    }

    showModal() {

        let modal = this.modCtrl.create(ModalAutocompletePage);
        modal.onDidDismiss(data => {
            if (data) {
                this.address.place = data.description;
                this.Destination = data.description;
                this.getDetails(data.place_id); // when modal dismiss call getDetials
                this.initMap();
                this.locService.selectedPlace(data.description)
            }
        })
        modal.present();
    }

    showPhotosModal() {
        let modal = this.modCtrl.create(PhotosPage, { photos: this.photos });
        modal.present();
    }

    getDetails(placeId: string) {
        let that = this
        let request = {
            placeId: placeId
        }
        this.placeService = new google.maps.places.PlacesService(this.map);
        this.placeService.getDetails(request, callback);

        function callback(place, status): void {
            if (status === "OK") {
                that.placedetails.address = place.formatted_address;
                that.placedetails.lat = place.geometry.location.lat();
                that.placedetails.lng = place.geometry.location.lng();
                that.photos = place.photos;
                place.address_components.map((val, i) => {
                    let addressType = place.address_components[i].types[0];
                    if (that.placedetails.components[addressType]) {
                        that.placedetails.components[addressType].set = true;
                        that.placedetails.components[addressType].short = place.address_components[i]['short_name'];
                        that.placedetails.components[addressType].long = place.address_components[i]['long_name']
                    }
                })

                that.map.setCenter(place.geometry.location);
                that.address.set = true;
            }
        }
    }

    private createMarker(place: any) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: this.map,
            position: placeLoc
        });
    }

    private initPlacedetails() {
        this.placedetails = {
            address: '',
            lat: '',
            lng: '',
            components: {
                route: { set: false, short: '', long: '' },                           // calle 
                street_number: { set: false, short: '', long: '' },                   // numero
                sublocality_level_1: { set: false, short: '', long: '' },             // barrio
                locality: { set: false, short: '', long: '' },                        // localidad, ciudad
                administrative_area_level_2: { set: false, short: '', long: '' },     // zona/comuna/partido 
                administrative_area_level_1: { set: false, short: '', long: '' },     // estado/provincia 
                country: { set: false, short: '', long: '' },                         // pais
                postal_code: { set: false, short: '', long: '' },                     // codigo postal
                postal_code_suffix: { set: false, short: '', long: '' },              // codigo postal - sufijo
            }
        };
    }

    private reset() {
        this.initPlacedetails();
        this.address.place = '';
        this.address.set = false;
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

    logOut() {
        this.authData.logoutUser().then(() => {
            this.navCtrl.setRoot(Login);
        });
    }

}
