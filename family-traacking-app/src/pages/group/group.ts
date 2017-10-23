import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams, ActionSheetController, LoadingController, Content, Events } from 'ionic-angular';
import { GroupService } from '../../providers/groups/groups.service';
import { MembersPage } from '../members/members';
import { GroupinfoPage } from '../groupinfo/groupinfo'; 
import { LocationTracker } from '../../providers/location/location';
declare var google:any
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
  constructor(public locationTracker:LocationTracker, public navCtrl: NavController, public navParams: NavParams, public groupservice: GroupService,
    public actionSheet: ActionSheetController, public events: Events, public loadingCtrl: LoadingController) {

    this.group = this.navParams.get('group');
    this.groupId = this.group.groupid;
    this.groupName = this.group.groupName;
  }

  ionViewDidLoad() {
    this.groupservice.getownership(this.groupId).then((res) => {
      if (res)
       {
        this.owner = true;
        this.groupmembers = this.groupservice.currentgroup;      
       }
        else{
          this.groupservice.getgroupmembers();
        }
    }).catch((err) => {
      alert(err);
    })

    this.events.subscribe('gotmembers', () => {
      this.groupmembers = this.groupservice.currentgroup;
    })
    this.loadMap()
    
    this.locationTracker.currentPosition().subscribe((res)=>{
      this.latitude = res['coords']['latitude'];
      this.longitude = res['coords']['longitude'];
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
            this.navCtrl.push(GroupinfoPage, { group:this.group});
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
            this.navCtrl.push(GroupinfoPage, {group: this.group});
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

  loadMap(){
    
       let latLng = new google.maps.LatLng(-34.9290, 138.6010);
    
       let mapOptions = {
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
    
       this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
    
     }
}
