import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AddProfileModalComponent } from '../add-profile-modal/add-profile-modal.component';
import { Profile } from '../models/profile.model';
import { ExpertServicesService } from '../services/expert-services.service';
import { SharedDataService } from '../shared-data-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  Profiles: Array<Profile> = [];

  private profilesSub;

  constructor(
    private modalCtrl: ModalController,
    private route: Router,
    private sharedDataService: SharedDataService,
    private serverServices: ExpertServicesService
  ) {
    this.serverServices.getUserInfo();
    this.getProfileSub();
  }
  getProfileSub() {
    this.profilesSub = this.serverServices
      .getProfileSub()
      .subscribe((element) => {
        this.Profiles = element;
      });
  }
  addProfile() {
    this.openModal();
  }
  async openModal() {
    this.route.navigateByUrl('add-profile-page');
  }
  selectProfile(id) {
    this.sharedDataService.changeSelectedProfile(id);
    this.serverServices.getRecommendation(id);
    this.serverServices.setBlogs();
  }
  // getProfiles() {
  //   this.Profiles = this.serverServices.getProfiles();
  // }

  ionViewWillLeave() {
    console.log('çıkış yapılıyor');
  }
}
