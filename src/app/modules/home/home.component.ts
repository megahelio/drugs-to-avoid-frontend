import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { DtaApiService } from '../drug/services/dta-api.service';
import { Dialog } from '@angular/cdk/dialog';
import { DrugElementComponent } from '../drug/drug/drug-element/drug-element.component';
import { DrugToShow } from 'src/app/entities/drug-to-show';
import { TOASTR_TOKEN, Toastr } from '../drug/services/toastr.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  nameToSearch: string = "";
  drugToShow: DrugToShow
  drugSearched: DrugToShow[] = []

  constructor(private dtaApiService: DtaApiService, private readonly dialog: Dialog, @Inject(TOASTR_TOKEN) private toastr: Toastr) {

  }
  search() {
    this.toastr.info("", $localize`${"Buscando..."}`)
    this.dtaApiService.getByName(this.nameToSearch).subscribe({
      next: (v) => {
        this.drugSearched[this.drugSearched.length] = v
      },
      complete: () => {
        this.toastr.warning("", $localize`${"Medicamento encontrado"}`)
        this.dialog.open(
          DrugElementComponent,
          {
            data: {
              drug: this.drugSearched[this.drugSearched.length - 1]
            }
          })
      },
      error: (e) => {
        this.toastr.success("", $localize`${"Medicamento no encontrado"}`)
      }
    })
    this.nameToSearch = ""
  }
}
