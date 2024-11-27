import { Component, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Drug } from 'src/app/entities/drug/drug';
import { DrugTranslationToCreate } from 'src/app/entities/drug/drug-translation-to-create';
import { AddSanitaryalertModalComponent } from '../add-sanitaryalert-modal/add-sanitaryalert-modal.component';
import { AddTabComponent } from '../add-tab/add-tab.component';
import { AddTranslationModalComponent } from '../add-translation-modal/add-translation-modal.component';
import { DtaApiService } from '../../services/dta-api.service';
import { TOASTR_TOKEN, Toastr } from '../../services/toastr.service';



@Component({
  selector: 'app-drug-add',
  templateUrl: './drug-add.component.html',
  styleUrls: ['./drug-add.component.css']
})
export class DrugAddComponent implements OnInit {

  @ViewChildren(AddTabComponent) translationsForms!: QueryList<AddTabComponent>;
  languageTabsArray: string[] = ["es_ES"];
  sanitaryAlertsLinks: string[] = [];
  atcOptions: string[] = [];
  atcNameForm!: FormGroup<any>;
  selected = new FormControl(0);

  constructor(public dialogRef: DialogRef, private readonly dialog: Dialog,
    protected readonly dtaApiService: DtaApiService,
    @Inject(TOASTR_TOKEN) protected toastr: Toastr) {

    this.atcNameForm = new FormGroup({
      atcName: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {

    this.dtaApiService.getExistingAtc().subscribe({
      next: (v) => {
        this.atcOptions = v;
      }
    })

  }

  onAddTranslation(aLanguage?: string) {
    if (typeof aLanguage !== 'undefined') {
      if (!this.languageTabsArray.includes(aLanguage)) {
        this.languageTabsArray.push(aLanguage);
      }
      else {
        /* Creo esta funcion para, en la funcionalidad de edicion,
       añadir al formulario las traducciones recuperadas de la entidad a editar.
       Este else no deberia ejecutarse nunca a no ser que idiomas duplicados en backend*/
        this.toastr.warning(
          $localize`${`${aLanguage} ya existe`}`,
          $localize`${'Idioma no creado'}`)
      }
    }
    else {//Si no se recibe parámetro se abre modal para pedir el código del idioma
      const dialogRef = this.dialog.open<string>(AddTranslationModalComponent);
      dialogRef.closed.subscribe((result) => {
        if (result) {
          if (!this.languageTabsArray.includes(result)) {
            this.languageTabsArray.push(result);
            this.selected.setValue(this.languageTabsArray.length - 1);
          }
          else {
            this.toastr.warning(
              $localize`${`${result}  ya existe`}`,
              $localize`${'Idioma no creado'}`)
          }
        }
      });
    }
  }

  onAddSanitaryAlert(aSanitaryAlertLink?: string) {

    if (typeof aSanitaryAlertLink !== 'undefined') {
      if (!this.sanitaryAlertsLinks.includes(aSanitaryAlertLink)) {
        this.sanitaryAlertsLinks.push(aSanitaryAlertLink);
      }
      else {
        /* Creo esta funcion para, en la funcionalidad de edicion,
        añadir al formulario las alertas sanitarias recuperadas de la entidad a editar.
        Este else no deberia ejecutarse nunca a no ser que existan alertas duplicadas en backend*/
        this.toastr.warning(
          $localize`${`${aSanitaryAlertLink} ya existe`}`,
          $localize`${'Alerta no añadida'}`
        )
      }
    } else { //Si no se recibe parámetro se abre modal para pedir el enlace
      const dialogRef = this.dialog.open<string>(AddSanitaryalertModalComponent,);
      dialogRef.closed.subscribe((result) => {
        if (result) {
          if (!this.sanitaryAlertsLinks.includes(result)) {
            this.sanitaryAlertsLinks.push(result);
          }
          else {
            this.toastr.warning(
              $localize`${`${result} ya existe`}`,
              $localize`${'Alerta no añadida'}`
            )
          }
        }
      });
    }
  }
  onDeleteSanitaryAlert(index: number) {
    this.sanitaryAlertsLinks.splice(index, 1)
  }
  removeTab(index: number) {
    this.languageTabsArray.splice(index, 1)
  }
  onSubmit() {
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

      this.dtaApiService.createDrug(drugToCreate).subscribe({
        next: (v) => console.log(v),
        error: (e) => {
          this.toastr.error(e, $localize`${' "Error en Back-end"'}`);
        },
        complete: () => {
          this.toastr.success("", $localize`${'Medicamento Creado'}`);
          this.onExit()
        }
      });
    }
  }
  onExit() {
    this.dialogRef.close()
  }
}
