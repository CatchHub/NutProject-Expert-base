import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProfilePagePageRoutingModule } from './add-profile-page-routing.module';

import { AddProfilePagePage } from './add-profile-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProfilePagePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [AddProfilePagePage],
})
export class AddProfilePagePageModule {}
