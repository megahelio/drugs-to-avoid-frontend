import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export function noWhitespaceValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return /\s/.test(control.value) ? { 'whitespace': true } : null;
    }
}
