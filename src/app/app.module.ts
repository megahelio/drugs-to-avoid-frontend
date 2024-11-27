import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './modules/header/header.component';

import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmSheetComponent } from './modules/confirm-sheet/confirm-sheet.component';
import { TOASTR_TOKEN, Toastr } from './modules/drug/services/toastr.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { LoginComponent } from './modules/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptor } from './modules/drug/services/authentication-interceptor';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

declare const toastr: Toastr;

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ConfirmSheetComponent,
    LoginComponent


  ],
  imports: [
    AppRoutingModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: 'outline' }
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: TOASTR_TOKEN,
      useValue: toastr
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]

})
export class AppModule {

}
