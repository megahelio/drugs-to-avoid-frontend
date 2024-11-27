import { Component, Inject, Input, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DtaApiService } from '../../services/dta-api.service';
import { first } from 'rxjs/operators';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { DrugToShow } from 'src/app/entities/drug-to-show';

@Component({
  selector: 'app-drug-element',
  templateUrl: './drug-element.component.html',
  styleUrls: ['./drug-element.component.css'],
})
export class DrugElementComponent {

  drugMissed: Boolean = false;
  @Input() drug: DrugToShow;
  id: any;

  constructor(
    private dtaApiService: DtaApiService,
    @Optional() @Inject(DIALOG_DATA) public data: any) { 
    if (data) {
      if (data.id) {
        this.id = data.id;
      }
      if (data.drug) {
        this.drug = data.drug;
      }
    }

    }

  ngOnInit(): void {
    if (this.id) {
      this.dtaApiService.getById(this.id)
        .pipe(first())
        .subscribe((x) => {
          this.drug = x;
          if (!this.drug) {
            this.drugMissed = true;
          }
        });
    }
  }
}
