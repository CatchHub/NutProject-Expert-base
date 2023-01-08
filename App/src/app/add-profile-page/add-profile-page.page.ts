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

@Component({
  selector: 'app-add-profile-page',
  templateUrl: './add-profile-page.page.html',
  styleUrls: ['./add-profile-page.page.scss'],
})
export class AddProfilePagePage implements OnInit {
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
  constructor(
    private formBuilder: FormBuilder,
    private route: Router,
    private alertCtrl: AlertController,
    private serverServices: ExpertServicesService
  ) {
    this.profileForm = this.formBuilder.group({
      name: [undefined, Validators.required],
      weight: [undefined, Validators.required],
      height: [undefined, Validators.required],
      age: [undefined, Validators.required],
      activityLevel: [undefined, Validators.required],
      gender: [undefined, Validators.required],
      diseasesArea: this.createDiseaseAreas(this.diseasesArea),
    });
  }
  ngOnInit(): void {}

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
    const arr = diseasesAreasInputs.map((diseaseA) => {
      return new FormControl(diseaseA.selected || false);
    });
    return new FormArray(arr);
  }

  submitForm() {
    console.log(this.profileForm.controls['activityLevel'].value);
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

      this.createNewProfile();
      this.presentAlert(
        'Başarılı',
        'Profil Oluşturuldu',
        'Yeni oluşturulan profilin diyet planını görmek için seçili profil yapmayı unutmayın.',
        'Harika'
      );
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

  createNewProfile() {
    let profile = new Profile(
      this.profileForm.controls['name'].value,
      this.profileForm.controls['weight'].value,
      this.profileForm.controls['height'].value,
      this.profileForm.controls['gender'].value,
      this.profileForm.controls['age'].value,
      this.profileForm.controls['activityLevel'].value,
      this.profileForm.controls['diseasesArea'].value,
      0
    );
    this.serverServices.postUserInfo(profile);
    console.log(profile);
  }

  reloadFunction() {
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }
}
