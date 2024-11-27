import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrugRoutingModule } from './drug-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DrugMainComponent } from './drug/drug-main/drug-main.component';
import { DrugTableComponent } from './drug/drug-table/drug-table.component';
import { DrugElementComponent } from './drug/drug-element/drug-element.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { DrugEditComponent } from './drug/drug-edit/drug-edit.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { AddTabComponent } from './drug/add-tab/add-tab.component';
import { AddSanitaryalertModalComponent } from './drug/add-sanitaryalert-modal/add-sanitaryalert-modal.component';
import { AddTranslationModalComponent } from './drug/add-translation-modal/add-translation-modal.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { AtcCrudComponent } from './atc/atc-crud/atc-crud.component';
import { AtcElementComponent } from './atc/atc-element/atc-element.component';
import { AtcEditComponent } from './atc/atc-edit/atc-edit.component';
import { ExtractLastSegmentPipe } from 'src/app/extract-last-segment.pipe';
import { HomeComponent } from '../home/home.component';
import { DrugAddComponent } from './drug/drug-add/drug-add.component';
import { DrugCrudComponent } from './drug/drug-crud/drug-crud.component';
import { AtcAddComponent } from './atc/atc-add/atc-add.component';

@NgModule({
  declarations: [
    DrugMainComponent,
    DrugCrudComponent,
    DrugEditComponent,
    DrugTableComponent,
    DrugElementComponent,
    DrugAddComponent,
    AddTabComponent,
    AddTranslationModalComponent,
    AddSanitaryalertModalComponent,
    AtcAddComponent,
    AtcCrudComponent,
    AtcElementComponent,
    AtcEditComponent,
    ExtractLastSegmentPipe,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DrugRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatBottomSheetModule,
    MatExpansionModule,
    MatSelectModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTabsModule
  ]

})
export class DrugModule { }
