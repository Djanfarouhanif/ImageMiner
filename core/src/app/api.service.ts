import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlApi: string = 'http://127.0.0.1:8000/api/load/'

  private http = inject(HttpClient)
  constructor() { }

  // Fonction pour envoyer l'url du backend
  sendUrl(data:any):Observable<Blob>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    })

    return this.http.post(this.urlApi, data, {headers:headers, responseType: 'blob'}) // blob import pour recuperer ls fichier binaire
  }
}
