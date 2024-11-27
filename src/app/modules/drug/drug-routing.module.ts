import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrugTableComponent } from './drug/drug-table/drug-table.component';
import { DrugMainComponent } from './drug/drug-main/drug-main.component';
import { DrugElementComponent } from './drug/drug-element/drug-element.component';
import { adminGuard } from '../security/admin.guard';
import { AtcCrudComponent } from './atc/atc-crud/atc-crud.component';
import { DrugCrudComponent } from './drug/drug-crud/drug-crud.component';


const routes: Routes = [
  {
    path: '',
    component: DrugMainComponent,
    children: [
      {
        path: '',
        component: DrugTableComponent
      },
      {
        path: 'view/:id',
        component: DrugElementComponent
      },
      {
        path: 'crud/drug',
        component: DrugCrudComponent,
        canActivate: [adminGuard]
      },
      {
        path: 'crud/atc',
        component: AtcCrudComponent,
        canActivate: [adminGuard]
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrugRoutingModule { }
