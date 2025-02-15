import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApi: string = 'https://exemple.com'

  private http = inject(HttpClient)
  constructor() { }

  // Fonction pour envoyer l'url du backend
  sendUrl(data:any):Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post(this.urlApi, data, {headers})
  }
}
