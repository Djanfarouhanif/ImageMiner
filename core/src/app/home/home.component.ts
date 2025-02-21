import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormBuilder, FormGroup, Form, Validators } from '@angular/forms'
import { ApiService } from '../api.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    form!: FormGroup;
    fichier:boolean = true;
    response!:Blob ; // Pour stocker le fichier avent le télechargement
    animate:boolean = false // L'animation lorsqu'ont click sur envoyer
    messageError:boolean = false // Message d'erreur 

    constructor(private fb:FormBuilder, private apiService:ApiService){

      this.form = this.fb.group({
        'url': [ '', [Validators.required]]
      })
    }

    // Fonction pour executer l'envoye des données

    sendData():void{
      this.messageError = false
      this.animate = !this.animate
      const data = {
        'url': this.form.get('url')?.value
      }
      this.apiService.sendUrl(data).subscribe(
        {
          next: blob =>{
            
            this.response = new Blob([blob], {type:blob.type}) ;

            


            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = 'files.zip'; // Nom du fichier ZIP télécharger
            // document.body.appendChild(a);
            // a.click();
            // document.body.removeChild(a);
            // window.URL.revokeObjectURL(url);
            this.animate = !this.animate
            this.fichier = !this.fichier;
            console.log(this.response)
           },
          error: erro =>{
            console.error(erro,'****************')
            this.animate = !this.animate
            this.messageError = !this.messageError
           }
        }
      )
    }
    // Fonction pour declencher le telechargement
    download(){
      if(this.response && this.response.size > 0) {
       
        const url = window.URL.createObjectURL(this.response);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'file.zip';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url)
      }
    }

}
