import { DialogRef } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { isSanitaryAlertLink } from 'src/app/validators/isSanitaryAlertLink';

@Component({
  selector: 'app-add-sanitaryalert-modal',
  templateUrl: './add-sanitaryalert-modal.component.html',
  styleUrls: ['./add-sanitaryalert-modal.component.css']
})
export class AddSanitaryalertModalComponent {
  public sanitaryAlertForm: FormGroup<any>
  constructor(
    public dialogRef: DialogRef<string>,
  ) { }
  ngOnInit(): void {
    this.sanitaryAlertForm = new FormGroup({
      sanitaryAlertLink: new FormControl("", [Validators.required, isSanitaryAlertLink()])
    })
  }
  onSubmit() {
    if (this.sanitaryAlertForm.valid) {
      this.dialogRef.close(this.sanitaryAlertLink.value)
    }
  }
  get sanitaryAlertLink() { return this.sanitaryAlertForm.get('sanitaryAlertLink')!; }
}
