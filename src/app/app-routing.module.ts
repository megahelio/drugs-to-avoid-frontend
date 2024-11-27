import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';

const drugsModule = () => import('./modules/drug/drug.module').then(x => x.DrugModule);

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Drugs To Avoid'
  },
  {
    path: 'drugs',
    loadChildren: drugsModule,
    title: 'Drugs To Avoid'
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Drugs To Avoid'
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

