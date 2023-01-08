import { Component, ɵɵqueryRefresh } from '@angular/core';
import { SharedDataService } from '../shared-data-service';
import { HttpClient } from '@angular/common/http';
import { ExpertServicesService } from '../services/expert-services.service';
import { Profile } from '../models/profile.model';
import { Reccomendation } from '../models/reccomendation.model';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  name!: string;
  selectedProfileID: any;
  public profiles: Array<Profile>;
  private profilesSub;
  public selectedProfile: Profile;
  public profileRec: Reccomendation;
  constructor(
    private sharedDataService: SharedDataService,
    private http: HttpClient,
    private serverService: ExpertServicesService
  ) {
    this.sharedDataService.selectedProfileID.subscribe(
      (selectedID) => (this.selectedProfileID = selectedID)
    );
    this.profileRec = this.serverService.recommendation();
    this.selectProfile();
    this.getRec();
  }
  ionViewDidEnter() {
    this.profileRec = this.serverService.recommendation();
    this.changeAcceptableBMI();
  }
  selectProfile() {
    this.selectedProfile = this.serverService.getProfileByID(
      this.selectedProfileID
    );
  }
  getRec() {
    this.serverService.recommendation();
  }
  changeAcceptableBMI() {
    this.profileRec.acceptableBmi = this.profileRec.acceptableBmi.slice(4);
  }
}
