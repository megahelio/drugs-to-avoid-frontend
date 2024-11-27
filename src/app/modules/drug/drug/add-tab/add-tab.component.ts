import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-tab',
  templateUrl: './add-tab.component.html',
  styleUrls: ['./add-tab.component.css']
})
export class AddTabComponent {
  drugForm!: FormGroup<any>;
  ngOnInit() {
    this.drugForm = new FormGroup({
      name: new FormControl('', Validators.required),
      indication: new FormControl('', Validators.required),
      benefitsAvoid: new FormControl('', Validators.required),
      reasonWhyToAvoid: new FormControl(''),
      alternativeProposalPrescribe: new FormControl('', Validators.required),
    });
  }
  constructor(){
  }

}
