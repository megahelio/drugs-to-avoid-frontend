import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function uniqueValuesValidator(): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {

        const rawArray = formGroup.getRawValue();
        if (!rawArray) {
            return null; // Return if FormArray is not found
        }
        const values: Set<any> = new Set();
        let uniqueValuesInFormArray: boolean = false

        rawArray.forEach((e: { [x: string]: any; }) => {
            if (values.has(e['locale'])) {
                uniqueValuesInFormArray = true
            }
            values.add(e['locale']);
        });
        return uniqueValuesInFormArray ? { uniqueValuesInFormArray: true } : null
    };
}