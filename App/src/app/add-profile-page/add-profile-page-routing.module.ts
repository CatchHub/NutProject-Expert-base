import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProfilePagePage } from './add-profile-page.page';

const routes: Routes = [
  {
    path: '',
    component: AddProfilePagePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddProfilePagePageRoutingModule {}
