import { Component } from '@angular/core';
import { AtcEditComponent } from '../atc-edit/atc-edit.component';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { isAtcFormatValidator } from 'src/app/validators/isAtcFormatValidator';
import { isLocaleValidator } from 'src/app/validators/isLocaleValidator';
import { uniqueValuesValidator } from 'src/app/validators/uniqueValuesValidator';
import { Atc } from 'src/app/entities/atc-to-create';

@Component({
  selector: 'app-atc-element',
  templateUrl: './atc-element.component.html',
  styleUrl: './atc-element.component.css'
})
export class AtcElementComponent extends AtcEditComponent {

  override ngOnInit(): void {
    this.atcForm = this.fb.group({
      atc: new FormControl({ value: '', disabled: true }, isAtcFormatValidator()),
      descriptions: this.fb.array([this.fb.group({
        locale: new FormControl({ value: 'es_ES', disabled: true }, [isLocaleValidator()]),
        description: new FormControl({ value: '', disabled: true })
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
  override addExistingLanguage(localeInitialValue: string, descriptionInitialValue: string) {
    this.atcLanguages.push(this.atcLanguages[(this.atcLanguages.length - 1)] + 1)
    const temp = <FormArray>this.atcForm.controls['descriptions']
    temp.push(this.fb.group({
      locale: new FormControl({ value: localeInitialValue, disabled: true }, [Validators.required, isLocaleValidator()]),
      description: new FormControl({ value: descriptionInitialValue, disabled: true })
    },))
  }
}

