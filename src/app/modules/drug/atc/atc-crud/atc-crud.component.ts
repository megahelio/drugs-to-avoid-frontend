import { Dialog } from '@angular/cdk/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmSheetComponent } from '../../../confirm-sheet/confirm-sheet.component';
import { AtcAddComponent } from '../atc-add/atc-add.component';
import { DtaApiService } from '../../services/dta-api.service';
import { TOASTR_TOKEN, Toastr } from '../../services/toastr.service';
import { AtcEditComponent } from '../atc-edit/atc-edit.component';
import { AtcElementComponent } from '../atc-element/atc-element.component';

@Component({
  selector: 'app-atc-crud',
  templateUrl: './atc-crud.component.html',
  styleUrl: './atc-crud.component.css'
})
export class AtcCrudComponent {

  protected dataColumns: string[];
  protected filterColumns: string[];
  protected availableLanguages: string[] = [];
  protected selectedLanguage: string = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered.  EL ORDEN IMPORTA EN AMBOS ARRAYS
   *  Se ordena en el orden del array
  */
  protected dataSource = new MatTableDataSource<string>();
  atcName: FormControl = new FormControl('');
  filterValue: string = ''

  constructor(
    private readonly dialog: Dialog,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private readonly dtaApiService: DtaApiService) {
    this.dataColumns = ['classificationATC', 'actions'];
    this.filterColumns = ['CLASSIFICATIONATC_FILTER', 'CLEAR_FILTER'];

    this.dataSource.filterPredicate = this.createFilter();
  }

  protected setSelectedLanguage(language: string) {
    if (!(language === this.selectedLanguage)) {
      this.selectedLanguage = language;
      this.getAtcs()
    }
  }
  ngOnInit(): void {
    this.getAtcs();
    this.filtersSubscribe();
  }

  private filtersSubscribe() {
    this.atcName.valueChanges.subscribe((atcName) => {
      this.filterValue = atcName;
      this.dataSource.filter = this.filterValue;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getAtcs() {

    this.dtaApiService.getExistingAtc().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (
      data: string,
      filter: string): boolean {

      let searchTerm = filter;
      return (
        data.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };
    return filterFunction;
  }

  public onClearFilters(): void {
    this.atcName.setValue("")
  }

  public onDeleteAtc(id: string) {
    const dialogRef =
      this.dialog.open<boolean>(
        ConfirmSheetComponent,
        {
          width: '250px',
          data: {
            title: $localize`${'Eliminar ATC'}`,
            message: $localize`${"ATC"}` + " " + `${id}` + " " + $localize`${"y toda la información relacionada será eliminada. ¿Quieres continuar?"}`,
            confirmLabel: $localize`${'Sí'}`,
            cancelLabel: $localize`${'No'}`
          }
        }
      );
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.deleteAtc(id);
      }
    });

  }
  private deleteAtc(id: string) {
    this.dtaApiService.deleteAtc(id).subscribe({
      complete: () => {
        this.dataSource;
        this.getAtcs();
        this.toastr.success(
          $localize`${'ATC eliminado'}`,
          $localize`${'ATC ${ id } eliminado.'}`
        )
      },
      error: (e) => {
        this.getAtcs();
        this.toastr.error(
          $localize`${'ATC no eliminado'}`,
          $localize`${`ATC ${id} no eliminado.`}`
        )
      }
    })
    this.toastr.info(
      $localize`${'Eliminando ATC'}`, $localize`${`Eliminando '${id}.`}`
    );
  }

  onAtcShow(id: number) {
    this.dialog.open(
      AtcElementComponent,
      {
        data: {
          id: id
        }
      });
  }

  onEditAtc(id: number) {
    this.dialog.open(
      AtcEditComponent,
      {
        data: {
          id: id
        }
      }
    );
  }

  onAtcAdd() {
    this.dialog.open(AtcAddComponent);
  }


}
