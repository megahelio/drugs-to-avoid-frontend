import { ChangeDetectorRef, Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DIALOG_DATA, Dialog, DialogRef } from '@angular/cdk/dialog';
import { DrugAddComponent } from '../drug-add/drug-add.component';
import { DtaApiService } from '../../services/dta-api.service';
import { TOASTR_TOKEN, Toastr } from '../../services/toastr.service';
import { AddTabComponent } from '../add-tab/add-tab.component';
import { Drug } from 'src/app/entities/drug/drug';
import { DrugTranslationToCreate } from 'src/app/entities/drug/drug-translation-to-create';

@Component({
  selector: 'app-drug-edit',
  templateUrl: './drug-edit.component.html',
  styleUrls: ['./drug-edit.component.css']
})
export class DrugEditComponent extends DrugAddComponent implements OnInit {

  drugForm!: FormGroup;
  drugId: number;
  @ViewChildren(AddTabComponent) override translationsForms!: QueryList<AddTabComponent>;

  constructor(
    dialogRef: DialogRef,
    @Inject(DIALOG_DATA) public data: any,
    dtaApiService: DtaApiService,
    dialog: Dialog,
    @Inject(TOASTR_TOKEN) toastr: Toastr,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    super(dialogRef, dialog, dtaApiService, toastr);
    this.drugId = data.id;
  }

  override ngOnInit() {
    this.dtaApiService.getExistingAtc().subscribe({
      next: (v) => {
        this.atcOptions = v;
      },
      error: (e) => console.error(e)

    })

    this.drugForm = new FormGroup({
      atcName: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      indication: new FormControl('', Validators.required),
      benefitsAvoid: new FormControl('', Validators.required),
      reasonWhyToAvoid: new FormControl('', Validators.required),
      alternativeProposalPrescribe: new FormControl('', Validators.required),

      translations: new FormGroup({}),
      sanitaryAlerts: new FormControl(''),
    });

    this.dtaApiService.dumpOne(this.drugId).subscribe(
      (drug) => {
        // Inicializar el formulario con los datos de la entidad Drug

        //Inicializar ATC
        this.atcNameForm.patchValue(drug);

        console.log(drug)
        //Inicializar Alertas
        for (let alert of drug.sanitaryAlerts) {
          this.onAddSanitaryAlert(alert)
        }

        //Inicializar traducciones
        for (let locale in drug.translations) {
          if (locale !== 'es_ES') {
            this.onAddTranslation(locale)
            //Necesito sincronizar de alguna manera translationsForms 
            this.changeDetectorRef.detectChanges();
          }
          this.translationsForms.get(this.languageTabsArray.indexOf(locale))?.drugForm.patchValue(drug.translations[locale])
        }
      })
  }
  override onSubmit(): void {
    let drugToCreate: Drug = {
      atcName: this.atcNameForm.get("atcName")?.value,
      translations: {},
      sanitaryAlerts: this.sanitaryAlertsLinks
    }
    let allValid: boolean = true;

    let drugTranslations: DrugTranslationToCreate = {}
    let index = 0;
    this.translationsForms.forEach((form) => {
      console.log(form);

      if (!form.drugForm.valid) {
        allValid = false;
        return
      }
      const language =
      {
        name: form.drugForm.value["name"],
        indication: form.drugForm.value["indication"],
        benefitsAvoid: form.drugForm.value["benefitsAvoid"],
        reasonWhyToAvoid: form.drugForm.value["reasonWhyToAvoid"],
        alternativeProposalPrescribe: form.drugForm.value["alternativeProposalPrescribe"]
      }
      drugTranslations[this.languageTabsArray[index]] = language;
      index++
    });
    if (allValid) {
      drugToCreate.translations = drugTranslations

      this.dtaApiService.editDrug(this.drugId, drugToCreate).subscribe({
        next: (v) => console.log(v),
        error: (e) => {
          this.toastr.error(e, $localize`${' "Error en Back-end"'}`);
        },
        complete: () => {
          this.toastr.success("", $localize`${'Medicamento Editado'}`);
          this.dialogRef.close()
        }

      });
    }
  }
}