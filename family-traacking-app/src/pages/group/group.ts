import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Content, Events } from 'ionic-angular';
import { GroupService } from '../../providers/groups/groups.service';
import { MembersPage } from '../members/members';
import { GroupinfoPage } from '../groupinfo/groupinfo';
import { LocationTracker } from '../../providers/location/location';
import { UsersProvider } from '../../providers/users/users';
declare var google: any
@Component({
  selector: 'page-group',
  templateUrl: 'group.html',
})
export class GroupPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  owner: boolean = false;
  uid: string;
  group;
  groupId;
  groupName;
  groupmembers;
  latitude;
  longitude;
  constructor(public userSer: UsersProvider, public locationTracker: LocationTracker, public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupService,
    public actionSheet: ActionSheetController, public events: Events, public loadingCtrl: LoadingController) {

    this.group = this.navParams.get('group');
    this.groupId = this.group.groupid;
    this.groupName = this.group.groupName;
  }

  ionViewDidLoad() {
    this.groupservice.getownership(this.groupId).then((res) => {
      if (res) {
        this.owner = true;
        this.groupmembers = this.groupservice.currentgroup;
      }
      else {
        this.groupservice.getgroupmembers();
      }
    }).catch((err) => {
      alert(err);
    })

    this.events.subscribe('gotmembers', () => {
      this.groupmembers = this.groupservice.currentgroup;
      console.log(this.groupmembers)
      this.locationTracker.currentPosition().subscribe((res) => {
        this.latitude = res['coords']['latitude'];
        this.longitude = res['coords']['longitude'];
        this.userSer.updateUser({latitude:this.latitude, longitude:this.longitude})
      })
    })

  }

  presentOwnerSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push(GroupinfoPage, { group: this.group });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  presentMemberSheet() {
    let sheet = this.actionSheet.create({
      title: 'Group Actions',
      buttons: [
        {
          text: 'Group Info',
          icon: 'person',
          handler: () => {
            this.navCtrl.push(GroupinfoPage, { group: this.group });
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'cancel',
          handler: () => {
            console.log('Cancelled');
          }
        }
      ]
    })
    sheet.present();
  }

  loadMap() {

    let latLng = new google.maps.LatLng(24.8613875, 67.0439383);

    let mapOptions = {
      center: latLng,
      zoom: 15,
    }

    for(var i = 0 ; i < this.groupmembers.length; i++){
      console.log("sadf")
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(this.groupmembers[i].latitude),parseFloat(this.groupmembers[i].longitude)),
        map:this.map,
      })
    }
    
    this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    this.marker();
  }
  marker(){
    this.groupmembers.length > 0 && this.groupmembers.map((val)=>{
      console.log(val)
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(val.latitude),parseFloat(val.longitude)),
        map:this.map,
      })
    })
  }
}
