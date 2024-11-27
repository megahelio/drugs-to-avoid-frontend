# Front-end Medicamentos con Balance Negativo

Este es un proyecto Angular para una SPA de medicamentos con balance negativo.

## Compilación de la Aplicación

Para compilar la aplicación, sigue estos pasos:

### Extraer y Convertir Archivos de Internacionalización

Antes de compilar la aplicación, necesitas extraer los archivos de internacionalización y convertirlos al formato necesario.

[xlf2xlf](https://github.com/chekit/xlf2xlf.git)

```bash
ng extract-i18n && xlf2xlf -i src/locale/messages.xlf -o src/locale/messages.en.xlf -f es -t en
```

Este comando extraerá los archivos de internacionalización y los convertirá al formato deseado.

### Compilar la Aplicación

Una vez que hayas extraído y convertido los archivos de internacionalización, puedes compilar la aplicación.

```bash
ng build --localize
```

Este comando compilará la aplicación y generará los archivos necesarios para la versión localizada. Los distribuibles se encuentran en el directorio *dist*.
