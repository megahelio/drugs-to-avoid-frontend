import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Atc } from 'src/app/entities/atc-to-create';
import { DialogRef } from '@angular/cdk/dialog';
import { uniqueValuesValidator } from 'src/app/validators/uniqueValuesValidator';
import { isLocaleValidator } from 'src/app/validators/isLocaleValidator';
import { isAtcFormatValidator } from 'src/app/validators/isAtcFormatValidator';
import { DtaApiService } from '../../services/dta-api.service';
import { TOASTR_TOKEN, Toastr } from '../../services/toastr.service';

@Component({
  selector: 'app-atc-add',
  templateUrl: './atc-add.component.html',
  styleUrls: ['./atc-add.component.css']
})
export class AtcAddComponent implements OnInit {

  atcLanguages: number[] = [0];
  atcForm: FormGroup<any>;

  constructor(protected dialogRef: DialogRef, protected fb: FormBuilder, protected dtaApiService: DtaApiService, @Inject(TOASTR_TOKEN) protected toastr: Toastr) {
  }

  ngOnInit(): void {
    this.atcForm = this.fb.group({
      atc: new FormControl('', isAtcFormatValidator()),
      descriptions: this.fb.array([this.fb.group({
        locale: new FormControl({ value: 'es_ES', disabled: true }, [isLocaleValidator()]),
        description: new FormControl('')
      })], {
        validators: uniqueValuesValidator()
      })
    })
  }

  onSubmit() {
    console.log();

    if (this.atcForm.invalid) {
      this.toastr.error("", $localize`${"Formulario Inválido"}`)
      return
    }

    let atcToCreate: Atc = {
      atcCode: this.atcForm.get('atc')?.value,
      descriptions: {}
    }
    this.atcForm.controls['descriptions'].getRawValue().forEach((v: any) => {
      const locale = v['locale']
      const description = v['description']
      atcToCreate.descriptions[locale] = description
    })

    console.log(atcToCreate);

    this.toastr.info(atcToCreate.atcCode, $localize`${"Creando ATC"}`)
    this.dtaApiService.createAtc(atcToCreate).subscribe({
      next: (value) => {
        console.log(value);
      },
      error: (err) => {
        this.toastr.error(err, $localize`${' "Error en Back-end"'}`);
      },
      complete: () => {
        this.toastr.success("", $localize`${'ATC Creado'}`);
        this.dialogRef.close()
      },
    })
  }
  onAddLanguage() {
    this.atcLanguages.push(this.atcLanguages[(this.atcLanguages.length - 1)] + 1)
    const temp = <FormArray>this.atcForm.controls['descriptions']
    temp.push(this.fb.group({
      locale: new FormControl('', [Validators.required, isLocaleValidator()]),
      description: new FormControl('')
    },))
  }
  removeLanguage(index: number) {
    this.atcLanguages.splice(index, 1)
    const temp = <FormArray>this.atcForm.controls['descriptions']
    temp.removeAt(index)

  }
  onExit() {
    this.dialogRef.close();
  }
}


