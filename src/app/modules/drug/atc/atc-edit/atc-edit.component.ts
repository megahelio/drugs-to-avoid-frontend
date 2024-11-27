import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DtaApiService } from '../../services/dta-api.service';
import { TOASTR_TOKEN, Toastr } from '../../services/toastr.service';
import { AtcAddComponent } from '../atc-add/atc-add.component';
import { isAtcFormatValidator } from 'src/app/validators/isAtcFormatValidator';
import { isLocaleValidator } from 'src/app/validators/isLocaleValidator';
import { uniqueValuesValidator } from 'src/app/validators/uniqueValuesValidator';
import { Atc } from 'src/app/entities/atc-to-create';

@Component({
  selector: 'app-atc-edit',
  templateUrl: './atc-edit.component.html',
  styleUrl: './atc-edit.component.css'
})
export class AtcEditComponent extends AtcAddComponent {
  atcId: string;

  constructor(dialogRef: DialogRef, fb: FormBuilder, dtaApiService: DtaApiService, @Inject(TOASTR_TOKEN) toastr: Toastr, @Inject(DIALOG_DATA) public data: any) {
    super(dialogRef, fb, dtaApiService, toastr);
    this.atcId = data.id;
  }
  override ngOnInit(): void {
    this.atcForm = this.fb.group({
      atc: new FormControl('', isAtcFormatValidator()),
      descriptions: this.fb.array([this.fb.group({
        locale: new FormControl({ value: 'es_ES', disabled: true }, [isLocaleValidator()]),
        description: new FormControl('')
      })], {
        validators: uniqueValuesValidator()
      })
    })
    console.log(this.atcForm.controls['descriptions']);
    this.dtaApiService.getAtc(this.atcId).subscribe({
      next: (value: Atc) => {
        this.atcForm.get('atc')?.patchValue(value['atcCode'])

        for (let clave in value['descriptions']) {
          if (clave === 'es_ES') {
            (this.atcForm.get('descriptions') as FormArray).at(0).get('description')?.setValue(value['descriptions'][clave])
          } else {
            this.addExistingLanguage(clave, value['descriptions'][clave])
          }
        }
      },
    }
    )
  }
  protected addExistingLanguage(localeInitialValue: string, descriptionInitialValue: string) {
    this.atcLanguages.push(this.atcLanguages[(this.atcLanguages.length - 1)] + 1)
    const temp = <FormArray>this.atcForm.controls['descriptions']
    temp.push(this.fb.group({
      locale: new FormControl(localeInitialValue, [Validators.required, isLocaleValidator()]),
      description: new FormControl(descriptionInitialValue)
    },))
  }
  override onSubmit() {
    console.log();

    if (this.atcForm.invalid) {
      this.toastr.error("", $localize`${"Formulario Inválido"}`)
      return
    }

    let atcToEdit: Atc = {
      atcCode: this.atcForm.get('atc')?.value,
      descriptions: {}
    }
    this.atcForm.controls['descriptions'].getRawValue().forEach((v: any) => {
      const locale = v['locale']
      const description = v['description']
      atcToEdit.descriptions[locale] = description
    })

    console.log(atcToEdit);

    this.toastr.info(atcToEdit.atcCode, $localize`${"Actualizando ATC"}`)
    this.dtaApiService.editAtc(this.atcId ,atcToEdit).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        this.toastr.error(err, $localize`${' "Error en Back-end"'}`);
      },
      complete: () => {
        this.toastr.success("", $localize`${'ATC Editado'}`);
        this.dialogRef.close()
      },
    })
  }
}
