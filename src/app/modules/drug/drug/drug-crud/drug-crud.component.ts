import { AfterViewInit, Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import { DrugEditComponent } from '../drug-edit/drug-edit.component';
import { DrugElementComponent } from '../drug-element/drug-element.component';
import { DrugAddComponent } from '../drug-add/drug-add.component';
import { DrugToShow } from 'src/app/entities/drug-to-show';
import { ConfirmSheetComponent } from 'src/app/modules/confirm-sheet/confirm-sheet.component';
import { DtaApiService } from '../../services/dta-api.service';
import { TOASTR_TOKEN, Toastr } from '../../services/toastr.service';


@Component({
  selector: 'app-drug-crud',
  templateUrl: './drug-crud.component.html',
  styleUrls: ['./drug-crud.component.css']
})
export class DrugCrudComponent implements AfterViewInit, OnInit {


  private innerWidth: number;
  protected dataColumns: string[];
  protected filterColumns: string[];
  protected availableLanguages: string[] = [];
  protected selectedLanguage: string = "";

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.updateColumnsToDisplay();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered.  EL ORDEN IMPORTA EN AMBOS ARRAYS
   *  Se ordena en el orden del array
  */
  protected dataSource = new MatTableDataSource<DrugToShow>();

  nameFilter: FormControl = new FormControl('');
  indicationFilter: FormControl = new FormControl('');
  atcName: FormControl = new FormControl('');
  filterValues = {
    name: '',
    indication: '',
    atcName: ''
  }

  constructor(
    private readonly dialog: Dialog,
    @Inject(TOASTR_TOKEN) private toastr: Toastr,
    private readonly dtaApiService: DtaApiService
  ) {
    this.dataColumns = ['name', 'classificationATC', 'indication', 'actions'];
    this.filterColumns = ['NAME_FILTER', 'CLASSIFICATIONATC_FILTER', 'INDICATION_FILTER', 'CLEAR_FILTER'];

    this.innerWidth = window.innerWidth;
    this.updateColumnsToDisplay();

    this.dataSource.filterPredicate = this.createFilter();
  }
  private updateColumnsToDisplay() {
    if (this.innerWidth < 650) {
      this.dataColumns = ['name', 'classificationATC', 'actions'];
    } else {
      this.dataColumns = ['name', 'classificationATC', 'indication', 'actions'];
    }
    this.filterColumns = this.dataColumns
      .filter(element => element !== "actions")
      .map(element => element.toUpperCase() + "_FILTER");
    this.filterColumns.push('CLEAR_FILTER');
  }


  protected setSelectedLanguage(language: string) {
    if (!(language === this.selectedLanguage)) {
      this.selectedLanguage = language;
      this.getDrugs()
    }
  }
  ngOnInit(): void {
    this.getAvailableDrugLanguages();
    this.getDrugs();
    this.filtersSubscribe();
  }

  private filtersSubscribe() {
    this.nameFilter.valueChanges.subscribe((name) => {
      this.filterValues.name = name;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.indicationFilter.valueChanges.subscribe((indication) => {
      this.filterValues.indication = indication;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });

    this.atcName.valueChanges.subscribe((atcName) => {
      this.filterValues.atcName = atcName;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private getDrugs() {
    const fetchDrugs = this.availableLanguages.includes(this.selectedLanguage)
      ? this.dtaApiService.getAllDrugsCustomLocale(this.selectedLanguage)
      : this.dtaApiService.getAllDrugs();

    fetchDrugs.subscribe(data => {
      this.dataSource.data = data;
    });
  }

  private getAvailableDrugLanguages() {
    this.dtaApiService.getAvailableDrugLanguages().subscribe(data => {
      this.availableLanguages = data;
    })
  }

  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (
      data: {
        name: string;
        indication: string;
        atcName: string;
      },
      filter: string): boolean {

      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().includes(searchTerms.name.toLowerCase()) &&
        data.indication.toLowerCase().includes(searchTerms.indication.toLowerCase()) &&
        data.atcName.toLowerCase().includes(searchTerms.atcName.toLowerCase())
      );
    };
    return filterFunction;
  }


  public onClearFilters(): void {
    this.nameFilter.setValue("")
    this.indicationFilter.setValue("")
    this.atcName.setValue("")
  }


  public onDrugDelete(id: number) {
    const dialogRef =
      this.dialog.open<boolean>(
        ConfirmSheetComponent,
        {
          width: '250px',
          data: {
            title: $localize`${'Eliminar Medicamento'}`,
            message: $localize`${"Medicamento "}` + `${id}` + $localize`${" y toda la información relacionada será eliminada. ¿Quieres continuar?"}`,
            confirmLabel: $localize`${'Sí'}`,
            cancelLabel: $localize`${'No'}`
          }
        }
      );
    dialogRef.closed.subscribe(result => {
      if (result) {
        this.deleteDrug(id);
      }
    });

  }
  private deleteDrug(id: number) {
    this.dtaApiService.deleteDrug(id).subscribe({
      complete: () => {
        this.dataSource;
        this.getDrugs();
        this.toastr.success(
          $localize`${'Medicamento eliminado'}`,
          $localize`${'Se eliminó ${id}.'}`
        )
      },
      error: (e) => {
        this.getDrugs();
        this.toastr.error(
          $localize`${'Medicamento no eliminado'}`,
          $localize`${`${id} no se eliminó.`}`)
      }

    })
    this.toastr.info(
      $localize`${'Eliminar medicamento'}`, $localize`${`Eliminando '${id}.`}`
    );
  }
  onDrugShow(id: number) {
    this.dialog.open(
      DrugElementComponent,
      {
        data: {
          id: id
        }
      }
    );
  }
  onDrugEdit(id: number) {

    const dialogRef =
      this.dialog.open<DrugToShow>(
        DrugEditComponent,
        {
          data: {
            id: id
          }
        }
      );
    dialogRef.closed.subscribe(result => {
      console.log(result);
    });
  }
  onDrugAdd() {
    const dialogRef =
      this.dialog.open(DrugAddComponent, {
        maxHeight: '90vh',
        autoFocus: false
      });
    dialogRef.closed.subscribe(result => {
      console.log(result)
    });
  }


}
