import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export function isAtcFormatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        const regex = /^[A-Z]\d{2}[A-Z]?\d?|[A-Z]\d{2}[A-Z]\d{2,}$/;
        if (!regex.test(value)) {
            return { invalidAtcFormat: true };
        }
        return null;
    };
}