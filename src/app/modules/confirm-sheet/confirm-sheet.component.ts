import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';


@Component({
  selector: 'app-confirm-sheet',
  templateUrl: './confirm-sheet.component.html',
  styleUrls: ['./confirm-sheet.component.css']
})
export class ConfirmSheetComponent {

  public readonly title: string;
  public readonly message: string;
  public readonly confirmLabel: string;
  public readonly cancelLabel: string;
  public readonly headerClass: string;

  constructor(
    public dialogRef: DialogRef<boolean>,
    @Inject(DIALOG_DATA) public data: any
  ) {
    this.title = data.title || $localize`${'Mensaje'}`;
    this.message = data.message || '';
    this.confirmLabel = data.confirmLabel || $localize`${'Confirmar'}`;
    this.cancelLabel = data.cancelLabel || $localize`${'Cancelar'}`;
    this.headerClass = data.headerClass || 'card-header-warning';

  }

}
