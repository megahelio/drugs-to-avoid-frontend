import { AfterViewInit, Component, HostListener, ViewChild } from '@angular/core';
import { DrugToShow } from '../../../../entities/drug-to-show';
import { DtaApiService } from '../../services/dta-api.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DrugElementComponent } from '../drug-element/drug-element.component';
import { Dialog } from '@angular/cdk/dialog';

@Component({
  selector: 'app-drug-table',
  templateUrl: './drug-table.component.html',
  styleUrls: ['./drug-table.component.css']
})
export class DrugTableComponent implements AfterViewInit {

  private innerWidth: number;
  protected dataColumns: string[];
  protected filterColumns: string[];

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
    private readonly dtaApiService: DtaApiService
  ) {

    this.dataColumns = ['name', 'classificationATC', 'indication', 'alertLinks'];
    this.filterColumns = ['NAME_FILTER', 'CLASSIFICATIONATC_FILTER', 'INDICATION_FILTER', 'CLEAR_FILTER'];

    this.innerWidth = window.innerWidth;
    this.updateColumnsToDisplay();

    this.dataSource.filterPredicate = this.createFilter();


  }


  private updateColumnsToDisplay() {
    if (this.innerWidth < 650) {
      this.dataColumns = ['name', 'classificationATC', 'indication'];
    } else {
      this.dataColumns = ['name', 'classificationATC', 'indication', 'alertLinks'];
    }
    this.filterColumns = this.dataColumns
      .filter(element => element !== "alertLinks")
      .map(element => element.toLocaleUpperCase() + "_FILTER");
    this.filterColumns.push('CLEAR_FILTER');
  }

  ngOnInit(): void {
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
    this.dtaApiService.getAllDrugs().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  private createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function (
      data:
        {
          name: string;
          indication: string;
          atcName: string;
        },
      filter: string): boolean {

      let searchTerms = JSON.parse(filter);
      return (
        data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1 &&
        data.indication.toLowerCase().indexOf(searchTerms.indication.toLowerCase()) !== -1 &&
        data.atcName.toLowerCase().indexOf(searchTerms.atcName.toLowerCase()) !== -1
      );
    };
    return filterFunction;
  }
  public onClearFilters(): void {
    this.nameFilter.setValue("")
    this.indicationFilter.setValue("")
    this.atcName.setValue("")
  }
  onShowDrug(id: number) {
    this.dialog.open(
      DrugElementComponent,
      {
        data: {
          id: id
        }
      }
    );
  }
 
}


