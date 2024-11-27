import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isLocaleValidator } from 'src/app/validators/isLocaleValidator';

@Component({
  selector: 'app-add-translation-modal',
  templateUrl: './add-translation-modal.component.html',
  styleUrls: ['./add-translation-modal.component.css']
})
export class AddTranslationModalComponent {

  constructor(
    public dialogRef: DialogRef<string>,
  ) { }

  public languageForm: FormGroup<any>;
  ngOnInit(): void {
    this.languageForm = new FormGroup({
      language: new FormControl("", [Validators.required, isLocaleValidator()])
    })
  }
  onSubmit() {
    if (this.languageForm.valid) {
      this.dialogRef.close(this.language.value)
    }
  }
  get language() { return this.languageForm.get('language')!; }
}


