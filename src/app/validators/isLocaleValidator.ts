import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isLocaleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = /^[a-z]{2}_[A-Z]{2}$/;//ej, es_ES, it_IT, en_US
        if (!regex.test(value)) {
            return { invalidLocale: true };
        }
        return null;
    };
}