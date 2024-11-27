import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function isSanitaryAlertLink(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        /*
        Regex:

        https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Regular_Expressions
        
        (https?|ftp): Aquí estamos utilizando un grupo de captura ( ... ).
        Dentro de este grupo, tenemos dos opciones separadas por el operador | (pipe).
        Esto significa que la cadena debe comenzar con “http”, “https” o “ftp”.
        [^\s/$.?#]: Este es un conjunto de caracteres negados [^...] .
        Significa que la cadena no debe contener espacios en blanco "\s", “/”, “.”, “?”, o “#”.
        [^\\s]*: Esto verifica que no haya espacios en blanco después del punto.
        
        */
        const regex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

        if (!regex.test(value)) {

            return { invalidURL: true };
        }
        return null;
    };
}