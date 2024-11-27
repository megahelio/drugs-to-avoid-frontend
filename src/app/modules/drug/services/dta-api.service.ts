import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { DrugToShow } from '../../../entities/drug-to-show';
import { environment } from 'src/app/environments/enviroment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Drug } from 'src/app/entities/drug/drug';
import { Atc } from 'src/app/entities/atc-to-create';


@Injectable({
  providedIn: 'root'
})
export class DtaApiService {


  baseUrl = `${environment.dtaUrl}`
  commonQueryHeaders = new HttpHeaders();
  constructor(protected http: HttpClient, @Inject(LOCALE_ID) protected locale: string) {
    this.commonQueryHeaders = this.commonQueryHeaders.append("Accept-Language", this.locale);
  }

  /**
   * Recupera todos los elementos Drug de la base de datos.
   * Usa el lenguaje del navegador.
   * @returns Observable<Drug[]> 
  */
  public getAllDrugs(): Observable<DrugToShow[]> {
    return this.http.get<DrugToShow[]>(`${this.baseUrl}drugs`, { headers: this.commonQueryHeaders })
  }
  /**
   *  Recupera todos los elementos Drug de la base de datos.
   * 
   * @param locale 
   * @returns 
  */
  public getAllDrugsCustomLocale(locale: string): Observable<DrugToShow[]> {
    return this.http.get<DrugToShow[]>(`${this.baseUrl}drugs`, { headers: new HttpHeaders("Accept-Language:" + locale.replace("_", "-").toLowerCase()) })
  }
  /**
   * Recupera un elemento de la base de datos su id y el locale del usuario.
   * @param id tipo number
   * @returns Observable<Drug>
  */
  public getById(id: number): Observable<DrugToShow> {
    return this.http.get<DrugToShow>(`${this.baseUrl}drug/${id}`, { headers: this.commonQueryHeaders });
  }

  /**
   * Recupera un elemento de la base de datos según su nombre y el locale del usuario.
   * @param name 
   * @returns 
  */
  public getByName(name: string): Observable<DrugToShow> {
    return this.http.get<DrugToShow>(`${this.baseUrl}drug?name=${name}`, { headers: this.commonQueryHeaders });
  }
  /**
   * Returns avalilable Languages of a Drug
   * @returns 
  */
  public getAvailableDrugLanguages(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}drug/available_languages`);
  }
  /**
   * Deletes a Drug and all related information by ID
   * @param id 
   * @returns 
  */
  public deleteDrug(id: number) {
    return this.http.delete(`${this.baseUrl}drug/${id}`);
  }

  /**
   * Modify a Drug
   * @param id 
   * @returns 
  */
  public editDrug(id: number, drug: Drug) {
    return this.http.put(`${this.baseUrl}drug/${id}`, drug);
  }
  /**
   * Create a Drug
   * @returns 
  */
  public createDrug(drug: Drug) {
    return this.http.post(`${this.baseUrl}drug`, drug);
  }

  /**
   * Retrieve set of ATC on DB
   * @returns 
   */
  public getExistingAtc(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}atc_codes`)
  }
  /**
   * Get all descriptions of one ATC
   * @param id 
   * @returns 
   */
  public getAtc(id: string): Observable<Atc> {
    return this.http.get<Atc>(`${this.baseUrl}atc_code/${id}`)
  }
  /**
   * Create an Atc
   * @returns 
  */
  public createAtc(atc: Atc) {
    return this.http.post(`${this.baseUrl}atc_code`, atc);
  }

  /**
   * Delete an Atc
   * @returns 
  */
  public deleteAtc(atc: string) {
    return this.http.delete(`${this.baseUrl}atc_code/${atc}`);
  }
  /**
   * Edit an Atc
   * @returns 
  */
  public editAtc(atcId: string, atc: Atc) {
    return this.http.put(`${this.baseUrl}atc_code/${atcId}`, atc);
  }

  /**
   * Get All Translations and Sanitary alerts assigned to a drug
   * NOTE: used on the edit function
   *  @param id 
   * @returns 
   */
  public dumpOne(id: number) {
    return this.http.get<Drug>(`${this.baseUrl}drug/${id}/all`);
  }
}
