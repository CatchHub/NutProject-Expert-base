import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Profile } from '../models/profile.model';
import { ExpertServicesService } from '../services/expert-services.service';
import { SharedDataService } from '../shared-data-service';
@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.page.html',
  styleUrls: ['./profile-settings.page.scss'],
})
export class ProfileSettingsPage implements OnInit {
  profileForm: FormGroup;

  selectedDiseases: any = [];
  userMail: any;
  diseasesArea: any = [
    {
      name: 'Kalp Rahatsızlığı',
      value: 'Heart Disease',
    },
    {
      name: 'Kolestrol',
      value: 'Colestherol',
    },
    {
      name: 'Böbrek Rahatsızlığı',
      value: 'Kidney Disease',
    },
    {
      name: 'Karaciğer Rahatsızlığı',
      value: 'Liver Disease',
    },
    {
      name: 'İshal',
      value: 'Diarrhea',
    },
    {
      name: 'Diyabet',
      value: 'Diabetes',
    },
    {
      name: 'Safra Kesesi Rahatsızlığı',
      value: 'Gall Bladder Disease',
    },
  ];
  public gender;
  public activityLevel;
  public diseaseSection;
  selectedProfileID: any;
  selectedProfile: Profile;
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private alertCtrl: AlertController,
    private serverServices: ExpertServicesService,
    private sharedDataService: SharedDataService
  ) {
    this.sharedDataService.selectedProfileID.subscribe(
      (selectedID) => (this.selectedProfileID = selectedID)
    );
    this.selectedProfile = this.serverServices.getProfileByID(
      this.selectedProfileID
    );
    this.profileForm = this.formBuilder.group({
      name: [this.selectedProfile.name, Validators.required],
      weight: [this.selectedProfile.weight, Validators.required],
      height: [this.selectedProfile.height, Validators.required],
      age: [this.selectedProfile.age, Validators.required],
      activityLevel: [this.selectedProfile.activityLevel, Validators.required],
      gender: [this.selectedProfile.gender, Validators.required],
      diseasesArea: this.createDiseaseAreas(this.diseasesArea),
    });
  }

  ngOnInit() {}

  // denemefn(str: string) {
  //   return false;
  //   if (str == this.gender) return true;
  //   else return false;
  // }
  getSelectedExpertAreaNames() {
    this.selectedDiseases = this.profileForm.controls['diseasesArea'][
      'controls'
    ]
      .map((expertACtrl, i) => {
        if (expertACtrl.value) {
          return this.diseasesArea[i].value;
        }
      })
      .filter((x) => x);
  }
  createDiseaseAreas(diseasesAreasInputs: any[]) {
    let counter = 0;
    const arr = diseasesAreasInputs.map((diseaseA) => {
      return new FormControl(
        diseaseA.selected || this.selectedProfile.diseases[counter++]
      );
    });
    return new FormArray(arr);
  }

  submitForm() {
    if (
      this.profileForm.controls['name'].value &&
      this.profileForm.controls['weight'].value &&
      this.profileForm.controls['height'].value &&
      this.profileForm.controls['name'].value &&
      this.profileForm.controls['gender'].value &&
      this.profileForm.controls['age'].value &&
      this.profileForm.controls['activityLevel'].value
    ) {
      this.getSelectedExpertAreaNames();

      this.saveProfile();
      this.presentAlert('Başarılı', 'Profil düzenlendi', '', 'Harika');
      this.route.navigateByUrl('/tabs/tab3');
    } else {
      this.presentAlert(
        'Uyarı',
        'Eksik veya hatalı veri',
        'Lütfen tüm alanları doğru şekilde doldurduğunuzdan emin olunuz.',
        'OK'
      );
    }
  }

  async presentAlert(head, subHead, msg, btn) {
    const alert = await this.alertCtrl.create({
      header: head,
      subHeader: subHead,
      message: msg,
      buttons: [
        {
          text: btn,
          handler: () => {
            this.reloadFunction();
          },
        },
      ],
    });

    await alert.present();
  }

  saveProfile() {
    let profile = new Profile(
      this.profileForm.controls['name'].value,
      this.profileForm.controls['weight'].value,
      this.profileForm.controls['height'].value,
      this.profileForm.controls['gender'].value,
      this.profileForm.controls['age'].value,
      this.profileForm.controls['activityLevel'].value,
      this.profileForm.controls['diseasesArea'].value,
      this.selectedProfile.id
    );
    this.serverServices.alterUserInfo(profile);
    console.log(profile);
  }

  reloadFunction() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
  clickedProfile() {}
}
