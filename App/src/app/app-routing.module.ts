import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-profile-page',
    loadChildren: () => import('./add-profile-page/add-profile-page.module').then( m => m.AddProfilePagePageModule)
  },
  {
    path: 'profile-settings',
    loadChildren: () => import('./profile-settings/profile-settings.module').then( m => m.ProfileSettingsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
